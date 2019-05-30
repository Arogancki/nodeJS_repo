import React, { useState, Fragment, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Wrapper, StyledCircularProgress } from './Styles';
import CompaniesContainer from './CompaniesContainer';
import { getCompaniesInfo, removeCompany } from './helpers';

const statuses = Object.freeze({
  PENDING: 1,
  DONE: 2,
  ERROR: 3
});

export default function CompaniesManager() {
  const [state, setState] = useState({
    status: statuses.PENDING,
    data: []
  });
  useEffect(() => {
    state.status === statuses.PENDING &&
      getCompaniesInfo()
        .then(data => {
          Array.isArray(data) &&
            data.forEach(company => {
              company.remove = () => {
                const index = data.findIndex(
                  data => data.symbol === company.symbol
                );
                ~index && data.splice(index, 1);
                removeCompany(company.symbol);
                setState({
                  status: statuses.DONE,
                  data: data
                });
              };
            });
          setState({ status: statuses.DONE, data });
        })
        .catch(error => {
          console.error({ error });
          setState({
            status: statuses.ERROR,
            data: []
          });
        });
  });
  return (
    <Wrapper>
      <Typography variant="h4" color="textSecondary">
        Companies
      </Typography>
      {state.status === statuses.PENDING ? (
        <StyledCircularProgress />
      ) : state.status === statuses.DONE ? (
        <CompaniesContainer companies={state.data} />
      ) : (
        <Fragment>
          <Typography variant="subtitle1" color="textSecondary">
            Sorry,
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            we could not get your data
          </Typography>
          <i className="material-icons">sentiment_very_dissatisfied</i>
        </Fragment>
      )}
    </Wrapper>
  );
}
