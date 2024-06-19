import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Information from "./pages/Information";
import {createTheme, ThemeProvider} from "@mui/material";
import Header from "./components/Header";
import SignIn from "./pages/sign/SignIn";
import SignUp from "./pages/sign/SignUp";
import Todo from "./pages/todo/Todo";
import MemberProfile from "./pages/MemberProfile";
import EditTodo from "./pages/todo/EditTodo";
import {Provider} from "react-redux";
import store from './store/configureStore';
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";
import OAuth2RedirectPage from "./components/api/OAuth2RedirectPage";
import ChangeMemberPassword from "./pages/ChangeMemberPassword";

const theme = createTheme({
    typography: {
        fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif"
    }
});

export let persiststore = persistStore(store);

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persiststore}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Header/>
                        <div className="App">
                            <Routes>
                                <Route path="/" element={<Information/>}/>
                                <Route path="/dashboard" element={<Home/>}/>
                                <Route path="/todo" element={<Todo/>}/>
                                <Route path="/todo/write" element={<EditTodo/>}/>
                                <Route path="/todo/d/:seq" element={<EditTodo/>}/>
                                <Route path="/signin" element={<SignIn/>}/>
                                <Route path="/signup" element={<SignUp/>}/>
                                <Route path="/account/profile" element={<MemberProfile/>}/>
                                <Route path="/account/pw" element={<ChangeMemberPassword/>}/>
                                <Route path="/oauth/redirected" element={<OAuth2RedirectPage/>}/>
                            </Routes>
                        </div>
                    </BrowserRouter>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;