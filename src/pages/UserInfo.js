import React, {useCallback, useState} from "react";
import '../scss/Sign.scss';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import {Grid, InputAdornment, TextField, Typography} from "@mui/material";
import Button from "../components/ui/Button";
import {handleNumInputChange} from "../util/handleNumInputChange";

const UserInfo = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        passwordChk: '',
        name: '',
        age: '',
        height: '',
        weight: ''
    });

    const [pwValidation, setPwValidation] = useState(false);
    const [pwChk, setPwChk] = useState(false);

    const textFieldChanged = useCallback((e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }, [form]);

    const handleInputChange = useCallback((event) => {
        handleNumInputChange(event);
    }, []);

    return (
        <div className="UserInfo">
            <div className="profile-img">
                <img src={process.env.PUBLIC_URL + `assets/ico_user_default.png`} alt="user_profile_img"/>
                <button><AddAPhotoRoundedIcon/></button>
            </div>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>My Account</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name='email' variant='outlined' fullWidth required
                            id='email' label='Email' value={form.email}
                            onChange={textFieldChanged}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name='password' variant='outlined' fullWidth required
                            id='password' label='Password' value={form.password}
                            onChange={textFieldChanged}/>
                        <Typography
                            name='password-validation'
                            id='password-validtaion'
                            component='p'
                            variant='string'
                            style={{display: 'none', color: '#fd565f'}}>
                            비밀번호는 특수문자, 영문자, 숫자 조합의 9자리 이상으로 설정하세요.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name='passwordChk'
                            variant='outlined'
                            required
                            id='passwordChk'
                            label='비밀번호 확인'
                            fullWidth
                            type='password'
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
                        <Button text='My Account' type={'positive'}/>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default UserInfo;