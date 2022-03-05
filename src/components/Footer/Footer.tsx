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
        <h2>Would you like to chat? Please get in touch</h2>
      </LeftContent>
      <FormContainer name="contact" method="POST" data-netlify="true">
        <Input
          type="text"
          aria-label="Your name"
          placeholder="Your name"
          name="name"
          required
        />
        <Input
          type="email"
          aria-label="Email"
          placeholder="Email"
          name="email"
          required
        />
        <Input
          type="text"
          aria-label="Company"
          placeholder="Company"
          name="company"
        />
        <Input
          type="text"
          aria-label="Write something"
          placeholder="Write something"
          name="message"
          required
        />
        {/* Have no idea why when deploying to netlify, the last input does not display, so I am adding this dummy input */}
        <input
          type="text"
          aria-hidden="true"
          style={{ visibility: 'hidden' }}
        />
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
        Icons by{' '}
        <a href="https://simpleicons.org/" target="_blank" rel="noreferrer">
          Simple Icons
        </a>
      </p>
      <p>
        Designed by
        {` `}
        <a
          href="https://www.behance.net/olivercambrano"
          target="_blank"
          rel="noreferrer"
        >
          Oliver Cambrano
        </a>
      </p>
    </InfoAndCopyright>
  </Container>
);
