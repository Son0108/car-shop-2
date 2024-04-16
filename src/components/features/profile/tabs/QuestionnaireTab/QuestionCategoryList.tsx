import { QuestionCategory } from "../../../../../definitions/types/models/QuestionCategory";
import DescriptionList from "../../../../molecules/DescriptionList/DescriptionList";
import { UserAnswer } from "../../../../../definitions/types/models/UserAnswer";
import QuestionCategoryItem from "./QuestionCategoryItem";
import { FormikSubmitHandler } from "../../../../../helpers/FormikSubmitHandler";
import { InlineQuestionFormValues } from "./InlineQuestionForm";

interface QuestionCategoryListProps {
  answers?: UserAnswer[];
  category: QuestionCategory;
  handleUpdate?: FormikSubmitHandler<InlineQuestionFormValues>;
}

const QuestionCategoryList = ({
  answers = [],
  category,
  handleUpdate,
}: QuestionCategoryListProps) => {
  return (
    <DescriptionList
      key={category.id}
      title={category.name}
      items={category.questions
        .sort((question1, question2) => question1.position - question2.position)
        .map((question) => ({
          title: question.query,
          content: (
            <QuestionCategoryItem
              question={question}
              userAnswer={answers?.find(
                (answer) => answer.question.id === question.id
              )}
              handleUpdate={handleUpdate}
            />
          ),
        }))}
    />
  );
};

export default QuestionCategoryList;
