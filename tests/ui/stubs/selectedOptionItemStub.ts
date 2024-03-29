import { Product } from '../../../src/presentation/viewModels/model/homeViewModel';

const getSelectedOptionItemStub = (id = ''): Product => {
  return {
    id,
    productName: '',
    productPrice: 0,
    productImage: 'any_coffee_image.png',
    optionId: '',
  };
};

export default getSelectedOptionItemStub;
