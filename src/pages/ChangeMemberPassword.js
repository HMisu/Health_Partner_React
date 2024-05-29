import React, {useCallback, useState} from "react";
import '../scss/Sign.scss';
import {Grid, TextField, Typography} from "@mui/material";
import Button from "../components/ui/Button";
import {useDispatch, useSelector} from "react-redux";
import {modifyPassword} from "../slices/memberSlice";

const ChangeMemberPassword = () => {
    const dispatch = useDispatch();
    const loginMemberEmail = useSelector(state => state.member.loginMemberEmail);

    const [form, setForm] = useState({
        email: loginMemberEmail,
        password: '',
        passwordChk: '',
        currentPassword: '',
    });

    const [pwValidation, setPwValidation] = useState(false);
    const [pwChk, setPwChk] = useState(false);
    const [showPwValidation, setShowPwValidation] = useState(false);
    const [showPwChkSuccess, setShowPwChkSuccess] = useState(false);
    const [showPwChkFail, setShowPwChkFail] = useState(false);

    const textFieldChanged = useCallback((e) => {
        const {name, value} = e.target;

        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));

        if (name === 'password' || name === 'passwordChk') {
            const isMatch = (name === 'password' && value === form.passwordChk) || (name === 'passwordChk' && value === form.password);
            setPwChk(isMatch);
            setShowPwChkSuccess(isMatch);
            setShowPwChkFail(!isMatch);
        }
    }, [form]);

    const validatePassword = useCallback((password) => {
        return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!?@#$%^&*+=-]).{9,}$/.test(password);
    }, []);

    const passwordBlur = useCallback(() => {
        const isValid = validatePassword(form.password);
        setPwValidation(isValid);
        setShowPwValidation(!isValid);

        if (form.passwordChk !== '' && form.password !== form.passwordChk) {
            setShowPwChkFail(true);
        } else {
            setShowPwChkFail(false);
        }
    }, [form.password, form.passwordChk, validatePassword]);

    const handleProfileModify = useCallback((e) => {
        e.preventDefault();

        if (form.currentPassword === '') {
            alert("기존의 비밀번호를 입력해주세요.");
            document.querySelector("#currentPassword").focus();
            return;
        }

        if (form.currentPassword === form.password) {
            alert("기존의 비밀번호와 변경할 비밀번호가 같습니다.");
            document.querySelector("#password").focus();
            return;
        }

        if (!pwValidation) {
            alert("변경할 비밀번호는 특수문자, 영문자, 숫자 조합의 9자리 이상으로 설정하세요.");
            document.querySelector("#password").focus();
            return;
        }

        if (!pwChk) {
            alert("변경할 비밀번호가 일치하지 않습니다.");
            document.querySelector("#passwordChk").focus();
            return;
        }

        dispatch(modifyPassword(form));
    }, [form, pwValidation, pwChk, dispatch]);

    return (
        loginMemberEmail !== '' && (
            <div className="MemberProfile">
                <form onSubmit={handleProfileModify}>
                    <input type="hidden" name='email' value={form.email}/>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <h1>비밀번호 변경</h1>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name='currentPassword' variant='outlined' fullWidth
                                id='currentPassword' className='password' label='Current Password' type='password'
                                value={form.currentPassword} onChange={textFieldChanged} onBlur={passwordBlur}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name='password' variant='outlined' fullWidth
                                id='password' className='password' label='New Password' type='password'
                                value={form.password} onChange={textFieldChanged} onBlur={passwordBlur}/>
                            {showPwValidation && (
                                <Typography
                                    id='password-validation'
                                    component='p'
                                    variant='string'
                                    style={{color: '#fd565f'}}>
                                    변경할 비밀번호는 특수문자, 영문자, 숫자 조합의 9자리 이상으로 설정하세요.
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name='passwordChk' variant='outlined' fullWidth
                                id='passwordChk' className='password' label='Password Verify' type='password'
                                value={form.passwordChk} onChange={textFieldChanged}/>
                            {showPwChkSuccess && (
                                <Typography
                                    id='password-check-success'
                                    component='p'
                                    variant='string'
                                    style={{color: '#3ed7a0'}}>
                                    비밀번호가 일치합니다.
                                </Typography>
                            )}
                            {showPwChkFail && (
                                <Typography
                                    id='password-check-fail'
                                    component='p'
                                    variant='string'
                                    style={{color: '#fd565f'}}>
                                    비밀번호가 일치하지 않습니다.
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Button text='Change' type={'positive'} submit={true}/>
                        </Grid>
                    </Grid>
                </form>
            </div>

        )
    );
};

export default ChangeMemberPassword;
