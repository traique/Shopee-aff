export function parseCode(code: string) {
  if (!code) return null;

  const parts = code.trim().split("-");

  return {
    keyword: parts.join(" "),
    raw: code,
  };
}
