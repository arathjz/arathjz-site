import React from 'react';
import { Input } from '../Input';

import {
  Container,
  InfoAndCopyright,
  Content,
  LeftContent,
  FormContainer,
  SubmitButton,
} from './Footer.styles';

export const Footer = () => (
  <Container>
    <Content>
      <LeftContent>
        <h2>Contact me to talk about your ideas.</h2>
      </LeftContent>
      <FormContainer>
        <Input type="text" label="Your name" />
        <Input type="email" label="Email" />
        <Input type="text" label="Company" />
        <Input type="text" label="Write something" />
        <SubmitButton>Contact me</SubmitButton>
      </FormContainer>
    </Content>
    <InfoAndCopyright>
      <p>
        © {new Date().getFullYear()}
        {` `}
        All rights reserved
      </p>
      <p>
        Designed by
        {` `}
        <a href="https://www.gatsbyjs.com" target="_blank" rel="noreferrer">
          Oliver Cambrano
        </a>
      </p>
    </InfoAndCopyright>
  </Container>
);
