import LeftSection from "../../components/ui/layout/LeftSection";
import RightSection from "../../components/ui/layout/RightSection";
import RecommendModal from "../../components/recommend/RecommendModal";
import React from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import TodoModal from "../../components/todo/TodoModal";

const Todo = () => {
    return (
        <>
            <LeftSection>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TodoModal/>
                </LocalizationProvider>
            </LeftSection>
            <RightSection>
                <RecommendModal/>
            </RightSection>
        </>);
};

export default Todo;