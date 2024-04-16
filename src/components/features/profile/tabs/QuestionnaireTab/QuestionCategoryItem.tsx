import { useMemo, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { Question } from "../../../../../definitions/types/models/Question";
import { UserAnswer } from "../../../../../definitions/types/models/UserAnswer";
import { FormikSubmitHandler } from "../../../../../helpers/FormikSubmitHandler";
import Button from "../../../../atoms/Button/Button";
import InlineQuestionForm, {
  InlineQuestionFormValues,
} from "./InlineQuestionForm";

interface QuestionCategoryItemProps {
  question: Question;
  userAnswer?: UserAnswer;
  handleUpdate?: FormikSubmitHandler<InlineQuestionFormValues>;
}

const QuestionCategoryItem = ({
  question,
  userAnswer,
  handleUpdate,
}: QuestionCategoryItemProps) => {
  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);

  const handleSubmit: FormikSubmitHandler<InlineQuestionFormValues> = async (
    values,
    helpers
  ) => {
    if (handleUpdate) {
      await handleUpdate(values, helpers);
      setEditing(false);
    }
  };

  const renderAnswer = useMemo(() => {
    if (userAnswer && question.answerType !== "DEFAULTANSWER") {
      return <p>{userAnswer.detailedAnswer}</p>;
    }

    if (userAnswer && question.answerType === "DEFAULTANSWER") {
      const answer = question.defaultAnswers.find(
        (defaultAnswer) =>
          userAnswer &&
          userAnswer.answer &&
          defaultAnswer.id === userAnswer.answer.id
      );
      if (answer) {
        return <p>{answer.answer}</p>;
      }
    }

    return <p>{t("questionnaire:noAnswer")}</p>;
  }, [t, question, userAnswer]);

  if (handleUpdate && editing) {
    return (
      <InlineQuestionForm
        handleSubmit={handleSubmit}
        question={question}
        userAnswer={userAnswer}
      />
    );
  }

  return (
    <div className="w-full inline-flex flex-col md:flex-row justify-between md:space-x-5">
      {renderAnswer}
      {handleUpdate && (
        <div className="mt-4 inline-flex w-full justify-end md:mt-0 md:ml-4 md:w-auto">
          <Button
            variant="text"
            color="primary"
            size="sm"
            onClick={() => setEditing(true)}
          >
            {t("forms:actions.edit")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionCategoryItem;
