import {Switch, Route} from 'react-router-dom'
import Home from "./components/Home";
import React from 'react';
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {useAppContext} from "./lib/contextLib";
import ShoppingCart from "./components/ShoppingCart";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";

export default function Routes(){
  const {isAuthenticated} = useAppContext();
  const {cartItems, setCartItems} = useAppContext();
  const {userHasAuthenticated, setAuthToken} = useAppContext();

  return(
    <Switch>
      <Route exact path="/">
        <Home isAuthenticated={isAuthenticated} cartItems={cartItems} setCartItems={setCartItems}/>
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup/>
      </Route>
        <Route exact path={"/cart"}>
            <ShoppingCart cartItems={cartItems} setCartItems={setCartItems}/>
        </Route>
        <Route exact path={"/add-product"}>
            <AddProduct/>
        </Route>
        <Route exact path={"/update-product"}>
            <UpdateProduct/>
        </Route>
      <Route>
        <NotFound/>
      </Route>
    </Switch>
  );
}
