import React from "react";

const GoogleSignInBtn = () => {
    const handleLogin = () => {
        window.location.href = "http://localhost:9090/oauth2/authorization/google";
    }

    return (
        <img src={process.env.PUBLIC_URL + `assets/google_signin_img.png`} alt="google_signin_img"
             className="social-signin" onClick={handleLogin}/>
    )
};

export default GoogleSignInBtn;