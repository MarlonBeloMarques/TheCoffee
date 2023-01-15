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

export const makeListOfOptions = () => {
  return [
    {
      id: '1',
      option: 'Coffee',
      list: [
        {
          id: '1',
          coffeeName: 'Iced Latte',
          coffeeImage: CoffeeImage1,
          coffeePrice: 12.0,
          optionId: '1',
        },
        {
          id: '2',
          coffeeName: 'Chai Latte',
          coffeeImage: CoffeeImage2,
          coffeePrice: 12.6,
          optionId: '1',
        },
        {
          id: '3',
          coffeeName: 'True White',
          coffeeImage: CoffeeImage3,
          coffeePrice: 11.5,
          optionId: '1',
        },
        {
          id: '4',
          coffeeName: 'Chai Iced Latte',
          coffeeImage: CoffeeImage4,
          coffeePrice: 15.9,
          optionId: '1',
        },
        {
          id: '5',
          coffeeName: 'Americano',
          coffeeImage: CoffeeImage5,
          coffeePrice: 9.3,
          optionId: '1',
        },
      ],
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
