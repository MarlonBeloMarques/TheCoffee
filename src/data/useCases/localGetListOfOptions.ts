import { Option } from '~/domain/models';
import { GetListOfOptions } from '~/domain/useCases';
import {
  CoffeeImage1,
  CoffeeImage2,
  CoffeeImage3,
  CoffeeImage4,
  CoffeeImage5,
} from '~/presentation/assets/images';

export default class LocalGetListOfOptions implements GetListOfOptions {
  get(): Promise<Option[]> {
    return Promise.resolve(makeListOfOptions());
  }
}

export const makeListOfOptions = (): Option[] => {
  return [
    {
      id: '1',
      option: 'Coffee',
      list: [
        {
          id: '1',
          productName: 'Iced Latte',
          productImage: CoffeeImage1,
          productPrice: 12.0,
          optionId: '1',
        },
        {
          id: '2',
          productName: 'Chai Latte',
          productImage: CoffeeImage2,
          productPrice: 12.6,
          optionId: '1',
        },
        {
          id: '3',
          productName: 'True White',
          productImage: CoffeeImage3,
          productPrice: 11.5,
          optionId: '1',
        },
        {
          id: '4',
          productName: 'Chai Iced Latte',
          productImage: CoffeeImage4,
          productPrice: 15.9,
          optionId: '1',
        },
        {
          id: '5',
          productName: 'Americano',
          productImage: CoffeeImage5,
          productPrice: 9.3,
          optionId: '1',
        },
      ],
      emptyMessage: `looks like we're out of coffee`,
    },
    {
      id: '2',
      option: 'Product',
      list: [],
      emptyMessage: `looks like we're out of product`,
    },
    {
      id: '3',
      option: 'Food',
      list: [],
      emptyMessage: `looks like we're out of food`,
    },
  ];
};
