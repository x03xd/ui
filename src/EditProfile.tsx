import React, {useEffect, useState, useContext} from 'react';
import AuthContext from "./AuthenticationContext";
import EditProfileCard from "./EditProfileCard"
import {UserInterface} from './static_ts_files/commonInterfaces'
import { useNavigate } from 'react-router-dom';
import {backendURL} from './static_ts_files/constants'

export interface AccessToChangeUsernameState {
    username: [boolean, string];
    email: [boolean, string];
    password: [boolean, string];
}

export interface DataOfOperation {
    id: number;
    accessLink: string;
    link: string;
    header: string;
    text: string;
    buttonValue: string;
    shortcut: string;
}

const EditProfile : React.FC = () => {

    const [accessToChange, setAccessToChangeUsername] = useState<AccessToChangeUsernameState | null>(null);
    const [user, setUser] = useState<UserInterface | null>(null);
    const {authToken, fetchUserData} = useContext(AuthContext);
    const navigate = useNavigate();

    const data: DataOfOperation[] = [
        {id: 1, accessLink: "username_change_allowed", link: "edit-username", shortcut: "username", header: "Nazwa użytkownika:", text: user?.username || "", buttonValue: "Edytuj"},
        {id: 2, accessLink: "email_change_allowed", link: "edit-email", shortcut: "email", header: "Adres e-mail:", text: user?.email || "", buttonValue: "Edytuj"},
        {id: 3, accessLink: "password_change_allowed", link: "change-password", shortcut: "password", header: "Hasło:", text: "********", buttonValue: "Edytuj"},
        {id: 4, accessLink: "", link: "add-phone", shortcut: 'phone', header: "Podstawowy numer telefonu komórkowego:", text: "Aby zwiększyć bezpieczeństwo konta, dodaj swój numer telefonu komórkowego.", buttonValue: "Dodaj"},
        {id: 5, accessLink: "", link: "two-step-verifying", shortcut: 'verifiction', header: "Weryfikacja dwuetapowa:", text: "Dodaj poziom zabezpieczeń. Wymagaj kodu weryfikacyjnego oprócz hasła.", buttonValue: "Włącz"},
        {id: 6, accessLink: "", link: "help", shortcut: 'help', header: "Naruszono zabezpieczenia konta?:", text: "Podejmij takie kroki, jak zmiana hasła i wylogowanie się ze wszystkich urządzeń", buttonValue: "Rozpocznij"},
    ]

    useEffect(() => {
        const fetchData = async () => {
            const userData: any = await fetchUserData();
            setUser(userData);
        };
        fetchData();
    }, []);

    
    useEffect(() => {

        try{
            fetch(`${backendURL}/access-to-change-status/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type':'application/json',
                },
            })
            .then(response => response.json())
            .then(result => {

                if(result?.code === "token_not_valid"){
                    alert("You have to be authenticated!")
                    navigate("/")
                }

                else
                setAccessToChangeUsername(result)
            
            })
        }

        catch(error){
            alert('An error occurred. Please try again later.');
        }

    }, [])

    return(
        <div className = "my-account-content">
            <div></div>

            <div>
                <div className = "edit-profile-container">

                    <div></div>

                    <div className = "edit-profile-container-main">
                        <span className = "narrow-container-title">Logowanie i bezpieczeństwo</span>
                        <div className = "mt-3">
                            {
                                data.map((item: DataOfOperation, index: number) => <EditProfileCard access = {accessToChange} key = {index} link = {item.link} id = {index} header = {item.header} accessLink = {item.accessLink} text = {item.text} buttonValue = {item.buttonValue} shortcut = {item.shortcut} /> )
                            }                      
                        </div>
                    </div>  

                    <div></div>

                </div>  
            </div>

            <div></div>
        </div>
    )

}


export default EditProfile