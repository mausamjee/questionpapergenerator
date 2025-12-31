
export enum SectionType {
  MCQ = 'MCQ',
  VSA = 'VSA',
  SA_2 = 'SA_2',
  SA_3 = 'SA_3',
  LA_4 = 'LA_4'
}

export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}

export interface Question {
  id: string;
  chapter: string;
  type: SectionType;
  marks: number;
  difficulty: Difficulty;
  content: string;
  options?: string[];
  imageUrl?: string;
  solution: string;
  examYear?: string;
}

export interface PaperSection {
  name: string;
  description: string;
  marksPerQuestion: number;
  requiredCount: number;
  totalPoolCount: number;
  questions: Question[];
  isSubQuestionGroup?: boolean;
}

export interface GeneratedPaper {
  id: string;
  title: string;
  subject: string;
  date: string;
  totalMarks: number;
  sections: PaperSection[];
  timeAllowed: string;
}

export interface GenerationConfig {
  selectedChapters: string[];
  totalMarks: 20 | 40 | 80;
  difficultyFocus: 'Standard' | 'Easy' | 'Challenging';
  headerTitle: string;
  subHeader: string;
  testDate: string;
  printTimestamp: string;
  watermark: string;
  watermarkImage?: string;
  watermarkRotation: number;
  watermarkOpacity: number;
  subject: string;
  timeAllowed: string;
  organizationName: string;
  showExamYear: boolean;
  fontSize: number;
}
