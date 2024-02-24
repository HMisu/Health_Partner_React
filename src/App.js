import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Information from "./pages/Information";
import {createTheme, ThemeProvider} from "@mui/material";
import Header from "./components/Header";
import EditRecord from "./pages/record/EditRecord";

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
                        <Route path="/record" element={<EditRecord/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
