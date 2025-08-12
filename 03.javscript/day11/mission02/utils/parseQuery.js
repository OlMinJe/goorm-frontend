export function parseQuery(raw) {
  const parse = String(raw || '')
    .split('#')
    .map((s) => s.trim())
    .filter(Boolean);

  const tags = [];
  const words = [];

  for (const t of parse) {
    if (t.startsWith('#')) tags.push(t.slice(1).toLowerCase());
    else words.push(t.toLowerCase());
  }
  return { tags, words };
}
