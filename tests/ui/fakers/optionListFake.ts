import { Product } from '../../../src/presentation/viewModels/model/homeViewModel';

const getOptionListFake = (): Array<Product> => {
  return [
    {
      id: '1',
      productName: 'Iced Latte',
      productImage: 'any_coffee_image.png',
      productPrice: 0,
      optionId: '1',
    },
    {
      id: '2',
      productName: 'Iced Latte',
      productImage: 'any_coffee_image.png',
      productPrice: 0,
      optionId: '1',
    },
    {
      id: '3',
      productName: 'Iced Latte',
      productImage: 'any_coffee_image.png',
      productPrice: 0,
      optionId: '1',
    },
  ];
};

export default getOptionListFake;
