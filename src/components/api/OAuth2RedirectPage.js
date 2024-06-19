import {useEffect} from "react";
import {oauth2Signin} from "../../slices/memberSlice";
import {BeatLoader} from "react-spinners";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

function OAuth2RedirectPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let token = new URL(window.location.href).searchParams.get("token");

    useEffect(() => {
        if (token) {
            dispatch(oauth2Signin(token));
            navigate("/dashboard");
        }
    }, [dispatch, token, navigate]);

    return <BeatLoader color="#36d7b7"/>;
}

export default OAuth2RedirectPage;