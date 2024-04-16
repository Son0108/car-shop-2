import { useCallback, useEffect, useState } from "react";
import TailwindConfig from "../../tailwind.config";

// Make sure to update this if changes were made to the TailwindCSS-Config
export type MediaBreakPoint = "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * This hooks provides a boolean if a breakpoint is currently active.
 */
const useMedia = (breakpoint: MediaBreakPoint): boolean => {
  const [mediaQueryActive, setMediaQueryActive] = useState(true);
  const [breakpointWidth, setBreakpointWidth] = useState<string | undefined>();

  // get a minWidth media query string for a given width
  const getMediaQuery = (width: string) => `(min-width: ${width})`;

  const updateMediaQueryActive = useCallback(() => {
    if (!window || !breakpointWidth) {
      setMediaQueryActive(true);
      return;
    }
    setMediaQueryActive(
      window.matchMedia(getMediaQuery(breakpointWidth)).matches
    );
  }, [breakpointWidth]);

  // Add a listener to the window.onResize event
  useEffect(() => {
    if (window && breakpoint) {
      window.addEventListener("resize", updateMediaQueryActive);
    }
    return () => {
      if (window) {
        window.removeEventListener("resize", updateMediaQueryActive);
      }
    };
  }, [breakpoint, breakpointWidth, updateMediaQueryActive]);

  // Run the check when the hook is used for the first time
  useEffect(() => {
    updateMediaQueryActive();
  }, [updateMediaQueryActive]);

  useEffect(() => {
    if (!TailwindConfig.theme.screens[breakpoint]) {
      console.debug(
        `Breakpoints ${breakpoint} is not defined in TailwindCSS config`
      );
      return;
    }
    setBreakpointWidth(TailwindConfig.theme.screens[breakpoint]);
  }, [breakpoint]);

  return mediaQueryActive;
};

export default useMedia;
