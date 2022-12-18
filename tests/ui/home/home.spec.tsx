import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Home } from '~/presentation/screens';

describe('UI: Home', () => {
  test('should show options list component successfully', () => {
    const { getByTestId } = render(
      <Home
        listOfOptions={[]}
        selectOption={() => {}}
        optionSelected={{ id: '1', option: 'coffee' }}
        optionList={[]}
        selectedOptionItem={{
          id: '',
          coffeeName: '',
          coffeeImage: '',
          coffeePrice: 0,
        }}
      />,
    );

    const optionsList = getByTestId('options_list_id');

    expect(optionsList).toBeTruthy();
  });

  test('should show options of list with success', () => {
    const optionsList = [
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
    const { getByTestId } = render(
      <Home
        listOfOptions={optionsList}
        selectOption={() => {}}
        optionSelected={{ id: '1', option: 'coffee' }}
        optionList={[]}
        selectedOptionItem={{
          id: '',
          coffeeName: '',
          coffeeImage: '',
          coffeePrice: 0,
        }}
      />,
    );

    optionsList.forEach((optionByList) => {
      const option = getByTestId(`option_${optionByList.id}_id`);
      expect(option.props.children).toEqual(optionByList.option);
    });

    expect(optionsList).toBeTruthy();
  });

  test('should press the second option from the list successfully', () => {
    const selectOption = jest.fn();
    const optionsList = [
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
    const { getByTestId } = render(
      <Home
        listOfOptions={optionsList}
        selectOption={selectOption}
        optionSelected={{ id: '1', option: 'coffee' }}
        optionList={[]}
        selectedOptionItem={{
          id: '',
          coffeeName: '',
          coffeeImage: '',
          coffeePrice: 0,
        }}
      />,
    );

    const optionSelected = getByTestId(`option_2_id`);

    fireEvent.press(optionSelected);

    expect(selectOption).toHaveBeenCalledTimes(1);
    expect(selectOption).toHaveBeenCalledWith(optionsList[1]);
  });

  test('should show underline of option selected with success', async () => {
    const optionSelected = { id: '2', option: 'products' };

    const optionsList = [
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
    const { getByTestId, queryByTestId } = render(
      <Home
        listOfOptions={optionsList}
        selectOption={() => {}}
        optionSelected={optionSelected}
        optionList={[]}
        selectedOptionItem={{
          id: '',
          coffeeName: '',
          coffeeImage: '',
          coffeePrice: 0,
        }}
      />,
    );

    const underlineOptionSelected = getByTestId(`underline_option_2_id`);
    const underlineOptionOther = queryByTestId(`underline_option_1_id`);

    expect(underlineOptionSelected).toBeTruthy();
    expect(underlineOptionOther).not.toBeTruthy();
  });

  test('should show coffees list component with success', async () => {
    const { getByTestId } = render(
      <Home
        listOfOptions={[]}
        selectOption={() => {}}
        optionSelected={{ id: '1', option: 'coffee' }}
        optionList={[
          {
            id: '1',
            coffeeName: 'Iced Latte',
            coffeeImage: 'any_coffee_image.png',
            coffeePrice: 0,
            optionId: '1',
          },
        ]}
        selectedOptionItem={{
          id: '',
          coffeeName: '',
          coffeeImage: '',
          coffeePrice: 0,
        }}
      />,
    );

    const coffeesList = getByTestId('option_list_id');

    expect(coffeesList).toBeTruthy();
  });

  test('should show images coffee with success', async () => {
    const coffeesList = [
      {
        id: '1',
        coffeeName: 'Iced Latte',
        coffeeImage: 'any_coffee_image.png',
        coffeePrice: 0,
        optionId: '1',
      },
    ];
    const { getByTestId } = render(
      <Home
        listOfOptions={[]}
        selectOption={() => {}}
        optionSelected={{ id: '1', option: 'coffee' }}
        optionList={coffeesList}
        selectedOptionItem={{
          id: '',
          coffeeName: '',
          coffeeImage: '',
          coffeePrice: 0,
        }}
      />,
    );

    coffeesList.forEach(({ coffeeImage, id }) => {
      const coffee = getByTestId(`coffee_image_${id}_id`);
      expect(coffee.type).toEqual('Image');
      expect(coffee.props.source).toEqual({ uri: coffeeImage });
    });
  });

  test('should show price of coffee in correct pattern', () => {
    const coffeesList = [
      {
        id: '1',
        coffeeName: 'Iced Latte',
        coffeePrice: 12.0,
        coffeeImage: 'any_coffee_image.png',
        optionId: '1',
      },
    ];
    const { getByTestId } = render(
      <Home
        listOfOptions={[]}
        selectOption={() => {}}
        optionSelected={{ id: '1', option: 'coffee' }}
        optionList={coffeesList}
        selectedOptionItem={coffeesList[0]}
      />,
    );

    const coffeePrice = getByTestId('coffee_price_id');

    expect(coffeePrice.props.children).toEqual(
      `R$ ${coffeesList[0].coffeePrice.toFixed(2)}`,
    );
  });

  test('should not show coffees list if optionList is empty', () => {
    const { queryByTestId } = render(
      <Home
        listOfOptions={[]}
        selectOption={() => {}}
        optionSelected={{ id: '1', option: 'coffee' }}
        optionList={[]}
        selectedOptionItem={{
          id: '',
          coffeeName: '',
          coffeePrice: 0,
          coffeeImage: '',
        }}
      />,
    );

    const coffeesList = queryByTestId('option_list_id');

    expect(coffeesList).not.toBeTruthy();
  });

  test('should show message of option list empty', () => {
    const { getByTestId } = render(
      <Home
        listOfOptions={[]}
        selectOption={() => {}}
        optionSelected={{ id: '1', option: 'coffee' }}
        optionList={[]}
        selectedOptionItem={{
          id: '',
          coffeeName: '',
          coffeePrice: 0,
          coffeeImage: '',
        }}
      />,
    );

    const messageOptionListEmpty = getByTestId('message_option_list_empty_id');

    expect(messageOptionListEmpty).toBeTruthy();
    expect(messageOptionListEmpty.props.children).toEqual(
      "looks like we're out of products",
    );
  });

  test('should show button for try again when option list is empty', () => {
    const { getByTestId } = render(
      <Home
        listOfOptions={[]}
        selectOption={() => {}}
        optionSelected={{ id: '1', option: 'coffee' }}
        optionList={[]}
        selectedOptionItem={{
          id: '',
          coffeeName: '',
          coffeePrice: 0,
          coffeeImage: '',
        }}
      />,
    );

    const buttonTryAgain = getByTestId('button_try_again_id');

    expect(buttonTryAgain).toBeTruthy();
    expect(buttonTryAgain.props.children).toEqual('try again another time');
  });
});
