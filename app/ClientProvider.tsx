"use client";

import { Provider } from "react-redux";
import store from "@/store/store";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <Provider store={store}>
          {children}
          <Toaster position="bottom-center" />
        </Provider>
      </GoogleOAuthProvider>
    </I18nextProvider>
  );
}
