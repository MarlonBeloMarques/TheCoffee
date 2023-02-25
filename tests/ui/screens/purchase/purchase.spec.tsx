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

  test('should show price of coffee in correct pattern', () => {
    const coffee = getSelectedOptionItemStub();
    const { getByTestId } = render(<Purchase coffeeSelected={coffee} />);
    const coffeePrice = getByTestId('coffee_price_id');
    expect(coffeePrice.props.children).toEqual(
      `R$ ${coffee.coffeePrice.toFixed(2)}`,
    );
  });

  test('should show image of coffee with success', () => {
    const coffee = getSelectedOptionItemStub();
    const { getByTestId } = render(<Purchase coffeeSelected={coffee} />);
    const coffeeImage = getByTestId('coffee_image_id');
    expect(coffeeImage.type).toEqual('Image');
    expect(coffeeImage.props.source).toEqual(coffee.coffeeImage);
  });
});
