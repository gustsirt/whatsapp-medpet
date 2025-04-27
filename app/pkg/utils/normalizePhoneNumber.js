// Corrige situaciones de telefono
export function normalizePhoneNumber(number) {
  return number.replace(/^549/, "54");
}