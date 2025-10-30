export interface Appointment {
  _id: string;
  fullName: string;
  mobileNumber: string;
  clinicId: string;
  serviceType: string;
  clinicName: string;
  clinicSpecialities: string[];
  clinicLocation: string;
  appointmentDate: string;
  timeSlot: string;
  clinicPhone?: string;
  clinicWebsite?: string;
  clinicOffers?: string;
  clinicCharges?: number;
  rating?: number;
  review?: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  createdAt: string;
  updatedAt: string;
}
