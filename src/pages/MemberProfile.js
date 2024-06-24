import React, {useCallback, useEffect, useState} from "react";
import '../scss/Sign.scss';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
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
    TextField
} from "@mui/material";
import Button from "../components/ui/Button";
import {handleNumInputChange} from "../util/handleNumInputChange";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteGoogleMember,
    deleteKakaoMember,
    deleteMember,
    getMemberProfile,
    modifyProfile,
    modifyProfileImg
} from "../slices/memberSlice";
import {useNavigate} from "react-router-dom";

const MemberProfile = () => {
    const [form, setForm] = useState({
        email: '',
        imgAddress: '',
        name: '',
        gender: 'female',
        age: '',
        height: '',
        weight: '',
        activityLevel: ''
    });

    const dispatch = useDispatch();
    const navi = useNavigate();

    const loginMemberEmail = useSelector(state => state.member.loginMemberEmail);
    const loginMemberName = useSelector(state => state.member.loginMemberName);
    const loginMemberProvider = useSelector(state => state.member.loginMemberProvider);

    const textFieldChanged = useCallback((e) => {
        const {name, value} = e.target;

        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    }, []);

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

    const handleProfileImageModify = useCallback(() => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    }, []);

    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            dispatch(modifyProfileImg(file));
        } else {
            alert('이미지 파일을 선택해주세요.');
        }
    }, [dispatch]);

    const moveChangePasswordPage = useCallback(() => {
        navi("/account/pw");
    }, [navi]);

    const handleProfileModify = useCallback((e) => {
        e.preventDefault();
        dispatch(modifyProfile(form));
    }, [form, dispatch]);

    const handleWithdrawal = useCallback(() => {
        if (window.confirm("정말로 회원 탈퇴를 하시겠습니까?")) {
            if (loginMemberProvider === "google") {
                dispatch(deleteGoogleMember());
            } else if (loginMemberProvider === "kakao") {
                dispatch(deleteKakaoMember());
            }

            dispatch(deleteMember(loginMemberEmail));

            navi("/");
        }
    }, [dispatch, navi, loginMemberEmail]);

    useEffect(() => {
        if (loginMemberEmail) {
            dispatch(getMemberProfile())
                .then((result) => {
                    const profile = result.payload || {};
                    setForm({
                        email: profile.email || '',
                        imgAddress: profile.imgAddress || '',
                        name: profile.name || '',
                        age: profile.age || '',
                        gender: profile.gender || 'female',
                        height: profile.height || '',
                        weight: profile.weight || '',
                        activityLevel: profile.activityLevel || ''
                    });
                })
                .catch((error) => {
                    console.error("Failed to fetch profile: ", error);
                });
        }
    }, [dispatch, loginMemberEmail]);

    return (
        form.email !== '' && (
            <div className="MemberProfile">
                <div className="profile-img">
                    {form.imgAddress !== null && form.imgAddress !== '' ? (
                        <img src={form.imgAddress} alt="member_profile_img"/>
                    ) : (
                        <img src={process.env.PUBLIC_URL + '/assets/ico_member_default.png'} alt="member_profile_img"/>
                    )}
                    {!loginMemberProvider && (
                        <button onClick={handleProfileImageModify}><AddAPhotoRoundedIcon/></button>
                    )}
                    <input type="file" id="fileInput" style={{display: "none"}} accept="image/*"
                           onChange={handleFileChange}/>
                </div>
                <form onSubmit={handleProfileModify}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <h1>{loginMemberName}</h1>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name='email' variant='outlined' fullWidth required
                                id='email' label='Email' value={form.email}
                                onChange={textFieldChanged} disabled={true}/>
                        </Grid>
                        {!loginMemberProvider && (
                            <>
                                <Grid item xs={10}>
                                    <span className="change-password">Change Password</span>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button text={"Change"} id={"send-email-btn"} color='primary'
                                            onClick={moveChangePasswordPage}/>
                                </Grid>
                            </>
                        )}
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
                                    value={form.gender}
                                    name="gender"
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
                            <Button text='Modify' type={'positive'} submit={true}/>
                        </Grid>
                    </Grid>
                </form>
                <div className="withdrawal-text" onClick={handleWithdrawal}>
                    Withdrawal of site membership
                </div>
            </div>

        )
    );
};

export default MemberProfile;
