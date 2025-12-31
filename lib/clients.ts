import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Supabase Configuration
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseKey = (import.meta as any).env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');

// Gemini AI Configuration
const GEMINI_KEY = (import.meta as any).env.VITE_GEMINI_API_KEY || (process as any).env.GEMINI_API_KEY || (process as any).env.API_KEY || '';
const genAI = new GoogleGenerativeAI(GEMINI_KEY);
export const aiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });




