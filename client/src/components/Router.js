import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LogIn from './Auth/LogIn';
import SignUp from './Auth/SignUp';
import Checkout from './Checkout';
import Confirmation from './Confirmation';
import FrontPage from './FrontPage';
import Profile from './Profile';
import ShoppingCart from './ShoppingCart';
import AdminPanel from './AdminPanel';
import Home from './AdminPanel/Home';
import Users from './AdminPanel/Users';
import SingleUser from './AdminPanel/Users/SingleUser';
import Products from './AdminPanel/Products';
import SingleProduct from './AdminPanel/Products/SingleProduct';

const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={FrontPage} />
      <Route exact path='/login' component={LogIn} />
      <Route exact path='/signup' component={SignUp} />
      <PrivateRoute exact path='/cart' component={ShoppingCart} />
      <PrivateRoute exact path='/checkout' component={Checkout} />
      <PrivateRoute exact path='/confirmation' component={Confirmation} />
      <PrivateRoute exact path='/profile' component={Profile} />
      <AdminPanel exact path='/admin' component={Home} />
      <AdminPanel exact path='/admin/users' component={Users} />
      <AdminPanel exact path='/admin/users/:id' component={SingleUser} />
      <AdminPanel exact path='/admin/products' component={Products} />
      <AdminPanel exact path='/admin/products/:id' component={SingleProduct} />
    </Switch>
  );
};

export default Router;
