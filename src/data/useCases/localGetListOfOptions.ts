import { Option } from '~/domain/models';
import { GetListOfOptions } from '~/domain/useCases';

export default class LocalGetListOfOptions implements GetListOfOptions {
  get(): Promise<Option[]> {
    return Promise.resolve(makeListOfOptions());
  }
}

export const makeListOfOptions = () => {
  return [
    {
      id: '1',
      option: 'Coffee',
      list: [],
    },
    {
      id: '2',
      option: 'Product',
      list: [],
    },
    {
      id: '3',
      option: 'Food',
      list: [],
    },
  ];
};
