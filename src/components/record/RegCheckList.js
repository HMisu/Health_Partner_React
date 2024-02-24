import React, {useState} from "react";
import {TextField} from "@mui/material";
import Button from "../ui/Button";

const RegCheckList = ({}) => {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (event) => {
        if (event.target.value.length <= 100) {
            setInputValue(event.target.value);
        }
    };

    return (
        <div className="EditCheckList">
            <div>
                <div className="content">
                    <TextField
                        fullWidth
                        label="Todo"
                        name="check"
                        value={inputValue}
                        onChange={handleChange}
                    />
                </div>
                <Button text={"Reg"} type={"positive"}/>
            </div>
        </div>
    );
};

export default React.memo(RegCheckList);
