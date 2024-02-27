import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import React from "react";

const RecordWater = () => {
    return (
        <article className="RecordWater">
            <div className="variation">
                <button><RemoveRoundedIcon/></button>
                <div className="water-img">
                    <img src={process.env.PUBLIC_URL + 'assets/ico_water.png'} alt=""/>
                </div>
                <button><AddRoundedIcon/></button>

            </div>
            <div className="water-intake">
                현재까지 물 섭취량<br/>
                <span>500ml</span>
            </div>
        </article>
    );
};

export default RecordWater;