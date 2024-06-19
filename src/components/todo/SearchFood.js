import React, {useCallback, useMemo, useState} from "react";
import {TextField} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {useDispatch} from "react-redux";
import {searchFood} from "../../slices/foodSlice";
import {meal} from "../../util/meal";

const SearchFood = React.forwardRef((props, ref) => {
    const mealNames = useMemo(() => meal.map(item => item.meal_name), []);

    const [food, setFood] = useState(null);
    const [showFoodInfo, setShowFoodInfo] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchFoods, setSearchFoods] = useState(null);

    const handleFoodClick = useCallback((foodId) => {
        const selectedFood = searchFoods.find(item => item.id === foodId);
        if (selectedFood) {
            setFood(selectedFood);
            setShowFoodInfo(true);
        }
    }, [searchFoods]);

    const handleMealAdd = useCallback((mealName) => {
        if (food) {
            if (props.mealList) {
                const isAlreadyAdded = props.mealList.some(item => item.mealType === mealName && item.foodCode === food.id);
                if (isAlreadyAdded) {
                    alert("이미 추가된 식사입니다.");
                    return;
                }
            }

            const mealToAdd = {
                mealType: mealName,
                foodCode: food.id,
                name: food.name,
                energy: food.energy,
                protein: food.protein,
                fat: food.fat,
                carbohydrates: food.carbohydrates
            };

            props.onAddMeal(mealToAdd);
            setShowFoodInfo(false);
        }
    }, [food, props.mealList, props]);

    const dispatch = useDispatch();

    const handleSearch = useCallback((searchKeyword) => {
        dispatch(searchFood(searchKeyword))
            .then((result) => {
                setSearchFoods(result.payload);
            })
            .catch((error) => {
                console.error("Failed to fetch profile: ", error);
            });
    }, [dispatch]);

    const handleKeyPress = useCallback(
        (event) => {
            if (event.key === "Enter") {
                setSearchKeyword(event.target.value);
                handleSearch(event.target.value);
            }
        },
        [handleSearch]
    );

    return (
        <div className="search-container">
            <div className="SearchFood">
                <TextField
                    fullWidth
                    label="SearchFood"
                    name="search"
                    onKeyDown={handleKeyPress}
                    inputRef={ref}
                />
                <div className="search-list">
                    {searchFoods && searchFoods.map((item) => (
                        <div className="food" key={item.id}>
                            <div className="info">
                                <span className="name">{item.name}</span>
                                &nbsp;<span className="kcal">{item.energy}kcal</span>
                            </div>
                            <button onClick={() => handleFoodClick(item.id)}><AddRoundedIcon/></button>
                        </div>
                    ))}
                </div>
            </div>
            {showFoodInfo && (
                <div className="info">
                    <div>
                        <h4 className="name">{food.name}</h4>
                        &nbsp;<span className="kcal">{food.energy}kcal</span>
                        <div className="nutrient">
                            <h6>영양소</h6>
                            단백질 {food.protein}g<br/>
                            탄수화물 {food.carbohydrates}g<br/>
                            지방 {food.fat}g<br/>
                        </div>
                        {mealNames.map((item, index) => (
                            <div className="add-meal" key={index} onClick={() => handleMealAdd(item)}>
                                {item}<br/>
                                + 추가하기
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
});

export default React.memo(SearchFood);
