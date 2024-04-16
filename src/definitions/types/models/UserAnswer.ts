export interface UserAnswer {
  id: string;
  question: {
    id: string;
  };
  answer?: {
    id: string;
  };
  detailedAnswer?: string;
}

export type AnswerCreate = Omit<UserAnswer, "id">;
