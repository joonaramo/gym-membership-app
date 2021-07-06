import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LogIn from './Auth/LogIn';
import Checkout from './Checkout';
import Confirmation from './Confirmation';
import FrontPage from './FrontPage';
import ShoppingCart from './ShoppingCart';

const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={FrontPage} />
      <Route exact path='/login' component={LogIn} />
      <Route exact path='/cart' component={ShoppingCart} />
      <Route exact path='/checkout' component={Checkout} />
      <Route exact path='/confirmation' component={Confirmation} />
    </Switch>
  );
};

export default Router;
