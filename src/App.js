import logo from './logo.svg';
import './App.css';
import { Navbar } from './component/Navbar/Navbar';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from './Theme/DarkTheme';
import { CssBaseline } from '@mui/material';
import Home from './component/Home/Home';
import RestaurantDetails from './component/Restaurant/RestaurantDetails';
import Cart from './component/Cart/Cart';
import Profile from './component/Profile/Profile';
import CustomerRoute from './Routers/CustomerRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './component/State/Authentication/Action';
import Auth from './component/Auth/Auth';
import { findCart } from './component/State/Cart/Action';
import Routers from './Routers/Routers';
import { getRestaurantByUserId } from './component/State/Restaurant/Actions';


function App() {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")
  const {auth}=useSelector((store) => store);

  useEffect(()=>{   // customer
    dispatch(getUser(auth.jwt || jwt));
    dispatch(findCart(jwt))
  },[auth.jwt]);
  
  useEffect(()=>{  // Admin 
    dispatch(getRestaurantByUserId(auth.jwt || jwt));
    //dispatch(findCart(jwt))
  },[auth.user]);


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
          <Routers/>
{/*<Navbar/>*/}   
{/*<Home/>*/}
{/*<RestaurantDetails/>*/}
{/*<Cart>*/}
{/*<Profile/>*/}
{/*<CustomerRoute/>*/}
    </ThemeProvider>
  );
}

export default App;
