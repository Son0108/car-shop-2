import useTranslation from "next-translate/useTranslation";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import Button from "../../atoms/Button/Button";

export interface PaginationProps {
  page: number;
  size: number;
  totalCount?: number;
  setPagination?: Dispatch<SetStateAction<PaginationProps>>;
  showAll?: ShowAllProps;
}

export interface ShowAllProps {
  show: boolean;
  url: string;
}

const PaginationPanel = ({
  page,
  size,
  totalCount,
  setPagination,
  showAll,
}: PaginationProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const calculatedTo = (page + 1) * size;

  const calculateToResult = () => {
    if (page === 0 && !(totalCount && calculatedTo >= totalCount)) {
      return (page + 1) * size;
    }

    if (totalCount && calculatedTo >= totalCount) {
      return totalCount;
    }

    return calculatedTo;
  };

  return (
    <nav
      className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          {t("common:pagination.showing")}{" "}
          <span className="font-medium">{page * size + 1}</span>{" "}
          {t("common:pagination.to")}{" "}
          <span className="font-medium">{calculateToResult()}</span>{" "}
          {t("common:pagination.of")}{" "}
          <span className="font-medium">{totalCount}</span>{" "}
          {t("common:pagination.results")}
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        <Button
          color="white"
          size="sm"
          onClick={() =>
            setPagination?.((prevState) => {
              return {
                ...prevState,
                page:
                  prevState.page && prevState.page !== 0
                    ? prevState.page - 1
                    : 0,
              };
            })
          }
        >
          {t("common:pagination.previous")}
        </Button>
        <Button
          color="white"
          size="sm"
          additionalStyling="ml-2"
          onClick={() =>
            setPagination?.((prevState) => {
              return {
                ...prevState,
                page:
                  totalCount && calculatedTo >= totalCount
                    ? prevState.page
                    : prevState.page + 1,
              };
            })
          }
        >
          {t("common:pagination.next")}
        </Button>
        {showAll && showAll.show && (
          <Button
            color="white"
            size="sm"
            additionalStyling="ml-2"
            onClick={() => router.push(showAll?.url)}
          >
            {t("common:pagination.showAll")}
          </Button>
        )}
      </div>
    </nav>
  );
};
export default PaginationPanel;
