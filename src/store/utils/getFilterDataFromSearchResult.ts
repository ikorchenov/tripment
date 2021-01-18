import moment from 'moment';
import { SearchItemWithMeta } from 'types';

type CountMap = { [key: string]: number };

type TmpData = {
  map: CountMap;
  values: string[];
};

const getFilterDataFromTmp = ({ values, map }: TmpData) => {
  return values
    .filter((value) => value)
    .map((value) => ({
      value,
      label: value,
      count: map[value],
    }));
};

export const getFilterDataFromSearchResult = (items: SearchItemWithMeta[]) => {
  const specialityData: TmpData = { map: {}, values: [] };
  const insuranceData: TmpData = { map: {}, values: [] };

  const availabilityByDateMap: CountMap = {
    0: 0,
    3: 0,
    14: 0,
  };

  const availabilityMap: CountMap = {
    telehealth: 0,
    acceptNew: 0,
    pediatric: 0,
  };

  for (let i = 0; i < items.length; i++) {
    const { speciality, insurances, telehealth, acceptNew, meta } = items[i];

    if (specialityData.map[speciality]) {
      specialityData.map[speciality]++;
    } else {
      specialityData.map[speciality] = 1;
      specialityData.values.push(speciality);
    }

    if (insuranceData.map[insurances]) {
      insuranceData.map[insurances]++;
    } else {
      insuranceData.map[insurances] = 1;
      insuranceData.values.push(insurances);
    }

    Object.keys(availabilityByDateMap).forEach((key) => {
      const date = moment().add(parseInt(key), 'days').valueOf();

      if (meta.available <= date) {
        availabilityByDateMap[key]++;
      }
    });

    if (telehealth) {
      availabilityMap.telehealth++;
    }

    if (acceptNew) {
      availabilityMap.acceptNew++;
    }

    if (meta.isPediatric) {
      availabilityMap.pediatric++;
    }
  }

  return {
    speciality: getFilterDataFromTmp(specialityData),
    insurance: getFilterDataFromTmp(insuranceData),
    availabilityByDate: [
      {
        value: '0',
        count: availabilityByDateMap[0],
        label: 'Today',
      },
      {
        value: '3',
        count: availabilityByDateMap[3],
        label: 'Next 3 days',
      },
      {
        value: '14',
        count: availabilityByDateMap[14],
        label: 'Next 2 weeks',
      },
    ],
    availability: [
      {
        value: 'telehealth',
        count: availabilityMap.telehealth,
        label: 'Telehealth',
        icon: 'video',
      },
      {
        value: 'acceptNew',
        count: availabilityMap.acceptNew,
        label: 'Accepts new patients',
      },
      {
        value: 'pediatric',
        count: availabilityMap.pediatric,
        label: 'Treats сhildren',
      },
    ],
  };
};
