import * as React from 'react';

import ThemeProvider from '../../providers/ThemeProvider';
import { Footer } from '../Footer';
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
      <Footer />
    </StyledLayout>
  </ThemeProvider>
);

export default Layout;
