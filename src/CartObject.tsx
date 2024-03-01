import React, {useEffect, useContext, useState} from 'react';
import AuthContext from "./AuthenticationContext";
import getCookie from './getCookie'
import {backendURL} from './static_ts_files/constants'

interface Item {
    item: {
        id: number;
        quantity: number;
        total_price: number;
        cart: number;
        product: number;

        product_data: 
        {
            brand: string;
            description: string;
            id: number;
            image: string;
            price: number;
            quantity: number;
            category_name: number;
            title: string;
        }
    }    

    ajaxFunction: (num: number) => void;
    prev: (val: number, number: number) => void;
    isPossibleCheck: (val: any) => void
    removeIsPossibleCheck: (val: any) => void
}

interface Data {
    status: boolean;
    product_id : number;
}

const CardObject: React.FC<Item> = ({item, ajaxFunction, prev, isPossibleCheck, removeIsPossibleCheck}) => {
  
    const {authToken} = useContext(AuthContext);
    const [data, setData] = useState<Data | null>(null);
    const [selectedValue, setSelectedValue] = useState<number>(item.quantity);

    useEffect(() => {
        if(item.product_data.quantity < selectedValue) 
            isPossibleCheck(item.product);
        else 
            removeIsPossibleCheck(item.product);
    }, [selectedValue])

    const removeProduct = (index_of_item: number) => {
        try{
            fetch(`${backendURL}/cart/remove/${index_of_item}/`, {
                method: 'DELETE',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
            })
            .then(response => response.json())
            .then(result => ((setData(result), console.log(result))))  
        }
        catch(error){
            alert("Item cannot be removed. Try later.");
        }
    }

    useEffect(() => {
        const updateCart = async () => {

            try {
                const response = await fetch(`${backendURL}/api/cart/update/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    },
                    body: JSON.stringify({"product_id": item.product, "quantity": selectedValue})
                });
                const result = await response.json();
        
                if (result?.code === "token_not_valid") {
                    alert("You have to be authenticated!");
                } 

                else if (!result?.status) {
                    alert(result?.message);
                }
                
                else {
                    prev(selectedValue, result?.message);
                }

            }
            
            catch (error) {
                alert(error);
            }

        };
      
        updateCart();
    }, [selectedValue]);

    useEffect(() => {
        if(data?.status){
            const param = data.product_id;
            handleAjaxRequest(param);
        }

    }, [data])

    const handleAjaxRequest = (num: number): void => {
        ajaxFunction(num);
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(parseInt(e.target.value, 10))
    };

    let statusColor: string;
    let status: string;

    if(item.product_data.quantity >= selectedValue){
        status = "Dostępny"
        statusColor = "text-success";
    }
    
    else {
        status = "Niedostępny"
        statusColor = "text-danger";
    }

    return(
        <div className = "card-content-objects-object">
            <div className = "card-content-objects-inner-col-1">
                <img width = "100" height = "100" loading = "lazy" alt = "object" src= {item.product_data.image} />
            </div>

            <div className = "card-content-objects-inner-col-2">
                <div>
                    <span>{item.product_data.title}</span><br/>
                    <span className = {statusColor}>{status}</span>
                </div>

                <div className = "d-flex">
                    
                    <select value={selectedValue} onChange={handleSelectChange}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                    </select>

                    <span onClick = {() => {removeProduct(item.product)}} className = "link">Usuń</span>
                </div>
            </div>

            <div className = "card-content-objects-inner-col-3">
                <span>{item.total_price} {getCookie("currency") ? getCookie("currency") : "EUR"}</span>
            </div>
        </div>
    );
}

export default CardObject;