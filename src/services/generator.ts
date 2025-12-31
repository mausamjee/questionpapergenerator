
import {
  Question,
  SectionType,
  Difficulty,
  GeneratedPaper,
  GenerationConfig,
  PaperSection
} from '../types';
import { fetchQuestionsByChapters } from './questionService';

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const shuffle = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = getRandomInt(i + 1);
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const getAlternativeQuestion = (currentQuestion: Question, pool: Question[], excludeIds: string[]): Question | null => {
  const filteredPool = pool.filter(q =>
    q.chapter === currentQuestion.chapter &&
    q.type === currentQuestion.type &&
    !excludeIds.includes(q.id) &&
    q.id !== currentQuestion.id
  );

  if (filteredPool.length === 0) return null;
  return filteredPool[getRandomInt(filteredPool.length)];
};

export const generatePaper = (config: GenerationConfig, pool: Question[]): GeneratedPaper => {
  const { totalMarks } = config;

  if (pool.length < 5) {
    throw new Error("Insufficient questions in selected chapters to generate a paper.");
  }

  const blueprint: Record<number, any[]> = {
    20: [
      { name: 'Section A', desc: 'MCQs & VSA (All questions compulsory)', type: [SectionType.MCQ, SectionType.VSA], req: 6, poolMult: 1, marks: 1 },
      { name: 'Section B', desc: 'Short Answer I (Attempt any 2)', type: [SectionType.SA_2], req: 2, poolMult: 1.5, marks: 2 },
      { name: 'Section C', desc: 'Short Answer II (Attempt any 2)', type: [SectionType.SA_3], req: 2, poolMult: 1.5, marks: 3 },
      { name: 'Section D', desc: 'Long Answer (Attempt any 1)', type: [SectionType.LA_4], req: 1, poolMult: 2, marks: 4 },
    ],
    40: [
      { name: 'Section A', desc: 'MCQs & VSA (All questions compulsory)', type: [SectionType.MCQ, SectionType.VSA], req: 12, poolMult: 1, marks: 1 },
      { name: 'Section B', desc: 'Short Answer I (Attempt any 4)', type: [SectionType.SA_2], req: 4, poolMult: 1.5, marks: 2 },
      { name: 'Section C', desc: 'Short Answer II (Attempt any 4)', type: [SectionType.SA_3], req: 4, poolMult: 1.5, marks: 3 },
      { name: 'Section D', desc: 'Long Answer (Attempt any 2)', type: [SectionType.LA_4], req: 2, poolMult: 2, marks: 4 },
    ],
    80: [
      {
        name: 'SECTION - A',
        isSubQuestionGroup: true,
        subSections: [
          { name: 'Q.1', desc: 'Select and write the correct answer for the following multiple choice type of questions:', type: [SectionType.MCQ], req: 8, poolMult: 1, marks: 2 },
          { name: 'Q.2', desc: 'Answer the following questions:', type: [SectionType.VSA], req: 4, poolMult: 1, marks: 1 },
        ]
      },
      { name: 'SECTION - B', desc: 'Attempt any EIGHT of the following questions:', type: [SectionType.SA_2], req: 8, poolMult: 1.5, marks: 2 },
      { name: 'SECTION - C', desc: 'Attempt any EIGHT of the following questions:', type: [SectionType.SA_3], req: 8, poolMult: 1.5, marks: 3 },
      { name: 'SECTION - D', desc: 'Attempt any FIVE of the following questions:', type: [SectionType.LA_4], req: 5, poolMult: 1.6, marks: 4 },
    ]
  };

  const sectionsBlueprint = blueprint[totalMarks];
  const paperSections: PaperSection[] = [];
  const usedIds = new Set<string>();

  const pickQuestionsForBlueprint = (secDef: any) => {
    const secPool = pool.filter(q => secDef.type.includes(q.type) && !usedIds.has(q.id));
    const countToPick = Math.ceil(secDef.req * (secDef.poolMult || 1));

    const picked: Question[] = [];
    const s = shuffle(secPool);
    for (let i = 0; i < Math.min(countToPick, s.length); i++) {
      picked.push({ ...s[i], marks: secDef.marks });
      usedIds.add(s[i].id);
    }
    return picked;
  };

  sectionsBlueprint.forEach(secDef => {
    if (secDef.isSubQuestionGroup) {
      secDef.subSections.forEach((sub: any) => {
        const questions = pickQuestionsForBlueprint(sub);
        paperSections.push({
          name: sub.name,
          description: sub.desc,
          marksPerQuestion: sub.marks,
          requiredCount: sub.req,
          totalPoolCount: questions.length,
          questions: questions,
          isSubQuestionGroup: true
        });
      });
    } else {
      const questions = pickQuestionsForBlueprint(secDef);
      paperSections.push({
        name: secDef.name,
        description: secDef.desc,
        marksPerQuestion: secDef.marks,
        requiredCount: secDef.req,
        totalPoolCount: questions.length,
        questions: questions
      });
    }
  });

  return {
    id: `PAPER_${Date.now()}`,
    title: 'BOARD QUESTION PAPER : FEBRUARY 2025',
    subject: 'MATHEMATICS AND STATISTICS',
    date: 'FEBRUARY 2025',
    totalMarks: totalMarks,
    timeAllowed: totalMarks === 80 ? '3 Hrs.' : (totalMarks === 40 ? '2 Hrs.' : '1 Hr.'),
    sections: paperSections
  };
};
