import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";
import useTranslation from "next-translate/useTranslation";
import { FormikSubmitHandler } from "../../../../../helpers/FormikSubmitHandler";
import { UserAnswer } from "../../../../../definitions/types/models/UserAnswer";
import QuestionnaireInput from "../../../questionnaire/QuestionnaireInput";
import { Question } from "../../../../../definitions/types/models/Question";
import Button from "../../../../atoms/Button/Button";
import StringValidatorBuilder from "../../../../../helpers/validators/StringValidatorBuilder";
import NumberValidatorBuilder from "../../../../../helpers/validators/NumberValidatorBuilder";

export interface InlineQuestionFormValues {
  questionID: string;
  questionType: string;
  defaultAnswer?: string;
  detailedNumericAnswer?: number;
  detailedTextAnswer?: string;
}

interface InlineQuestionFormProps {
  userAnswer?: UserAnswer;
  handleSubmit: FormikSubmitHandler<InlineQuestionFormValues>;
  question: Question;
}

const InlineQuestionForm = ({
  userAnswer,
  handleSubmit,
  question,
}: InlineQuestionFormProps) => {
  const { t } = useTranslation();

  const initialValues: InlineQuestionFormValues = useMemo(
    () => ({
      questionID: question.id,
      questionType: question.answerType,
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
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
      validationSchema={Yup.object().shape({
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
      })}
    >
      {(props: FormikProps<InlineQuestionFormValues>) => (
        <Form onSubmit={props.handleSubmit}>
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <QuestionnaireInput
              id={`answer-${question.id}-input`}
              question={question}
              forceDropdown
            />
            <div className="mt-4 inline-flex w-full justify-end md:mt-0 md:ml-4 md:w-auto">
              <Button
                variant="text"
                color="primary"
                type="submit"
                size="sm"
                loading={props.isSubmitting}
                disabled={!props.dirty || !props.isValid}
              >
                {t("forms:actions.update")}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default InlineQuestionForm;
