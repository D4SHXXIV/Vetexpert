/**
 * Represents a Certainty Factor rule linking a disease to a symptom.
 */
export interface RuleCF {
  penyakit_id: number;
  gejala_id: number;
  cf_pakar: number;
}

/**
 * Performs Forward Chaining to find potential diseases based on selected symptoms.
 *
 * @param selectedGejala - An array of selected symptom IDs.
 * @param rules - An array of certainty factor rules.
 * @returns An array of unique disease IDs that match the selected symptoms.
 */
export function forwardChaining(
  selectedGejala: number[],
  rules: RuleCF[]
): number[] {
  // Step 1 & 2: Search all matching rules where the symptom is in the selected symptoms
  const matchingRules = rules.filter((rule) =>
    selectedGejala.includes(rule.gejala_id)
  );

  // Step 3: Collect candidate disease IDs
  const candidateDiseases = matchingRules.map((rule) => rule.penyakit_id);

  // Step 4: Remove duplicates by utilizing a Set
  const uniqueDiseases = Array.from(new Set(candidateDiseases));

  // Step 5: Return an array of unique disease IDs
  return uniqueDiseases;
}
