import React from 'react';
import Img from 'gatsby-image';

import { Text } from '../../components/Text';
import {
  Container,
  Content,
  ImageContainer,
  TextContainer,
} from './AboutMe.styles';
import { useMainImage } from './useMainImage';

export const AboutMe = () => {
  const { mainImage } = useMainImage();

  return (
    <Container id="about-me">
      <Content>
        <Text variant="headingTwo">About me</Text>
        <ImageContainer>
          <Img fixed={mainImage.childImageSharp.fixed} />
        </ImageContainer>
        <TextContainer>
          <Text variant="paragraph">
            I build software, am a finance enthusiast, and love coffee (I even
            have coffee tattoos). I work mainly with frontend applications, but
            I have experience as a full-stack engineer. I believe that every
            application should be easy to use and accessible to anyone, which
            leads me to put special care into user experience, accessibility,
            and design 🚀
          </Text>
        </TextContainer>
      </Content>
    </Container>
  );
};
