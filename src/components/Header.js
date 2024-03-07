import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {SvgIcon} from "@mui/material";
import React from "react";

import '../scss/Header.scss';
import Menu from "./ui/Menu";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

const Header = () => {
    const isSignIn = useSelector(state => state.member.isSignIn);
    const member = useSelector(state => state.member.member);

    const location = useLocation();

    console.log(isSignIn + ": isSignIn");
    console.log(member + " member");
    return (
        <header>
            <div className="logo">
                <img src={process.env.PUBLIC_URL + `/logo.png`} alt="logo"/>
                <a href="/home">
                    <span>HealthPartner</span>
                </a>

            </div>
            <nav>
                <ul>
                    <Menu text={<SvgIcon component={SpaceDashboardOutlinedIcon}/>} href={"/home"}/>
                    <Menu text={<SvgIcon component={EventNoteOutlinedIcon}/>} href={"/todo"}/>
                    <Menu text={<SvgIcon component={BookOutlinedIcon}/>} href={"/record"}/>
                </ul>
            </nav>
            <div className="user-container">
                {location.pathname === '/' && !isSignIn && (
                    <div>
                        <a href="/signin" className="signin">
                            Sign In
                        </a>
                        <a href="/signup" className="signup">
                            Sign Up
                        </a>
                    </div>
                )}

                {location.pathname === '/' && (
                    <a className="github">
                        <img src={process.env.PUBLIC_URL + `assets/github-mark.png`} alt="github_logo"/>
                    </a>
                )}

                {location.pathname !== '/' && isSignIn && (
                    <>
                        <a href="/signout" className="signout">
                            Sign Out
                        </a>
                        <a className="notify">
                            <SvgIcon component={NotificationsNoneIcon}></SvgIcon>
                        </a>
                        <a href="/myaccount" className="myaccount">
                            <img src={process.env.PUBLIC_URL + `assets/ico_user_default.png`} alt="user_profile_img"/>
                        </a>
                    </>
                )}
            </div>
        </header>
    );
};

export default React.memo(Header);