import styled from 'styled-components';

import { device } from '../../styles/device';

export const HeadingOne = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.mobile.headingOne};
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 400;

  @media (min-width: ${device.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.regular.headingOne};
  }
`;

export const HeadingTwo = styled.h2`
  text-align: center;
  font-weight: 500;
  margin: 0 auto 48px;
  font-size: ${({ theme }) => theme.fontSize.mobile.headingTwo};
  color: ${({ theme }) => theme.colors.heading};

  > br {
    display: none;
  }

  @media (min-width: ${device.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.regular.headingTwo};

    > br {
      display: block;
    }
  }
`;

export const Paragraph = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.mobile.text};

  @media (min-width: ${device.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.regular.text};
  }

  &:not(:first-of-type) {
    margin-top: 16px;
  }
`;
