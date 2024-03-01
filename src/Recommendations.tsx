import {useEffect, useState, useContext} from 'react';
import AuthContext from "./AuthenticationContext";
import ProductsWithRatings from './ProductsWithRatings';
import { ProductsInterface } from './static_ts_files/commonInterfaces';
import {backendURL} from './static_ts_files/constants'

interface RecommendationProps {
    products_id: number[];
}

const Recommendations: React.FC<RecommendationProps> = ({ products_id }) => {

    const [recommended, setRecommendations] = useState<ProductsInterface[]>([]);
    const {authToken} = useContext(AuthContext);
    const joined = Array.isArray(products_id) ? products_id.join(", ") : "";

    useEffect(() => {
        
        try {
            fetch(`${backendURL}/recommendations/${joined}/`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`, 
                    'Content-Type':'application/json',
                }
            })
            .then(response => response.json())
            .then(result => setRecommendations(result?.recommendations))
        }
            
        catch (error) {
            alert('An error occurred. Please try again later.');
        }
        
    }, []);

    return(
        <>
            <div className = "recommendation-title">
                <p className = "ms-4 mt-3">Użytkownicy, którzy kupili ten produkt, kupili również: </p>
            </div>

            <div className = "recommendation-content-results">
                <ProductsWithRatings products = {recommended} />
            </div>
        </>
    );
}

export default Recommendations;
