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
  location: string;
  state: string;
  rating: number;
  problems: [string];
  bookUrl: string;
  website: string;
  whatsapp: string;
  mapUrl: string;
  img: string;
  user: User;
}
