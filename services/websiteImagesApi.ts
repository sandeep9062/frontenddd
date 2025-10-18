import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Helper to get token from localStorage
const getToken = () => localStorage.getItem("token");

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/website-images`;
const prepareHeaders = (headers: Headers) => {
  const token = getToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  // Don't set Content-Type here; let the browser handle it for FormData
  return headers;
};

export const websiteImagesApi = createApi({
  reducerPath: "websiteImagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  tagTypes: ["WebsiteImages"],
  endpoints: (builder) => ({
    // GET all website images
    getWebsiteImages: builder.query<any, void>({
      query: () => `/`,
      providesTags: ["WebsiteImages"],
    }),

    // GET single website image by ID
    getWebsiteImageById: builder.query<any, string>({
      query: (id) => `/${id}`,
      providesTags: ["WebsiteImages"],
    }),

    // POST new website image
    addWebsiteImage: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["WebsiteImages"],
    }),

    // UPDATE website image
    updateWebsiteImage: builder.mutation<
      any,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["WebsiteImages"],
    }),

    // DELETE website image
    deleteWebsiteImage: builder.mutation<any, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WebsiteImages"],
    }),
  }),
});

// Export hooks
export const {
  useGetWebsiteImagesQuery,
  useGetWebsiteImageByIdQuery,
  useAddWebsiteImageMutation,
  useUpdateWebsiteImageMutation,
  useDeleteWebsiteImageMutation,
} = websiteImagesApi;
