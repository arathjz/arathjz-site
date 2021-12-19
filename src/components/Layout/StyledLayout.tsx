import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { GlobalStyle } from '../../styles/Global';
import { darkTheme, lightTheme } from '../../styles/theme';
import { ThemeContext } from '../../providers/ThemeProvider';
import { Theme } from '../../providers/ThemeProvider/types';

const THEMES = {
  [Theme.Dark]: darkTheme,
  [Theme.Light]: lightTheme,
};

const StyledLayout = ({ children }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <>
      <StyledThemeProvider theme={THEMES[theme]} />
      <GlobalStyle />
      {children}
    </>
  );
};

export default StyledLayout;
