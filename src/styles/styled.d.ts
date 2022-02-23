import 'styled-components';

interface Colors {
  primary: string;
  secondary: string;
  heading: string;
  text: string;
  footer: {
    background: string;
    heading: string;
    text: string;
    borderColor: string;
  };
}

interface BaseFontSize {
  title: string;
  text: string;
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