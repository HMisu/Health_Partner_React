import React, {useState} from "react";
import {TextField} from "@mui/material";
import Button from "../ui/Button";

const RegCheckList = ({handleAddCheck}) => {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (event) => {
        if (event.target.value.length <= 100) {
            setInputValue(event.target.value);
        }
    };

    const handleClick = () => {
        handleAddCheck(inputValue);
        setInputValue("");
    };

    return (
        <div className="EditCheckList">
            <div>
                <div className="content">
                    <TextField
                        fullWidth
                        label="CheckList"
                        name="check"
                        value={inputValue}
                        onChange={handleChange}
                    />
                </div>
                <Button text={"Reg"} type={"positive"} onClick={handleClick}/>
            </div>
        </div>
    );
};

export default React.memo(RegCheckList);
