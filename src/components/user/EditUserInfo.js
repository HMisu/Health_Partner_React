import React, {useCallback} from "react";
import {Grid, InputAdornment, TextField} from "@mui/material";
import Button from "../ui/Button";
import {handleNumInputChange} from "../../util/handleNumInputChange";

const EditUserInfo = ({title, formData, textFieldChanged}) => {
    const memoizedHandleInputChange = useCallback((event) => {
        handleNumInputChange(event);
    }, []);


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h1>{title === "MyAccount" ? "Name" : title}</h1>
            </Grid>
            <Grid item xs={10}>
                <TextField
                    name='username' variant='outlined' fullWidth required
                    id='username' label='Email' value={formData.email} autoFocus
                    inputProps={{onChange: {textFieldChanged}}}/>
            </Grid>
            <Grid item xs={2}>
                <Button text={"Verify"}/>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name='password' variant='outlined' fullWidth required
                    id='password' label='Password' value={formData.password}
                    inputProps={{onChange: {textFieldChanged}}}/>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    name='name' variant='outlined' fullWidth required
                    id='name' label='Name' value={formData.name}
                    inputProps={{onChange: {textFieldChanged}}}/>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    name='age' variant='outlined' fullWidth required
                    id='age' label='Age' value={formData.age}
                    inputProps={{maxLength: 3, onInput: memoizedHandleInputChange, onChange: {textFieldChanged}}}/>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    name='height' variant='outlined' fullWidth required
                    id='height' label='Height' value={formData.height}
                    InputProps={{
                        endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                    }}
                    inputProps={{maxLength: 3, onInput: memoizedHandleInputChange, onChange: {textFieldChanged}}}/>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    name='weight' variant='outlined' fullWidth required
                    id='weight' label='Weight' value={formData.weight}
                    InputProps={{
                        endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                    }}
                    inputProps={{maxLength: 3, onInput: memoizedHandleInputChange, onChange: {textFieldChanged}}}/>
            </Grid>
            <Grid item xs={12}>
                <Button text={title} type={"positive"}/>
            </Grid>
        </Grid>
    );
};

EditUserInfo.defaultProps = {
    title: "Title"
};

export default EditUserInfo;