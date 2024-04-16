import { Question } from "./Question";

export interface QuestionCategory {
  id: string;
  position: number;
  name: string;
  questions: Question[];
}
