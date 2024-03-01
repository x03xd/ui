import React, {useState, useEffect, useRef, useContext} from 'react';
import {UserInterface} from './static_ts_files/commonInterfaces'
import SingleLobbyRate from './SingleLobbyRate'
import CountingRate from './CountingRate';
import leftArrow from './images/left-arrow.png';
import user_img from './images/user.png'
import rightArrow from './images/right-arrow.png';
import deletebutton from './images/deletebutton.png'
import AuthContext from "./AuthenticationContext";
import {backendURL} from './static_ts_files/constants'

interface OpinionsProps {
    product_id: number;
}
interface Rate {
    id: number;
    rate: number;
    rated_products: number;
    rated_by: number;
}

interface Opinion {
    id: number;
    rate: Rate;
    title: string;
    text: string;
    reviewed_date: string;
    reviewed_product: string;
    reviewed_by: UserInterface;
}

const Rating: React.FC<OpinionsProps> = ({ product_id }) => {

    const [opinions, setOpinions] = useState<Opinion[] | null>(null);
    const [pages, setPages] = useState<number>(0);
    const [user, setUser] = useState<UserInterface | null>(null);
    
    const {authToken, fetchUserData} = useContext(AuthContext);

    const textAreaValue = useRef<HTMLTextAreaElement | null>(null);
    const inputTitleValue = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const userData: any = await fetchUserData();

            if(userData != null)
                setUser(userData)
        }
        fetchData()
    },[])

    useEffect(() => {
        try{
            fetch(`${backendURL}/opinions/${product_id}/${pages}`)
            .then(response => response.json())
            .then(result => setOpinions(result.queryset));
        }
        catch(error){ 
            console.log(error)
            alert("Opinions cannot be displayed");
        }
    }, [pages])

    
    const selectPage = (num: number) => {
        if(opinions && opinions?.length < 5 && num > 0) return null;
        if(pages + num >= 0) {setPages(current_page => current_page + num)}
    }

    async function sendOpinion(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try{
            const response = await fetch(`${backendURL}/opinions/create/${product_id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`, 
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({"text": textAreaValue.current?.value, "title": inputTitleValue.current?.value})
            })
            const responseJSON = await response.json()
            console.log(responseJSON)

            if(responseJSON?.code === "token_not_valid"){
                alert("You have to be authenticated!")
            }

            else if(responseJSON?.status){ 
                window.location.reload()
            }
    
            else {
                alert(responseJSON?.detail)
            }

        }

        catch(error){
            alert("Error: " + error);
        }

    }

    async function removeOpinion(opinion_number: number){
        try{
            const response = await fetch(`${backendURL}/opinions/remove/${opinion_number}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`, 
                    'Content-Type':'application/json',
                },
            })
            const responseJSON = await response.json()

            if(responseJSON?.code === "token_not_valid"){
                alert("You have to be authenticated!")
            }

            else if(responseJSON?.status){
                window.location.reload()
            }
    
            else {
                alert(responseJSON?.detail)
            }
        }
        catch(error){alert("Error: " + error);}
    }

    return(
        <div className = "lobby-opinions">  
            <div className = "lobby-opinions-header"> 
                <div>
                    <p className = "lobby-opinions-title">Opinie o produkcie</p>
                </div>

                <div>
                    {(opinions !== null) ?
                        opinions.length > 0 ?
                        (<div className = "mx">
                            <img onClick = {() => selectPage(-5)} className = "mb-3 ms-3 cursor-finger" width = "32" src = {leftArrow} alt = "left-arrow" loading = "lazy" />
                            <img onClick = {() => selectPage(5)} className = "mb-3 ms-3 cursor-finger" width = "32" src = {rightArrow} alt = "left-arrow" loading = "lazy" />                      
                        </div>)

                        :
                        (<div className = "no-opinions">
                            <span>Brak opinii klientów</span>
                        </div>)
                        : 
                        <></>
                    }
                </div>
            </div>

            <div className = "lobby-opinions-rating-percentages">
                <SingleLobbyRate product_id = {product_id} />
            </div>

            <div className = "lobby-opinions-text">
                <div className = "lobby-opinions-main">
                    {Array.isArray(opinions)
                        ? opinions.map((opinion: Opinion, index: number) => (
                            <div className = "opinion" key = {index}>

                                <div className = "opinion-user-and-avatar">
                                    <img src = {user_img} alt = "avatar" loading = "lazy" />
                                    <span className = "opinion-reviewed-by-username">{opinion.reviewed_by.username}</span>
                                    {
                                        user?.id === opinion.reviewed_by.id ? <img className = "cursor-finger" src = {deletebutton} loading = "lazy" alt = "remove" onClick = {() => {removeOpinion(opinion.id)}} />: <></>
                                    }
                                </div>
                            
                                <div className = "star-rating-container mt-3">
                                    <CountingRate rate = {opinion?.rate?.rate} />
                                    <span className = "opinion-title">{opinion.title}</span>
                                </div>
                                    
                                <span className = "opinion-date">Opinia napisana dnia: {opinion.reviewed_date}</span>
                                <br/>
                                <span className = "verified-order">Zweryfkowany zakup</span>
                                <br/>
                                    
                                <div className = "opinion-text-container mt-3">
                                    <span className = "opinion-text">{opinion.text}</span>
                                </div>
                            </div>
                        ))
                        : <></>
                        }
                    </div>

                <div className = "lobby-opinions-comment mt-5">
                    <div className = "lobby-opinions-comment-input">
                        <form onSubmit = {sendOpinion}>
                            <input className = "text-input" placeholder = "Tytuł..." id="user_comment-title" type = "text" ref = {inputTitleValue} />
                            <textarea className = "text-input" id="user_comment" name="user_comment" ref = {textAreaValue}></textarea>
                            <button className = "login-button mt-3" type="submit">Wyślij</button>
                        </form>
                    </div>
                </div>

            </div>

            <div>
            </div>
        </div>
    );

}

export default Rating;