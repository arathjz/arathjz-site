import styled, { css } from 'styled-components';

const RoundedButtonMixin = css`
  background-color: ${({ theme }) => theme.colors.heading};
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 32px;
  padding: 24px 32px;
  font-size: ${({ theme }) => theme.fontSize.mobile.button};
`;

export const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const RoundedButton = styled(Button)`
  ${RoundedButtonMixin}
`;

export const RoundedLink = styled.a`
  ${RoundedButtonMixin}
  text-decoration: none;
  display: inline-block;
`;
