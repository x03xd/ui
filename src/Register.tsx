import {useNavigate} from 'react-router-dom';
import React, {useState, useRef} from 'react';
import Alert from './Alert';
import {backendURL, frontendURL} from './static_ts_files/constants'


const Register: React.FC = () => {

    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const password2Ref = useRef<HTMLInputElement>(null);

    const [dangerBorder, setDangerBorder] = useState("");
    const [alertText, setAlertText] = useState<string>("");
    const [alertStyle, setAlertStyle] = useState<string>("hidden");

    const navigate = useNavigate();

    const navigateTo = (): void => {
        navigate("/login/", {state: {link: `${frontendURL}/login/`, inputValue: 'Dalej', style: 'active', style2: 'hidden', content: 'E-mail lub numer telefonu komórkowego'}});
    }

    async function submitForm(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
            
        if(passwordRef.current?.value !== password2Ref.current?.value){
            setDangerBorder("border border-danger")
        }

        else setDangerBorder("")

        try{
            const response = await fetch(`${backendURL}/registration/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({"email":emailRef.current?.value, "username":usernameRef.current?.value, "password":passwordRef.current?.value, "password2":password2Ref.current?.value})
            })
            const responseJSON = await response.json()

            if(responseJSON?.status){
                setAlertStyle("hidden");
                navigate("/")
            }
    
            else {
                setAlertStyle("active");
                setAlertText(responseJSON?.detail || responseJSON?.error?.email);
            }

        }
        catch(error){alert('An error occurred. Please try again later.');}
    }


    return(
         <div className = "modal-container-wrapper">

            <div>
                <Alert style = {alertStyle} text = {alertText} />
            </div>

            <div className = "modal-container classic-border">

                <p className = "">Utwórz konto</p>

                <form onSubmit = {submitForm} method = "POST">
                    <span className = "">Nazwa użytkownika</span>
                    <input ref = {usernameRef} name = "username" defaultValue = "" className = "text-input login" type = "text" placeholder = "Imię i nazwisko" /><br/>

                    <span className = "">Adres e-mail</span>
                    <input ref = {emailRef} name = "email" defaultValue = "" className = "text-input login" type = "text"  /><br/>

                    <span className = "">Hasło</span>
                    <input ref = {passwordRef} name = "password" defaultValue = "" className = {`text-input login ${dangerBorder}`} type = "password"  placeholder = "Co najmniej 8 znaków" /><br/>

                    <span className = "">Ponownie podaj hasło</span>
                    <input ref = {password2Ref} name = "password2" defaultValue = "" className = {`text-input login ${dangerBorder}`} type = "password"  /><br/>

                    <input value = "Utwórz konto Amazon" type = "submit" className = "login-button login" />
                </form>

                <div className = "mt-4">
                    <input type = "checkbox" /> {'\u00A0'}
                    <span>Zaznacz to pole, aby otrzymywać powiadomienia o nowych produktach, pomysłach na prezenty, specjalnych okazjach, promocjach i nie tylko. Wyrażam zgodę na otrzymywanie informacji marketingowych, w tym okazji i promocji, od Amazon za pomocą środków komunikacji elektronicznej takich jak e-mail. Możesz dostosować zakres lub zrezygnować z otrzymywanych od nas wiadomości, korzystając z karty Moje konto lub ustawień powiadomień w swojej aplikacji lub na urządzeniu mobilnym.</span>
                </div>

                <div className = "mt-5">
                    <span>Masz już konto? </span>
                    <span className = "cursor-finger" onClick = {() => {navigateTo()}}>Zaloguj się</span>
                </div>

            </div>
        </div>

    );

}

export default Register;