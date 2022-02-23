import styled from 'styled-components';

export const BaseContainer = styled.section`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0 36px;
  transition: background-color 0.3s;
`;