
import { supabase } from '../lib/clients';
import { Question } from '../types';

export const fetchQuestionsByChapters = async (chapters: string[]): Promise<Question[]> => {
 const { data, error } = await supabase
  .from('class12')
  .select('*')
  .in('chapter', chapters);

 if (error) throw error;

 return data.map((q: any) => ({
  ...q,
  imageUrl: q.image_url,
  examYear: q.exam_year
 })) as Question[];
};

export const fetchQuestions = async (
 mode: 'generator' | 'past_year',
 chapters: string[],
 year?: string
): Promise<Question[]> => {
 let query = supabase.from('class12').select('*');

 if (mode === 'past_year' && year) {
  query = query.eq('exam_year', year);
 } else {
  // Normal Generator Mode
  if (chapters.length > 0) {
   query = query.in('chapter', chapters);
  }
 }

 const { data, error } = await query;
 if (error) throw error;

 return data.map((q: any) => ({
  ...q,
  imageUrl: q.image_url,
  examYear: q.exam_year
 })) as Question[];
};
