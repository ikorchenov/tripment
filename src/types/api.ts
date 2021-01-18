export type Response<D> = {
  data: D;
  success: boolean;
};

export type SearchItem = {
  id: number;
  name: string;
  speciality: string;
  experience: number;
  gender: 'Male' | 'Female';
  reviewsCount: number;
  acceptNew: boolean;
  address: string;
  insurances: string;
  telehealth: boolean;
  telehealth_available: string;
  offline_available: string;
  price: number;
};

export type Data = {
  items: SearchItem[];
};
