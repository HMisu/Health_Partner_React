import React, {useRef} from "react";
import {TextField} from "@mui/material";
import EatingMealList from "./EatingMealList";
import SearchFood from "./SearchFood";
import {DateTimePicker} from "@mui/x-date-pickers";

const TodoDetail = ({todo, setTitle, setDiary, setDate, handleAddMeal, handleDeleteMeal}) => {
    const searchFoodRef = useRef(null);

    const handleAddButtonClick = () => {
        if (searchFoodRef.current) {
            searchFoodRef.current.focus();
        }
    };

    return (
        <div className="TodoDetail">
            <TextField
                fullWidth
                label="Title"
                name="title"
                value={todo.title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <DateTimePicker
                views={['year', 'month', 'day']}
                value={todo.date}
                onChange={setDate}
                renderInput={(params) => <TextField {...params} />}
            />
            <div className="meal-list">
                <EatingMealList
                    mealList={todo.mealList}
                    onAddButtonClick={handleAddButtonClick}
                    handleDeleteMeal={handleDeleteMeal}
                />
            </div>
            <div className="edit-meal">
                <SearchFood ref={searchFoodRef} mealList={todo.mealList}
                            onAddMeal={(mealToAdd) => handleAddMeal(mealToAdd)}/>
            </div>
            <TextField
                label="Writing a diary"
                name="diary"
                className="diary"
                fullWidth
                multiline
                rows={10}
                value={todo.diary}
                onChange={(e) => setDiary(e.target.value)}
            />
        </div>
    );
};

export default TodoDetail;
