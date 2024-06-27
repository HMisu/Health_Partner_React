import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_ROOT;

export const searchFood = createAsyncThunk(
    'food/searchFood',
    async (keyword, thunkAPI) => {
        try {
            const response = await axios.get(
                `${API_URL}/food/search?keyword=${keyword}`,
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

export const getRecommendFoods = createAsyncThunk(
    'food/getRecommendFoods',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(
                `${API_URL}/food/recommend`,
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

const foodSlice = createSlice({
    name: 'food',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
    }
});

export default foodSlice.reducer;