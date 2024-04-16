export function buildPredicate(appliedFilters: any): any {
  return Object.entries(appliedFilters)
    .filter((filter) => filter[1] !== "default")
    .filter((filter) => filter[1] !== "")
    .map((filter) => {
      if (filter[0].includes("USER_FIRSTNAME") && filter[1] !== "") {
        return {
          searchCriteria: [
            {
              key: "USER_FIRSTNAME",
              value: filter[1],
              operation: ":",
            },
          ],
        };
      }

      if (filter[0].includes("USER_LASTNAME") && filter[1] !== "") {
        return {
          searchCriteria: [
            {
              key: "USER_LASTNAME",
              value: filter[1],
              operation: ":",
            },
          ],
        };
      }

      return {
        searchCriteria: [
          {
            key: "FILTER_QUESTION_KEY",
            value: filter[0].replace("filters", "questions"),
            operation: ":",
          },
          {
            key: "FILTER_ANSWER_KEY_DEFAULT_ANSWER",
            value: filter[1],
            operation: ":",
          },
        ],
      };
    });
}

const PredicateBuilderUtility = {
  buildPredicate,
};

export default PredicateBuilderUtility;
