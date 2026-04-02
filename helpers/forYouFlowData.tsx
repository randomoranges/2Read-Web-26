export type FlowType = 'A' | 'B' | 'C';

export interface FlowAnswers {
  q1: string | null;
  q2: string[];
  q3: string | null;
}

export const q1Options = [
  { id: 'non-fiction', label: '📚  I read non-fiction' },
  { id: 'exams', label: '🎓  Preparing for exams' },
  { id: 'researcher', label: '🔬  Researcher or student' },
  { id: 'work', label: '💼  I read for work' },
  { id: 'love-reading', label: '📖  I just love reading' },
];

export const q2Options = [
  { id: 'kindle-app', label: '📱 Kindle app on phone' },
  { id: 'kindle-device', label: '📖 Kindle device' },
  { id: 'pdfs', label: '📄 PDFs on my phone' },
  
  { id: 'no-system', label: '🤷 No system yet' },
];

export const q3Options = [
  { id: 'forget', label: '😶  I forget what I read' },
  { id: 'highlight-lost', label: '📋  I highlight but never go back to them' },
  { id: 'no-revision', label: '⏱️  No efficient revision system' },
  { id: 'curious', label: '✅  Just curious about 2Read' },
];

/**
 * Determines which flow the user should be routed to based on their answers.
 * 
 * Logic:
 * If Q2 includes "Kindle app" or "Kindle device"  →  FLOW A
 * If Q1 is "exams" or "researcher" AND no Kindle  →  FLOW B
 * Everything else                                 →  FLOW C
 */
export function determineFlow(answers: FlowAnswers): FlowType {
  const hasKindle = answers.q2.includes('kindle-app') || answers.q2.includes('kindle-device');
  const isStudent = answers.q1 === 'exams' || answers.q1 === 'researcher';

  if (hasKindle) {
    return 'A';
  }
  
  if (isStudent && !hasKindle) {
    return 'B';
  }

  return 'C';
}