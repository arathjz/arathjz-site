import * as React from 'react';
import { Link } from 'gatsby';

import { ThemeContext } from '../../providers/ThemeProvider';
import secondaryAvatar from '../../images/secondary-avatar.svg';
import { ThemeVariant } from '../../providers/ThemeProvider/types';
import { Button } from '../Button';
import { Container, Content, SocialMedia } from './Header.styles';
import { useIconMapper } from './useIconMapper';

const SOCIAL_MEDIA = [
  {
    icon: 'github',
    name: 'Github',
    link: 'https://github.com/arathjz',
  },
  {
    icon: 'linkedin',
    name: 'LinkeIn',
    link: 'https://www.linkedin.com/in/arathjz',
  },
  {
    icon: 'twitter',
    name: 'Twitter',
    link: 'https://twitter.com/arathjz',
  },
];

const Header = () => {
  const { toggleTheme, variant } = React.useContext(ThemeContext);
  const { toggleMode, ...socialMediaIcons } = useIconMapper(variant);

  return (
    <Container>
      <Content>
        <div>
          <Link to="/">
            <img src={secondaryAvatar} alt="Go home - Website logo" />
          </Link>
        </div>
        <SocialMedia>
          <Button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch theme to ${
              variant === ThemeVariant.Dark
                ? ThemeVariant.Light
                : ThemeVariant.Dark
            }`}
          >
            <img src={toggleMode.publicURL} alt="" role="presentation" />
          </Button>
          {SOCIAL_MEDIA.map((item) => (
            <a
              key={item.link}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit my ${item.name}`}
            >
              <img
                src={socialMediaIcons[item.icon].publicURL}
                alt=""
                role="presentation"
                width={24}
                height={24}
              />
            </a>
          ))}
        </SocialMedia>
      </Content>
    </Container>
  );
};

export default Header;
