import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/outline";

export interface IStep {
  completed?: boolean;
  description?: string;
  name: string;
}

interface IStepProps {
  completed?: boolean;
  current?: boolean;
  description?: string;
  handleClick?: () => void;
  lastStep?: boolean;
  name: string;
}

const Step = ({
  completed,
  current,
  description,
  handleClick,
  lastStep,
  name,
}: IStepProps) => (
  <>
    {!lastStep && (
      <div
        className={clsx(
          "-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full",
          completed ? "bg-primary-600" : "bg-gray-300"
        )}
        aria-hidden="true"
      />
    )}
    <button
      onClick={handleClick}
      className={clsx(
        "relative flex group focus:outline-none",
        description ? "items-start" : "items-center"
      )}
    >
      <span className="h-9 flex items-center">
        <span
          className={clsx(
            "relative z-10 w-8 h-8 flex items-center justify-center rounded-full",
            completed && "bg-primary-600 group-hover:bg-primary-800",
            current && "bg-white border-2 border-primary-600",
            !completed &&
              !current &&
              "bg-white border-2 border-gray-300 group-hover:border-gray-400"
          )}
        >
          {completed && (
            <div className="w-5 h-5 text-white">
              <CheckIcon />
            </div>
          )}
          {!completed && current && (
            <span className="h-2.5 w-2.5 bg-primary-600 rounded-full" />
          )}
          {!completed && !current && (
            <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
          )}
        </span>
      </span>
      <span className="ml-4 min-w-0 flex flex-col items-start">
        <span
          className={clsx(
            "text-xs font-semibold uppercase tracking-wide text-left",
            current ? "text-primary-600" : "text-gray-500"
          )}
        >
          {name}
        </span>
        {description && (
          <span className="text-sm text-gray-500">{description}</span>
        )}
      </span>
    </button>
  </>
);

export interface IVerticalStepperProps {
  currentStep: number;
  steps: IStep[];
  setStep: (step: number) => void;
}

const VerticalStepper = ({
  currentStep,
  setStep,
  steps,
}: IVerticalStepperProps) => {
  return (
    <nav aria-label="Progress">
      <ol>
        {steps &&
          steps.map((step: IStep, index: number) => (
            <li
              className={clsx(
                "relative",
                index !== steps.length - 1 && "pb-10"
              )}
              key={`step-${step.name}`}
            >
              <Step
                name={step.name}
                description={step.description}
                current={currentStep === index}
                completed={step.completed}
                handleClick={() => setStep(index)}
                lastStep={index === steps.length - 1}
              />
            </li>
          ))}
      </ol>
    </nav>
  );
};

export default VerticalStepper;
