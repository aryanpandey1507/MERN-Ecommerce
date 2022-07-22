import React from "react";
import playStore from '../../../images/playstore.png';
import appStore from '../../../images/Appstore.png';
import './Footer.css'

function Footer() {
    return (  
    <footer id='footer'>
       <div className="leftFooter">
        <h4>Download our App</h4>
        <p>Download For Android and IOS  mobile phones</p>
        <img src= {playStore} alt='/playStore' />
        <img src= {appStore} alt='/appStore' />
       </div>

       <div className="midFooter">
          <h1>E-Commerce</h1>
          <p>High quality is our first priority</p>
          <p>Copyrights 2021 &copy; aryanpandey1507 </p>
       </div>


       <div className="rightFooter">
         <h4>Follow Us</h4>
            <a href="https://www.instagram.com/pandeyaryan1507/"  target="_blank" rel="noreferrer" >Instagram</a>
            <a href="https://twitter.com/sudoisAryan" target="_blank" rel="noreferrer" >Twitter</a>
            <a href="https://www.linkedin.com/in/aryan-pandey-71111a154/" target="_blank" rel="noreferrer" >Linkedin</a>
       </div>

    </footer>
    );
}

export default Footer;