import React, {useMemo} from "react";
import EatingMealItem from "./EatingMealItem";
import {meal} from "../../util/meal";
import {useLocation} from "react-router-dom";

const EatingMealList = ({mealList}) => {
    const location = useLocation();
    const mealNames = useMemo(() => meal.map(item => item.meal_name), []);
    const missingMeals = useMemo(() => mealNames.filter(item => !mealList.includes(item)), [mealList, mealNames]);

    const renderMissingMeals = useMemo(() => location.pathname === '/todo' && missingMeals.length > 0, [location.pathname, missingMeals]);

    return (
        <div className="EatingMealList">
            {mealList.map((item) => (
                <EatingMealItem key={item} meal={item}/>
            ))}
            {renderMissingMeals && missingMeals.map((item, index) => (
                <div className="add-meal" key={index}>
                    {item}<br/>
                    + 추가하기
                </div>
            ))}
        </div>
    );
};

export default React.memo(EatingMealList);
