import { auditEvents, type NewAuditEvent } from "../../db/schema";

const MAX_AUDIT_METADATA_BYTES = 32_000;

export type AuditEventInput = {
  actorEmail: string;
  action: string;
  entityType: string;
  entityId?: string | null;
  metadata?: Record<string, unknown>;
};

function serializeMetadata(metadata: Record<string, unknown> | undefined): string {
  if (!metadata) return "{}";

  const serialized = JSON.stringify(metadata);
  if (new TextEncoder().encode(serialized).byteLength <= MAX_AUDIT_METADATA_BYTES) {
    return serialized;
  }

  return JSON.stringify({ truncated: true });
}

export function createAuditEvent(input: AuditEventInput): NewAuditEvent {
  return {
    id: crypto.randomUUID(),
    actorEmail: input.actorEmail,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId ?? null,
    metadataJson: serializeMetadata(input.metadata),
  };
}

export { auditEvents };

