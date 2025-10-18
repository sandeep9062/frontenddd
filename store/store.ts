// store/store.ts
import { configureStore } from "@reduxjs/toolkit";

import { blogsApi } from "@/services/blogsApi";
import { projectApi } from "@/services/projectsApi";
import { websiteImagesApi } from "@/services/websiteImagesApi";
import { siteSettingsApi } from "@/services/siteSettingsApi";
import { contactApi } from "@/services/contactApi";
import { maldoApi } from "@/services/maldoApi";

import { productsApi } from "./../services/productsApi";
import { testimonialsApi } from "@/services/testimonialsApi";
import { servicesApi } from "@/services/servicesApi";
import { clinicApi } from "@/services/clinicApi";
import { cbctOpgLabsApi } from "@/services/cbctOpgLabs";
import authReducer from "./authSlice";






const store = configureStore({
  reducer: {
    [projectApi.reducerPath]: projectApi.reducer,
    [websiteImagesApi.reducerPath]: websiteImagesApi.reducer,
    [siteSettingsApi.reducerPath]: siteSettingsApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [maldoApi.reducerPath]: maldoApi.reducer,
    [blogsApi.reducerPath]: blogsApi.reducer,
    
    [productsApi.reducerPath]: productsApi.reducer,
    [testimonialsApi.reducerPath]: testimonialsApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [clinicApi.reducerPath]: clinicApi.reducer,
    [cbctOpgLabsApi.reducerPath]: cbctOpgLabsApi.reducer,
    auth: authReducer,





  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      projectApi.middleware,
      websiteImagesApi.middleware,
      siteSettingsApi.middleware,
      contactApi.middleware,
      maldoApi.middleware,
      blogsApi.middleware,
      testimonialsApi.middleware,
      
      productsApi.middleware,
      servicesApi.middleware,
      clinicApi.middleware,
      cbctOpgLabsApi.middleware,
    ]),
  devTools: process.env.NODE_ENV !== "production", // ✅ enable Redux DevTools in development
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
