import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography
} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import '../../scss/Sign.scss';
import axios from "axios";
import Button from "../../components/ui/Button";
import {handleNumInputChange} from "../../util/handleNumInputChange";
import {useDispatch, useSelector} from "react-redux";
import {signup} from "../../slices/memberSlice";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const [form, setForm] = useState({
        email: '',
        verifyCode: '',
        password: '',
        passwordChk: '',
        name: '',
        gender: 'female',
        age: '',
        height: '',
        weight: '',
        activityLevel: ''
    });
    const [emailChk, setEmailChk] = useState(false);
    const [pwValidation, setPwValidation] = useState(false);
    const [pwChk, setPwChk] = useState(false);
    const [showPasswordValidation, setShowPasswordValidation] = useState(false);
    const [showPasswordCheckFail, setShowPasswordCheckFail] = useState(false);
    const [showPasswordCheckSuccess, setShowPasswordCheckSuccess] = useState(false);

    const dispatch = useDispatch();
    const isSignIn = useSelector(state => state.member.isSignIn);

    const navi = useNavigate();

    useEffect(() => {
        if (isSignIn) {
            navi("/dashboard");
        }
    }, [isSignIn, navi]);

    const memoizedHandleInputChangeHeight = useCallback((event) => {
        handleNumInputChange(event, 3, 2);
    }, []);

    const memoizedHandleInputChangeWeight = useCallback((event) => {
        handleNumInputChange(event, 2, 2);
    }, []);

    const handleActivityLevelChange = useCallback((event) => {
        const {value} = event.target;
        setForm(prevForm => ({
            ...prevForm,
            activityLevel: value
        }));
    }, []);

    const handleGenderChange = useCallback((event) => {
        const {value} = event.target;
        setForm(prevForm => ({
            ...prevForm,
            gender: value
        }));
    }, []);

    const textFieldChanged = useCallback((e) => {
        const {name, value} = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));

        if (name === 'password' || name === 'passwordChk') {
            const isMatch = name === 'password' ? value === form.passwordChk : value === form.password;
            setPwChk(isMatch);
            setShowPasswordCheckSuccess(isMatch);
            setShowPasswordCheckFail(!isMatch);
        }
    }, [form.password, form.passwordChk]);

    const sendEmail = useCallback(async () => {
        if (form.email === '') {
            alert("이메일을 입력하세요.");
            document.querySelector("#email").focus();
            return;
        }

        try {
            const response = await axios.post(`http://localhost:9090/member/email`, {email: form.email});

            const emailCheckResult = response.data.item ? response.data.item.emailCheckResult : null;

            if (emailCheckResult === 'invalid email') {
                alert("중복된 이메일입니다. 다른 이메일로 변경해주세요.");
                document.querySelector("#email").focus();
            } else if (emailCheckResult === 'available email') {
                alert("인증 메일이 발송되었습니다. 인증 코드를 입력해주세요.");
                document.querySelectorAll(".verify-email").forEach(element => element.style.display = 'block');
            } else {
                alert("알 수 없는 상태입니다. 관리자에게 문의하세요.");
            }
        } catch (e) {
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
            await axios.get('http://localhost:9090/member/email/verify',
                {
                    params: {
                        email: form.email,
                        verifyCode: form.verifyCode
                    }
                });
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

    const passwordBlur = useCallback(() => {
        if (validatePassword(form.password)) {
            setPwValidation(true);
            setShowPasswordValidation(false);
        } else {
            setPwValidation(false);
            setShowPasswordValidation(true);
        }
    }, [form.password]);

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


        if (form.activityLevel === '') {
            alert("활동 수준을 선택해주세요");
            document.querySelector("#activityLevel").focus();
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
                        {showPasswordValidation && (
                            <Typography
                                name='password-validation'
                                id='password-validation'
                                component='p'
                                variant='string'
                                style={{color: '#fd565f'}}>
                                비밀번호는 특수문자, 영문자, 숫자 조합의 9자리 이상으로 설정하세요.
                            </Typography>
                        )}
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
                        {showPasswordCheckSuccess && (
                            <Typography
                                name='password-check-success'
                                id='password-check-success'
                                component='p'
                                variant='string'
                                style={{color: '#3ed7a0'}}>
                                비밀번호가 일치합니다.
                            </Typography>
                        )}
                        {showPasswordCheckFail && (
                            <Typography
                                name='password-check-fail'
                                id='password-check-fail'
                                component='p'
                                variant='string'
                                style={{color: '#fd565f'}}>
                                비밀번호가 일치하지 않습니다.
                            </Typography>
                        )}
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
                            id='age' label='Age' type="number" value={form.age}
                            onChange={textFieldChanged}
                            inputProps={{maxLength: 3}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel id="gender">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="gender"
                                defaultValue="female"
                                name="radio-buttons-group"
                                onChange={handleGenderChange}>
                                <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                                <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name='height' variant='outlined' fullWidth required
                            id='height' label='Height' type="text" value={form.height}
                            onChange={textFieldChanged}
                            InputProps={{
                                endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                            }}
                            inputProps={{maxLength: 6, onInput: memoizedHandleInputChangeHeight}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name='weight' variant='outlined' fullWidth required
                            id='weight' label='Weight' type="text" value={form.weight}
                            onChange={textFieldChanged}
                            InputProps={{
                                endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                            }}
                            inputProps={{maxLength: 5, onInput: memoizedHandleInputChangeWeight}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="activityLevel">Activity Level</InputLabel>
                            <Select
                                labelId="activityLevel"
                                id="activityLevel"
                                value={form.activityLevel}
                                label="Activity Level"
                                onChange={handleActivityLevelChange}
                            >
                                <MenuItem value={"Very Low"}>Very low (almost no exercise)</MenuItem>
                                <MenuItem value={"Low"}>Low (light exercise 1-3 times per week)</MenuItem>
                                <MenuItem value={"Usually"}>Usually (exercise 3-5 times a week)</MenuItem>
                                <MenuItem value={"High"}>High (exercise 6-7 times per week)</MenuItem>
                                <MenuItem value={"Very High"}>Very High (Very vigorous exercise or manual
                                    labor)</MenuItem>
                            </Select>
                        </FormControl>
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
