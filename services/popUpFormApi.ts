import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/popup-form`;

export const popUpFormApi = createApi({
  reducerPath: "popUpFormApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ["PopUpForm"],
  endpoints: (builder) => ({
    addPopUpForm: builder.mutation<void, FormData>({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
      }),
      invalidatesTags: ["PopUpForm"],
    }),
  }),
});

export const { useAddPopUpFormMutation } = popUpFormApi;
