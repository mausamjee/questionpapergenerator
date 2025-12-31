import { supabase } from '../lib/clients';
import { Question } from '../types';

export const fetchQuestionsByChapters = async (chapters: string[]): Promise<Question[]> => {
 const { data, error } = await supabase
  .from('questions')
  .select('*')
  .in('chapter', chapters);

 if (error) throw error;

 // Map DB snake_case columns back to your camelCase TypeScript types if needed
 return data.map((q: any) => ({
  ...q,
  imageUrl: q.image_url, // map back
  examYear: q.exam_year
 })) as Question[];
};
