import React from "react";
import CheckList from "./CheckList";

const TodoItem = ({seq, title, checklist, color}) => {
    return (
        <article className="TodoItem">
            <div className="thumbnail" style={{backgroundColor: color}}></div>
            <div className="info">
                <h6>
                    <a href={`/todo/d/${seq}`}>{title}</a>
                </h6>
                <div className="checklist">
                    <CheckList checklist={checklist}/>
                </div>
            </div>
        </article>
    );
};

export default TodoItem;