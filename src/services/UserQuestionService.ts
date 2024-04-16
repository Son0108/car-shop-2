import {
  AnswerCreate,
  UserAnswer,
} from "../definitions/types/models/UserAnswer";
import api from "../config/api/api";

const UserQuestionService = () => ({
  createAnswer: async (answer: AnswerCreate): Promise<UserAnswer> => {
    const { data } = await api.post<UserAnswer>(
      "users-questions/own/single",
      answer
    );
    return data;
  },
});

export default UserQuestionService;
