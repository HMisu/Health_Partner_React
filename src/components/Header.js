import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {SvgIcon} from "@mui/material";
import Menu from "./ui/Menu";
import React from "react";

import '../scss/Header.scss';

const Header = () => {
    return (
        <header>
            <div className="logo">
                <img src={process.env.PUBLIC_URL + `/logo.png`} alt="logo"/>
                <span>HealthPartner</span>
            </div>
            <nav>
                <ul>
                    <Menu text={<SvgIcon component={SpaceDashboardOutlinedIcon}/>} href={"/home"} isSelected={true}/>
                    <Menu text={<SvgIcon component={EventNoteOutlinedIcon}/>} href={"/todo"}/>
                    <Menu text={<SvgIcon component={BookOutlinedIcon}/>} href={"/record"}/>
                </ul>
            </nav>
            <div className="user-container">
                <SvgIcon component={NotificationsNoneIcon}></SvgIcon>
                <img src={process.env.PUBLIC_URL + `assets/ico_user_default.png`} alt="user_profile_img"/>
            </div>
        </header>
    );
};

export default React.memo(Header);