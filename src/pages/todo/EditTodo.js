import LeftSection from "../../components/ui/layout/LeftSection";
import RightSection from "../../components/ui/layout/RightSection";
import React from "react";
import Nav from "../../components/ui/layout/Nav";
import dayjs from "dayjs";
import TodoDetail from "../../components/todo/TodoDetail";

import '../../scss/EditTodo.scss';
import EditCheckList from "../../components/todo/EditCheckList";
import RegCheckList from "../../components/todo/RegCheckList";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";

const dummyData = {
    id: 4,
    title: "4번",
    diary: "오늘의 일기 1번",
    checklist: ["체크리스트1", "체크리스트2"],
    meal: ["breakfast", "lunch", "snack"],
    date: dayjs(),
};

const EditTodo = () => {
    return (
        <>
            <LeftSection>
                <Nav/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TodoDetail originData={dummyData}/>
                </LocalizationProvider>
            </LeftSection>
            <RightSection>
                <RegCheckList/>
                <EditCheckList checklist={dummyData.checklist}/>
            </RightSection>
        </>
    );
};

export default EditTodo;