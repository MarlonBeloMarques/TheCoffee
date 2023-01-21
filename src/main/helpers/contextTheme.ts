import { Theme } from '@react-navigation/native';
import { colors } from '~/presentation/themes';

const contextTheme: Theme = {
  dark: false,
  colors: {
    primary: colors.primary,
    background: colors.white,
    card: colors.white,
    text: colors.text,
    border: colors.primary,
    notification: colors.primary,
  },
};

export default contextTheme;
