import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import FrontPage from './FrontPage';

const Router = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={FrontPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Router;
