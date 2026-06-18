/**
 * Represents a single evidence item with the expert's CF and the user's input CF.
 */
export interface CFItem {
  cf_pakar: number;
  cf_user: number;
}

/**
 * Calculates the total Certainty Factor (CF) for a given disease
 * based on an array of evidence items (symptoms).
 *
 * Formula:
 * 1. CF(H,E) = CF_pakar * CF_user
 * 2. CF_combine = CF_old + CF_new * (1 - CF_old)
 *
 * @param items - An array of CFItem containing expert and user CF values.
 * @returns The final combined Certainty Factor, between 0 and 1. Returns 0 if empty.
 */
export function calculateCF(items: CFItem[]): number {
  if (!items || items.length === 0) {
    return 0;
  }

  // Calculate the individual CF for the first item
  // CF(H,E) = CF_pakar * CF_user
  let cfOld = items[0].cf_pakar * items[0].cf_user;

  // If there's only one item, we just return its CF
  if (items.length === 1) {
    return Math.max(0, Math.min(1, cfOld));
  }

  // Combine with the rest of the items
  for (let i = 1; i < items.length; i++) {
    // Calculate CF for the new item
    const cfNew = items[i].cf_pakar * items[i].cf_user;

    // Combine CF_old and CF_new
    // CF_combine = CF_old + CF_new * (1 - CF_old)
    cfOld = cfOld + cfNew * (1 - cfOld);
  }

  // Ensure the final value is strictly bounded between 0 and 1
  return Math.max(0, Math.min(1, cfOld));
}
