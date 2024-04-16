import React from "react";
import { AppProps } from "next/app";
// Load Tailwind's CSS.
import "tailwindcss/tailwind.css";
// Load global CSS.
import "../styles/global.css";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";
import AuthenticationCTXProvider from "../contexts/AuthenticationContext/AuthenticationContext";
import RouteGuard from "../config/routing/RouteGuard";
import { fetcher } from "../config/api/api";
import NotificationCTXProvider from "../contexts/NotificationContext/NotificationContext";
import LoadingScreen from "../components/templates/LoadingScreen/LoadingScreen";
import UserStatusHandler from "../components/features/user-status-handler/UserStatusHandler";
import PageErrorBoundary from "../components/utilities/PageErrorBoundary";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingScreen />;
  }

  return (
    <PageErrorBoundary>
      <NotificationCTXProvider>
        <SWRConfig
          value={{
            fetcher,
          }}
        >
          <AuthenticationCTXProvider>
            <UserStatusHandler>
              <RouteGuard>
                <Component {...pageProps} />
              </RouteGuard>
            </UserStatusHandler>
          </AuthenticationCTXProvider>
        </SWRConfig>
      </NotificationCTXProvider>
    </PageErrorBoundary>
  );
};

export default App;
