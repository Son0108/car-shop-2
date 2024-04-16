import { createContext, ReactNode, useMemo, useState } from "react";
import useSWR from "swr";
import { QuestionCategory } from "../../../definitions/types/models/QuestionCategory";
import { Question } from "../../../definitions/types/models/Question";
import {
  AnswerCreate,
  UserAnswer,
} from "../../../definitions/types/models/UserAnswer";
import UserQuestionService from "../../../services/UserQuestionService";
import { isAPIError } from "../../../config/api/api-error";
import { handleAPIErrorResponse } from "../../../helpers/errors/APIErrorHandler";
import { useNotifier } from "../../../contexts/NotificationContext/NotificationContext";

export interface QuestionnaireCTXValues {
  question?: Question;
  answers?: UserAnswer[];
  categories?: QuestionCategory[];
  error?: Error;
  handleNext: () => void;
  handlePrevious: () => void;
  handleSubmit: (values: AnswerCreate) => Promise<void>;
  loading?: boolean;
  questionIndex: number;
  totalQuestions: number;
}

const QuestionnaireContext = createContext<QuestionnaireCTXValues>(
  {} as QuestionnaireCTXValues
);

interface QuestionnaireCTXProviderProps {
  children?: (props: QuestionnaireCTXValues) => ReactNode;
  handleComplete?: { (): void };
}

/**
 * Controller for a questionnaire
 */
const QuestionnaireCTXProvider = ({
  children,
  handleComplete,
}: QuestionnaireCTXProviderProps) => {
  const { notify } = useNotifier();

  const [activeCategory, setActiveCategory] = useState<
    QuestionCategory | undefined
  >();
  const [activeQuestion, setActiveQuestion] = useState<Question | undefined>();
  const [questionIndex, setQuestionIndex] = useState(-1);

  const { data: categories, error: categoriesError } = useSWR<
    QuestionCategory[]
  >("/question-categories");

  const {
    data: answers,
    error: answersError,
    mutate: mutateAnswers,
  } = useSWR<UserAnswer[]>("/users/own/users-questions");

  // Sort categories and nested questions ascending by their position
  const sortedCategories = useMemo(() => {
    return categories
      ?.sort((curr, next) => curr.position - next.position)
      .map((item) => ({
        ...item,
        questions: item.questions.sort(
          (curr, next) => curr.position - next.position
        ),
      }));
  }, [categories]);

  const handleNext = () => {
    if (!sortedCategories) return;

    let nextQuestion = activeQuestion;
    let nextCategory = activeCategory;

    // If there is no active category or active question initialize the form
    // by setting the first question of the first category as the active-question
    if (!activeCategory && !activeQuestion && sortedCategories.length > 0) {
      [nextCategory] = sortedCategories;
      [nextQuestion] = nextCategory.questions;
    }

    sortedCategories.forEach(({ questions }, i) => {
      const isLastCategory = i === sortedCategories.length - 1;

      questions.forEach((question, j) => {
        if (!activeQuestion || question.id !== activeQuestion.id) return;

        const isLastQuestion = j === questions.length - 1;

        // If the current question is found and it's not the last question of the category.
        // Return the next question if the same category.
        if (!isLastQuestion) {
          nextQuestion = questions[j + 1];
          return;
        }

        if (
          isLastQuestion &&
          !isLastCategory &&
          sortedCategories[i + 1].questions.length > 0
        ) {
          nextCategory = sortedCategories[i + 1];
          [nextQuestion] = sortedCategories[i + 1].questions;
          return;
        }

        // After the last question of the last category the overview should be shown
        if (isLastQuestion && isLastCategory) {
          nextCategory = undefined;
          nextQuestion = undefined;
          // Call the complete handler because the last question is reached
          if (handleComplete) handleComplete();
        }
      });
    });

    setActiveQuestion(nextQuestion);
    setActiveCategory(nextCategory);
    // Advance the question-index to track the progress
    setQuestionIndex((index) => index + 1);
  };

  const handlePrevious = () => {
    if (!sortedCategories) return;
    let previousQuestion = activeQuestion;
    let previousCategory = activeCategory;

    if (!activeCategory && !activeQuestion) {
      [previousCategory] = sortedCategories;
      previousQuestion = previousCategory?.questions[0];
    }

    sortedCategories.forEach(({ questions }, i) => {
      const isFirstCategory = i === 0;

      questions.forEach((question, j) => {
        if (!activeQuestion || question.id !== activeQuestion.id) return;

        const isFirstQuestion = j === 0;

        // If the current question is found and it's not the first question of the category.
        // Return the previous question of the same category.
        if (!isFirstQuestion) {
          previousQuestion = questions[j - 1];
          return;
        }

        if (
          isFirstQuestion &&
          !isFirstCategory &&
          sortedCategories[i - 1].questions.length > 0
        ) {
          previousCategory = sortedCategories[i - 1];
          const prevQuestions = sortedCategories[i - 1].questions;
          previousQuestion = prevQuestions[prevQuestions.length - 1];
          return;
        }

        // After the first question of the first category the overview should be shown
        if (isFirstQuestion && isFirstCategory) {
          previousCategory = undefined;
          previousQuestion = undefined;
        }
      });
    });

    setActiveQuestion(previousQuestion);
    setActiveCategory(previousCategory);
    // Decrease the question-index to track the progress
    setQuestionIndex((index) => index - 1);
  };

  /**
   * Upload an answer and revalidate the given answers
   * @param values
   */
  const handleSubmit = async (values: AnswerCreate) => {
    try {
      const createdAnswer = await UserQuestionService().createAnswer(values);

      // Update the answers provided by the context with the current answer
      await mutateAnswers(
        [
          // Spread the all answers and filter if the question that was just updated is present
          // filter it to prevent the duplicates in the state
          ...(answers?.filter(
            (answer) => answer.question.id !== createdAnswer.question.id
          ) || []),
          createdAnswer,
        ],
        false
      );

      handleNext();
    } catch (err) {
      if (isAPIError(err)) {
        handleAPIErrorResponse(err, { notify });
      }
    }
  };

  /**
   * Combine all questions of all categories into a single array and return the length of it
   */
  const totalQuestions = useMemo(() => {
    if (!categories) return 0;
    return categories.flatMap((category) => category.questions).length;
  }, [categories]);

  return (
    <QuestionnaireContext.Provider
      value={{
        question: activeQuestion,
        answers,
        categories: sortedCategories,
        error: categoriesError || answersError,
        handleNext,
        handlePrevious,
        handleSubmit,
        loading:
          (!categories && !categoriesError) || (!answers && !answersError),
        questionIndex,
        totalQuestions,
      }}
    >
      <QuestionnaireContext.Consumer>
        {(props) => children && children(props)}
      </QuestionnaireContext.Consumer>
    </QuestionnaireContext.Provider>
  );
};

export default QuestionnaireCTXProvider;
