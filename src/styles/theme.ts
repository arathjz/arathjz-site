import { DefaultTheme } from 'styled-components';
import { Color } from './colors';

const commonTheme = {
  maxWidth: '1440px',
};

const footer = {
  background: Color.DarkGray,
  heading: Color.White,
  text: Color.DirtyWhite,
  borderColor: Color.DirtyWhite,
};

export const lightTheme: DefaultTheme = {
  colors: {
    primary: Color.White,
    secondary: Color.White,
    heading: Color.DarkGray,
    text: Color.SoftGray,
    footer,
  },
  ...commonTheme,
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: Color.DarkGray,
    secondary: Color.SoftGray,
    heading: Color.White,
    text: Color.DirtyWhite,
    footer,
  },
  ...commonTheme,
};
