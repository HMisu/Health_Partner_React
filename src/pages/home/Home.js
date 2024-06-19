import React, {useCallback, useEffect, useState} from "react";
import LeftSection from "../../components/ui/layout/LeftSection";
import RightSection from "../../components/ui/layout/RightSection";
import "../../scss/ui/layout/Section.scss";
import "../../scss/Todo.scss";
import "../../scss/Recommend.scss";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useDispatch, useSelector} from "react-redux";
import RecordModal from "../../components/record/RecordModal";
import RecordWater from "../../components/record/RecordWater";
import TodoModal from "../../components/todo/TodoModal";
import {setIntake, updateWaterIntake} from "../../slices/waterSlice";
import dayjs from "dayjs";
import {getTodosByDate, getTodosByWeeks, setTodos} from "../../slices/todoSlice";
import {process} from "../../slices/batchSlice";

const Home = () => {
    const [record, setRecord] = useState(null);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [activeTab, setActiveTab] = useState(0);
    const [waterByDate, setWaterByDate] = useState(0);

    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todo.todos);
    const water = useSelector((state) => state.water.intake);
    const isSignIn = useSelector((state) => state.member.isSignIn);

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
                    const response = await dispatch(process(date));
                    setRecord(response.payload.bmiGraphData);
                    dispatch(setIntake(response.payload.waterIntake));
                    dispatch(setTodos(response.payload.todoList));
                } catch (error) {
                    console.error("초기 데이터를 가져오는 중 오류 발생:", error);
                }
            };
            fetchInitialData();
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

    const handleFetchIntake = useCallback(
        (intake) => {
            const date = dayjs().format("YYYY-MM-DD");
            dispatch(updateWaterIntake({date: date, intake: intake}));
        },
        [dispatch]
    );


    if (!isSignIn) return null;

    const RecordModalMemoized = React.memo(RecordModal);
    const TodoModalMemoized = React.memo(TodoModal);
    const RecordWaterMemoized = React.memo(RecordWater);

    return (
        <>
            <LeftSection>
                <RecordModalMemoized record={record}/>
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
                <RecordWaterMemoized water={water} onFetchIntake={handleFetchIntake}/>
            </RightSection>
        </>
    );
};

export default Home;
