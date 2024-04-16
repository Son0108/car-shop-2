import { useMemo } from "react";
import { Question } from "../../../definitions/types/models/Question";
import VerticalStepper from "../../atoms/Stepper/VerticalStepper";
import { UserAnswer } from "../../../definitions/types/models/UserAnswer";

export interface QuestionCategoryStepperProps {
  answers?: UserAnswer[];
  questions: Question[];
  activeQuestionID: string | undefined;
  setActiveQuestionID: (id: string) => void;
}

const QuestionCategoryStepper = ({
  answers = [],
  questions,
  activeQuestionID,
  setActiveQuestionID,
}: QuestionCategoryStepperProps) => {
  const sortedQuestions = useMemo(() => {
    return questions.sort(
      (question1, question2) => question1.position - question2.position
    );
  }, [questions]);

  const handleQuestionSelection = (index: number) => {
    const clickedQuestion = sortedQuestions[index];
    if (!clickedQuestion) return;

    setActiveQuestionID(clickedQuestion.id);
  };

  const activeQuestionStep = useMemo(() => {
    for (let i = 0; i < sortedQuestions.length; i++) {
      const question = sortedQuestions[i];

      if (question.id === activeQuestionID) return i;
    }

    return -1;
  }, [activeQuestionID, sortedQuestions]);

  return (
    <VerticalStepper
      steps={sortedQuestions.map((question) => ({
        name: question.query,
        completed:
          answers?.some((answer) => answer.question.id === question.id) ||
          false,
      }))}
      setStep={handleQuestionSelection}
      currentStep={activeQuestionStep}
    />
  );
};

export default QuestionCategoryStepper;
