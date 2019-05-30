import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Img from 'react-image';

export const StyledTypography = styled(Typography)`
  padding: 0 0.2rem;
  white-space: nowrap;
`;

export const StyledImg = styled(Img)`
  height: 64px;
  width: 64px;
`;

export const ImgWrapper = styled.div`
  margin: auto;
`;

export const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

export const TextRow = styled(Row)`
  align-items: baseline;
`;

export const TextWrapper = styled.div`
  padding: 1rem;
`;
