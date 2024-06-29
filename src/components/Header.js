import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import {SvgIcon} from "@mui/material";
import React, {useCallback} from "react";

import '../scss/Header.scss';
import Menu from "./ui/Menu";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {kakaoSignout, signout} from "../slices/memberSlice";
import {setIntake} from "../slices/waterSlice";
import {setTodos} from "../slices/todoSlice";

const Header = () => {
    const location = useLocation();
    const navi = useNavigate();

    const dispatch = useDispatch();

    const isSignIn = useSelector(state => state.member.isSignIn);
    const loginMemberImage = useSelector(state => state.member.loginMemberImage);
    const loginMemberProvider = useSelector(state => state.member.loginMemberProvider);

    const handleLogout = useCallback(() => {
        dispatch(setIntake(0));
        dispatch(setTodos([]));

        if (loginMemberProvider === "kakao") {
            dispatch(kakaoSignout());
        } else {
            dispatch(signout());
        }
    }, [dispatch]);

    return (
        <header>
            <div className="logo">
                <img src={process.env.PUBLIC_URL + `/logo.png`} alt="logo"/>
                <a href="/dashboard">
                    <span>HealthPartner</span>
                </a>
            </div>
            <nav>
                <ul>
                    <Menu text={<SvgIcon component={SpaceDashboardOutlinedIcon}/>} href={"/dashboard"}/>
                    <Menu text={<SvgIcon component={BookOutlinedIcon}/>} href={"/todo"}/>
                </ul>
            </nav>
            <div className="a-container">
                {!isSignIn && (
                    <>
                        <a href="/signin" className="signin">
                            Sign In
                        </a>
                        <a href="/signup" className="signup">
                            Sign Up
                        </a>
                    </>
                )}

                {isSignIn && (
                    <>
                        <a className="signout" onClick={handleLogout}>
                            Sign Out
                        </a>
                        {loginMemberImage !== null && loginMemberImage !== '' ? (
                            <a href="/account/profile" className="myaccount">
                                <img src={loginMemberImage}
                                     alt="member_profile_img"/>
                            </a>
                        ) : (
                            <a href="/account/profile" className="myaccount">
                                <img src={process.env.PUBLIC_URL + `/assets/ico_member_default.png`}
                                     alt="member_profile_img"/>
                            </a>
                        )}
                    </>
                )}

                {location.pathname === '/' && (
                    <a className="github" href="https://github.com/HMisu/Health_Partner_React">
                        <img src={process.env.PUBLIC_URL + `/assets/github-mark.png`} alt="github_logo"/>
                    </a>
                )}
            </div>
        </header>
    );
};

export default React.memo(Header);