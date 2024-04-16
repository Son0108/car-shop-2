import { addDecorator } from "@storybook/react";
import { withNextRouter } from "storybook-addon-next-router";
import I18nProvider from "next-translate/I18nProvider";
import * as nextImage from "next/image";

// Load TailwindCSS Styles
import "tailwindcss/tailwind.css";
// Load global CSS
import "../src/styles/global.css";

export const parameters = {
  actions: {
    // Assume all props matching onXYZ and handleXYZ to be actions
    argTypesRegex: "^(on|handle)[A-Z].*",
  },
  controls: {
    matchers: {
      date: /Date$/,
    },
  },
};

// To allow use of the useRouter hook inside the stories
addDecorator(
  withNextRouter({
    path: "/", // defaults to `/`
    asPath: "/", // defaults to `/`
    query: {}, // defaults to `{}`
    push() {}, // defaults to using addon actions integration, can override any method in the router
  })
);

// Mock Next/Image for use in Storybook
// Source: https://stackoverflow.com/questions/64622746/how-to-mock-next-js-image-component-in-storybook
const NextImageMock = nextImage.default;
Object.defineProperty(nextImage, "default", {
  configurable: true,
  value: (props) => {
    return <NextImageMock {...props} unoptimized={true} />;
  },
});

export const decorators = [
  (Story) => (
    <I18nProvider lang="de">
      <Story />
    </I18nProvider>
  ),
];
