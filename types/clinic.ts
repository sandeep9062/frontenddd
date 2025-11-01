interface DentistProfile {
  problems: string[];
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  profile: DentistProfile;
}

export interface Clinic {
  _id: string;
  name: string;
  description: string;
  images?: string[];
  img?: string;
  location: string;
  state: string;
  rating: number;
  appointmentCharges: number;
  problems: string[];
  offers: string[];
  bookUrl: string;
  website: string;
  whatsapp: string;
  instagram: string;
  mapUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
