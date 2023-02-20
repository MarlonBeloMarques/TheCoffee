import { Coffee } from '../../../src/presentation/screens/home/model';

const getSelectedOptionItemStub = (): Coffee => {
  return {
    id: '',
    coffeeName: '',
    coffeePrice: 0,
    coffeeImage: '',
    optionId: '',
  };
};

export default getSelectedOptionItemStub;
