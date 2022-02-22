import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    maxWidth: string;
    colors: {
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
    };
  }
}
