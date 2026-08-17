/**
 * Reusable sorting utility for LegalCure.in
 * Guarantees strict alphabetical (A → Z) sorting for all dropdowns, lists, and locations.
 */

export function sortAlphabetically<T>(
  items: T[],
  keyExtractor?: (item: T) => string,
  locale: string = 'en'
): T[] {
  if (!items || !Array.isArray(items)) return [];
  
  return [...items].sort((a, b) => {
    const valA = keyExtractor ? keyExtractor(a) : String(a);
    const valB = keyExtractor ? keyExtractor(b) : String(b);
    return valA.localeCompare(valB, locale, { sensitivity: 'base', numeric: true });
  });
}

/**
 * Normalizes strings for robust query matching and URL slugs
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}
