import api from "../lib/axios";
import { AxiosError } from "axios";

interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
}

export const submitContactUs = async (
  formData: ContactForm
): Promise<ApiResponse> => {
  try {
    const response = await api.post("/v1/support/contact-us", formData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.isAxiosError) {
      const serverError = axiosError.response?.data as { message?: string };
      return {
        success: false,
        message: serverError?.message || "An unknown server error occurred.",
      };
    }
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
};
