import { Disclosure } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import clsx from "clsx";
import { Filters } from "../../../../definitions/types/models/filter/Filters";
import { SearchCriteriaGroup } from "../../../../definitions/types/models/searchcriteria/SearchCriteriaGroup";
import SelectField from "../../../atoms/Inputs/SelectField/SelectField";

export interface WebFilterFormProps {
  section?: Filters;
  setFilterPredicates?: Dispatch<SetStateAction<SearchCriteriaGroup[]>>;
  setAppliedFilters?: Dispatch<SetStateAction<FEFilter[]>>;
}

type FEFilter = {
  name: string;
  value: string;
};

const WebFilterForm = ({ section, setAppliedFilters }: WebFilterFormProps) => {
  const initialValues = {
    [section?.id || ""]: "default",
  };

  const [value, setValue] = useState<FEFilter>({
    name: section?.id || "",
    value: "default",
  });

  useEffect(() => {
    if (setAppliedFilters) {
      setAppliedFilters((prevState) => ({
        ...prevState,
        [value.name]: value.value,
      }));
    }
  }, [setAppliedFilters, value]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={() => {}}
    >
      <Form className="lg:block">
        <Disclosure
          as="div"
          key={section?.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                  <span
                    className={clsx(
                      "block text-base font-medium text-gray-700"
                    )}
                  >
                    {section?.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  <SelectField
                    key={`selectField-${section?.id}`}
                    id={`filter-${section?.id}`}
                    name={`${section?.id}`}
                    options={section?.options}
                    onChange={(res: FEFilter) => {
                      setValue(res);
                    }}
                  />
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </Form>
    </Formik>
  );
};

export default WebFilterForm;
