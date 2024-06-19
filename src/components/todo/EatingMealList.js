import React, {useMemo} from "react";
import EatingMealItem from "./EatingMealItem";
import {meal} from "../../util/meal";

const EatingMealList = ({mealList, onAddButtonClick, handleDeleteMeal}) => {
    const missingMealNames = useMemo(() => {
        return meal
            .filter(item => !mealList.some(mealItem => mealItem.mealType === item.meal_name))
            .map(item => item.meal_name);
    }, [mealList]);

    return (
        <div className="EatingMealList">
            <EatingMealItem meals={mealList} handleDeleteMeal={handleDeleteMeal}/>
            <div>
                {missingMealNames && missingMealNames.map((item, index) => (
                    <div className="add-meal" key={index} onClick={onAddButtonClick}>
                        {item}<br/>
                        + 추가하기
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(EatingMealList);