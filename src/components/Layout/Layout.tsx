import * as React from 'react';

import ThemeProvider from '../../providers/ThemeProvider';
import Header from '../Header';
import StyledLayout from './StyledLayout';

const Layout: React.FC = ({ children }) => (
  // Use whenever is required
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `);

  <ThemeProvider>
    <StyledLayout>
      <Header />
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

export default Layout;
