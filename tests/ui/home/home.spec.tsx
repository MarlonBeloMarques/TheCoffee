import React from 'react';
import { render } from '@testing-library/react-native';
import { Home } from '~/presentation/screens';

describe('UI: Home', () => {
  test('should show list of options with success', () => {
    const { getByTestId } = render(<Home />);

    const optionsList = getByTestId('options_list_id');

    expect(optionsList).toBeTruthy();
  });
});
