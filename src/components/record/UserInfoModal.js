import EditHeightWeight from "./EditHeightWeight";
import EatingMealList from "./EatingMealList";
import {getStringDate} from "../../util/date";
import Button from "../ui/Button";

const UserInfoModal = () => {
    return (
        <div className="UserInfoModal">
            <div>Today : {getStringDate(new Date())}</div>
            <div className="EditHeightWeight">
                <EditHeightWeight/>
            </div>
            <div className="EatingMealList">
                <h4>Today's Meal</h4>
                <Button text={"Registration of meal"} type={"positive"}/>
                <EatingMealList/>
            </div>
        </div>
    );
};

export default UserInfoModal;