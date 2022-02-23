import styled from 'styled-components';
import { BaseContainer } from '../../components/BaseContainer';

import mainAvatarImg from '../../images/main-avatar.svg';
import { device } from '../../styles/device';

export const Container = styled(BaseContainer)`
  padding-top: 50px;
`;

export const Content = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 50px 0 200px;
  display: flex;
  flex-direction: column;

  @media (min-width: ${device.tablet}) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Subsection = styled.div`
  &:last-of-type {
    display: flex;
    justify-content: center;
  }

  @media (min-width: ${device.tablet}) {
    &:first-of-type {
      margin-left: 50px;
      width: 60%;
    }

    &:last-of-type {
      width: 40%;
    }
  }
`;

export const HeadingOne = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.mobile.title};
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: 40px;

  @media (min-width: ${device.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.regular.title};
  }
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.mobile.text};

  @media (min-width: ${device.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.regular.text};
  }
`;

export const AvatarImage = styled.img.attrs(() => ({
  src: mainAvatarImg,
  role: 'presentation',
  alt: '',
}))`
  height: 400px;
  width: auto;
`;