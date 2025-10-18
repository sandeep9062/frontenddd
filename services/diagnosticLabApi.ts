import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';

interface DiagnosticLabForm {
  labName: string;
  ownerName: string;
  email: string;
  phone: string;
  altPhone: string;
  website: string;
  address: string;
  servicesOffered: string;
  agreeDisclaimer: boolean;
  image?: File | null;
}

export const registerDiagnosticLab = async (formData: DiagnosticLabForm) => {
  try {
    const response = await axios.post(`${API_URL}/diagnostic-lab-register/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error registering diagnostic lab:', error);
    throw error;
  }
};
