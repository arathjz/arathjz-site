import styled from 'styled-components';

import { BaseContainer } from '../../components/BaseContainer';
import { device } from '../../styles/device';

export const Container = styled.section`
  ${BaseContainer}
  background-color: ${({ theme }) => theme.colors.secondary};
  padding-top: 80px;
  padding-bottom: 80px;

  @media (min-width: ${device.tablet}) {
    padding-top: 144px;
    padding-bottom: 144px;
  }
`;

export const Content = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;

  h2 {
    text-align: center;
    font-weight: 500;
    margin: auto;
    font-size: ${({ theme }) => theme.fontSize.mobile.headingTwo};
    color: ${({ theme }) => theme.colors.heading};
  }

  h2 br {
    display: none;
  }

  @media (min-width: ${device.tablet}) {
    h2 {
      font-size: ${({ theme }) => theme.fontSize.regular.headingTwo};
    }

    h2 br {
      display: block;
    }
  }
`;
