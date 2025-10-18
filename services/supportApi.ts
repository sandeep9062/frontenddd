import axios, { AxiosError } from "axios";

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
    const response = await axios.post("/api/v1/support/contact-us", formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error.response?.data as { message?: string };
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
