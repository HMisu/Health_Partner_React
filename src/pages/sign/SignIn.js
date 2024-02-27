import React, {useCallback} from "react";
import '../../scss/Sign.scss';
import {Grid, TextField} from "@mui/material";
import Button from "../../components/ui/Button";

const SignIn = () => {
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
    }, []);

    return (
        <div className="SignIn">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>Sign In</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name='username' variant='outlined' fullWidth required
                            id='username' label='Email' autoFocus/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name='password' variant='outlined' fullWidth required
                            id='password' label='Password'/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button text={"Sign In"} type={"positive"}/>
                    </Grid>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <a href='/signup' className="link">
                            If you don't have an account, sign up here.
                        </a>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default SignIn;