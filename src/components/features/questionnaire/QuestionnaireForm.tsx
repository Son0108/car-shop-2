import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import useTranslation from "next-translate/useTranslation";
import { useMemo } from "react";
import { Question } from "../../../definitions/types/models/Question";
import Button from "../../atoms/Button/Button";
import {
  AnswerCreate,
  UserAnswer,
} from "../../../definitions/types/models/UserAnswer";
import StringValidatorBuilder from "../../../helpers/validators/StringValidatorBuilder";
import NumberValidatorBuilder from "../../../helpers/validators/NumberValidatorBuilder";
import Progressbar from "../../atoms/Progressbar/Progressbar";
import QuestionnaireInput from "./QuestionnaireInput";

interface QuestionnaireFormValues {
  defaultAnswer: string | undefined;
  detailedTextAnswer: string | undefined;
  detailedNumericAnswer: number | undefined;
}

interface QuestionnaireFormProps {
  question: Question;
  userAnswer?: UserAnswer;
  handleSubmit: (value: AnswerCreate) => Promise<void>;
  handleSkip: () => void;
  handlePrevious: () => void;
  activeQuestionIndex: number;
  questionsCount: number;
}

const QuestionnaireForm = ({
  question,
  userAnswer,
  handleSubmit,
  handlePrevious,
  handleSkip,
  activeQuestionIndex,
  questionsCount,
}: QuestionnaireFormProps) => {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    defaultAnswer: Yup.string().when("isSelectAnswer", {
      is: () => question.answerType === "DEFAULTANSWER",
      then: new StringValidatorBuilder(t)
        .validateOneOf(question.defaultAnswers.map((item) => item.id))
        .build(),
    }),
    detailedTextAnswer: Yup.string().when("isDetailedTextAnswer", {
      is: () => question.answerType === "STRING",
      then: new StringValidatorBuilder(t).build(),
    }),
    detailedNumericAnswer: Yup.number().when("isDetailedNumericAnswer", {
      is: () => question.answerType === "NUMBER",
      then: new NumberValidatorBuilder(t).validateMinValue(0).build(),
    }),
  });

  const initialValues = useMemo(
    () => ({
      defaultAnswer:
        userAnswer && userAnswer.answer ? userAnswer.answer.id : "",
      detailedNumericAnswer:
        question.answerType === "NUMBER" && userAnswer?.detailedAnswer
          ? parseInt(userAnswer?.detailedAnswer, 10)
          : ("" as unknown as number),
      detailedTextAnswer:
        question.answerType === "STRING" && userAnswer
          ? userAnswer.detailedAnswer
          : "",
    }),
    [question, userAnswer]
  );

  return (
    <div className="space-y-4">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values, helper) => {
          // If no value was given, handle the submission as a skip
          if (
            !values.defaultAnswer &&
            !values.detailedTextAnswer &&
            !values.detailedNumericAnswer &&
            values.detailedNumericAnswer !== 0 // Make sure 0 is a value that is also submitted
          ) {
            handleSkip();
            return;
          }

          // If the persisted answer has not been changed, handle the submission as a skip
          if (
            // Check if persisted default-answer is equal to the form-value
            (userAnswer?.answer &&
              values.defaultAnswer &&
              userAnswer?.answer.id === values.defaultAnswer) ||
            // Check if persisted detailed-answer (string) is equal to the form-value
            (userAnswer?.detailedAnswer &&
              values.detailedTextAnswer &&
              userAnswer.detailedAnswer === values.detailedTextAnswer) ||
            // Check if persisted detailed-answer (number) is equal to the form-value
            (userAnswer?.detailedAnswer &&
              values.detailedNumericAnswer &&
              userAnswer.detailedAnswer ===
                values.detailedNumericAnswer.toString(10))
          ) {
            handleSkip();
            return;
          }
          const requestBody: AnswerCreate = {
            question: { id: question.id },
            answer: values.defaultAnswer
              ? {
                  id: values.defaultAnswer,
                }
              : undefined,
            detailedAnswer:
              // eslint-disable-next-line no-nested-ternary
              (question.answerType === "STRING"
                ? values.detailedTextAnswer
                : values.detailedNumericAnswer ||
                  values.detailedNumericAnswer === 0
                ? values.detailedNumericAnswer.toString()
                : undefined) || undefined,
          };

          await handleSubmit(requestBody);
          helper.resetForm({
            values: initialValues,
          });
        }}
        validationSchema={validationSchema}
      >
        {(formik: FormikProps<QuestionnaireFormValues>) => (
          <Form className="space-y-6 mt-6">
            <label
              className="font-bold text-2xl text-center block"
              htmlFor="questionnaire-input"
            >
              {question.query}
            </label>
            <div className="py-4">
              <QuestionnaireInput
                id="questionnaire-input"
                question={question}
              />
            </div>
            <div className="flex flex-row-reverse justify-between">
              <Button
                disabled={!formik.isValid}
                loading={formik.isSubmitting}
                variant="contained"
                type="submit"
              >
                {t(
                  formik.dirty ? "forms:actions.continue" : "forms:actions.skip"
                )}
              </Button>
              <Button
                disabled={formik.isSubmitting}
                variant="text"
                color="gray"
                size="sm"
                onClick={handlePrevious}
              >
                &larr; {t("forms:actions.back")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex flex-row items-center space-x-4">
        <div className="flex-grow">
          <Progressbar max={questionsCount} value={activeQuestionIndex} />
        </div>
        <span className="inline-block">
          {`${activeQuestionIndex + 1} / ${questionsCount}`}
        </span>
      </div>
    </div>
  );
};

export default QuestionnaireForm;
