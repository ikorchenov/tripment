import { SearchItemWithMeta } from 'types';
import { SearchItem } from 'types/api';

export const mapSearchResult = (items: SearchItem[]): SearchItemWithMeta[] =>
  items.map((item) => ({
    ...item,
    meta: {
      available: Math.min(
        ...[new Date(item.offline_available).valueOf(), new Date(item.telehealth_available).valueOf()],
      ),
      isPediatric: /pediatric/i.test(item.speciality),
    },
  }));
