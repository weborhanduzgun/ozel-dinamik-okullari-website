import { ApiError } from "./api";

export const CONTENT_TYPES = ["page", "news", "announcement", "project"] as const;
export const CONTENT_STATUSES = ["draft", "published", "archived"] as const;
export const STAFF_STATUSES = ["active", "inactive", "archived"] as const;
export const MEDIA_STATUSES = ["draft", "published", "archived"] as const;
export const MEDIA_KINDS = ["image", "document"] as const;
export const SUBMISSION_STATUSES = [
  "new",
  "in_progress",
  "resolved",
  "spam",
  "archived",
] as const;
export const FORM_TYPES = ["registration", "contact"] as const;

type ContentType = (typeof CONTENT_TYPES)[number];
type ContentStatus = (typeof CONTENT_STATUSES)[number];
type StaffStatus = (typeof STAFF_STATUSES)[number];
type MediaStatus = (typeof MEDIA_STATUSES)[number];
type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number];
type FormType = (typeof FORM_TYPES)[number];

type ParseMode = "create" | "patch";

const HTML_TAG_PATTERN = /<\/?[a-z][^>]*>/i;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()\s-]{10,20}$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function hasOwn(input: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(input, key);
}

function readString(
  input: Record<string, unknown>,
  key: string,
  options: {
    required?: boolean;
    nullable?: boolean;
    min?: number;
    max: number;
  },
): string | null | undefined {
  if (!hasOwn(input, key)) {
    if (options.required) throw new ApiError(`${key} is required.`);
    return undefined;
  }

  const value = input[key];
  if (value === null && options.nullable) return null;
  if (typeof value !== "string") throw new ApiError(`${key} must be a string.`);

  const normalized = value.trim();
  if (options.required && normalized.length === 0) {
    throw new ApiError(`${key} is required.`);
  }
  if (normalized.length < (options.min ?? 0) || normalized.length > options.max) {
    throw new ApiError(`${key} must contain between ${options.min ?? 0} and ${options.max} characters.`);
  }
  if (/\0/.test(normalized)) throw new ApiError(`${key} contains invalid characters.`);

  return normalized;
}

function readEnum<T extends readonly string[]>(
  input: Record<string, unknown>,
  key: string,
  values: T,
  required = false,
): T[number] | undefined {
  if (!hasOwn(input, key)) {
    if (required) throw new ApiError(`${key} is required.`);
    return undefined;
  }
  const value = input[key];
  if (typeof value !== "string" || !values.includes(value)) {
    throw new ApiError(`${key} must be one of: ${values.join(", ")}.`);
  }
  return value as T[number];
}

function readBoolean(
  input: Record<string, unknown>,
  key: string,
  required = false,
): boolean | undefined {
  if (!hasOwn(input, key)) {
    if (required) throw new ApiError(`${key} is required.`);
    return undefined;
  }
  const value = input[key];
  if (typeof value !== "boolean") throw new ApiError(`${key} must be a boolean.`);
  return value;
}

function readInteger(
  input: Record<string, unknown>,
  key: string,
  min: number,
  max: number,
): number | undefined {
  if (!hasOwn(input, key)) return undefined;
  const value = input[key];
  if (!Number.isInteger(value) || (value as number) < min || (value as number) > max) {
    throw new ApiError(`${key} must be an integer between ${min} and ${max}.`);
  }
  return value as number;
}

function readMarkdown(
  input: Record<string, unknown>,
  key: string,
  max: number,
): string | undefined {
  const value = readString(input, key, { max });
  if (value === undefined || value === null) return undefined;
  if (HTML_TAG_PATTERN.test(value)) {
    throw new ApiError(`${key} must contain Markdown or plain text, not HTML.`);
  }
  return value;
}

function readSlug(
  input: Record<string, unknown>,
  required: boolean,
): string | undefined {
  const slug = readString(input, "slug", { required, min: 1, max: 120 });
  if (slug === undefined || slug === null) return undefined;
  if (!SLUG_PATTERN.test(slug)) {
    throw new ApiError("slug must use lowercase ASCII letters, numbers and single hyphens.");
  }
  return slug;
}

function readNullableId(
  input: Record<string, unknown>,
  key: string,
): string | null | undefined {
  const value = readString(input, key, { nullable: true, max: 36 });
  if (value === undefined || value === null) return value;
  if (!/^[0-9a-f-]{36}$/i.test(value)) throw new ApiError(`${key} is not a valid identifier.`);
  return value;
}

function readIsoDate(
  input: Record<string, unknown>,
  key: string,
): string | null | undefined {
  const value = readString(input, key, { nullable: true, max: 64 });
  if (value === undefined || value === null) return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new ApiError(`${key} must be an ISO date.`);
  return date.toISOString();
}

function requireAtLeastOneField(value: object, mode: ParseMode): void {
  if (mode === "patch" && Object.keys(value).length === 0) {
    throw new ApiError("At least one editable field is required.");
  }
}

export type ContentWriteInput = {
  type?: ContentType;
  slug?: string;
  title?: string;
  summary?: string;
  bodyMarkdown?: string;
  status?: ContentStatus;
  featuredMediaId?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  publishedAt?: string | null;
};

export function parseContentInput(
  input: Record<string, unknown>,
  mode: ParseMode,
): ContentWriteInput {
  const output: ContentWriteInput = {};
  const required = mode === "create";
  const type = readEnum(input, "type", CONTENT_TYPES, required);
  const slug = readSlug(input, required);
  const title = readString(input, "title", { required, min: 2, max: 200 });
  const summary = readString(input, "summary", { max: 500 });
  const bodyMarkdown = readMarkdown(input, "bodyMarkdown", 100_000);
  const status = readEnum(input, "status", CONTENT_STATUSES);
  const featuredMediaId = readNullableId(input, "featuredMediaId");
  const seoTitle = readString(input, "seoTitle", { nullable: true, max: 70 });
  const seoDescription = readString(input, "seoDescription", { nullable: true, max: 180 });
  const publishedAt = readIsoDate(input, "publishedAt");

  if (type !== undefined) output.type = type;
  if (slug !== undefined) output.slug = slug;
  if (title !== undefined && title !== null) output.title = title;
  if (summary !== undefined && summary !== null) output.summary = summary;
  if (bodyMarkdown !== undefined) output.bodyMarkdown = bodyMarkdown;
  if (status !== undefined) output.status = status;
  if (featuredMediaId !== undefined) output.featuredMediaId = featuredMediaId;
  if (seoTitle !== undefined) output.seoTitle = seoTitle;
  if (seoDescription !== undefined) output.seoDescription = seoDescription;
  if (publishedAt !== undefined) output.publishedAt = publishedAt;

  requireAtLeastOneField(output, mode);
  return output;
}

export type StaffWriteInput = {
  slug?: string;
  fullName?: string;
  roleTitle?: string;
  departmentSlug?: string | null;
  biographyMarkdown?: string;
  photoMediaId?: string | null;
  sortOrder?: number;
  status?: StaffStatus;
};

export function parseStaffInput(
  input: Record<string, unknown>,
  mode: ParseMode,
): StaffWriteInput {
  const output: StaffWriteInput = {};
  const required = mode === "create";
  const slug = readSlug(input, required);
  const fullName = readString(input, "fullName", { required, min: 2, max: 160 });
  const roleTitle = readString(input, "roleTitle", { required, min: 2, max: 160 });
  const departmentSlug = readString(input, "departmentSlug", { nullable: true, max: 120 });
  const biographyMarkdown = readMarkdown(input, "biographyMarkdown", 30_000);
  const photoMediaId = readNullableId(input, "photoMediaId");
  const sortOrder = readInteger(input, "sortOrder", 0, 100_000);
  const status = readEnum(input, "status", STAFF_STATUSES);

  if (slug !== undefined) output.slug = slug;
  if (fullName !== undefined && fullName !== null) output.fullName = fullName;
  if (roleTitle !== undefined && roleTitle !== null) output.roleTitle = roleTitle;
  if (departmentSlug !== undefined) output.departmentSlug = departmentSlug;
  if (biographyMarkdown !== undefined) output.biographyMarkdown = biographyMarkdown;
  if (photoMediaId !== undefined) output.photoMediaId = photoMediaId;
  if (sortOrder !== undefined) output.sortOrder = sortOrder;
  if (status !== undefined) output.status = status;

  requireAtLeastOneField(output, mode);
  return output;
}

export type MediaWriteInput = {
  altText?: string;
  isDecorative?: boolean;
  status?: MediaStatus;
};

export function parseMediaInput(input: Record<string, unknown>): MediaWriteInput {
  const output: MediaWriteInput = {};
  const altText = readString(input, "altText", { max: 500 });
  const isDecorative = readBoolean(input, "isDecorative");
  const status = readEnum(input, "status", MEDIA_STATUSES);
  if (altText !== undefined && altText !== null) output.altText = altText;
  if (isDecorative !== undefined) output.isDecorative = isDecorative;
  if (status !== undefined) output.status = status;
  requireAtLeastOneField(output, "patch");
  return output;
}

export type SubmissionCreateInput = {
  formType: FormType;
  applicantName: string;
  parentName: string | null;
  grade: string | null;
  departmentInterest: string | null;
  email: string | null;
  phone: string | null;
  subject: string | null;
  message: string | null;
  sourcePath: string;
  consentVersion: string;
  consentAt: string;
};

export function parseSubmissionCreate(
  input: Record<string, unknown>,
  options: { sourcePath?: string; consentVersion?: string } = {},
): SubmissionCreateInput {
  const formType = readEnum(input, "formType", FORM_TYPES, true)!;
  const consent = readBoolean(input, "consent", true);
  if (!consent) throw new ApiError("Explicit consent is required.");

  const applicantName = readString(input, "applicantName", {
    required: true,
    min: 2,
    max: 160,
  })!;
  const parentName = readString(input, "parentName", { nullable: true, max: 160 }) ?? null;
  const grade = readString(input, "grade", { nullable: true, max: 40 }) ?? null;
  const departmentInterest =
    readString(input, "departmentInterest", { nullable: true, max: 160 }) ?? null;
  const email = readString(input, "email", { nullable: true, max: 254 }) ?? null;
  const phone = readString(input, "phone", { nullable: true, max: 20 }) ?? null;
  const subject = readString(input, "subject", { nullable: true, max: 200 }) ?? null;
  const message = readString(input, "message", { nullable: true, max: 5_000 }) ?? null;

  if (email && !EMAIL_PATTERN.test(email)) throw new ApiError("email is invalid.");
  if (phone && !PHONE_PATTERN.test(phone)) throw new ApiError("phone is invalid.");

  if (formType === "registration") {
    if (!parentName || !grade || !phone) {
      throw new ApiError("Registration requires parentName, grade and phone.");
    }
  } else if (!email && !phone) {
    throw new ApiError("Contact requests require an email address or phone number.");
  }

  const sourcePath = options.sourcePath ??
    (readString(input, "sourcePath", { max: 300 }) || "/");
  if (!sourcePath.startsWith("/") || sourcePath.startsWith("//")) {
    throw new ApiError("sourcePath must be a same-origin relative path.");
  }

  return {
    formType,
    applicantName,
    parentName,
    grade,
    departmentInterest,
    email,
    phone,
    subject,
    message,
    sourcePath,
    consentVersion: options.consentVersion ?? "2026-07-14",
    consentAt: new Date().toISOString(),
  };
}

export type SubmissionPatchInput = {
  status?: SubmissionStatus;
  assignedTo?: string | null;
  internalNotes?: string;
};

export function parseSubmissionPatch(
  input: Record<string, unknown>,
): SubmissionPatchInput {
  const output: SubmissionPatchInput = {};
  const status = readEnum(input, "status", SUBMISSION_STATUSES);
  const assignedTo = readString(input, "assignedTo", { nullable: true, max: 254 });
  const internalNotes = readString(input, "internalNotes", { max: 5_000 });
  if (status !== undefined) output.status = status;
  if (assignedTo !== undefined) output.assignedTo = assignedTo;
  if (internalNotes !== undefined && internalNotes !== null) output.internalNotes = internalNotes;
  requireAtLeastOneField(output, "patch");
  return output;
}

export function readOptionalFilter<T extends readonly string[]>(
  value: string | null,
  allowed: T,
  name: string,
): T[number] | undefined {
  if (!value) return undefined;
  if (!allowed.includes(value)) {
    throw new ApiError(`${name} must be one of: ${allowed.join(", ")}.`);
  }
  return value as T[number];
}

export function readUploadStatus(value: FormDataEntryValue | null): MediaStatus {
  if (value === null || value === "") return "draft";
  if (
    typeof value !== "string" ||
    !(MEDIA_STATUSES as readonly string[]).includes(value)
  ) {
    throw new ApiError(`status must be one of: ${MEDIA_STATUSES.join(", ")}.`);
  }
  return value as MediaStatus;
}
