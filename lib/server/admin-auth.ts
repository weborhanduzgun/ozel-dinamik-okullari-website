import { env } from "cloudflare:workers";
import { getChatGPTUser, type ChatGPTUser } from "../../app/chatgpt-auth";

type AdminRuntimeBindings = {
  ADMIN_EMAILS?: string;
};

export class AdminAuthError extends Error {
  constructor(
    message: string,
    readonly status: 401 | 403 | 503,
  ) {
    super(message);
    this.name = "AdminAuthError";
  }
}

function configuredAdminEmails(): ReadonlySet<string> {
  const value = (env as unknown as AdminRuntimeBindings).ADMIN_EMAILS ?? "";
  const emails = value
    .split(/[;,\s]+/)
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  return new Set(emails);
}

export async function requireAdmin(): Promise<ChatGPTUser> {
  const user = await getChatGPTUser();
  if (!user) {
    throw new AdminAuthError("Authentication is required.", 401);
  }

  const allowedEmails = configuredAdminEmails();
  if (allowedEmails.size === 0) {
    throw new AdminAuthError("Admin access is not configured.", 503);
  }

  const normalizedEmail = user.email.trim().toLowerCase();
  if (!allowedEmails.has(normalizedEmail)) {
    throw new AdminAuthError("You are not authorized to access this resource.", 403);
  }

  return { ...user, email: normalizedEmail };
}

