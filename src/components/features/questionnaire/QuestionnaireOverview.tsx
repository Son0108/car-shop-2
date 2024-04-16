import useTranslation from "next-translate/useTranslation";
import { MouseEventHandler } from "react";
import Button from "../../atoms/Button/Button";

interface QuestionnaireOverviewProps {
  answered: number;
  totalAmount: number;
  handleStart: MouseEventHandler<HTMLButtonElement>;
}

const QuestionnaireOverview = ({
  answered,
  totalAmount,
  handleStart,
}: QuestionnaireOverviewProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center h-full">
      <div className="inline-flex flex-col space-y-4">
        <p>{t("questionnaire:explanation")}</p>
        <p>{t("questionnaire:overview", { answered, totalAmount })}</p>
        <Button onClick={handleStart}>{t("questionnaire:start")}</Button>
      </div>
    </div>
  );
};

export default QuestionnaireOverview;
