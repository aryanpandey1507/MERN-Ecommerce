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



function App() {

  React.useEffect(()=>{

    webFont.load({
      google:{
        families:["Roboto","Droid Sans" , "Chilanka"]
      }
    })
  },[])

  
  return (
    <Router>
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:keyword" element={<Products />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<LoginSignup />} />
      
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
