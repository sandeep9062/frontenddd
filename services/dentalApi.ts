import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';

export const registerDentalPractitioner = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_URL}/api/dental-registrations`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
