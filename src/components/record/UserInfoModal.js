import EditHeightWeight from "./EditHeightWeight";
import EatingMealList from "./EatingMealList";
import {getStringDate} from "../../util/date";
import React from "react";

const mealList = ["breakfast", "lunch", "snack"];

const UserInfoModal = () => {

    return (
        <div className="UserInfoModal">
            <div><span className="date">Today : {getStringDate(new Date())}</span></div>
            <div className="EditHeightWeight">
                <EditHeightWeight/>
            </div>
            <div>
                <h4>Today's Meal</h4>
                <EatingMealList mealList={mealList}/>
            </div>
        </div>
    );
};

export default UserInfoModal;