
export type WordCategory = 
  | "힐링" 
  | "도파민" 
  | "사랑" 
  | "동기부여" 
  | "현실" 
  | "명상"
  | "외로움"
  | "슬픔";

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: WordCategory;
  imageUrl: string;
}
