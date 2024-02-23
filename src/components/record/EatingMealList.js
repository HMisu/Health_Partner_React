import React from "react";
import EatingMealItem from "./EatingMealItem";

const EatingMealList = ({mealList}) => {
    return (
        <div className="EatingMealList">
            {/*<EatingMealItem key={"breakfast"}/>*/}
            {/*<EatingMealItem key={"lunch"}/>*/}
            {/*<EatingMealItem key={"Dinner"}/>*/}
            {/*<EatingMealItem key={"Snack"}/>*/}

            {mealList.map((item) => (
                <EatingMealItem key={item}/>
            ))}
        </div>
    );
};

export default EatingMealList;