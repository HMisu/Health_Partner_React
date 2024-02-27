import {Grid} from "@mui/material";
import React, {useCallback} from "react";
import '../../scss/Sign.scss';
import EditUserInfo from "../../components/user/EditUserInfo";

const SignUp = () => {
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
    }, []);

    return (
        <div className="SignUp">
            <form onSubmit={handleSubmit}>
                <EditUserInfo title={"Sign Up"}/>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <a href='/signin' className="link">
                            Do you already have an account? Please Sign In.
                        </a>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default SignUp;