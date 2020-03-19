import styled from 'styled-components';

export const AddMain = styled.div`
  flex: 1;
  margin: 5px;
  padding-top: 5px;

  &:hover {
    color: blue;
  }
`;

export const AddInput = styled.input`
  margin: 5px;

  &:focus {
    outline: none;
  }
`;

export const AddButton = styled.button`
  margin-top: 5px;
`;
