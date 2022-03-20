import React from 'react';

import { Text } from '../../components/Text';
import {
  AvatarImage,
  Container,
  Content,
  Subsection,
  AboutMeButton,
} from './Main.styles';

export const MainSection = () => (
  <Container>
    <Content>
      <Subsection>
        <Text variant="headingOne">
          I am Arath. I am a software engineer passionate about providing
          solutions with technology
        </Text>
        <AboutMeButton href="#about-me">Learn more about me</AboutMeButton>
      </Subsection>
      <Subsection>
        <AvatarImage />
      </Subsection>
    </Content>
  </Container>
);
