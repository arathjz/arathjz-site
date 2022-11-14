import 'styled-components';

interface Colors {
  primary: string;
  secondary: string;
  heading: string;
  text: string;
  footer: {
    background: string;
    primary: string;
    text: string;
    borderColor: string;
  };
}

interface BaseFontSize {
  footerHeading: string;
  headingOne: string;
  headingTwo: string;
  text: string;
  smallText: string;
  input: string;
  button: string;
}

interface FontSize {
  regular: BaseFontSize;
  mobile: BaseFontSize;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    maxWidth: string;
    fontSize: FontSize;
    colors: Colors;
  }
}
