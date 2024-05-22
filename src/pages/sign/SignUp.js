import {Grid, InputAdornment, TextField, Typography} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import '../../scss/Sign.scss';
import axios from "axios";
import Button from "../../components/ui/Button";
import {handleNumInputChange} from "../../util/handleNumInputChange";
import {useDispatch} from "react-redux";
import {signup} from "../../slices/signSlice";

const SignUp = () => {
    const [form, setForm] = useState({
        email: '',
        verifyCode: '',
        password: '',
        passwordChk: '',
        name: '',
        age: '',
        height: '',
        weight: ''
    });

    const [emailChk, setEmailChk] = useState(false);
    const [pwValidation, setPwValidation] = useState(false);
    const [pwChk, setPwChk] = useState(false);
    const dispatch = useDispatch();

    const handleInputChange = useCallback((event) => {
        handleNumInputChange(event);
    }, []);

    useEffect(() => {
        console.log("emailChk : " + emailChk);
    }, [emailChk]);

    const textFieldChanged = useCallback((e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        if (e.target.name === 'password' || e.target.name === 'passwordChk') {
            const isMatch = e.target.value === form.passwordChk || e.target.value === form.password;
            setPwChk(isMatch);
            document.querySelector("#password-check-success").style.display = isMatch ? 'block' : 'none';
            document.querySelector("#password-check-fail").style.display = isMatch ? 'none' : 'block';
        }
    }, [form]);

    const sendEmail = useCallback(async () => {
        if (form.email === '') {
            alert("이메일을 입력하세요.");
            document.querySelector("#email").focus();
            return;
        }

        try {
            const response = await axios.post(`http://localhost:9090/member/email`, {email: form.email});
            if (response.data.item.emailCheckResult === 'invalid email') {
                alert("중복된 이메일입니다. 다른 이메일로 변경해주세요.");
                document.querySelector("#email").focus();
            } else {
                alert("인증 메일이 발송되었습니다. 인증 코드를 입력해주세요.");
                document.querySelectorAll(".verify-email").forEach(element => element.style.display = 'block');
            }
        } catch (e) {
            console.log(e);
            alert("에러 발생. 관리자에게 문의하세요.");
        }
    }, [form.email]);

    const verifyEmail = useCallback(async () => {
        if (form.verifyCode === '') {
            alert("인증코드를 입력하세요.");
            document.querySelector("#verifyCode").focus();
            return;
        }

        try {
            await axios.get(
                `http://localhost:9090/member/email/verify`,
                {
                    email: form.email,
                    verifyCode: form.verifyCode
                }
            );
            setEmailChk(true);

        } catch (error) {
            if (error.response && error.response.data && error.response.data.errorCode === 102) {
                alert("이메일 인증 코드가 일치하지 않습니다. 다시 시도하세요.");
            } else {
                alert("에러 발생. 관리자에게 문의하세요.");
            }
        }
    }, [form.email, form.verifyCode]);

    const validatePassword = (password) => {
        return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*+=-]).{9,}$/.test(password);
    };
    const passwordBlur = useCallback((e) => {
        if (validatePassword(form.password)) {
            setPwValidation(true);
            document.querySelector("#password-validation").style.display = "none";
        } else {
            setPwValidation(false);
            document.querySelector("#password-validation").style.display = "block";
            document.querySelector("#password").focus();
        }

        if (form.passwordChk !== '' && form.password !== form.passwordChk) {
            document.querySelector("#password-check-fail").style.display = "block";
        } else {
            document.querySelector("#password-check-fail").style.display = "none";
        }
    }, [form.password, form.passwordChk]);

    const handleSignUp = useCallback((e) => {
        e.preventDefault();

        if (!emailChk) {
            alert("이메일 인증을 진행하세요.");
            return;
        }

        if (!pwValidation) {
            alert("비밀번호는 특수문자, 영문자, 숫자 조합의 9자리 이상으로 설정하세요.");
            document.querySelector("#password").focus();
            return;
        }

        if (!pwChk) {
            alert("비밀번호가 일치하지 않습니다.");
            document.querySelector("#passwordChk").focus();
            return;
        }

        dispatch(signup(form));
    }, [form, emailChk, pwValidation, pwChk, dispatch]);

    return (
        <div className="SignUp">
            <form onSubmit={handleSignUp}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>Sign Up</h1>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            name='email' variant='outlined' fullWidth required
                            id='email' label='Email' value={form.email} autoFocus
                            onChange={textFieldChanged} disabled={emailChk}/>
                    </Grid>
                    <Grid item xs={2}>
                        <Button text={"Check"} id={"send-email-btn"} color='primary' onClick={sendEmail}/>
                    </Grid>
                    <Grid item xs={10} className="verify-email">
                        <TextField
                            name='verifyCode' variant='outlined' fullWidth
                            id='verifyCode' label='VerifyCode' value={form.verifyCode}
                            onChange={textFieldChanged} disabled={emailChk}/>
                    </Grid>
                    <Grid item xs={2} className="verify-email">
                        <Button text={"Verify"} id={"verify-email-btn"} color='primary' onClick={verifyEmail}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="password"
                            name='password'
                            variant='outlined'
                            fullWidth required
                            id='password'
                            label='Password'
                            value={form.password}
                            onChange={textFieldChanged} onBlur={passwordBlur}/>
                        <Typography
                            name='password-validation'
                            id='password-validation'
                            component='p'
                            variant='string'
                            style={{display: 'none', color: '#fd565f'}}>
                            비밀번호는 특수문자, 영문자, 숫자 조합의 9자리 이상으로 설정하세요.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="password" name='passwordChk'
                            variant='outlined'
                            required
                            id='passwordChk'
                            label='비밀번호 확인'
                            fullWidth
                            value={form.passwordChk}
                            onChange={textFieldChanged}/>
                        <Typography
                            name='password-check-success'
                            id='password-check-success'
                            component='p'
                            variant='string'
                            style={{display: 'none', color: '#3ed7a0'}}>
                            비밀번호가 일치합니다.
                        </Typography>
                        <Typography
                            name='password-check-fail'
                            id='password-check-fail'
                            component='p'
                            variant='string'
                            style={{display: 'none', color: '#fd565f'}}>
                            비밀번호가 일치하지 않습니다.
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name='name' variant='outlined' fullWidth required
                            id='name' label='Name' value={form.name}
                            onChange={textFieldChanged}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name='age' variant='outlined' fullWidth required
                            id='age' label='Age' value={form.age}
                            onChange={textFieldChanged}
                            inputProps={{maxLength: 3, onInput: handleInputChange}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name='height' variant='outlined' fullWidth required
                            id='height' label='Height' value={form.height}
                            onChange={textFieldChanged}
                            InputProps={{
                                endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                            }}
                            inputProps={{maxLength: 3, onInput: handleInputChange}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name='weight' variant='outlined' fullWidth required
                            id='weight' label='Weight' value={form.weight}
                            onChange={textFieldChanged}
                            InputProps={{
                                endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                            }}
                            inputProps={{maxLength: 3, onInput: handleInputChange}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button text="Sign Up" type={'positive'} submit={true}/>
                    </Grid>
                </Grid>
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <a href='/signin' className='link'>
                            Do you already have an account? Please Sign In.
                        </a>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default SignUp;