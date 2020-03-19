import styled from 'styled-components';

export const Main = styled.div`
  flex: 1;
  padding: 5px;
  margin: 5px;
  height: 100vh;
  overflow: scroll;

  &:empty {
    --color: #ddd;
    --card-height: 100px;
    --card-padding: 5px;
    --card-skeleton: linear-gradient(gray var(--card-height), transparent 0);

    background-image: 
      // linear-gradient(white 40px, transparent 0),
      linear-gradient(gray 100%, transparent 0)
    
    background-size:
      // 200px 40px,
      100% 100%

    background-position:
      // 5px 5px,
      0 0
  }
`;

export const rando = styled.div`

`;
