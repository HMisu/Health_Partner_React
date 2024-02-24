import React from "react";
import EatingMealItem from "./EatingMealItem";
import {meal} from "../../util/meal";

const EatingMealList = ({mealList}) => {
    const mealNames = meal.map(item => item.meal_name);
    const missingMeals = mealNames.filter(item => !mealList.includes(item));

    return (
        <div className="EatingMealList">
            {mealList.map((item) => (
                <EatingMealItem key={item}/>
            ))}
            {missingMeals.map((item) => {
                <div></div>
            })}
        </div>
    );
};

export default EatingMealList;