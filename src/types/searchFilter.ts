export type FilterFormData = {
  availabilityByDate: string[];
  availability: string[];
  speciality: string[];
  insurance: string[];
  sort: 'availability' | 'experience';
  noInsurance: boolean;
};
