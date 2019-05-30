import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Wrapper, Row } from './Styles';
import { COMPANIES } from 'assets/routes';
import Autosuggest from './Autosuggest';
import { addCompany } from 'components/CompaniesManager/helpers';

export default function NewCompany() {
  const [newCompany, setNewCompany] = useState(null);
  return (
    <Wrapper>
      <Typography variant="h4" color="textSecondary">
        Track a new company
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Provide the stock exchange symbol of a company you want to track
      </Typography>
      <Row>
        <Typography variant="h5" color="textSecondary">
          Company symbol:
        </Typography>
        <div style={{ margin: '0 1rem' }} />
        <Autosuggest
          onChange={newCompany => {
            setNewCompany(newCompany);
          }}
        />
      </Row>
      <Button
        variant="contained"
        color="primary"
        disabled={!newCompany}
        onClick={() => addCompany(newCompany)}
      >
        <Link to={COMPANIES}>Track</Link>
      </Button>
    </Wrapper>
  );
}
