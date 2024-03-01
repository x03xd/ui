import {Outlet} from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";
import React, {useState} from 'react';
import Modal from './Modal';
import  './css_modules/TagsStyling.css';
import  './css_modules/AuthLayout.css';
import  './css_modules/App.css';
import  './css_modules/Modal.css';
import './css_modules/CartFinalizing.css';
import './css_modules/Main.css';
import './css_modules/Store.css';
import  './css_modules/Navbar.css';
import  './css_modules/Footer.css';
import  './css_modules/Banner.css';
import  './css_modules/Lobby.css';
import  './css_modules/Cart.css';
import  './css_modules/CartObject.css'
import  './css_modules/Alert.css';
import './css_modules/Rating.css';
import './css_modules/NarrowGrid.css'
import './css_modules/MyAccount.css';
import './css_modules/MyAccountCard.css';
import './css_modules/EditProfile.css';
import './css_modules/SingleTransaction.css';
import './css_modules/ProductCard.css';
import './css_modules/Recommendation.css';
import './css_modules/Opinions.css';
import './css_modules/SingleLobbyRate.css';


const App: React.FC = () => {

    const [overlayStyle, setOverlay] = useState<string>("");
    const [loginModalStyle, setLoginModal] = useState<string>("");
    const [unclick, setUnclick] = useState<string>("");

    const overlayStyler = (style: string): void => {
        setOverlay(style);
    }
    
    const loginModalStyler = (style: string): void => {
        setLoginModal(style);
    }
    
    const unclickableNavbar = (style: string): void => {
        setUnclick(style);
    }

    return (
        <div className = "main-container">
                <div className = {`navbar ${unclick}`}>
                    <Navbar dropStyle = {overlayStyle} unclick = {unclick} overlayStyle = {overlayStyler} loginModalStyle = {loginModalStyler} unclickableNavbarChild = {unclickableNavbar}/>
                    <Modal className = {loginModalStyle} modalOFF = {loginModalStyler} overlayOFF = {overlayStyler} navbarStatus = {unclickableNavbar} />
                </div>

                <div className = "side-main"></div>

                <div className = "main">

                    <div className = "content mt-4">
                        <div className = {`overlay ${overlayStyle}`} onClick = {() => {setOverlay(""); loginModalStyler(""); unclickableNavbar("")}}></div>
                        <Outlet />
                    </div>

                </div>

                <div className = "side-main-2"></div>

                <div className = "footer">
                    <Footer />
                </div>
        </div>
    );
}



export default App;