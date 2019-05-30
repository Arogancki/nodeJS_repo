import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Header from 'components/Header';
import NewCompany from 'components/NewCompany';
import CompaniesManager from 'components/CompaniesManager';
import * as routes from 'assets/routes';
import { StyledTypography } from './Styles';

const links = [
  { to: routes.ADD, text: 'Track new company' },
  { to: routes.COMPANIES, text: 'Companies' }
];

export default function Layout() {
  return (
    <Router>
      <Header links={links}>
        <StyledTypography variant="h5">Stock Tracker</StyledTypography>
      </Header>
      <Switch>
        <Route path={routes.COMPANIES} component={CompaniesManager} />
        <Route path={routes.ADD} component={NewCompany} />
        <Route component={() => <Redirect to={routes.COMPANIES} />} />
      </Switch>
    </Router>
  );
}
