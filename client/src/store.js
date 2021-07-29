import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import userReducer from './reducers/user';
import notificationReducer from './reducers/notification';
import productReducer from './reducers/product';
import orderReducer from './reducers/order';
import membershipReducer from './reducers/membership';
import couponReducer from './reducers/coupon';

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  notification: notificationReducer,
  product: productReducer,
  order: orderReducer,
  membership: membershipReducer,
  coupon: couponReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
