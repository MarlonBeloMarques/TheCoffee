import React from 'react';
import { render } from '@testing-library/react-native';
import { Welcome } from '~/presentation/screens';

describe('UI: Welcome', () => {
  test('should show video component with success', () => {
    const { getByTestId } = render(<Welcome />);

    const videoComponent = getByTestId('video_id');

    expect(videoComponent).toBeTruthy();
  });
});
