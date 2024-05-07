import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const signup = createAsyncThunk(
    'member/signup',
    async (member, thunkAPI) => {
        try {
            const response = await axios.post(
                `http://localhost:9090/member/signup`,
                member
            );

            return response.data.item;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const signin = createAsyncThunk(
    'member/signin',
    async (member, thunkAPI) => {
        try {
            const response = await axios.post(
                `http://localhost:9090/member/signin`,
                member
            );

            return response.data.item;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.errorCode);
        }
    }
);

export const signout = createAsyncThunk(
    'member/signout',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(
                `http://localhost:9090/member/signout`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                    }
                }
            );

            return response.data.item;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const signSlice = createSlice({
    name: 'member',
    initialState: {
        isSignIn: false,
        member: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signup.fulfilled, (state, action) => {
            alert(`${action.payload.name}님 회원가입을 축하합니다.`);
            window.location.href = '/singin';

            return state;
        });
        builder.addCase(signup.rejected, (state, action) => {
            alert("에러 발생. 관리자에게 문의하세요.")
            console.log(action.payload);
            return state;
        });
        builder.addCase(signin.fulfilled, (state, action) => {
            sessionStorage.setItem("ACCESS_TOKEN", action.payload.token);

            return {
                ...state,
                isSignIn: true
            };
        });
        builder.addCase(signin.rejected, (state, action) => {
            if (action.payload === 200) {
                alert("존재하지 않는 아이디입니다.");
            } else if (action.payload === 201) {
                alert("비밀번호가 잘못됐습니다.");
            } else {
                alert("알 수 없는 에러발생.");
            }

            return state;
        });
        builder.addCase(signout.fulfilled, (state, action) => {
            alert("로그아웃 성공.");
            sessionStorage.removeItem("ACCESS_TOKEN");

            return {
                ...state,
                isLogin: false
            }
        });
    }
});

export default signSlice;

//export const signActions = signSlice.actions;