import React, { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";

interface IProps {
  children?: ReactNode;
}

// TestWrapper wraps tests with all context-providers used inside the application.
const TestWrapper = ({ children }: IProps) => <>{children}</>;

// The custom render extends "@testing-library/react"'s default render function with a custom test-wrapper.
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { wrapper: TestWrapper, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
