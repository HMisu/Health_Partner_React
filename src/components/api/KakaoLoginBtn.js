import React from "react";

const KakaoLoginBtn = () => {
    const API_URL = process.env.REACT_APP_ROOT;

    const openKakaoLogin = () => {
        window.location.href = `${API_URL}/oauth2/authorization/kakao`;
    }

    return (
        <img src={process.env.PUBLIC_URL + `assets/kakao_signin_img.png`} alt="kakao_signin_img"
             className="social-signin" onClick={openKakaoLogin}/>
    )
};

export default KakaoLoginBtn;