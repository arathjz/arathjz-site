import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import ThemeProvider from '../../providers/ThemeProvider';
import Header from '../Header';
import StyledLayout from './StyledLayout';

const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <ThemeProvider>
      <StyledLayout>
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </StyledLayout>
    </ThemeProvider>
  );
};

export default Layout;
