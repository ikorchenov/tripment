import { ReactNode } from 'react';
import { SearchItem } from './api';

export type SelectOption = {
  value: string;
  label: string;
  children?: ReactNode;
};

export type FilterDataItem = SelectOption & {
  icon?: string;
  count: number;
};

export type SearchItemWithMeta = SearchItem & {
  meta: {
    available: number;
    isPediatric: boolean;
  };
};
