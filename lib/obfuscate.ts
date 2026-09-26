/** Server-side base64 for contact details, paired with RevealContact on the client. */
export function encodeContact(value: string) {
  return Buffer.from(value, "utf8").toString("base64");
}
