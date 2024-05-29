import React, {useCallback, useEffect, useState} from "react";
import '../scss/Sign.scss';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import {Grid, InputAdornment, TextField} from "@mui/material";
import Button from "../components/ui/Button";
import {handleNumInputChange} from "../util/handleNumInputChange";
import {useDispatch, useSelector} from "react-redux";
import {getMemberProfile, modifyProfile, modifyProfileImg} from "../slices/memberSlice";
import {useNavigate} from "react-router-dom";

const MemberProfile = () => {
    const [form, setForm] = useState({
        email: '',
        imgAddress: '',
        name: '',
        age: '',
        height: '',
        weight: '',
    });

    const [provider, setProvider] = useState(null);

    const dispatch = useDispatch();
    const navi = useNavigate();

    const loginMemberEmail = useSelector(state => state.member.loginMemberEmail);
    const loginMemberName = useSelector(state => state.member.loginMemberName);

    const textFieldChanged = useCallback((e) => {
        const {name, value} = e.target;

        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    }, []);

    const handleInputChange = useCallback((e) => {
        handleNumInputChange(e);
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

    useEffect(() => {
        if (loginMemberEmail) {
            dispatch(getMemberProfile())
                .then((result) => {
                    const profile = result.payload || {};
                    setProvider(profile.provider || null);
                    setForm({
                        email: profile.email || '',
                        imgAddress: profile.imgAddress || '',
                        name: profile.name || '',
                        age: profile.age || '',
                        height: profile.height || '',
                        weight: profile.weight || ''
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
                    {(provider !== 'kakao' || provider !== 'google') && (
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
                        {(provider !== 'kakao' || provider !== 'google') && (
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
                                inputProps={{maxLength: 3, onInput: handleInputChange}}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name='height' variant='outlined' fullWidth required
                                id='height' label='Height' type="text" value={form.height}
                                onChange={textFieldChanged}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                }}
                                inputProps={{maxLength: 4, onInput: handleInputChange}}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name='weight' variant='outlined' fullWidth required
                                id='weight' label='Weight' type="text" value={form.weight}
                                onChange={textFieldChanged}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                }}
                                inputProps={{maxLength: 4, onInput: handleInputChange}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button text='Modify' type={'positive'} submit={true}/>
                        </Grid>
                    </Grid>
                </form>
            </div>

        )
    );
};

export default MemberProfile;
