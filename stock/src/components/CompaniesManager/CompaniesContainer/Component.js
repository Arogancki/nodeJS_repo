import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Wrapper } from './Styles';
import Company from './Company';
import PropTypes from 'prop-types';
import { ADD } from 'assets/routes';
import withDeleteButton from './withDeleteButton';

function CompaniesContainer({ companies }) {
  return companies.length ? (
    <Wrapper>
      {companies.map((companyData, index) => {
        const CompanyWithDeleteButton = withDeleteButton(
          Company,
          companyData.remove
        );
        return (
          <CompanyWithDeleteButton
            key={`${index}-${Date.now()}`}
            {...companyData}
          />
        );
      })}
    </Wrapper>
  ) : (
    <Typography variant="subtitle1" color="textSecondary">
      There are no companies yet.
      <Link to={ADD} style={{ color: '#0099FF' }}>
        Track your first company.
      </Link>
    </Typography>
  );
}

CompaniesContainer.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CompaniesContainer;
