import { useMemo } from "react";
import useTranslation from "next-translate/useTranslation";
import Link from "../../atoms/Link/Link";
import Panel from "../../atoms/Panel/Panel";
import Alert from "../../atoms/Alert/Alert";

interface QuestionnaireSummaryPanelProps {
  loading?: boolean;
  amountAnswered?: number;
  totalQuestions?: number;
}

const QuestionnaireSummaryPanel = ({
  loading,
  amountAnswered,
  totalQuestions,
}: QuestionnaireSummaryPanelProps) => {
  const { t } = useTranslation();
  const answeredPercentage = useMemo(() => {
    if (!totalQuestions || amountAnswered === undefined) return 0;
    return Math.floor((amountAnswered / totalQuestions) * 100).toFixed(0);
  }, [amountAnswered, totalQuestions]);

  return (
    <Panel
      loading={loading}
      footer={
        <div>
          <Link href="/profile?tab=questionnaire" className="flex w-full">
            {t("dashboard:questionnaire.link")}
          </Link>
        </div>
      }
    >
      {amountAnswered !== undefined && totalQuestions !== undefined && (
        <div className="space-y-4">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">
              {t("dashboard:questionnaire.title")}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {answeredPercentage}% ({amountAnswered}/{totalQuestions})
            </dd>
          </dl>
          {answeredPercentage < 75 && (
            <Alert severity="info">
              {t("dashboard:questionnaire.answerMoreQuestions")}
            </Alert>
          )}
        </div>
      )}
    </Panel>
  );
};

export default QuestionnaireSummaryPanel;
