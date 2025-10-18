export interface Clinic {
  _id?: string;
  id?: string;
  Name?: string;
  name?: string;
  Image?: string;
  image?: string;
  City?: string;
  city?: string;
  State?: string;
  state?: string;
  Address?: string;
  address?: string;
  Rating?: number | string;
  rating?: number | string;
  Fee?: number | string;
  fee?: number | string;
  Description?: string;
  doctorProfile?: string;
  Services?: string;
  services?: string;
  DoctorImage?: string;
  Specialty?: string;
}

export interface Story {
  recommend: boolean | null;
  problem: string;
  waitTime: string;
  improvements: string[];
  experience: string;
  name: string;
  phone: string;
  anonymous: boolean;
}
