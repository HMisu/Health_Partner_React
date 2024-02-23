import React, {useEffect, useReducer, useState} from "react";
import RecordItem from "./RecordItem";
import dayjs from "dayjs";
import {randomBrightColor} from "../../util/randomBrightColor";

const reducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case "INIT": {
            return action.data;
        }
        case "CREATE": {
            newState = [action.data, ...state];
            break;
        }
        case "REMOVE": {
            newState = state.filter((item) => item.id !== action.targetId);
            break;
        }
        case "EDIT": {
            newState = state.map((item) =>
                item.id === action.data.id ? {...action.data} : item
            );
            break;
        }
        default:
            return state;
    }
    return newState;
};

const dummyData = [
    {
        id: 1,
        title: "1번",
        diary: "잘지켰다",
        checklist: ["체크리스트1", "체크리스트2", "체크리스트3", "체크리스트4", "체크리스트5"],
        meal: ["breakfast", "lunch", "dinner", "snack"],
        date: dayjs(),
    },
    {
        id: 2,
        title: "2번",
        diary: "샐러드 맛없어",
        checklist: ["체크리스트1", "체크리스트2"],
        meal: ["breakfast", "dinner"],
        date: dayjs(),
    },
    {
        id: 3,
        title: "3번",
        diary: "잘지켰다",
        checklist: ["체크리스트1", "체크리스트2", "체크리스트3"],
        meal: ["breakfast", "lunch", "dinner"],
        date: dayjs(),
    },
    {
        id: 4,
        title: "4번",
        diary: "오늘의 일기 1번",
        checklist: ["체크리스트1"],
        meal: ["breakfast", "lunch", "snack"],
        date: dayjs(),
    },
];

const RecordList = ({children, activeTab}) => {
    const [data, dispatch] = useReducer(reducer, dummyData);

    const changeThumbnailColors = () => {
        return Array.from({length: 5}, () => randomBrightColor());
    };

    // activeTab와 data가 변경될 때마다 색상 변경
    const [thumbnailColors, setThumbnailColors] = useState(changeThumbnailColors());

    useEffect(() => {
        if (data.length > 0) {
            setThumbnailColors(changeThumbnailColors());
        }
    }, [data]);

    return (
        <div className={activeTab === 1 ? "monthly" : ""}>
            {children}
            <div className={["RecordList"].join(" ")}>
                {data.map((item) => (
                    <RecordItem
                        key={item.id}
                        {...item}
                        color={thumbnailColors[item.id - 1]}
                    />
                ))}
                <div className="addButton">
                    <a href="#">+ 추가하기</a>
                </div>
            </div>
        </div>
    );
};

RecordList.defaultProps = {
    diaryList: [],
};

export default RecordList;
