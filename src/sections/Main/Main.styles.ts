import styled from 'styled-components';
import { BaseContainer } from '../../components/BaseContainer';

import mainAvatarImg from '../../images/main-avatar.svg';
import { RoundedLink } from '../../components/Button';
import { device } from '../../styles/device';

export const Container = styled.section`
  ${BaseContainer}
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

export const Content = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${device.tablet}) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Subsection = styled.div`
  &:last-of-type {
    display: flex;
    justify-content: center;
    order: 1;
    margin-bottom: 24px;
  }

  &:first-of-type {
    order: 2;
  }

  @media (min-width: ${device.tablet}) {
    &:first-of-type {
      margin-left: 100px;
      flex: 1;
      order: 1;
    }

    &:last-of-type {
      flex: 1;
      margin-bottom: 0;
    }
  }
`;

export const HeadingOne = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.mobile.headingTwo};
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 400;

  @media (min-width: ${device.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.regular.headingTwo};
  }
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.mobile.text};

  @media (min-width: ${device.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.regular.text};
  }
`;

export const AboutMeButton = styled(RoundedLink)`
  margin-top: 48px;
`;

export const AvatarImage = styled.img.attrs(() => ({
  src: mainAvatarImg,
  role: 'presentation',
  alt: '',
}))`
  height: 400px;
  width: auto;
`;
