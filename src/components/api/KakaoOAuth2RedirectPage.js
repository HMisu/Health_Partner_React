import {useEffect} from "react";
import {kakaoSignin} from "../../slices/signSlice";
import {BeatLoader} from "react-spinners";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

function KakaoOAuth2RedirectPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let token = new URL(window.location.href).searchParams.get("token");

    useEffect(() => {
        console.log("KakaoOAuth2RedirectPage loaded");
        console.log("Email parameter:", token);
        if (token) {
            dispatch(kakaoSignin(token));
            navigate("/");
        }
    }, [dispatch, token, navigate]);

    return <BeatLoader color="#36d7b7"/>;
}

export default KakaoOAuth2RedirectPage;