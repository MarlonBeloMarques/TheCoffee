const getListOfOptionsFake = () => {
  return [
    {
      id: '1',
      option: 'coffee',
      list: [
        {
          id: '1',
          coffeeName: 'Iced Latte',
          coffeeImage: 'any_coffee_image.png',
          coffeePrice: 0,
          optionId: '1',
        },
        {
          id: '2',
          coffeeName: 'Mocha',
          coffeeImage: 'any_coffee_image.png',
          coffeePrice: 0,
          optionId: '1',
        },
      ],
    },
    {
      id: '2',
      option: 'products',
      list: [],
    },
    {
      id: '3',
      option: 'food',
      list: [],
    },
  ];
};

export default getListOfOptionsFake;
