import LeftSection from "../../components/ui/layout/LeftSection";
import RightSection from "../../components/ui/layout/RightSection";
import RecommendModal from "../../components/recommend/RecommendModal";
import React, {useCallback, useEffect, useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import TodoModal from "../../components/todo/TodoModal";
import dayjs from "dayjs";
import {getTodosByDate, getTodosByWeeks, setTodos} from "../../slices/todoSlice";
import {useDispatch, useSelector} from "react-redux";
import {getRecommendFoods} from "../../slices/foodSlice";
import {batchProcess} from "../../slices/batchSlice";
import {useNavigate} from "react-router-dom";

const Todo = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [activeTab, setActiveTab] = useState(0);
    const [waterByDate, setWaterByDate] = useState(0);
    const [needAdditionalInfo, setNeedAdditionalInfo] = useState(false); // 추가적인 회원 정보 입력 필요 여부

    const [recommendFoods, setRecommendFoods] = useState({
        foodList: [],
        remainingCalories: 0,
        remainingProtein: 0,
        remainingCarbohydrates: 0,
        remainingFat: 0
    });

    const navi = useNavigate();

    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todo.todos);
    const isSignIn = useSelector((state) => state.member.isSignIn);

    useEffect(() => {
        if (!isSignIn) {
            navi("/signin");
        }
    }, [isSignIn]);

    const fetchData = useCallback(async (idx, newDate) => {
        try {
            const formattedDate = dayjs(newDate).format("YYYY-MM-DD");
            if (idx === 0) {
                await dispatch(getTodosByWeeks(formattedDate));
            } else if (idx === 1) {
                const response = await dispatch(getTodosByDate(formattedDate));
                setWaterByDate(response.payload.waterIntake);
            }
        } catch (error) {
            console.error("할 일 데이터를 가져오는 도중 오류 발생:", error);
        }
    }, [dispatch]);

    useEffect(() => {
        if (isSignIn) {
            const fetchInitialData = async () => {
                try {
                    const date = dayjs().format("YYYY-MM-DD");
                    const todoResponse = await dispatch(batchProcess(date));
                    dispatch(setTodos(todoResponse.payload.todoList));
                    const recommendResponse = await dispatch(getRecommendFoods());
                    if (recommendResponse.payload && recommendResponse.payload.foodList) {
                        setRecommendFoods(recommendResponse.payload);
                    } else if (recommendResponse.error) {
                        setNeedAdditionalInfo(true);
                    }
                } catch (error) {
                    console.error("Error fetching initial data:", error);
                    setNeedAdditionalInfo(true);
                }
            };
            fetchInitialData();
        } else {
            navi("/signin");
        }
    }, [isSignIn, dispatch]);

    const handleDateChange = useCallback(
        (newValue) => {
            const newDate = dayjs(newValue);
            setSelectedDate(newDate);
            fetchData(activeTab, newDate);
        },
        [fetchData, activeTab]
    );

    const onClickTab = useCallback(
        (idx) => {
            setActiveTab(idx);
            fetchData(idx, selectedDate);
        },
        [fetchData, selectedDate]
    );

    const TodoModalMemoized = React.memo(TodoModal);
    const RecommendModalMemoized = React.memo(RecommendModal);

    return (
        <>
            <LeftSection>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TodoModalMemoized
                        activeTab={activeTab}
                        selectedDate={selectedDate}
                        todos={todos}
                        water={waterByDate}
                        handleDateChange={handleDateChange}
                        onClickTab={onClickTab}
                    />
                </LocalizationProvider>
            </LeftSection>
            <RightSection>
                {needAdditionalInfo ? (
                    <div>추가적인 회원 정보 입력이 필요합니다.</div>
                ) : recommendFoods && recommendFoods.foodList && recommendFoods.foodList.length > 0 ? (
                    <RecommendModalMemoized recommendFoods={recommendFoods}/>
                ) : (
                    <></>
                )}
            </RightSection>
        </>
    );
};

export default Todo;
