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

export const kakaoSignin = createAsyncThunk(
    'member/kakaoSignin',
    async (token, thunkAPI) => {
        try {
            const response = await axios.get(
                `http://localhost:9090/member/kakao`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
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

export const sendEmail = createAsyncThunk(
    'member/sendEmail',
    async (email, thunkAPI) => {
        try {
            const response = await axios.get(
                `http://localhost:9090/member/email`,
                email
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
        loginMemberEmail: "",
        loginMemberName: "",
        loginMemberImage: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signup.fulfilled, (state, action) => {
            alert(`${action.payload.name}님 회원가입을 축하합니다.`);
            window.location.href = '/dashboard';

            return state;
        });
        builder.addCase(signup.rejected, (state, action) => {
            alert("에러 발생. 관리자에게 문의하세요.")
            console.log(action.payload);
            return state;
        });
        builder.addCase(signin.fulfilled, (state, action) => {
            let accessToken;
            if (action.meta.response && action.meta.response.headers && action.meta.response.headers.authorization) {
                accessToken = action.meta.response.headers.authorization;
            } else {
                accessToken = action.payload.token;
            }

            sessionStorage.setItem("ACCESS_TOKEN", accessToken);

            return {
                ...state,
                isSignIn: true,
                loginMemberEmail: action.payload.email,
                loginMemberName: action.payload.name,
                loginMemberImage: action.payload.imgAddress
            };
        });
        builder.addCase(signin.rejected, (state, action) => {
            if (action.payload === 200) {
                alert("존재하지 않는 아이디입니다.");
            } else if (action.payload === 201) {
                alert("비밀번호가 잘못됐습니다.");
            } else if (action.payload === 202) {
                sessionStorage.removeItem("ACCESS_TOKEN");
                alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
                window.location.href = "/signin";
            } else {
                alert("알 수 없는 에러발생.");
            }

            return state;
        });
        builder.addCase(kakaoSignin.fulfilled, (state, action) => {
            sessionStorage.setItem("ACCESS_TOKEN", action.payload.token);

            return {
                ...state,
                isSignIn: true,
                loginMemberEmail: action.payload.email,
                loginMemberName: action.payload.name,
                loginMemberImage: action.payload.imgAddress
            };
        });
        builder.addCase(kakaoSignin.rejected, (state, action) => {
            if (action.payload === 200) {
                alert("존재하지 않는 아이디입니다.");
            } else if (action.payload === 202) {
                sessionStorage.removeItem("ACCESS_TOKEN");
                alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
                window.location.href = "/singin";
            } else {
                alert("알 수 없는 에러발생.");
            }

            return state;
        });
        builder.addCase(signout.fulfilled, (state, action) => {
            sessionStorage.removeItem("ACCESS_TOKEN");

            return {
                ...state,
                isSignIn: false,
                loginMemberEmail: "",
                loginMemberName: "",
                loginMemberImage: ""
            }
        });
    }
});

export default signSlice;