import FoodItem from "./FoodItem";
import React from "react";

const FoodList = ({foodList}) => {
    return (
        <div className="FoodList">
            {foodList && (
                foodList.map((item, index) => (
                    <FoodItem key={index} food={item}/>
                )))}
        </div>
    );
};

export default FoodList;