
// store/store.ts
import { configureStore } from "@reduxjs/toolkit";

import { blogsApi } from "@/services/blogsApi";

import { websiteImagesApi } from "@/services/websiteImagesApi";
import { siteSettingsApi } from "@/services/siteSettingsApi";
import { contactApi } from "@/services/contactApi";


import { plansApi } from "@/services/plansApi";
import { popUpFormApi } from "@/services/popUpFormApi";

import { testimonialsApi } from "@/services/testimonialsApi";
import { servicesApi } from "@/services/servicesApi";
import { clinicApi } from "@/services/clinicApi";
import { cbctOpgLabsApi } from "@/services/cbctOpgLabs";
import { productsApi } from "@/services/productsApi";
import authReducer from "./authSlice";
import { consultationApi } from "@/services/consultationApi";
import { fixMyTeethApi } from "@/services/fixMyTeethApi";
import { userApi } from "@/services/userApi";
import { appointmentApi } from "@/services/appointmentApi";





const store = configureStore({
  reducer: {

    [websiteImagesApi.reducerPath]: websiteImagesApi.reducer,
    [siteSettingsApi.reducerPath]: siteSettingsApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [popUpFormApi.reducerPath]: popUpFormApi.reducer,
    [blogsApi.reducerPath]: blogsApi.reducer,
    [plansApi.reducerPath]: plansApi.reducer,
    [consultationApi.reducerPath]: consultationApi.reducer,
    [testimonialsApi.reducerPath]: testimonialsApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [clinicApi.reducerPath]: clinicApi.reducer,
    [cbctOpgLabsApi.reducerPath]: cbctOpgLabsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [fixMyTeethApi.reducerPath]: fixMyTeethApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,





    auth: authReducer,





  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      consultationApi.middleware,
      websiteImagesApi.middleware,
      siteSettingsApi.middleware,
      contactApi.middleware,
      popUpFormApi.middleware,
      blogsApi.middleware,
      testimonialsApi.middleware,

      plansApi.middleware,
appointmentApi.middleware,
      servicesApi.middleware,
      clinicApi.middleware,
      cbctOpgLabsApi.middleware,
      productsApi.middleware,
      fixMyTeethApi.middleware,
      userApi.middleware,
    ]),
  devTools: process.env.NODE_ENV !== "production", // ✅ enable Redux DevTools in development
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
