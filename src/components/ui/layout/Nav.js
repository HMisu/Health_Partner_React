import {useNavigate} from "react-router-dom";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import Button from "../Button";
import React from "react";

import '../../../scss/ui/layout/Nav.scss';

const Nav = () => {
    const navigate = useNavigate();
    const id = 0;
    return (
        <div className="Nav">
            <div className="left">
                <ArrowBackIosRoundedIcon onClick={() => navigate(-1)}/>
            </div>
            <div className="right">
                {id === 0 ? <Button text="Edit"/>
                    : <Button text={"Save"} type={"positive"}/>
                }
            </div>
        </div>
    );
};

export default Nav;