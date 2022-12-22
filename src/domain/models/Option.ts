type Option = {
  id: string;
  option: string;
  list: Array<Coffee>;
};

type Coffee = {
  id: string;
  coffeeName: string;
  coffeeImage: string;
  coffeePrice: number;
  optionId: string;
};

export default Option;
