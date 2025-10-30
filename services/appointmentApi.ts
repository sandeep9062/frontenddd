import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Appointment } from "@/types/Appointment";

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/appointments`,
    prepareHeaders: (headers) => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // ✅ Simplified: fetch appointments for the logged-in user using token
    getMyAppointment: builder.query<Appointment[], void>({
      query: () => "/my-appointments",
    }),
  }),
});

export const { useGetMyAppointmentQuery } = appointmentApi;
