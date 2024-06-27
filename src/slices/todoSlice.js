import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_ROOT;

export const getTodosByWeeks = createAsyncThunk(
    'todo/getTodosByWeeks',
    async (date, thunkAPI) => {
        try {
            const response = await axios.get(
                `${API_URL}/todo/week?week=${date}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
                    }
                }
            );
            return response.data.items;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const getTodosByDate = createAsyncThunk(
    'todo/getTodosByDate',
    async (date, thunkAPI) => {
        try {
            const response = await axios.get(
                `${API_URL}/todo?date=${date}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
                    }
                }
            );
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const getTodo = createAsyncThunk(
    'todo/getTodo',
    async (seq, thunkAPI) => {
        try {
            const response = await axios.get(
                `${API_URL}/todo/d/${seq}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
                    }
                }
            );

            return response.data.item;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const regTodo = createAsyncThunk(
    'todo/regTodo',
    async (todo, thunkAPI) => {
        try {
            const response = await axios.post(
                `${API_URL}/todo/reg`,
                todo,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
                    }
                }
            );

            return response.data.item;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const editTodo = createAsyncThunk(
    'todo/editTodo',
    async ({todo, deleteMealList}, thunkAPI) => {
        try {
            const response = await axios.put(
                `${API_URL}/todo/edit`,
                {todo, deleteMealList},
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
                    }
                }
            );

            return response.data.item;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const deleteTodo = createAsyncThunk(
    'todo/deleteTodo',
    async ({seq}, thunkAPI) => {
        try {
            const response = await axios.delete(
                `${API_URL}/todo/${seq}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
                    }
                }
            );

            return response.data.item;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const regCheck = createAsyncThunk(
    'todo/regCheck',
    async ({check}, thunkAPI) => {
        try {
            const response = await axios.post(
                `${API_URL}/todo/check/reg`,
                check,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
                    }
                }
            );

            return response.data.item;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const editCheck = createAsyncThunk(
    'todo/editCheck',
    async ({check}, thunkAPI) => {
        try {
            const response = await axios.put(
                `${API_URL}/todo/check`,
                check,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
                    }
                }
            );

            return response.data.item;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const deleteCheck = createAsyncThunk(
    'todo/deleteCheck',
    async ({seq}, thunkAPI) => {
        try {
            const response = await axios.delete(
                `${API_URL}/todo/check/${seq}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
                    }
                }
            );

            return response.data.item;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
        loading: false,
        error: null
    },
    reducers: {
        setTodos(state, action) {
            state.todos = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(regTodo.fulfilled, (state, action) => {
            window.location.href = `/todo/d/${action.payload.seq}`;

            return state;
        });

        builder.addCase(regTodo.rejected, (state, action) => {
            alert("에러 발생. 관리자에게 문의하세요.");
            console.log(action.payload);

            return state;
        });
        builder.addCase(editTodo.fulfilled, (state, action) => {
            alert("수정되었습니다.");

            window.location.href = `/todo/d/${action.payload.seq}`;

            return state;
        });
        builder.addCase(editTodo.rejected, (state, action) => {
            alert("에러 발생. 관리자에게 문의하세요.");
            console.log(action.payload);

            return state;
        });
        builder.addCase(regCheck.fulfilled, (state, action) => {
            window.location.href = `/todo/d/${action.payload}`;

            return state;
        });
        builder.addCase(regCheck.rejected, (state, action) => {
            alert("에러 발생. 관리자에게 문의하세요.");
            console.log(action.payload);

            return state;
        });
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            alert("삭제되었습니다.");

            return state;
        });
        builder.addCase(deleteTodo.rejected, (state, action) => {
            alert("에러 발생. 관리자에게 문의하세요.");
            console.log(action.payload);

            return state;
        });
        builder.addCase(getTodosByWeeks.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getTodosByWeeks.fulfilled, (state, action) => {
            state.todos = action.payload;
        });
        builder.addCase(getTodosByWeeks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getTodosByDate.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getTodosByDate.fulfilled, (state, action) => {
            state.todos = action.payload.todoList;
        });
        builder.addCase(getTodosByDate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export const {setTodos} = todoSlice.actions;

export default todoSlice.reducer;