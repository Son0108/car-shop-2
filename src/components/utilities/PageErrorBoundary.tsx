/* eslint-disable */
// Since this file contains a class-component many eslint rules are broken.
// Therefore ESLINT is disabled for this file.
import { Component, ErrorInfo, ReactNode } from "react";
import CardLayout from "../templates/Layout/CardLayout/CardLayout";
import useTranslation from "next-translate/useTranslation";
import Panel from "../atoms/Panel/Panel";
import Button from "../atoms/Button/Button";
import SEO from "./SEO";

/**
 * FallbackPage that is shown if an error is caught by the error boundary.
 */
const FallbackPage = () => {
  const { t } = useTranslation();
  const title = t("common:fatalError.title");

  /**
   * Reload the current route to reinitialize the page
   */
  const reloadPage = () => {
    // Navigate back to base route
    location.replace("/");
  };

  return (
    <CardLayout title={title}>
      <SEO title={title} noIndex />
      <Panel>
        <div className="space-y-5">
          <p>{t("common:fatalError.text")}</p>
          <Button fill onClick={reloadPage}>
            {t("common:fatalError.reloadPage")}
          </Button>
        </div>
      </Panel>
    </CardLayout>
  );
};

/**
 * Props definition for the error-boundary
 */
interface PageErrorBoundaryProps {
  /**
   * children rendered inside the error boundary
   */
  children?: ReactNode;
}

/**
 * State definition for the error-boundary
 */
interface PageErrorBoundaryState {
  /**
   * error that was caught by the error-boundary
   */
  caughtError: Error | null;
}

/**
 * Error-boundary that wraps the entire page to make sure unexpected errors
 * are handled as expected.
 */
class PageErrorBoundary extends Component<
  PageErrorBoundaryProps,
  PageErrorBoundaryState
> {
  constructor(props: PageErrorBoundaryProps) {
    super(props);
    this.state = {
      caughtError: null,
    };
  }

  /**
   * Return the state after the component has caught the error
   * @param error that has been caught by the boundary
   */
  static getDerivedStateFromError(error: Error) {
    return { caughtError: error };
  }

  /**
   * Execute logic if an error is caught by the error boundary
   * @param error that has been caught by the boundary
   * @param errorInfo component-stack where the error was caught.
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // TODO: Log fatal application errors to a logging service
    console.debug(error, errorInfo);
  }

  render() {
    if (this.state.caughtError) {
      return <FallbackPage />;
    }

    return this.props.children;
  }
}

export default PageErrorBoundary;
