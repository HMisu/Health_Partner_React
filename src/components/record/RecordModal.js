import React from "react";
import {getStringDate} from "../../util/date";
import EditHeightWeight from "../todo/EditHeightWeight";
import "../../scss/Record.scss";
import NivoChart from "../ui/NivoChart";

const RecordModal = React.memo(({record = []}) => {
    const records = Array.isArray(record) ? record : [];
    const lastItem = records.length > 0 ? records[records.length - 1] : null;

    const getLastValue = (data, id) => {
        const item = data.find((d) => d.id === id);
        if (item && item.data && item.data.length > 0) {
            const lastData = item.data[item.data.length - 1];
            return lastData.y || "N/A";
        }
        return "N/A";
    };

    return (
        <div className="RecordModal">
            <div>
                {lastItem ? (
                    <>
                        Now Height: {getLastValue(records, "Height")}cm
                        Weight:{" "}
                        {getLastValue(records, "Weight") !== "N/A"
                            ? getLastValue(records, "Weight").toFixed(2)
                            : "N/A"}
                        kg
                    </>
                ) : (
                    "No record available"
                )}
                <span className="date">Today: {getStringDate(new Date())}</span>
            </div>
            <div className="EditHeightWeight">
                <EditHeightWeight/>
            </div>
            {records.length > 0 ? (
                <div style={{width: "auto", height: "300px", margin: "0 auto"}}>
                    <NivoChart data={records}/>
                </div>
            ) : (
                <span>Please record your height and weight.</span>
            )}
        </div>
    );
});

export default RecordModal;
