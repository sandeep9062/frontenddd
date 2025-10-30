export interface CbctOpgLab {
  _id: string;
  name: string;
  state: string;
  location: string;
  rating: number;
  bookUrl?: string; appointmentCharges: number; offers?: string[];
  website?: string;
  whatsapp?: string;
  mapUrl?: string;
  img?: string;
  isActive: boolean;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}
