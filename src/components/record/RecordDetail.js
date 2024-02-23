import {TextField} from "@mui/material";
import EatingMealList from "./EatingMealList";
import React, {useState} from "react";
import CheckList from "./CheckList";

const RecordDetail = ({originData}) => {
    const [data, setData] = useState(originData);

    return (
        <div className="RecordDetail">
            <TextField fullWidth label="Title" name="title"/>
            <TextField fullWidth label="Diary" name="diary"/>
            <div className="meal-list">
                <EatingMealList mealList={data.meal}/>
            </div>
            <CheckList checklist={data.checklist}/>
        </div>
    );
};


export default RecordDetail;