import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_ROOT;

export const getWaterIntake = createAsyncThunk(
    'water/getWaterIntake',
    async (date, thunkAPI) => {
        try {
            const response = await axios.get(
                `${API_URL}/water/intake?date=${date}`,
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

export const updateWaterIntake = createAsyncThunk(
    'water/updateWaterIntake',
    async ({date, intake}, thunkAPI) => {
        try {
            const response = await axios.put(
                `${API_URL}/water/intake`,
                {date, intake},
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
const waterSlice = createSlice({
    name: 'water',
    initialState: {intake: 0},
    reducers: {
        setIntake(state, action) {
            state.intake = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWaterIntake.fulfilled, (state, action) => {
                state.intake = action.payload;
                return state;
            })
            .addCase(getWaterIntake.rejected, (state, action) => {
                alert("에러 발생. 관리자에게 문의하세요.");
                console.log(action.payload);
                return state;
            })
            .addCase(updateWaterIntake.fulfilled, (state, action) => {
                state.intake = action.payload;
                return state;
            })
            .addCase(updateWaterIntake.rejected, (state, action) => {
                alert("에러 발생. 관리자에게 문의하세요.");
                console.log(action.payload);
                return state;
            });
    }
});
export const {setIntake} = waterSlice.actions;

export default waterSlice.reducer;