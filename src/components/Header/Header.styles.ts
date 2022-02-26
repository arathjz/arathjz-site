import styled from 'styled-components';

export const Container = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  transition: background-color 0.3s;
  padding: 24px 48px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.maxWidth};
`;
