import TodoModal from "../../components/todo/TodoModal";
import RecommendModal from "../../components/recommend/RecommendModal";
import React from "react";
import UserInfoModal from "../../components/user/UserInfoModal";
import LeftSection from "../../components/ui/layout/LeftSection";
import RightSection from "../../components/ui/layout/RightSection";

import '../../scss/ui/layout/Section.scss';
import '../../scss/Todo.scss';
import '../../scss/Recommend.scss';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

const Home = () => {
    return (
        <>
            <LeftSection>
                <UserInfoModal/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TodoModal/>
                </LocalizationProvider>
            </LeftSection>
            <RightSection>
                <RecommendModal/>
            </RightSection>
        </>
    );
};

export default Home;