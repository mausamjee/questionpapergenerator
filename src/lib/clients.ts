import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Supabase Configuration
// Supabase Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || process.env.VITE_SUPABASE_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Gemini AI Configuration
const GEMINI_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || 'placeholder-key';
const genAI = new GoogleGenerativeAI(GEMINI_KEY);
export const aiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
