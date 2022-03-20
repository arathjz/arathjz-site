import React from 'react';

import { Variant, Variants } from './types';

import { HeadingOne, HeadingTwo, Paragraph } from './Text.styles';

interface TextProps {
  variant: Variant;
  children: React.ReactNode;
}

const components = {
  [Variants.h1]: HeadingOne,
  [Variants.h2]: HeadingTwo,
  [Variants.paragraph]: Paragraph,
};

export const Text = ({ variant, children }: TextProps) => {
  const Component = components[variant];

  return <Component>{children}</Component>;
};
