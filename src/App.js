import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Information from "./pages/Information";
import {createTheme, ThemeProvider} from "@mui/material";
import Header from "./components/Header";
import SignIn from "./pages/sign/SignIn";
import SignUp from "./pages/sign/SignUp";
import Record from "./pages/record/Record";
import Todo from "./pages/todo/Todo";
import UserInfo from "./pages/UserInfo";
import EditTodo from "./pages/todo/EditTodo";

const theme = createTheme({
    typography: {
        fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif"
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header/>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Information/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/edit" element={<EditTodo/>}/>
                        <Route path="/todo" element={<Todo/>}/>
                        <Route path="/record" element={<Record/>}/>
                        <Route path="/signin" element={<SignIn/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path="/myaccount" element={<UserInfo/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
