import LeftSection from "../../components/ui/layout/LeftSection";
import RightSection from "../../components/ui/layout/RightSection";
import React, {useCallback, useEffect, useState} from "react";
import Nav from "../../components/ui/layout/Nav";
import TodoDetail from "../../components/todo/TodoDetail";

import '../../scss/EditTodo.scss';
import EditCheckList from "../../components/todo/EditCheckList";
import RegCheckList from "../../components/todo/RegCheckList";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteCheck, deleteTodo, editCheck, editTodo, getTodo, regCheck, regTodo} from "../../slices/todoSlice";
import LoadFail from "../../components/LoadFail";
import dayjs from "dayjs";

const EditTodo = () => {
    const {seq} = useParams();
    const location = useLocation();
    const isWritePage = location.pathname === "/todo/write";

    const navi = useNavigate();
    const {state} = useLocation();

    const [todo, setTodo] = useState(null);
    const [deleteMealList, setDeleteMealList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();
    
    useEffect(() => {
        if (isWritePage) {
            const date = new Date();
            const formattedDate = new Intl.DateTimeFormat('ko-KR').format(date);
            setTodo({
                seq: null,
                member: '',
                title: '',
                diary: '',
                date: dayjs(formattedDate),
                checkList: [],
                mealList: []
            });

            setIsLoading(false);
        }
    }, [isWritePage]);

    useEffect(() => {
        const fetchTodo = async () => {
            if (seq) {
                try {
                    const result = await dispatch(getTodo(seq)).unwrap();
                    const content = result || null;
                    if (content) {
                        const date = new Date();
                        const formattedDate = new Intl.DateTimeFormat('ko-KR').format(date);
                        setTodo({
                            seq: content.seq || null,
                            member: content.member || '',
                            title: content.title || '',
                            diary: content.diary || '',
                            date: dayjs(content.date) || dayjs(formattedDate),
                            checkList: content.checkList || [],
                            mealList: content.mealList || []
                        });
                    } else {
                        setTodo(null);
                    }
                } catch (error) {
                    console.error("Failed to fetch profile: ", error);
                    setTodo(null);
                }
            }
            setIsLoading(false);
        };

        fetchTodo();
    }, [dispatch, seq]);

    const handleAddCheck = useCallback((check) => {
        if (seq) {
            const checkToAdd = {
                todoSeq: seq,
                text: check,
                isCheck: false
            };

            dispatch(regCheck({check: checkToAdd}));
        } else {
            alert("다이어리 작성 후 등록해주세요.");
        }
    }, [dispatch, seq]);

    const handleEditCheck = useCallback((index) => {
        setTodo((prevTodo) => {
            const updatedCheckList = [...prevTodo.checkList];
            updatedCheckList[index].isCheck = !updatedCheckList[index].isCheck;

            if (seq) {
                dispatch(editCheck({check: updatedCheckList[index]}));
            }

            return {...prevTodo, checkList: updatedCheckList};
        });
    }, [dispatch, seq]);

    const handleEditCheckText = useCallback((seq, text) => {
        setTodo((prevTodo) => {
            const updatedCheckList = [...prevTodo.checkList];
            const indexToUpdate = updatedCheckList.findIndex(item => item.seq === seq);
            updatedCheckList[indexToUpdate].text = text;

            if (indexToUpdate !== -1) {
                dispatch(editCheck({check: updatedCheckList[indexToUpdate]}));
            }

            return {...prevTodo, checkList: updatedCheckList};
        });
    }, [dispatch]);

    const handleDeleteCheck = useCallback((seq) => {
        const newCheckList = [...todo.checkList];

        const indexToDelete = newCheckList.findIndex(item => item.seq === seq);

        if (indexToDelete !== -1) {
            newCheckList.splice(indexToDelete, 1);

            setTodo((prevTodo) => ({
                ...prevTodo,
                checkList: newCheckList
            }));

            dispatch(deleteCheck({seq: seq}));
        }
    }, [dispatch, todo?.checkList]);

    const handleAddMeal = useCallback((meal) => {
        setTodo((prevTodo) => ({
            ...prevTodo,
            mealList: [...prevTodo.mealList, meal]
        }));
    }, []);

    const handleDeleteMeal = useCallback((mealToDelete) => {
        const newMealList = todo.mealList.filter(meal => meal !== mealToDelete);

        setTodo((prevTodo) => ({
            ...prevTodo,
            mealList: newMealList
        }));

        if (mealToDelete && mealToDelete.seq) {
            setDeleteMealList((prevList) => {
                return [...prevList, mealToDelete.seq];
            });
        }
    }, [todo?.mealList]);

    const setTitle = useCallback((title) => {
        setTodo((prevTodo) => ({...prevTodo, title}));
    }, []);

    const setDiary = useCallback((diary) => {
        setTodo((prevTodo) => ({...prevTodo, diary}));
    }, []);

    const setDate = useCallback((date) => {
        setTodo((prevTodo) => ({...prevTodo, date}));
    }, []);

    const handleTodoEdit = useCallback(() => {
        if (seq) {
            dispatch(editTodo({todo, deleteMealList}));
        } else {
            if (todo.title === '') {
                alert('제목을 입력해주세요.');
            } else if (todo.diary === '') {
                alert('다이어리를 입력해주세요.');
            } else {
                const date = new Date(todo.date);
                todo.date = new Date(date.getTime() + (9 * 60 * 60 * 1000)).toISOString().replace('T', ' ').replace('Z', '');
                dispatch(regTodo(todo));
            }
        }
    }, [dispatch, seq, todo, deleteMealList]);

    const handleTodoDelete = useCallback(() => {
        dispatch(deleteTodo({seq: seq}));
        navi(state || "/dashboard");
    }, [dispatch, seq, navi, state]);

    if (isLoading) {
        return <div></div>;
    }

    return (
        <>{
            todo ? (
                <>
                    <LeftSection>
                        <Nav seq={seq} onEditTodo={handleTodoEdit} onDeleteTodo={handleTodoDelete}/>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TodoDetail
                                todo={todo}
                                setTitle={setTitle}
                                setDiary={setDiary}
                                setDate={setDate}
                                handleAddMeal={handleAddMeal}
                                handleDeleteMeal={handleDeleteMeal}
                            />
                        </LocalizationProvider>
                    </LeftSection>
                    <RightSection>
                        <RegCheckList handleAddCheck={handleAddCheck}/>
                        <EditCheckList
                            checklist={todo.checkList}
                            handleEditCheck={handleEditCheck}
                            handleEditCheckText={handleEditCheckText}
                            handleDeleteCheck={handleDeleteCheck}/>
                    </RightSection>
                </>
            ) : (
                <LoadFail/>
            )}
        </>
    );
}

export default EditTodo;