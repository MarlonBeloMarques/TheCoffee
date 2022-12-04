import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Home } from '~/presentation/screens';

describe('UI: Home', () => {
  test('should show options list component successfully', () => {
    const { getByTestId } = render(
      <Home
        optionsList={[]}
        selectOption={() => {}}
        optionSelected={{ id: '1', option: 'coffee' }}
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
      },
      {
        id: '2',
        option: 'products',
      },
      {
        id: '3',
        option: 'food',
      },
    ];
    const { getByTestId } = render(
      <Home
        optionsList={optionsList}
        selectOption={() => {}}
        optionSelected={{ id: '1', option: 'coffee' }}
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
      },
      {
        id: '2',
        option: 'products',
      },
      {
        id: '3',
        option: 'food',
      },
    ];
    const { getByTestId } = render(
      <Home
        optionsList={optionsList}
        selectOption={selectOption}
        optionSelected={{ id: '1', option: 'coffee' }}
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
      },
      {
        id: '2',
        option: 'products',
      },
      {
        id: '3',
        option: 'food',
      },
    ];
    const { getByTestId, queryByTestId } = render(
      <Home
        optionsList={optionsList}
        selectOption={() => {}}
        optionSelected={optionSelected}
      />,
    );

    const underlineOptionSelected = getByTestId(`underline_option_2_id`);
    const underlineOptionOther = queryByTestId(`underline_option_1_id`);

    expect(underlineOptionSelected).toBeTruthy();
    expect(underlineOptionOther).not.toBeTruthy();
  });
});
