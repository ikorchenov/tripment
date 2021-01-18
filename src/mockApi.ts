import { Data, Response } from 'types/api';
import data from './data.json';

export const mockApi = (): Promise<Response<Data>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data as Response<Data>);
    }, 300);
  });
};
