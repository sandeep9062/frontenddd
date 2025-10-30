import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/fix-my-teeth`;

const prepareHeaders = (headers: Headers) => {
  const token = getToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};

interface TeethProblems {
  [key: string]: boolean;
}

export interface FixMyTeethSubmission {
  _id: string;
  selectedType: "adult" | "kid";
  name: string;
  email: string;
  status: string;
  teethProblems: TeethProblems;
  otherProblemText: string;
  selectedState: string;
  photos: string[];
  createdAt: string;
}

export const fixMyTeethApi = createApi({
  reducerPath: "fixMyTeethApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  tagTypes: ["FixMyTeeth"],
  endpoints: (builder) => ({
    getMyFixMyTeethSubmissions: builder.query<FixMyTeethSubmission[], void>({
      query: () => "/my",
      providesTags: ["FixMyTeeth"],
      transformResponse: (response: { submissions: FixMyTeethSubmission[] }) =>
        response.submissions,
    }),
    submitFixMyTeethCase: builder.mutation<{ success: boolean; message: string }, FormData>({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["FixMyTeeth"],
    }),
  }),
});

export const { useGetMyFixMyTeethSubmissionsQuery, useSubmitFixMyTeethCaseMutation } = fixMyTeethApi;
