import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ Helper to get token (only client-side)
const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/consultations`;

const prepareHeaders = (headers: Headers) => {
  const token = getToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};

// ✅ Type definitions
export interface Consultation {
  _id: string;
  dentist: {
    _id: string;
    clinicName: string;
    specialization: string[];
    user: {
      name: string;
    };
  };
  user?: {
    _id: string;
    name: string;
    email: string;
  };
  patientName: string;
  patientEmail: string;
  patientPhone?: string;
  selectedDate: string;
  selectedSlot: string;
  message?: string;
  consultationFee?: number;
  paymentStatus: "Pending" | "Paid" | "Cancelled";
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

interface AddConsultationRequest {
  dentist: string;
  patientName: string;
  patientEmail: string;
  patientPhone?: string;
  selectedDate: string;
  selectedSlot: string;
  message?: string;
  consultationFee?: number;
}

export const consultationApi = createApi({
  reducerPath: "consultationApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  tagTypes: ["Consultations", "Consultation"],

  endpoints: (builder) => ({
    // ✅ Add new consultation
    addConsultation: builder.mutation<Consultation, AddConsultationRequest>({
      query: (data) => ({
        url: `/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Consultations"],
    }),

    // ✅ Get all consultations (Admin)
    getAllConsultations: builder.query<Consultation[], void>({
      query: () => `/`,
      providesTags: ["Consultations"],
      transformResponse: (response: { consultations: Consultation[] }) =>
        response.consultations,
    }),

    // ✅ Get logged-in user's consultations
    getMyConsultations: builder.query<Consultation[], void>({
      query: () => `/my`,
      providesTags: ["Consultations"],
      transformResponse: (response: { consultations: Consultation[] }) =>
        response.consultations,
    }),

    // ✅ Get single consultation by ID
    getConsultationById: builder.query<Consultation, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Consultation", id }],
      transformResponse: (response: { consultation: Consultation }) =>
        response.consultation,
    }),

    // ✅ Update consultation (details)
    updateConsultation: builder.mutation<
      Consultation,
      { id: string; data: Partial<Consultation> }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Consultations",
        { type: "Consultation", id },
      ],
    }),

    // ✅ Update consultation status
    updateConsultationStatus: builder.mutation<
      Consultation,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        "Consultations",
        { type: "Consultation", id },
      ],
    }),

    // ✅ Delete consultation (Admin)
    deleteConsultation: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "Consultations",
        { type: "Consultation", id },
      ],
    }),
  }),
});

// ✅ Export hooks
export const {
  useAddConsultationMutation,
  useGetAllConsultationsQuery,
  useGetMyConsultationsQuery,
  useGetConsultationByIdQuery,
  useUpdateConsultationMutation,
  useUpdateConsultationStatusMutation,
  useDeleteConsultationMutation,
} = consultationApi;
