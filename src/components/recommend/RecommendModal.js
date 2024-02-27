import React from "react";
import FoodList from "./FoodList";
import Button from "../ui/Button";

const RecommendModal = () => {
    return (
        <div className="RecommendModal">
            <img className="emotion" src={process.env.PUBLIC_URL + `assets/emotion/ico_emotion5.png`} alt="sun_icon"/>
            <div className="recommend-comment">
               <span className="title">
                   OO님 일일 섭취 칼로리가 너무 낮습니다
               </span><br/>
                <h1 className="kcal">
                    -&nbsp;500Kcal
                </h1>
                <span className="description">
                    <span>추가 섭취 필요한 영양성분</span><br/>
                    단백질 10g<br/>
                    탄수화물 30<br/>
                </span>
            </div>
            <h6 className="recommend-title">이런 음식을 먹어보세요</h6>
            <FoodList/>
            <Button text={"Today's Meal Record"} type={"positive"}/>
        </div>
    );
};

export default RecommendModal;