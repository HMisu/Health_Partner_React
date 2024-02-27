import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import {TextField} from "@mui/material";
import React, {useCallback} from "react";
import {handleNumInputChange} from "../../util/handleNumInputChange";
import dayjs from "dayjs";
import UserPedometerList from "./UserPedometerList";


const RecordPedometer = () => {
    const lastDayOfMonth = dayjs().endOf('month').date();

    const percentage = 66;
    const dummyData = Array.from({length: lastDayOfMonth}, () => Math.floor(Math.random() * 15001));

    const memoizedHandleInputChange = useCallback((event) => {
        handleNumInputChange(event);
    }, []);

    return (
        <article className="RecordPedometer">
            <div className="left-container">
                <CircularProgressbar counterClockwise value={percentage} text={`${percentage}%`}
                                     styles={buildStyles({
                                         pathColor: `rgba(0, 102, 221, ${percentage / 100})`,
                                         textSize: '14px',
                                         textColor: 'black',
                                         trailColor: '#B8D0EC',
                                         backgroundColor: 'none',
                                     })}/>
                <h4>목표 걸음수</h4>
                <div className="goal">
                    <TextField
                        fontSize="12px"
                        id="custom-css-outlined-input1"
                        inputProps={{maxLength: 5, onInput: memoizedHandleInputChange}}
                    />
                    <button>Edit</button>
                </div>
            </div>
            <div className="right-container">
                <div className="recent-total">
                    최근 7일동안 5018걸음 걸었어요.
                    <div className="burned-kcal">
                        <img src={process.env.PUBLIC_URL + `assets/ico_fire.png`} alt="icon_fire"/>
                        47kcal 소모
                    </div>
                </div>
                <UserPedometerList data={dummyData}/>
            </div>
        </article>
    );
};

export default RecordPedometer;
