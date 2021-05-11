import React, { useEffect } from 'react'
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './HOC/PrivateRoute';
import { getInitialData, isUserLoggedIn } from './actions'
import { useDispatch, useSelector } from 'react-redux';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
import Page from './containers/NewPage';


const App = (props) => {

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
    if (auth.authenticate)
      dispatch(getInitialData())
  }, [auth.authenticate])

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/page" component={Page} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />
        <PrivateRoute path="/category" component={Category} />
      </Switch>
    </div>
  );
}

export default App;
