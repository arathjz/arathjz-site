import { Color } from './colors';

const footer = {
  background: Color.DarkGray,
  heading: Color.White,
  text: Color.DirtyWhite,
  border: Color.DirtyWhite,
};

export const lightTheme = {
  primary: Color.White,
  secondary: Color.White,
  heading: Color.DarkGray,
  text: Color.SoftGray,
  footer,
};

export const darkTheme = {
  primary: Color.DarkGray,
  secondary: Color.SoftGray,
  heading: Color.White,
  text: Color.DirtyWhite,
  footer,
};
