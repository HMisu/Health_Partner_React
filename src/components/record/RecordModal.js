import {getStringDate} from "../../util/date";
import EditHeightWeight from "../todo/EditHeightWeight";
import React from "react";
import '../../scss/Record.scss';
import NivoChart from "../ui/NivoChart";

const dummyData = [
    {
        "id": "Weight",
        "color": "hsl(156, 70%, 50%)",
        "data": [
            {
                "x": "2/20",
                "y": 60
            },
            {
                "x": "2/21",
                "y": 60
            },
            {
                "x": "2/22",
                "y": 60
            },
            {
                "x": "2/23",
                "y": 60
            },
            {
                "x": "2/24",
                "y": 60
            },
            {
                "x": "2/25",
                "y": 60
            },
            {
                "x": "2/26",
                "y": 60
            }
        ]
    },
    {
        "id": "Height",
        "color": "hsl(275, 70%, 50%)",
        "data": [
            {
                "x": "2/20",
                "y": 172
            },
            {
                "x": "2/21",
                "y": 172
            },
            {
                "x": "2/22",
                "y": 172
            },
            {
                "x": "2/23",
                "y": 172.5
            },
            {
                "x": "2/24",
                "y": 172.3
            },
            {
                "x": "2/25",
                "y": 172
            },
            {
                "x": "2/26",
                "y": 172
            }
        ]
    },
    {
        "id": "BMI",
        "color": "hsl(116, 70%, 50%)",
        "data": [
            {
                "x": "2/20",
                "y": 20.28
            },
            {
                "x": "2/21",
                "y": 20.28
            },
            {
                "x": "2/22",
                "y": 20.28
            },
            {
                "x": "2/23",
                "y": 20.28
            },
            {
                "x": "2/24",
                "y": 20.25
            },
            {
                "x": "2/25",
                "y": 20.20
            },
            {
                "x": "2/26",
                "y": 19.05
            }
        ]
    }
];

const RecordModal = () => {
    return (
        <div className="RecordModal">
            <div>
                Now Height :172.5ck Weight : xx.xxkg
                <span className="date">Today : {getStringDate(new Date())}</span>
            </div>
            <div className="EditHeightWeight">
                <EditHeightWeight/>
            </div>
            <div style={{width: 'auto', height: '300px', margin: '0 auto'}}>
                <NivoChart data={dummyData}/>
            </div>
        </div>
    );
};

export default RecordModal;