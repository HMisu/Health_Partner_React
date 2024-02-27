import React, {useCallback, useState} from "react";
import Tab from "../ui/Tab";
import TodoList from "./TodoList";
import {DateCalendar} from "@mui/x-date-pickers";
import dayjs from "dayjs";

const TodoModal = () => {
    const initialDate = dayjs();
    const [selectedDate, setSelectedDate] = useState(initialDate);

    const tabTitle = ["Week", "Monthly"];
    const [activeTab, setActiveTab] = useState(0);

    const handleDateChange = useCallback((newValue) => {
        setSelectedDate(newValue);
    }, []);


    const onClickTab = useCallback((idx) => {
        setActiveTab(idx);
    }, []);

    const MemoizedTodoTab = React.memo(({tabTitle}) => {
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
        <div className="TodoModal">
            <nav>
                <MemoizedTodoTab tabTitle={tabTitle}/>
            </nav>
            <div>
                <h4>
                    <img
                        src={process.env.PUBLIC_URL + `assets/ico_sun.png`}
                        alt="sun_icon"
                    />
                    {tabTitle[activeTab]}
                </h4>
                <TodoList activeTab={activeTab}>
                    <DateCalendar value={selectedDate} onChange={handleDateChange}/>
                </TodoList>
            </div>
        </div>
    );
};

export default TodoModal;
