import styled from 'styled-components';

import { BaseContainer } from '../../components/BaseContainer';
import { device } from '../../styles/device';

export const Container = styled.section`
  ${BaseContainer}
  padding-top: 80px;
  padding-bottom: 80px;

  @media (min-width: ${device.tablet}) {
    padding-top: 80px;
    padding-bottom: 80px;
  }
`;

export const Content = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
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
