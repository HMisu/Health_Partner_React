import React from "react";
import CheckList from "./CheckList";

const RecordItem = ({id, title, diary, checklist, meal, date, color}) => {
    return (
        <article className="RecordItem">
            <div className="thumbnail" style={{backgroundColor: color}}></div>
            <div className="info">
                <h6>
                    <a href="#">{title}</a>
                </h6>
                <div className="checklist">
                    <CheckList checklist={checklist}/>
                </div>
            </div>
        </article>
    );
};

export default React.memo(RecordItem);