import styled from 'styled-components';

export const Entry = styled.div` 
  margin: 5px 0px 0px 0px;
  height: 100px;
  padding: 5px;
  background-color: #eee;
  &:empty {
    background-color: #eee;
  }
`;

export const Name = styled.p`
  height: 20px;
  width: 80px;
  background-color: #ddd;
  &:empty{
    background-color: #bbb;
  }
`;

export const Time = styled.p`
  height: 20px;
  width: 80px;
  background-color: #999;
  &:empty: {
    background-color: #cde;
  }
`;

export const EntryButton = styled.button`
  height: 20px;
  width: 50px;
  &:empty{

  }
`;
