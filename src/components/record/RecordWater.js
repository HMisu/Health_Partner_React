import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import React from "react";

const RecordWater = ({water, onFetchIntake}) => {
    return (
        <article className="RecordWater">
            <div className="variation">
                <button onClick={() => onFetchIntake(water - 250)}><RemoveRoundedIcon/></button>
                <div className="water-img">
                    <img src={process.env.PUBLIC_URL + 'assets/ico_water.png'} alt=""/>
                </div>
                <button onClick={() => onFetchIntake(water + 250)}><AddRoundedIcon/></button>
            </div>
            <div className="water-intake">
                현재까지 물 섭취량<br/>
                <span>{water}ml</span>
            </div>
        </article>
    );
};

export default RecordWater;