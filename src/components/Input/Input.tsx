import React from 'react';
import styled from 'styled-components';

interface InputProps {
  label: string;
  type: 'email' | 'text';
}

const StyledInput = styled.input`
  display: block;
  width: 100%;
  background-color: transparent;
  height: 40px;
  border: 0;
  padding: 0 0 16px;
  margin: 0;
  outline: none;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-color: ${({ theme }) => theme.colors.footer.borderColor};
  transition: border-color 0.4s;

  &:active,
  &:focus {
    border-color: ${({ theme }) => theme.colors.footer.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.footer.text};
  }

  & {
    color: ${({ theme }) => theme.colors.footer.primary};
    font-size: ${({ theme }) => theme.fontSize.mobile.input};
    font-weight: 400;
  }
`;

export const Input = ({ type, label }: InputProps) => (
  <StyledInput type={type} placeholder={label} aria-label={label} />
);
