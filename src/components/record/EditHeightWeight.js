import React from "react";
import {Box, FormControl, InputLabel, OutlinedInput} from "@mui/material";
import Button from "../ui/Button";

const EditHeightWeight = () => {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {m: 1},
            }}
            noValidate
            autoComplete="off">
            <FormControl>
                <InputLabel htmlFor="component-height">Height</InputLabel>
                <OutlinedInput
                    id="component-height"
                    defaultValue="Composed TextField"
                    label="Height"
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="component-weight">Weight</InputLabel>
                <OutlinedInput
                    id="component-weight"
                    defaultValue="Composed TextField"
                    label="Weight"
                />
            </FormControl>
            <Button text="Modify"/>
        </Box>
    );
};

export default EditHeightWeight;