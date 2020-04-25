import React,{useState, useEffect} from 'react';
import {Navbar, Nav, NavItem, Form, FormControl, Button} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import Routes from "./Routes";
import "./App.css";
import {AppContext} from "./lib/contextLib";
import {verifyToken} from "./auth/Auth";
import Navigation from "./components/Navigation";

export default function App(){

  const history = useHistory();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [authToken, setAuthToken] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    onLoad()
  },[]);
  
  async function onLoad() {

    const result = await verifyToken(localStorage.getItem('authToken'))
    if(result){
      userHasAuthenticated(true);
      setAuthToken(localStorage.getItem('authToken'));
      setEmail(localStorage.getItem('email'));
    }
    setIsAuthenticating(false);
  }
  function handleLogout() {
    userHasAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('email');
    setAuthToken('');
    history.push('/login');
  }

  return(
    !isAuthenticating &&
      <div className="App container">


        <AppContext.Provider value={{isAuthenticated, userHasAuthenticated,authToken, setAuthToken, cartItems,setCartItems, email, setEmail }}>
            <Navigation cartItems={cartItems}/>
        <Routes/>
        </AppContext.Provider>
      </div>
  );
}
