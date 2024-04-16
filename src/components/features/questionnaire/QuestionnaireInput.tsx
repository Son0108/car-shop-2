import { useMemo } from "react";
import useTranslation from "next-translate/useTranslation";
import { Question } from "../../../definitions/types/models/Question";
import SelectField from "../../atoms/Inputs/SelectField/SelectField";
import RadioField from "../../atoms/Inputs/RadioField/RadioField";
import TextField from "../../atoms/Inputs/TextField/TextField";
import NumberField from "../../atoms/Inputs/NumberField/NumberField";

interface QuestionnaireInputProps {
  /**
   * set the id for the input so that it can be accessed via an external label
   */
  id: string;
  /**
   * question for which the input is rendered
   */
  question: Question;
  /**
   * Define if all DEFAULTANSWER inputs should be rendered as a dropdown
   *
   * If the input is rendered inline a DEFAULTANSWER input shouldn't be rendered
   * as a radio-group.
   */
  forceDropdown?: boolean;
}

/**
 * Render a question-input for the given question.
 * Based on the question type a different input will be rendered:
 * For a DEFAULTANSWER-question a radio-group or dropdown is rendered.
 * For detailed answers either a text- or number-field will be rendered.
 */
const QuestionnaireInput = ({
  id,
  question,
  forceDropdown = false,
}: QuestionnaireInputProps) => {
  const { t } = useTranslation();

  // If default answers are given, sort them ascending based on the position
  const sortedDefaultAnswers = useMemo(() => {
    if (!question.defaultAnswers) return [];
    return question.defaultAnswers.sort(
      (answer1, answer2) => answer1.position - answer2.position
    );
  }, [question.defaultAnswers]);

  if (question.answerType === "DEFAULTANSWER") {
    if (
      forceDropdown ||
      sortedDefaultAnswers.some((item) => item.position === -1) ||
      sortedDefaultAnswers.length >= 10
    ) {
      return (
        <SelectField
          id={id}
          name="defaultAnswer"
          options={sortedDefaultAnswers.map((item) => ({
            value: item.id,
            label: item.answer,
          }))}
          placeholder={t("forms:helperText.select.selectAValue")}
          size="sm"
        />
      );
    }
    return (
      <RadioField
        id={id}
        name="defaultAnswer"
        options={sortedDefaultAnswers.map((item) => ({
          value: item.id,
          name: item.answer,
        }))}
      />
    );
  }
  if (question.answerType === "STRING") {
    return <TextField id={id} name="detailedTextAnswer" />;
  }
  if (question.answerType === "NUMBER") {
    return <NumberField id={id} name="detailedNumericAnswer" />;
  }
  return null;
};

export default QuestionnaireInput;
