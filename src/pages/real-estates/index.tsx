import useTranslation from "next-translate/useTranslation";
import useSWR from "swr";
import { useEffect, useState } from "react";
import StackedLayout from "../../components/templates/Layout/StackedLayout/StackedLayout";
import SEO from "../../components/utilities/SEO";
import { RealEstate } from "../../definitions/types/models/RealEstate";
import RealEstatesPanel from "../../components/molecules/RealEstatesPanel/RealEstatesPanel";
import { Count } from "../../definitions/types/models/Count";
import { PaginationProps } from "../../components/molecules/PaginationPanel/PaginationPanel";

const RealEstatesOverview = () => {
  const { t } = useTranslation();
  const [paginationRealEstates, setPaginationRealEstates] =
    useState<PaginationProps>({
      page: 0,
      size: 20,
    });

  const { data: realEstates } = useSWR<RealEstate[]>(
    `/real-estates/own?page=${paginationRealEstates.page}&size=${paginationRealEstates.size}`
  );

  const { data: count } = useSWR<Count>("/real-estates/own/count");

  useEffect(() => {
    setPaginationRealEstates((prevState) => {
      return {
        ...prevState,
        totalCount: count?.count,
      };
    });
  }, [count]);

  return (
    <StackedLayout title={t("realEstates:headings.overview")}>
      <SEO title={t("realEstates:headings.overview")} noIndex />
      <div className="grid gap-4">
        <RealEstatesPanel
          pagination={{
            page: paginationRealEstates.page,
            size: paginationRealEstates.size,
            totalCount: count?.count,
            setPagination: setPaginationRealEstates,
          }}
          realEstates={realEstates}
        />
      </div>
    </StackedLayout>
  );
};

export default RealEstatesOverview;
