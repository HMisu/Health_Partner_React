import React from "react";

const GoogleSignInBtn = () => {
    const clientId = process.env.REACT_APP_GOOGLE_REST_API_KEY;
    const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

    const handleLogin = () => {
        // window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${redirectUri}&client_id=${clientId}`;
        window.location.href = "https://localhost:9090/oauth2/authorization/kakao"
    }

    return (
        <>
            <a href={`https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`}>
                <img src={process.env.PUBLIC_URL + `assets/google_signin_img.png`} alt="google_signin_img"
                     className="social-signin" onClick={handleLogin}/>
            </a>
        </>
    )
};

export default GoogleSignInBtn;