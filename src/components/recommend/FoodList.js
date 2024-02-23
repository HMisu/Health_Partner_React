import FoodItem from "./FoodItem";
import React from "react";

const FoodList = () => {
    return (
        <div className="FoodList">
            <FoodItem key={1}/>
            <FoodItem key={2}/>
            <FoodItem key={3}/>
            <FoodItem key={4}/>
        </div>
    );
};

export default FoodList;