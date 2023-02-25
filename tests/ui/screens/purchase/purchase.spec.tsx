import React from 'react';
import { render } from '@testing-library/react-native';
import getSelectedOptionItemStub from '../../../ui/stubs/selectedOptionItemStub';
import Purchase from '../../../../src/presentation/screens/purchase';

describe('UI: Purchase', () => {
  test('should show coffee name with success', () => {
    const coffee = getSelectedOptionItemStub();
    const { getByTestId } = render(<Purchase coffeeSelected={coffee} />);
    const coffeeName = getByTestId('coffee_name_id');
    expect(coffeeName.props.children).toEqual(coffee.coffeeName);
  });
});
