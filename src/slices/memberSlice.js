import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://localhost:9090";

export const signup = createAsyncThunk(
    'member/signup',
    async (member, thunkAPI) => {
        try {
            const response = await axios.post(
                `${API_URL}/member/signup`,
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
                `${API_URL}/member/signin`,
                member
            );

            return response.data.item;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.errorCode);
        }
    }
);

export const oauth2Signin = createAsyncThunk(
    'member/oauth2Signin',
    async (token, thunkAPI) => {
        try {
            const response = await axios.get(
                `${API_URL}/member/signin/oauth`, {
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
                `${API_URL}/member/signout`,
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

export const getMemberProfile = createAsyncThunk(
    'member/getMemberProfile',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(
                `${API_URL}/member/profile`,
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

export const modifyPassword = createAsyncThunk(
    'member/modifyPassword',
    async (member, thunkAPI) => {
        try {
            const response = await axios.put(
                `${API_URL}/member/pw/modify`,
                member,
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

export const modifyProfile = createAsyncThunk(
    'member/modifyProfile',
    async (member, thunkAPI) => {
        try {
            const response = await axios.put(
                `${API_URL}/member/profile/modify`,
                member,
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

export const modifyProfileImg = createAsyncThunk(
    'member/modifyProfileImg',
    async (file, thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await axios.put(
                `${API_URL}/member/img/modify`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            return response.data.item;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const memberSlice = createSlice({
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
            window.location.href = '/signin';

            return state;
        });
        builder.addCase(signup.rejected, (state, action) => {
            alert("에러 발생. 관리자에게 문의하세요.");
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
                alert("비밀번호가 일치하지 않습니다.");
            } else if (action.payload === 202) {
                sessionStorage.removeItem("ACCESS_TOKEN");
                alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
                window.location.href = "/signin";
            } else {
                alert("알 수 없는 에러발생.");
            }

            return state;
        });
        builder.addCase(oauth2Signin.fulfilled, (state, action) => {
            sessionStorage.setItem("ACCESS_TOKEN", action.payload.token);

            return {
                ...state,
                isSignIn: true,
                loginMemberEmail: action.payload.email,
                loginMemberName: action.payload.name,
                loginMemberImage: action.payload.imgAddress
            };
        });
        builder.addCase(oauth2Signin.rejected, (state, action) => {
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
        builder.addCase(modifyPassword.fulfilled, (state, action) => {
            alert('비밀번호 변경에 성공했습니다.');
            window.location.href = '/account/profile';

            return state;
        });
        builder.addCase(modifyPassword.rejected, (state, action) => {
            alert('비밀번호 수정에 실패했습니다.');
            console.log(action.payload);

            return state;
        });
        builder.addCase(modifyProfile.fulfilled, (state, action) => {
            window.location.reload();

            return state;
        });
        builder.addCase(modifyProfile.rejected, (state, action) => {
            alert('정보 수정에 실패했습니다.');
            console.log(action.payload);

            return state;
        });
        builder.addCase(modifyProfileImg.fulfilled, (state, action) => {
            window.location.reload();

            return state;
        });
        builder.addCase(modifyProfileImg.rejected, (state, action) => {
            alert('이미지 업로드에 실패했습니다.');
            console.log(action.payload);

            return state;
        });
    }
});

export default memberSlice;