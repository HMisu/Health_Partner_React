import React from "react";
import FoodList from "./FoodList";
import Button from "../ui/Button";
import {useNavigate} from "react-router-dom";

const RecommendModal = ({recommendFoods}) => {
    const navi = useNavigate();
    const handleButtonClick = () => {
        navi("/todo/write");
    };

    return (
        <div className="RecommendModal">
            <img className="emotion" src={process.env.PUBLIC_URL + `assets/emotion/ico_emotion5.png`} alt="sun_icon"/>
            <div className="recommend-comment">
                <span className="title">
                    {recommendFoods.remainingCalories < 0
                        ? "일일 섭취 칼로리 초과"
                        : "일일 섭취 칼로리 부족"}
                </span><br/>
                <h1 className="kcal">
                    {recommendFoods.remainingCalories < 0
                        ? `+ ${Math.abs(Math.floor(recommendFoods.remainingCalories))} Kcal`
                        : `- ${Math.floor(recommendFoods.remainingCalories)} Kcal`}
                </h1>
                <span className="description">
                    <span>추가 섭취 필요한 영양성분</span><br/>
                    단백질 {recommendFoods.remainingProtein > 0 ? recommendFoods.remainingProtein.toFixed(1) + "g" : "-"}<br/>
                    탄수화물 {recommendFoods.remainingCarbohydrates > 0 ? recommendFoods.remainingCarbohydrates.toFixed(1) + "g" : "-"}<br/>
                    지방 {recommendFoods.remainingFat > 0 ? recommendFoods.remainingFat.toFixed(1) + "g" : "-"}<br/>
                </span>
            </div>
            <h6 className="recommend-title">이런 음식을 먹어보세요</h6>
            <FoodList foodList={recommendFoods.foodList}/>
            <Button text={"Today's Meal Record"} type={"positive"} onClick={handleButtonClick}/>
        </div>
    );
};

export default RecommendModal;
