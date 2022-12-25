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
          coffeeName: 'Iced Latte',
          coffeeImage: CoffeeImage2,
          coffeePrice: 12.0,
          optionId: '1',
        },
        {
          id: '3',
          coffeeName: 'Iced Latte',
          coffeeImage: CoffeeImage3,
          coffeePrice: 12.0,
          optionId: '1',
        },
        {
          id: '4',
          coffeeName: 'Iced Latte',
          coffeeImage: CoffeeImage4,
          coffeePrice: 12.0,
          optionId: '1',
        },
        {
          id: '5',
          coffeeName: 'Iced Latte',
          coffeeImage: CoffeeImage5,
          coffeePrice: 12.0,
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
