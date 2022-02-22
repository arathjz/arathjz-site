import React, { useMemo, useState } from 'react';
import { DefaultTheme } from 'styled-components';

import { darkTheme, lightTheme } from '../../styles/theme';
import { ThemeVariant } from './types';

const THEMES = {
  [ThemeVariant.Dark]: darkTheme,
  [ThemeVariant.Light]: lightTheme,
};

const initialValue = {
  theme: THEMES[ThemeVariant.Dark],
  toggleTheme: () => {},
  variant: ThemeVariant.Dark,
};

export const ThemeContext = React.createContext<{
  theme: DefaultTheme;
  toggleTheme: () => void;
  variant: ThemeVariant;
}>(initialValue);

const ThemeProvider: React.FC = ({ children }) => {
  const [variant, setVariant] = useState(ThemeVariant.Dark);

  const toggleTheme = () => {
    const newTheme =
      variant === ThemeVariant.Dark ? ThemeVariant.Light : ThemeVariant.Dark;

    setVariant(newTheme);
  };

  const value = useMemo(
    () => ({ theme: THEMES[variant], toggleTheme, variant }),
    [variant],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
