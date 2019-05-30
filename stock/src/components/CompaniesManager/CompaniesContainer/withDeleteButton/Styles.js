import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  margin: 1rem;
  & > i {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    display: none;
  }
  &:hover {
    & > i {
      display: inline;
    }
  }
`;

export const DeletteButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;
