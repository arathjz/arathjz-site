import { DefaultTheme } from 'styled-components';
import { Color } from './colors';

const commonTheme = {
  maxWidth: '1440px',
  fontSize: {
    mobile: {
      headingOne: '48px',
      headingTwo: '48px',
      headingThree: '48px',
      text: '24px',
      smallText: '14px',
      button: '16px',
      input: '20px',
    },
    regular: {
      headingOne: '90px',
      headingTwo: '80px',
      headingThree: '72px',
      text: '24px',
      smallText: '14px',
      button: '16px',
      input: '20px',
    },
  },
};

const footer = {
  background: Color.DarkGray,
  primary: Color.White,
  text: Color.DirtyWhite,
  borderColor: Color.SoftGray,
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
