import { DefaultTheme } from 'styled-components';
import { Color } from './colors';

const commonTheme = {
  maxWidth: '1440px',
  fontSize: {
    mobile: {
      footerHeading: '40px',
      headingOne: '32px',
      headingTwo: '40px',
      text: '24px',
      smallText: '14px',
      button: '16px',
      input: '20px',
    },
    regular: {
      footerHeading: '80px',
      headingOne: '48px',
      headingTwo: '64px',
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
