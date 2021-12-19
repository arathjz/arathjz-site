import React, { useMemo, useState } from 'react';

import { Theme } from './types';

const initialValue = {
  theme: Theme.Dark,
  toggleTheme: () => {},
};

export const ThemeContext = React.createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>(initialValue);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(Theme.Dark);

  const toggleTheme = () => {
    const newTheme = theme === Theme.Dark ? Theme.Light : Theme.Dark;

    setTheme(newTheme);
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
