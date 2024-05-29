import React, {useCallback, useEffect, useState} from "react";
import '../../scss/Sign.scss';
import {Grid, TextField} from "@mui/material";
import Button from "../../components/ui/Button";
import {useDispatch, useSelector} from "react-redux";
import {signin} from "../../slices/memberSlice";
import {useNavigate, useNavigationType} from "react-router-dom";
import GoogleLoginBtn from "../../components/api/GoogleLoginBtn";
import KakaoLoginBtn from "../../components/api/KakaoLoginBtn";

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const navi = useNavigate();
    const naviType = useNavigationType();

    const isSignIn = useSelector(state => state.member.isSignIn);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isSignIn) {
            navi("/");
        }
    }, [isSignIn]);

    const textFiledchanged = useCallback((e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }, [form]);

    const handleLogin = useCallback((e) => {
        e.preventDefault();

        dispatch(signin(form));

        if (naviType === "PUSH") navi(-1);
        else navi("/");
    }, [form, dispatch]);

    return (
        <div className="SignIn">
            <form onSubmit={handleLogin}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>Sign In</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name='email' variant='outlined' fullWidth required
                            id='email' label='Email' value={form.email} autoFocus
                            onChange={textFiledchanged}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="password" name='password' variant='outlined' fullWidth required
                            id='password' label='Password' value={form.password}
                            onChange={textFiledchanged}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button text={"Sign In"} type={"positive"} submit={true}/>
                    </Grid>
                    <Grid item xs={6}>
                        <GoogleLoginBtn/>
                    </Grid>
                    <Grid item xs={6}>
                        <KakaoLoginBtn/>
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