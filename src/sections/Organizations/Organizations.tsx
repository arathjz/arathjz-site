import React from 'react';
import Img from 'gatsby-image';

import { ThemeContext } from '../../providers/ThemeProvider';
import { Container, Content, Row } from './Organizations.styles';
import { useOrganizationLogosMapper } from './useOrganizationLogosMapper';

const ORGANIZATIONS = [
  {
    name: 'Shiphero',
    link: 'https://shiphero.com/',
    key: 'shiphero',
  },
  {
    name: 'Codelitt',
    link: 'https://www.codelitt.com/',
    key: 'codelitt',
  },
  {
    name: 'Debt Collective',
    link: 'https://debtcollective.org/',
    key: 'debtCollective',
  },
  {
    name: '100 Ladrillos',
    link: 'https://100ladrillos.com/',
    key: 'hundredBricks',
  },
];

export const Organizations = () => {
  const { variant } = React.useContext(ThemeContext);
  const logos = useOrganizationLogosMapper(variant);

  return (
    <Container>
      <Content>
        <h2>
          Organizations I have <br /> collaborated with
        </h2>
      </Content>
      <Row>
        {ORGANIZATIONS.map(({ link, key, name }) => (
          <a
            href={link}
            key={key}
            target="_blank"
            aria-label={name}
            rel="noreferrer"
          >
            <Img fixed={logos[key].childImageSharp.fixed} />
          </a>
        ))}
      </Row>
    </Container>
  );
};
