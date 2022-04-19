import React, { useEffect } from 'react';

import firebase from 'firebase';
import 'firebase/auth';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';

import IndexPage from './pages';
import CategoryPage from './pages/category';
import InboxPage from './pages/inbox';
import LoginPage from './pages/login';
import LogoutPage  from './pages/logout';
import NewProductPage  from './pages/newProduct';
import ProductPage  from './pages/product';
import RegisterPage  from './pages/register';

function App() {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        localStorage.setItem('userUID', user.uid);
      } else {
        localStorage.removeItem('userUID');
        }
      });
  }, [])
  
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <IndexPage />
          </Route>
          <Route exact path='/category/:name'>
            <CategoryPage />
          </Route>
          <Route exact path='inbox'>
            <InboxPage />
          </Route>
          <Route exact path='/product/new'>
            <NewProductPage />
          </Route>
          <Route exact path='/product/:id'>
            <ProductPage />
          </Route>
          <Route exact path='/login'>
            <LoginPage />
          </Route>
          <Route exact path='/logout'>
            <LogoutPage />
          </Route>
          <Route exact path='/register'>
            <RegisterPage />
          </Route>
          <Route exact path='*'>
            <IndexPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
