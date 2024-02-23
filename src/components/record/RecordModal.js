import React, {useState} from "react";
import Tab from "../ui/Tab";
import RecordList from "./RecordList";
import {DateCalendar} from "@mui/x-date-pickers";
import dayjs from "dayjs";

const MemoizedDateCalendar = React.memo(({value, onChange}) => {
    return (
        <DateCalendar
            value={value}
            onChange={onChange}
        />
    );
});

const RecordModal = () => {
    const initialDate = dayjs();
    const [date, setDate] = useState(initialDate);

    const tabTitle = ["Daily", "Monthly"];
    const [activeTab, setActiveTab] = useState(0);
    const onClickTab = (idx) => {
        setActiveTab(idx);
    };

    const RecordTab = React.memo(({tabTitle}) => {
        return (
            <ul>
                {tabTitle.map((title, idx) => (
                    <Tab
                        key={idx}
                        text={title}
                        isSelected={idx === activeTab}
                        onClick={() => onClickTab(idx)}>
                        {title}
                    </Tab>
                ))}
            </ul>
        );
    });

    return (
        <div className="RecordModal">
            <nav>
                <RecordTab tabTitle={tabTitle}/>
            </nav>
            <div>
                <h4>
                    <img
                        src={process.env.PUBLIC_URL + `assets/ico_sun.png`}
                        alt="sun_icon"
                    />
                    Daily
                </h4>
                <RecordList activeTab={activeTab}>
                    <MemoizedDateCalendar value={date} onChange={setDate}/>
                </RecordList>
            </div>
        </div>
    );
};

export default RecordModal;
