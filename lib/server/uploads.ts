import { ApiError } from "./api";

const IMAGE_MAX_BYTES = 10 * 1024 * 1024;
const DOCUMENT_MAX_BYTES = 25 * 1024 * 1024;

type AllowedUpload = {
  extension: string;
  kind: "image" | "document";
  maxBytes: number;
  matches: (bytes: Uint8Array) => boolean;
};

const startsWith = (bytes: Uint8Array, signature: number[]): boolean =>
  signature.every((value, index) => bytes[index] === value);

const ascii = (bytes: Uint8Array, start: number, length: number): string =>
  String.fromCharCode(...bytes.slice(start, start + length));

const ALLOWED_UPLOADS: Record<string, AllowedUpload> = {
  "image/jpeg": {
    extension: "jpg",
    kind: "image",
    maxBytes: IMAGE_MAX_BYTES,
    matches: (bytes) => startsWith(bytes, [0xff, 0xd8, 0xff]),
  },
  "image/png": {
    extension: "png",
    kind: "image",
    maxBytes: IMAGE_MAX_BYTES,
    matches: (bytes) => startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  },
  "image/webp": {
    extension: "webp",
    kind: "image",
    maxBytes: IMAGE_MAX_BYTES,
    matches: (bytes) => ascii(bytes, 0, 4) === "RIFF" && ascii(bytes, 8, 4) === "WEBP",
  },
  "image/avif": {
    extension: "avif",
    kind: "image",
    maxBytes: IMAGE_MAX_BYTES,
    matches: (bytes) =>
      ascii(bytes, 4, 4) === "ftyp" &&
      ["avif", "avis", "mif1", "msf1"].includes(ascii(bytes, 8, 4)),
  },
  "application/pdf": {
    extension: "pdf",
    kind: "document",
    maxBytes: DOCUMENT_MAX_BYTES,
    matches: (bytes) => ascii(bytes, 0, 5) === "%PDF-",
  },
};

export type ValidatedUpload = {
  bytes: Uint8Array;
  contentType: keyof typeof ALLOWED_UPLOADS;
  extension: string;
  kind: "image" | "document";
  originalName: string;
};

function sanitizeOriginalName(value: string): string {
  const name = value.replace(/[\u0000-\u001f\u007f]/g, "").replace(/[\\/]/g, "-").trim();
  if (!name) return "upload";
  return name.slice(0, 180);
}

export async function validateUpload(file: File): Promise<ValidatedUpload> {
  const allowed = ALLOWED_UPLOADS[file.type];
  if (!allowed) {
    throw new ApiError(
      "Only JPEG, PNG, WebP, AVIF and PDF files are accepted.",
      415,
      "unsupported_media_type",
    );
  }
  if (file.size <= 0 || file.size > allowed.maxBytes) {
    throw new ApiError(
      `File size must be between 1 byte and ${Math.floor(allowed.maxBytes / 1024 / 1024)} MB.`,
      413,
      "file_too_large",
    );
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!allowed.matches(bytes)) {
    throw new ApiError(
      "File contents do not match the declared media type.",
      415,
      "invalid_file_signature",
    );
  }

  return {
    bytes,
    contentType: file.type,
    extension: allowed.extension,
    kind: allowed.kind,
    originalName: sanitizeOriginalName(file.name),
  };
}

