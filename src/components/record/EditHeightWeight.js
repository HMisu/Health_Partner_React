import React from "react";
import {Box, InputAdornment, styled, TextField} from "@mui/material";
import Button from "../ui/Button";

const CssTextField = styled(TextField)({
    "& label": {
        color: "#444444",
    },
    "& label.Mui-focused": {
        color: "#444444",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#B2BAC2",
    },
    "& .MuiInputBase-input": {
        padding: "12.5px 20px",
        color: "black",
        backgroundColor: "white",
        borderRadius: "8px",
        "& fieldset": {
            borderColor: "white",
        },
        "&:hover fieldset": {
            borderColor: "#444444",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#444444",
        },
    },
});

const EditHeightWeight = () => {
    const handleInputChange = (event) => {
        // 입력된 값에서 숫자가 아닌 문자 제거
        const inputValue = event.target.value.replace(/\D/g, "");

        // 최대 길이 제한
        const maxLength = parseInt(event.target.maxLength);
        const trimmedValue = inputValue.slice(0, maxLength);

        // 수정된 값으로 입력 필드 업데이트
        event.target.value = trimmedValue;
    };

    return (
        <Box component="form" noValidate autoComplete="off">
            <CssTextField
                label="Height"
                fontSize="14px"
                id="custom-css-outlined-input1"
                InputProps={{
                    endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                }}
                inputProps={{maxLength: 3, onInput: handleInputChange}}
            />
            <CssTextField
                label="Weight"
                id="custom-css-outlined-input2"
                InputProps={{
                    endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                }}
                inputProps={{maxLength: 3, onInput: handleInputChange}}
            />
            <Button text="Modify"/>
            <Button text={"RecordDetail of meal"} type={"positive"}/>
        </Box>
    );
};

export default EditHeightWeight;
