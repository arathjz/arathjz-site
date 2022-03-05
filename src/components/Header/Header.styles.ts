import styled from 'styled-components';

import { device } from '../../styles/device';

export const Container = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  transition: background-color 0.3s;
  padding: 24px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 99999;

  @media (min-width: ${device.tablet}) {
    padding: 24px 48px;
  }
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.maxWidth};
`;

export const SocialMedia = styled.div`
  display: flex;
  width: 160px;
  justify-content: space-between;
`;
