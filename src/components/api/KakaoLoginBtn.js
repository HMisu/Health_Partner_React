import React from "react";

const KakaoLoginBtn = () => {
    const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

    const openKakaoLogin = () => {
        // window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;
        window.location.href = "http://localhost:9090/oauth2/authorization/kakao";
    }


    return (
        <img src={process.env.PUBLIC_URL + `assets/kakao_signin_img.png`} alt="kakao_signin_img"
             className="social-signin" onClick={openKakaoLogin}/>
    )
};

export default KakaoLoginBtn;