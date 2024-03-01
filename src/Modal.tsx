import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthContext from "./AuthenticationContext";
import {frontendURL} from './static_ts_files/constants'

export interface ModalProps{
    className: string;
    modalOFF: (style : string) => void;
    overlayOFF: (style : string) => void;
    navbarStatus: (style : string) => void;
}

const Modal: React.FC<ModalProps> = ({ className, modalOFF, overlayOFF, navbarStatus}) => {

    const navigate = useNavigate();
    const {logout, authToken} = useContext(AuthContext);

    const navigateTo = (): void => {
        navigate("/login/", {state: {link: `${frontendURL}/login/`, inputValue: 'Dalej', style: 'active', style2: 'hidden', content: 'E-mail lub numer telefonu komórkowego'}});
    }

    const navigateToMyAccount = (style: string, location: string) => {
        modalOFF(style);
        overlayOFF(style);
        navbarStatus("");
        navigate(location);
    }

    return(
        <div className = {`login-modal ${className}`}>

            <div className = "p-3">
                {authToken == null 
                    ?
                    <button onClick = {() => { navigateTo() }} className = "login-button">Zaloguj się</button>
                    : <button onClick = {logout} className = "login-button">Wyloguj się</button>
                }

                {authToken == null ?
                    <>
                        <span className = {`mt-4`}>Pierwszy raz w serwisie Amazon?</span> <br/>
                        <span className = "link" onClick = {() => {navigate("/registration")}}>Rozpocznij tutaj.</span>
                    </>
                    : <span></span>
                }
            </div>
            
            
            <div className = "d-flex">
                <div className = "line-separator mt-2"></div>
            </div>      

            <div>
                <div>
                    <ul className = "p-5">
                        <li>Moje listy</li>
                        <li>Utwórz listę zakupów</li>
                    </ul>
                </div>

                <div>
                    <ul className = "p-5">
                        <li >Moje konto</li>
                        <li onClick = {() => {navigateToMyAccount("hidden", "/account/")}}>Moje konto</li>
                        <li onClick = {() => {navigateToMyAccount("hidden", "/account/transactions")}}>Moje zamówienia</li>
                        <li>Kup ponownie</li>
                        <li>Moje rekomendacje</li>
                        <li>Mój Prime</li>
                        <li>Sprzedawaj na Amazon</li>
                    </ul>
                </div>
            </div>

        </div>
    );

}

export default Modal;