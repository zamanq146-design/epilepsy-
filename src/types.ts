export interface ScaffoldingQuestion {
  id: number;
  question: string;
  answer: string;
  reference: string;
}

export interface MCQOption {
  id: string;
  text: string;
}

export interface MCQ {
  id: number;
  title: string;
  scenario: string;
  question: string;
  options: MCQOption[];
  correctAnswer: string;
  explanation: string;
  whyNot: string;
}

export interface HighlightItem {
  term: string;
  type: 'semiology' | 'anatomy' | 'sign' | 'temporal' | 'concept';
  title: string;
  explanation: string;
}
