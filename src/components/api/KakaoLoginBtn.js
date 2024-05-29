import React from "react";

const KakaoLoginBtn = () => {
    const openKakaoLogin = () => {
        window.location.href = "http://localhost:9090/oauth2/authorization/kakao";
    }

    return (
        <img src={process.env.PUBLIC_URL + `assets/kakao_signin_img.png`} alt="kakao_signin_img"
             className="social-signin" onClick={openKakaoLogin}/>
    )
};

export default KakaoLoginBtn;