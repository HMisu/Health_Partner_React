import React, {useCallback} from "react";
import {meal} from "../../util/meal";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

const EatingMealItem = ({meals, handleDeleteMeal}) => {
    const img_url = process.env.PUBLIC_URL + 'assets/food.jpg';

    const groupMealsByMealType = () => {
        if (!Array.isArray(meals)) return {};

        const groupedMeals = {};

        meals.forEach(meal => {
            if (!groupedMeals[meal.mealType]) {
                groupedMeals[meal.mealType] = [];
            }
            groupedMeals[meal.mealType].push(meal);
        });

        return groupedMeals;
    };

    const groupedMeals = groupMealsByMealType();

    const getMealName = (mealType) => {
        const foundMeal = meal.find(item => item.meal_name === mealType);
        return foundMeal ? foundMeal.meal_name : "";
    };

    const handleFoodDelete = useCallback((food) => {
        handleDeleteMeal(food);
    }, [handleDeleteMeal]);

    return (
        <div>
            {Object.entries(groupedMeals).map(([mealType, foods], index) => (
                <article className="EatingMealItem" key={index}>
                    <div
                        style={{
                            backgroundImage: `linear-gradient(
                rgba(0, 0, 0, 0.3),
                rgba(0, 0, 0, 0.3)
              ), url(${img_url})`
                        }}
                    >
                        <div className="mealtime">{getMealName(mealType)}</div>
                        <div className="foodList">
                            {foods.map((food, foodIndex) => (
                                <div className="food" key={foodIndex}>
                                    <span className="name">{food.name}</span>
                                    <span className="kcal">{food.energy}kcal</span>
                                    <button onClick={() => handleFoodDelete(food)}>
                                        <RemoveRoundedIcon/></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default EatingMealItem;
