import React from "react";

const GoogleSignInBtn = () => {
    const API_URL = process.env.REACT_APP_ROOT;

    const handleLogin = () => {
        window.location.href = `${API_URL}/oauth2/authorization/google`;
    }

    return (
        <img src={process.env.PUBLIC_URL + `assets/google_signin_img.png`} alt="google_signin_img"
             className="social-signin" onClick={handleLogin}/>
    )
};

export default GoogleSignInBtn;