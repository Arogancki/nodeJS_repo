import React from 'react';
import {
  Row,
  ImgWrapper,
  TextWrapper,
  TextRow,
  StyledImg,
  StyledTypography as Typography
} from './Styles';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

function Company({
  name = '--',
  symbol,
  logo,
  change,
  domain,
  marketOpen = '??',
  marketClose = '??',
  region,
  timezone,
  price,
  currency,
  lastDay = '??',
  percent = '--'
}) {
  const [percentColor, icon] =
    Number.isNaN(change) || Number(change) === 0
      ? ['#515151', 'remove']
      : Number(change) > 0
      ? ['#00CC00', 'arrow_upward']
      : ['#FF0000', 'arrow_downward'];
  return (
    <Row>
      <ImgWrapper>
        <StyledImg
          src={[logo, `/images/company_placeholder.png`]}
          alt={name}
          loader={<CircularProgress />}
        />
      </ImgWrapper>
      <TextWrapper>
        <TextRow>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {symbol} {domain}
          </Typography>
        </TextRow>
        <Typography variant="subtitle1" color="textSecondary">
          {region} {marketOpen}-{marketClose} {timezone}
        </Typography>
        <TextRow>
          <Typography variant="h6">{price}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {currency}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            style={{ color: percentColor }}
          >
            {change} ({percent})
            <i className="material-icons" style={{ fontSize: '1rem' }}>
              {icon}
            </i>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Closed: {lastDay}
          </Typography>
        </TextRow>
      </TextWrapper>
    </Row>
  );
}

Company.propTypes = {
  symbol: PropTypes.string,
  price: PropTypes.string,
  lastDay: PropTypes.string,
  change: PropTypes.string,
  percent: PropTypes.string,
  domain: PropTypes.string,
  logo: PropTypes.string,
  name: PropTypes.string,
  region: PropTypes.string,
  marketOpen: PropTypes.string,
  marketClose: PropTypes.string,
  timezone: PropTypes.string,
  currency: PropTypes.string
};

export default Company;
