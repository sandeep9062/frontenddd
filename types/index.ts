export interface PharmaBrandPayload {
  brandName: string;
  OwnerName: string;
  email: string;
  phoneNumber: string;
  alternativeNumber?: string;
  websiteURL: string;
}

export interface PharmaBrand extends PharmaBrandPayload {
  _id: string;
}
