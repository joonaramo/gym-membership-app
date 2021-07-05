import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LogIn from './Auth/LogIn';
import FrontPage from './FrontPage';

const Router = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={FrontPage} />
          <Route exact path='/login' component={LogIn} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Router;
