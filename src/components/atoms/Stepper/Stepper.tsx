import useTranslation from "next-translate/useTranslation";

/**
 * Props definition for the stepper component
 */
export interface StepperProps {
  /**
   * amount of steps
   */
  steps: number;
  /**
   * index of the current-step
   */
  current?: number;
  /**
   * maximum index to which the user can navigate
   */
  available?: number;
  /**
   * callback to set the current step
   * @param s
   */
  setCurrentStep?: (s: number) => void;
}

/**
 * Stepper component that displays a horizontal stepper
 */
const Stepper = ({
  available = 1,
  current = 1,
  setCurrentStep,
  steps,
}: StepperProps) => {
  const { t } = useTranslation();

  const renderStep = (step: number) => {
    if (step === current) {
      return (
        <button
          onClick={setCurrentStep ? () => setCurrentStep(step) : undefined}
          className="relative flex items-center justify-center focus:outline-none"
          aria-current="step"
        >
          <span className="absolute w-5 h-5 p-px flex" aria-hidden="true">
            <span className="w-full h-full rounded-full bg-primary-200" />
          </span>
          <span
            className="relative block w-2.5 h-2.5 bg-primary-600 rounded-full"
            aria-hidden="true"
          />
          <span className="sr-only">
            {t("common:stepper.step")} {step}
          </span>
        </button>
      );
    }
    if (step < current || step <= available) {
      return (
        <button
          onClick={setCurrentStep ? () => setCurrentStep(step) : undefined}
          className="block w-2.5 h-2.5 bg-primary-600 rounded-full hover:bg-primary-900 focus:outline-none"
        >
          <span className="sr-only">
            {t("common:stepper.step")} {step}
          </span>
        </button>
      );
    }
    return (
      <div className="block w-2.5 h-2.5 bg-gray-200 rounded-full">
        <span className="sr-only">
          {t("common:stepper.step")} {step}
        </span>
      </div>
    );
  };

  return (
    <nav className="flex items-center justify-center" aria-label="Progress">
      <p className="text-sm font-medium">
        {t("common:stepper.summary", { current, max: steps })}
      </p>
      <ol className="ml-8 flex items-center space-x-5">
        {[...Array(steps).keys()].map((step) => (
          <li key={`step-${step}-of-${steps}`}>{renderStep(step + 1)}</li>
        ))}
      </ol>
    </nav>
  );
};

export default Stepper;
