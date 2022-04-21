import React, { useEffect } from 'react';

import firebase from 'firebase';
import 'firebase/auth';
import { Route, BrowserRouter, Routes , Navigate } from 'react-router-dom';

import IndexPage from './index';
import CategoryPage from './pages/category';
import InboxPage from './pages/inbox';
import LoginPage from './pages/login';
import LogoutPage  from './pages/logout';
import NewProductPage  from './pages/newProduct';
import ProductPage  from './pages/product';
import RegisterPage  from './pages/register';
import { render } from 'react-dom';

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
        <Routes>
          <Route exact path='/'>
            <IndexPage />
          </Route>
          <Route exact path='/category/:name'>
            <CategoryPage />
          </Route>
          <PrivateRoute exact path='inbox'>
            <InboxPage />
          </PrivateRoute>
          <PrivateRoute exact path='/product/new'>
            <NewProductPage />
          </PrivateRoute>
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

function PrivateRoute({ children , rest}){
  render(
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('userUID') ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default App;
