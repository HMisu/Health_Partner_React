import {TextField} from "@mui/material";
import EatingMealList from "./EatingMealList";
import React, {useCallback, useState} from "react";
import SearchFood from "./SearchFood";
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";

const TodoDetail = ({originData}) => {
    const initialDate = dayjs();
    const [data, setData] = useState(originData);
    const handleMealListChange = useCallback((newMealList) => {
        setData({...data, meal: newMealList});
    }, [data]);

    return (
        <div className="TodoDetail">
            <TextField fullWidth label="Title" name="title"/>
            <DateTimePicker
                views={['year', 'month', 'day']}
                value={initialDate}/>
            <div className="meal-list">
                <EatingMealList mealList={data.meal} onMealListChange={handleMealListChange}/>
            </div>
            <div className="edit-meal">
                <SearchFood/>
            </div>
            <TextField label="Writing a diary" name="diary" className="diary"
                       fullWidth multiline rows={10}/>
        </div>
    );
};

export default TodoDetail;
