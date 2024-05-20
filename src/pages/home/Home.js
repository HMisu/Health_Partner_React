import TodoModal from "../../components/todo/TodoModal";
import RecommendModal from "../../components/recommend/RecommendModal";
import React, {useEffect} from "react";
import UserInfoModal from "../../components/user/UserInfoModal";
import LeftSection from "../../components/ui/layout/LeftSection";
import RightSection from "../../components/ui/layout/RightSection";

import '../../scss/ui/layout/Section.scss';
import '../../scss/Todo.scss';
import '../../scss/Recommend.scss';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const isSignIn = useSelector(state => state.member.isSignIn);
    const navi = useNavigate();
    useEffect(() => {
        if (!isSignIn) {
            alert("로그인이 필요합니다.");
            navi("/signin");
        }
    }, [isSignIn, navi]);


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