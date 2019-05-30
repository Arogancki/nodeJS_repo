import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { StyledTypography } from './Styles';
import PropTypes from 'prop-types';

function Header({ links, children }) {
  return (
    <AppBar position="static">
      <Toolbar>
        {children}
        {links.map(({ to, text }, index) => (
          <Link to={to} key={`${index}-${Date.now()}`}>
            <Button>
              <StyledTypography variant="subtitle1" color="textSecondary">
                {text}
              </StyledTypography>
            </Button>
          </Link>
        ))}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Header;
