import React from "react";
import Menu from "../ui/Menu";
import RecordList from "./RecordList";

const RecordModal = () => {
    return (
        <div className="RecordModal">
            <nav>
                <Menu text={"Daily"} isSelected={true}/>
                <Menu text={"Monthly"}/>
            </nav>
            <div>
                <img src={process.env.PUBLIC_URL + `assets/ico_sun.png`} alt="sun_icon"/>
                <h4>Daily</h4>
                <RecordList/>
            </div>
        </div>
    );
};

export default RecordModal;