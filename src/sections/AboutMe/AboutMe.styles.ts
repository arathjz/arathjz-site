import styled from 'styled-components';

import { BaseContainer } from '../../components/BaseContainer';

export const Container = styled.section`
  ${BaseContainer}
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Content = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

export const ImageContainer = styled.div`
  height: 480px;
  overflow: hidden;
  width: max-content;
  margin: 0 auto;
  border-radius: 48px;
  margin-bottom: 48px;
`;

export const TextContainer = styled.div`
  max-width: 800px;
  margin: auto;
`;
