import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/solid";

export interface IPasswordCriteria {
  regex: RegExp;
  message: string;
}

export interface IPasswordCriteriaProps {
  matches?: boolean;
  message: string;
}

const PasswordCriteria = ({ matches, message }: IPasswordCriteriaProps) => (
  <div className="inline-flex items-center space-x-2 text-sm">
    <span className="h-4 w-4">
      {matches ? (
        <CheckCircleIcon className="text-success-500" />
      ) : (
        <ExclamationCircleIcon className="text-error-500" />
      )}
    </span>
    <span>{message}</span>
  </div>
);

export default PasswordCriteria;
