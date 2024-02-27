import React, {useCallback} from "react";
import {Box, InputAdornment, TextField} from "@mui/material";
import Button from "../ui/Button";
import {handleNumInputChange} from "../../util/handleNumInputChange";

const EditHeightWeight = () => {
    const memoizedHandleInputChange = useCallback((event) => {
        handleNumInputChange(event);
    }, []);

    return (
        <Box component="form" noValidate autoComplete="off">
            <TextField
                label="Height"
                fontSize="14px"
                id="custom-css-outlined-input1"
                InputProps={{
                    endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                }}
                inputProps={{maxLength: 3, onInput: memoizedHandleInputChange}}
            />
            <TextField
                label="Weight"
                id="custom-css-outlined-input2"
                InputProps={{
                    endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                }}
                inputProps={{maxLength: 3, onInput: memoizedHandleInputChange}}
            />
            <Button text="Modify"/>
        </Box>
    );
};

export default EditHeightWeight;
