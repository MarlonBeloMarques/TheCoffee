import { Coffee } from '../../../src/presentation/viewModels/model/homeViewModel';

const getSelectedOptionItemStub = (): Coffee => {
  return {
    id: '',
    coffeeName: '',
    coffeePrice: 0,
    coffeeImage: 'any_coffee_image.png',
    optionId: '',
  };
};

export default getSelectedOptionItemStub;
