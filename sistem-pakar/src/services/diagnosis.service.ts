import { forwardChaining, RuleCF } from '../utils/forward-chaining';
import { calculateCF, CFItem } from '../utils/certainty-factor';

export interface SelectedSymptom {
  gejala_id: number;
  cf_user: number;
}

export interface DiagnosisResult {
  penyakit_id: number;
  cf_hasil: number;
  persentase: number;
}

/**
 * Executes the complete diagnostic process by combining Forward Chaining
 * and Certainty Factor methods.
 *
 * @param selectedSymptoms - Array of symptoms selected by the user, including their CF values.
 * @param allRules - The complete set of rules mapping diseases to symptoms with expert CF values.
 * @returns Array of DiagnosisResult sorted in descending order by certainty percentage.
 */
export function runDiagnosis(
  selectedSymptoms: SelectedSymptom[],
  allRules: RuleCF[]
): DiagnosisResult[] {
  // Step 1: Extract symptom IDs for Forward Chaining
  const selectedGejalaIds = selectedSymptoms.map((s) => s.gejala_id);

  // Step 2: Find candidate diseases using Forward Chaining
  const candidateDiseases = forwardChaining(selectedGejalaIds, allRules);

  const results: DiagnosisResult[] = [];

  // Step 3: For each candidate disease, match symptoms and calculate CF
  for (const diseaseId of candidateDiseases) {
    // Get rules specific to this candidate disease
    const diseaseRules = allRules.filter((rule) => rule.penyakit_id === diseaseId);

    // Prepare items for CF calculation
    const cfItems: CFItem[] = [];

    for (const rule of diseaseRules) {
      const matchedSymptom = selectedSymptoms.find(
        (s) => s.gejala_id === rule.gejala_id
      );

      // If the symptom matches, add it for calculation
      if (matchedSymptom) {
        cfItems.push({
          cf_pakar: rule.cf_pakar,
          cf_user: matchedSymptom.cf_user,
        });
      }
    }

    // Calculate total Certainty Factor for this disease
    const finalCF = calculateCF(cfItems);

    // Only include results with a CF > 0
    if (finalCF > 0) {
      results.push({
        penyakit_id: diseaseId,
        cf_hasil: finalCF,
        persentase: Number((finalCF * 100).toFixed(2)),
      });
    }
  }

  // Step 4 & 5: Sort diseases by highest CF descending and return
  return results.sort((a, b) => b.cf_hasil - a.cf_hasil);
}
