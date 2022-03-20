import { css } from 'styled-components';

import { device } from '../../styles/device';

export const BaseContainer = css`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 120px 24px;
  transition: background-color 0.3s;

  @media (min-width: ${device.tablet}) {
    padding: 144px 48px;
  }
`;
