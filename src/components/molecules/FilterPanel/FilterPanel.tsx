import useTranslation from "next-translate/useTranslation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import Panel from "../../atoms/Panel/Panel";
import Heading from "../../atoms/Heading/Heading";
import { Filters } from "../../../definitions/types/models/filter/Filters";
import { SearchCriteriaGroup } from "../../../definitions/types/models/searchcriteria/SearchCriteriaGroup";
import WebFilterForm from "../../organisms/FilterForm/WebFilterForm/WebFilterForm";
import TextField from "../../atoms/Inputs/TextField/TextField";
import { buildPredicate } from "../../../utilities/PredicateBuilderUtility";

export interface FilterPanelProps {
  loading?: boolean;
  filters?: Filters[];
  setFilterPredicates?: Dispatch<SetStateAction<SearchCriteriaGroup[]>>;
  additionalFilter?: AdditionalFilter[];
}

export type AdditionalFilter = {
  name: string;
  label: string;
  type: any; //eslint-disable-line
  initialValues: any; //eslint-disable-line
  additionalStyle?: string;
};

type FEFilter = {
  name: string;
  value: string;
};

const FilterPanel = ({
  loading,
  filters,
  setFilterPredicates,
  additionalFilter,
}: FilterPanelProps) => {
  const { t } = useTranslation();
  const [extendedFilters, setExtendedFilters] = useState<Filters[]>();
  const [appliedFilters, setAppliedFilters] = useState({});

  useEffect(() => {
    const copy = filters;
    copy?.map((filter) => {
      filter.options.unshift({
        label: t("common:filter.defaultFilter"),
        value: "default",
      });
      return filter;
    });
    setExtendedFilters(copy);
  }, [filters]); //eslint-disable-line

  useEffect(() => {
    const filterPreds: any = buildPredicate(appliedFilters); //eslint-disable-line

    if (setFilterPredicates) {
      setFilterPredicates(filterPreds);
    }
  }, [appliedFilters]); //eslint-disable-line

  return (
    <Panel
      header={
        <Heading as="h3" variant="h5" className="leading-6 font-medium">
          {t("common:filter.title")}
        </Heading>
      }
      loading={loading}
    >
      <div className="bg-white">
        {additionalFilter &&
          additionalFilter.map((filter) => (
            <Formik
              enableReinitialize
              key={`formik-${filter.name}`}
              initialValues={filter.initialValues}
              onSubmit={() => {}}
            >
              <Form>
                <TextField
                  additionalStyle={filter.additionalStyle}
                  key={`field-${filter.name}`}
                  label={filter.label}
                  name={filter.name}
                  type={filter.type}
                  onChange={(res: FEFilter) => {
                    setAppliedFilters((prevState) => ({
                      ...prevState,
                      [res.name]: res.value,
                    }));
                  }}
                />
              </Form>
            </Formik>
          ))}
        {extendedFilters?.map((section) => (
          <>
            <WebFilterForm
              key={`webFilter-${section.id}`}
              setAppliedFilters={setAppliedFilters}
              section={section}
            />
          </>
        ))}
      </div>
    </Panel>
  );
};

export default FilterPanel;
