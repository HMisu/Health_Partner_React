import React from "react";
import Tab from "../ui/Tab";
import TodoList from "./TodoList";
import {DateCalendar} from "@mui/x-date-pickers";

const TodoModal = ({activeTab, selectedDate, todos, water, handleDateChange, onClickTab}) => {
    const MemoizedTodoTab = React.memo(({tabTitle}) => (
        <ul>
            {tabTitle.map((title, idx) => (
                <Tab
                    key={idx}
                    text={title}
                    isSelected={idx === activeTab}
                    onClick={() => onClickTab(idx)}
                >
                    {title}
                </Tab>
            ))}
        </ul>
    ));

    return (
        <div className="TodoModal">
            <nav>
                <MemoizedTodoTab tabTitle={["Week", "Monthly"]}/>
            </nav>
            <div>
                <h4>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/ico_sun.png`}
                        alt="sun_icon"
                    />
                    {activeTab === 0 ? "Week" : "Monthly"}
                </h4>
                {activeTab === 1 && (
                    <span>Today's water intake {water}ml</span>
                )}
                <TodoList
                    activeTab={activeTab}
                    selectedDate={selectedDate}
                    todos={todos}
                >
                    {activeTab === 1 && (
                        <DateCalendar
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    )}
                </TodoList>
            </div>
        </div>
    );
};

export default TodoModal;
