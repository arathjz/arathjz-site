import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { GlobalStyle } from '../../styles/Global';
import { ThemeContext } from '../../providers/ThemeProvider';

const StyledLayout = ({ children }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};

export default StyledLayout;
