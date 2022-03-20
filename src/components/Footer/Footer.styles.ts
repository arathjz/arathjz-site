import styled from 'styled-components';

import { device } from '../../styles/device';
import { RoundedButton } from '../Button';

export const Container = styled.footer`
  background-color: ${({ theme }) => theme.colors.footer.background};
  transition: background-color 0.3s;
  padding: 72px 24px 0;

  @media (min-width: ${device.tablet}) {
    padding: 140px 48px 0;
  }
`;

export const Content = styled.div`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.maxWidth};
  display: flex;
  flex-direction: column;
  margin-bottom: 72px;

  @media (min-width: ${device.tablet}) {
    flex-direction: row;
    margin-bottom: 120px;
  }
`;

export const LeftContent = styled.div`
  width: 100%;

  > h2 {
    font-size: ${({ theme }) => theme.fontSize.mobile.footerHeading};
    color: ${({ theme }) => theme.colors.footer.primary};
    font-weight: 500;
    max-width: 600px;
    text-align: center;
  }

  @media (min-width: ${device.tablet}) {
    width: 60%;

    > h2 {
      font-size: ${({ theme }) => theme.fontSize.regular.footerHeading};
      text-align: left;
    }
  }
`;

export const FormContainer = styled.form`
  width: 100%;
  margin-top: 72px;

  > input {
    margin-bottom: 48px;
  }

  input:last-of-type {
    margin: 0;
  }

  input[aria-hidden='true'] {
    height: 1px;
  }

  @media (min-width: ${device.tablet}) {
    margin-top: 0;
    width: 40%;
  }
`;

export const SubmitButton = styled(RoundedButton)`
  display: block;
  padding: 16px 24px;
  margin-left: auto;
  margin-top: 48px;
`;

export const InfoAndCopyright = styled.div`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.maxWidth};
  border-top: 1px solid ${({ theme }) => theme.colors.footer.borderColor};
  padding: 48px 0;
  display: flex;
  flex-direction: column;

  p,
  a {
    color: ${({ theme }) => theme.colors.footer.text};
    font-size: ${({ theme }) => theme.fontSize.mobile.smallText};
  }

  p:first-child {
    margin-bottom: 12px;
  }

  @media (min-width: ${device.tablet}) {
    flex-direction: row;
    justify-content: space-between;

    p {
      margin: 0;
    }
  }
`;
