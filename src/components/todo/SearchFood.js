import {TextField} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import React, {useCallback, useState} from "react";

const SearchFood = () => {
    const [food, setFood] = useState("");
    const [showFoodInfo, setShowFoodInfo] = useState(false);

    const handleFoodClick = useCallback((foodName) => {
        setFood(foodName);
        setShowFoodInfo(true);
    }, []);

    return (
        <div className="search-container">
            <div className="SearchFood">
                <TextField
                    fullWidth
                    label="SearchFood"
                    name="search"
                />
                <div className="search-list">
                    <div className="food">
                        <div className="info">
                            <span className="name">돼지고기 김치찌개</span>
                            &nbsp;<span className="kcal">350kcal</span>
                        </div>
                        <button onClick={() => handleFoodClick("돼지고기 김치찌개")}><AddRoundedIcon/></button>
                    </div>
                    <div className="food">
                        <div className="info">
                            <span className="name">소고기 김치찌개</span>
                            &nbsp;<span className="kcal">400kcal</span>
                        </div>
                        <button onClick={() => handleFoodClick("소고기 김치찌개")}><AddRoundedIcon/></button>
                    </div>
                </div>
            </div>
            {showFoodInfo && (
                <div className="info">
                    <img src={process.env.PUBLIC_URL + 'assets/food.jpg'} alt=""/>
                    <div>
                        <h4 className="name">{food}</h4>
                        &nbsp;<span className="kcal">350kcal</span>
                        <div className="nutrient">
                            <h6>영양소</h6>
                            단백질 10g
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(SearchFood);
