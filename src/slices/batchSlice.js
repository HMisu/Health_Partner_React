import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_ROOT;

export const batchProcess = createAsyncThunk(
    'batch/batchProcess',
    async (date, thunkAPI) => {
        try {
            const response = await axios.get(
                `${API_URL}/batch/process?date=${date}`,
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

const batchSlice = createSlice({
    name: 'batch',
    initialState: {
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(batchProcess.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(batchProcess.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(batchProcess.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default batchSlice.reducer;
