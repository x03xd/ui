import React from 'react';

export interface GridBoxProps {
    className: string;
    boxTitle: string;
    list: string[][];
}

const GridBox: React.FC<GridBoxProps> = ({ className, boxTitle, list }) => {

    return(
            <div className = {`card-nbt ${className}`}>
                <div className = "home-header-card">
                    <h2 className = "cr-black pt-4 fw-600">{boxTitle}</h2>
                </div>

                <div className = "home-body-card">

                    {list.map(
                        ((element, index) =>
                            <div key = {index}>
                                <img src = {element[0]} loading = "lazy" alt = "product" />
                                <span>{element[1]}</span>
                            </div>
                        )
                    )}
                    
                </div>

                <div className = "home-footer-card">
                    <a href = "#" className = "standard-a">Zobacz więcej</a>
                </div>
            </div>

    );

}

export default GridBox;