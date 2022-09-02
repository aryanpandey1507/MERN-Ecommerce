import './App.css';
import Header from './components/layout/Header/Header.js';
import Footer from './components/layout/Footer/Footer';
import {BrowserRouter as  Router ,Route ,Routes} from 'react-router-dom';
import webFont from 'webfontloader';
import ProductDetails from './components/Product/ProductDetails';
import React from 'react';
import Home from './components/Home/Home';
import Products from './components/Product/Products.js'
import Search from './components/Product/Search.js';
import LoginSignup from './components/User/LoginSignup';
import store from './store';
import {loadUser} from './actions/userActions'
import UserOptions from './components/layout/Header/UserOptions.js';
import {useSelector} from 'react-redux';
import Profile from './components/User/Profile.js'
import ProtectedRoute from './components/Routes/ProtectedRoutes';
import UpdateProfile  from './components/User/UpdateProfile';



function App() {

  const {isAuthenticated , user} = useSelector(state=>state.user);

  React.useEffect(()=>{

    webFont.load({
      google:{
        families:["Roboto","Droid Sans" , "Chilanka"]
      }
    });

    store.dispatch(loadUser())
  },[])

  
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user= {user} />}
      <Routes>
      <Route exact path="/account" element={<ProtectedRoute />}>
         <Route exact path="/account" element={<Profile />} />
      </Route>

      <Route exact path="/" element={<Home />} />
      <Route exact path="/product/:id" element={<ProductDetails />} />
      <Route exact path="/products" element={<Products />} />
      <Route exact path="/products/:keyword" element={<Products />} />
      <Route exact path="/search" element={<Search />} />
      <Route exact path="/login" element={<LoginSignup />} />
      

      <Route exact path="/me/update" element={<ProtectedRoute />}>
         <Route exact path="/me/update" element={<UpdateProfile />} />
      </Route>

      </Routes>

      
      <Footer />
    </Router>
  );
}

export default App;
