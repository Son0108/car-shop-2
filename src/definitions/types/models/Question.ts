export type QuestionType = "STRING" | "NUMBER" | "DEFAULTANSWER";

export interface DefaultAnswer {
  id: string;
  position: number;
  answer: string;
}

export interface Question {
  id: string;
  query: string;
  position: number;
  answerType: QuestionType;
  defaultAnswers: DefaultAnswer[];
}
