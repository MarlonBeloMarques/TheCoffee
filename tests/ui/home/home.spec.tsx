import React from 'react';
import { render } from '@testing-library/react-native';
import { Home } from '~/presentation/screens';

describe('UI: Home', () => {
  test('should show options list component successfully', () => {
    const { getByTestId } = render(<Home optionsList={[]} />);

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
    const { getByTestId } = render(<Home optionsList={optionsList} />);

    optionsList.forEach((optionByList) => {
      const option = getByTestId(`option_${optionByList.id}_id`);
      expect(option.props.children).toEqual(optionByList.option);
    });

    expect(optionsList).toBeTruthy();
  });
});
