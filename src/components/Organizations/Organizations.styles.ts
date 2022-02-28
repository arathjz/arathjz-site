import styled from 'styled-components';

import { BaseContainer } from '../BaseContainer';
import { device } from '../../styles/device';

export const Container = styled.section`
  ${BaseContainer}
  background-color: ${({ theme }) => theme.colors.secondary};
  padding-top: 80px;
  padding-bottom: 80px;
`;

export const Content = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;

  h2 {
    text-align: center;
    font-weight: 500;
    margin: auto;
    font-size: ${({ theme }) => theme.fontSize.mobile.headingThree};
    color: ${({ theme }) => theme.colors.heading};
  }

  h2 br {
    display: none;
  }

  @media (min-width: ${device.tablet}) {
    h2 {
      font-size: ${({ theme }) => theme.fontSize.regular.headingThree};
    }

    h2 br {
      display: block;
    }
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 64px;

  a:not(:last-child) {
    margin-bottom: 48px;
  }

  @media (min-width: ${device.tablet}) {
    flex-direction: row;
    margin-top: 96px;

    a:not(:last-child) {
      margin-right: 64px;
      margin-bottom: 0;
    }
  }
`;
