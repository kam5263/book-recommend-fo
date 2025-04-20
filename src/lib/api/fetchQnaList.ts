import { supabase } from '@/lib/supabase';

export type Option = {
  label: string;
  value: string;
};

export type QnaItem = {
  id: number;
  question: string;
  qna_option: Option[];
};

export async function fetchQnaList(): Promise<QnaItem[]> {
  const { data, error } = await supabase
    .from('qna')
    .select('id, question, qna_option(label, value)')
    .order('id');

  if (error) {
    console.error('Supabase fetch error:', error);
    return [];
  }

  return data as QnaItem[];
}
