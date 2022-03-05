import React from 'react';

import {
  AvatarImage,
  Container,
  Content,
  HeadingOne,
  Subsection,
  AboutMeButton,
} from './Main.styles';

export const MainSection = () => (
  <Container>
    <Content>
      <Subsection>
        <HeadingOne>
          Hello! I am Arath. I am a software engineer passionate about providing
          solutions with technology
        </HeadingOne>
        <AboutMeButton href="#about-me">Learn more about me</AboutMeButton>
      </Subsection>
      <Subsection>
        <AvatarImage />
      </Subsection>
    </Content>
  </Container>
);
