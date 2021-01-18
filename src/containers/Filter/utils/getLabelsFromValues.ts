import { FilterDataItem } from 'types';

export const getLabelsFromValues = (items: FilterDataItem[], values: string[]) => {
  return items.filter(({ value }) => values.includes(value)).map(({ label }) => label);
};
