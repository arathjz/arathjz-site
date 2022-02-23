import React from 'react';

import {
  AvatarImage,
  Container,
  Content,
  HeadingOne,
  Subsection,
  Text,
} from './Main.styles';

export const MainSection = () => (
  <Container>
    <Content>
      <Subsection>
        <HeadingOne>👋 Hello, I am Arath</HeadingOne>
        <Text>
          I am a software engineer passionate about providing solutions in
          technology products; I work mainly with frontend applications, but I
          have experience as a full-stack engineer. I believe that every
          application should be easy to use and accessible to anyone, which
          leads me to put special care into user experience, accessibility, and
          design. 🚀
        </Text>
      </Subsection>
      <Subsection>
        <AvatarImage />
      </Subsection>
    </Content>
  </Container>
);
