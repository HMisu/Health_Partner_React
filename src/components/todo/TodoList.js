import React, {useEffect, useState} from "react";
import TodoItem from "./TodoItem";
import {randomBrightColor} from "../../util/randomBrightColor";

const TodoList = ({children, activeTab, todos}) => {
    const changeThumbnailColors = () => {
        return Array.from({length: todos.length}, () => randomBrightColor());
    };

    const [thumbnailColors, setThumbnailColors] = useState([]);

    useEffect(() => {
        if (todos && todos.length > 0) {
            setThumbnailColors(changeThumbnailColors());
        }
    }, [todos]);

    return (
        <div className={activeTab === 1 ? "monthly" : ""}>
            {children}
            <div className={["TodoList"].join(" ")}>
                {todos &&
                    todos.length > 0 &&
                    todos.map((item, index) => (
                        <TodoItem key={item.seq} {...item} color={thumbnailColors[index]}/>
                    ))}
                <div className="addButton">
                    <a href="/todo/write">+ 추가하기</a>
                </div>
            </div>
        </div>
    );
};

export default React.memo(TodoList);
