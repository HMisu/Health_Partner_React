import EditUserInfo from "../components/user/EditUserInfo";
import React, {useCallback} from "react";
import '../scss/Sign.scss';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';

const UserInfo = () => {
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
    }, []);

    return (
        <div className="UserInfo">
            <div className="profile-img">
                <img src={process.env.PUBLIC_URL + `assets/ico_user_default.png`} alt="user_profile_img"/>
                <button><AddAPhotoRoundedIcon/></button>
            </div>
            <form onSubmit={handleSubmit}>
                <EditUserInfo title={"MyAccount"}/>
            </form>
        </div>
    );
};

export default UserInfo;