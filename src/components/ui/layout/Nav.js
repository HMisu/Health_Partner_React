import {useNavigate} from "react-router-dom";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import Button from "../Button";
import React from "react";

import '../../../scss/ui/layout/Nav.scss';

const Nav = ({seq, onEditTodo, onDeleteTodo}) => {
    const navigate = useNavigate();
    return (
        <div className="Nav">
            <div className="left">
                <ArrowBackIosRoundedIcon onClick={() => navigate(-1)}/>
            </div>
            <div className="right">
                {seq ? (
                        <>
                            <Button text="Edit" onClick={onEditTodo}/>
                            <Button id="btn-delete" text="Delete" onClick={onDeleteTodo}/>
                        </>)
                    :
                    <Button text="Save" type="positive" onClick={onEditTodo}/>
                }
            </div>
        </div>
    );
};

export default Nav;