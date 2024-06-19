import React from "react";
import {Box, Checkbox, FormControl, FormControlLabel, FormGroup} from "@mui/material";

const CheckList = ({checklist}) => {
    return (
        <Box sx={{display: "flex"}}>
            <FormControl component="fieldset" variant="standard">
                <FormGroup>
                    {checklist && checklist.map((it, idx) => (
                        <FormControlLabel key={idx} name={"" + idx} control={<Checkbox/>} label={it}/>
                    ))}
                </FormGroup>
            </FormControl>
        </Box>
    );
};

export default React.memo(CheckList);
