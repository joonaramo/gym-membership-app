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
import Orders from './AdminPanel/Orders';
import SingleOrder from './AdminPanel/Orders/SingleOrder';
import Memberships from './AdminPanel/Memberships';
import SingleMembership from './AdminPanel/Memberships/SingleMembership';
import Coupons from './AdminPanel/Coupons';
import SingleCoupon from './AdminPanel/Coupons/SingleCoupon';
import Settings from './AdminPanel/Settings';
import Categories from './AdminPanel/Categories';
import SingleCategory from './AdminPanel/Categories/SingleCategory';

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
      <AdminPanel exact path='/admin/orders' component={Orders} />
      <AdminPanel exact path='/admin/orders/:id' component={SingleOrder} />
      <AdminPanel exact path='/admin/memberships' component={Memberships} />
      <AdminPanel
        exact
        path='/admin/memberships/:id'
        component={SingleMembership}
      />
      <AdminPanel exact path='/admin/coupons' component={Coupons} />
      <AdminPanel exact path='/admin/coupons/:id' component={SingleCoupon} />
      <AdminPanel exact path='/admin/settings' component={Settings} />
      <AdminPanel exact path='/admin/categories' component={Categories} />
      <AdminPanel
        exact
        path='/admin/categories/:id'
        component={SingleCategory}
      />
    </Switch>
  );
};

export default Router;
