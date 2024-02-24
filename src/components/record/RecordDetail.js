import {TextField} from "@mui/material";
import EatingMealList from "./EatingMealList";
import React, {useState} from "react";
import SearchFood from "./SearchFood";

const RecordDetail = ({originData}) => {
    const [data, setData] = useState(originData);
    return (
        <div className="RecordDetail">
            <TextField fullWidth label="Title" name="title"/>
            <div className="meal-list">
                <EatingMealList mealList={data.meal}/>
            </div>
            <div className="edit-meal">
                <SearchFood/>
            </div>
            <TextField fullWidth multiline label="Diary" name="diary" className="diary"/>
        </div>
    );
};


export default RecordDetail;