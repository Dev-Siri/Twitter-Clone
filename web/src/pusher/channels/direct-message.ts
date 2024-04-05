export const dmEvents = {
  messageCreate: "message_create",
} as const;

export default function getDmChannel(dmId: string) {
  return `dm_${dmId}`;
}
