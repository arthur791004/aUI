import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '@/components/TextField';
import Cropper from '@/components/Cropper';

import './global-styles';

const Logo = styled.div`
  padding: 10px;
  font-size: 24px;
  text-align: center;
`;

const NavItem = styled.div`
  color: rgba(0, 0, 0, .65);
  padding: 10px 20px;
  border-right: 3px solid transparent;

  &:hover {
    color: #108EE9;
  }

  ${props => props.isActive && `
    color: #108EE9;
    background-color: #ECF6FD;
    border-right-color: #108EE9;
  `}
`;

const Nav = styled.div`
  margin: 10px 0;
  border-right: 1px solid #D2D2D7;
`;

const MainLayout = styled.div`
  margin: 10px;
`;

const AppWrapper = styled.div`
  display: flex;
`;

const COMPONENTS = [
  'TextField',
  'Cropper',
];

const App = ({ location }) => (
  <AppWrapper>
    <Nav>
      <Logo>aUI</Logo>
      {
        COMPONENTS.map(component => (
          <Link key={component} to={component}>
            <NavItem isActive={location.pathname.indexOf(component) !== -1}>
              {component}
            </NavItem>
          </Link>
        ))
      }
    </Nav>
    <MainLayout>
      <Switch location={location}>
        <Route exact path="/TextField" render={props => <TextField label="lable" {...props} />} />
        <Route exact path="/Cropper" render={props => <Cropper {...props} />} />
        <Route render={() => <div>Demo Page</div>} />
      </Switch>
    </MainLayout>
  </AppWrapper>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default withRouter(App);
