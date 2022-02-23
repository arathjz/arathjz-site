import * as React from 'react';

import Layout from '../components/Layout/Layout';
import Seo from '../components/Seo';

import { MainSection } from '../sections/Main';

const Home = (): JSX.Element => (
  <Layout>
    <Seo title="Home" />
    <MainSection />
  </Layout>
);

export default Home;
