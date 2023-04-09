import { Option } from '~/domain/models';

const getListOfOptionsFake = (): Option[] => {
  return [
    {
      id: '1',
      option: 'coffee',
      list: [
        {
          id: '1',
          productName: 'Iced Latte',
          productImage: 'any_coffee_image.png',
          productPrice: 0,
          optionId: '1',
        },
        {
          id: '2',
          productName: 'Mocha',
          productImage: 'any_coffee_image.png',
          productPrice: 0,
          optionId: '1',
        },
      ],
      emptyMessage: "looks like we're out of coffee",
    },
    {
      id: '2',
      option: 'products',
      list: [],
      emptyMessage: "looks like we're out of products",
    },
    {
      id: '3',
      option: 'food',
      list: [],
      emptyMessage: "looks like we're out of food",
    },
  ];
};

export default getListOfOptionsFake;
