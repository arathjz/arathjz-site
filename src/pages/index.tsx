import * as React from 'react';

import { Layout } from '../components/Layout/Layout';
import Seo from '../components/Seo';

import { Organizations } from '../sections/Organizations';
import { MainSection } from '../sections/Main';

const Home = (): JSX.Element => (
  <Layout>
    <Seo title="Home" />
    <MainSection />
    <Organizations />
  </Layout>
);

export default Home;
