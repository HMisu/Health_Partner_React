import React, {useCallback, useState} from "react";
import {Box, InputAdornment, TextField} from "@mui/material";
import Button from "../ui/Button";
import {handleNumInputChange} from "../../util/handleNumInputChange";
import {useDispatch, useSelector} from "react-redux";
import {modifyHeightAndWeight} from "../../slices/memberSlice";

const EditHeightWeight = () => {
    const dispatch = useDispatch();
    const loginMemberEmail = useSelector((state) => state.member.loginMemberEmail);

    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    const memoizedHandleInputChangeHeight = useCallback((event) => {
        handleNumInputChange(event, 3, 2); // Three integer digits and two decimal digits for height
    }, []);

    const memoizedHandleInputChangeWeight = useCallback((event) => {
        handleNumInputChange(event, 2, 2); // Two integer digits and two decimal digits for weight
    }, []);

    const handleTodoEdit = useCallback(() => {
        if (!height) {
            alert("키를 입력해주세요.");
            return;
        }

        if (!weight) {
            alert("몸무게를 입력해주세요.");
            return;
        }

        const member = {email: loginMemberEmail, height: parseFloat(height), weight: parseFloat(weight)};
        dispatch(modifyHeightAndWeight(member));
    }, [dispatch, loginMemberEmail, height, weight]);

    return (
        <Box component="form" noValidate autoComplete="off">
            <TextField
                label="Height"
                fontSize="14px"
                id="custom-css-outlined-input1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                InputProps={{
                    endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                }}
                inputProps={{maxLength: 6, onInput: memoizedHandleInputChangeHeight}}/>
            <TextField
                label="Weight"
                id="custom-css-outlined-input2"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                InputProps={{
                    endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                }}
                inputProps={{maxLength: 5, onInput: memoizedHandleInputChangeWeight}}/>
            <Button text="Modify" onClick={handleTodoEdit}/>
        </Box>
    );
};

export default EditHeightWeight;
