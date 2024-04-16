import useSWR from "swr";
import { useMemo } from "react";
import useTranslation from "next-translate/useTranslation";
import { QuestionCategory } from "../../../../../definitions/types/models/QuestionCategory";
import {
  AnswerCreate,
  UserAnswer,
} from "../../../../../definitions/types/models/UserAnswer";
import Heading from "../../../../atoms/Heading/Heading";
import QuestionCategoryList from "./QuestionCategoryList";
import { InlineQuestionFormValues } from "./InlineQuestionForm";
import UserQuestionService from "../../../../../services/UserQuestionService";
import { isAPIError } from "../../../../../config/api/api-error";
import { handleAPIErrorResponse } from "../../../../../helpers/errors/APIErrorHandler";
import { useNotifier } from "../../../../../contexts/NotificationContext/NotificationContext";

const QuestionnaireTab = () => {
  const { t } = useTranslation();
  const { notify } = useNotifier();

  const { data: categories, error: categoriesError } = useSWR<
    QuestionCategory[]
  >("/question-categories");

  const {
    data: answers,
    error: answersError,
    mutate: mutateAnswers,
  } = useSWR<UserAnswer[]>("/users/own/users-questions");

  const handleUserAnswerUpdate = async (values: InlineQuestionFormValues) => {
    try {
      const requestBody: AnswerCreate = {
        question: { id: values.questionID },
        answer: values.defaultAnswer
          ? {
              id: values.defaultAnswer,
            }
          : undefined,
        detailedAnswer:
          // eslint-disable-next-line no-nested-ternary
          (values.questionType === "STRING"
            ? values.detailedTextAnswer
            : values.detailedNumericAnswer || values.detailedNumericAnswer === 0
            ? `${values.detailedNumericAnswer}`
            : undefined) || undefined,
      };

      const createdAnswer = await UserQuestionService().createAnswer(
        requestBody
      );

      const userAnswers = answers || [];

      await mutateAnswers(
        [
          ...userAnswers?.filter(
            (answer) => answer.question.id !== createdAnswer.question.id
          ),
          createdAnswer,
        ],
        false
      );
    } catch (err) {
      if (isAPIError(err)) {
        handleAPIErrorResponse(err, { notify });
      }
    }
  };

  const loading = useMemo(() => {
    return (!categories && !categoriesError) || (!answers && !answersError);
  }, [answers, answersError, categories, categoriesError]);

  return (
    <div>
      {!loading && categories && (
        <div className="space-y-5">
          <div>
            <Heading className="mb-4" variant="h4" as="h2">
              {t("profile:heading.questionnaire")}
            </Heading>
            <div>
              {categories
                .sort(
                  (category1, category2) =>
                    category1.position - category2.position
                )
                .map((category) => (
                  <QuestionCategoryList
                    key={category.id}
                    answers={answers}
                    category={category}
                    handleUpdate={handleUserAnswerUpdate}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionnaireTab;
