import * as React from 'react';
import { Link } from 'gatsby';

import { ThemeContext } from '../../providers/ThemeProvider';
import secondaryAvatar from '../../images/secondary-avatar.svg';
import darkModeIcon from '../../images/icons/dark-mode.svg';
import lightModeIcon from '../../images/icons/light-mode.svg';
import { ThemeVariant } from '../../providers/ThemeProvider/types';
import { Button } from '../Button';
import { Container, Content } from './Header.styles';

const Header = () => {
  const { toggleTheme, variant } = React.useContext(ThemeContext);

  return (
    <Container>
      <Content>
        <div>
          <Link to="/">
            <img src={secondaryAvatar} alt="Go home - Website logo" />
          </Link>
        </div>
        <nav>
          <Button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch theme to ${
              variant === ThemeVariant.Dark
                ? ThemeVariant.Light
                : ThemeVariant.Dark
            }`}
          >
            <img
              src={variant === ThemeVariant.Dark ? lightModeIcon : darkModeIcon}
              alt=""
              role="presentation"
            />
          </Button>
        </nav>
      </Content>
    </Container>
  );
};

export default Header;
