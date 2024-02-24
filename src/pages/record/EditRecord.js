import LeftSection from "../../components/ui/layout/LeftSection";
import RightSection from "../../components/ui/layout/RightSection";
import React from "react";
import Nav from "../../components/ui/layout/Nav";
import dayjs from "dayjs";
import RecordDetail from "../../components/record/RecordDetail";

import '../../scss/EditRecord.scss';
import EditCheckList from "../../components/record/EditCheckList";
import RegCheckList from "../../components/record/RegCheckList";

const dummyData = {
    id: 4,
    title: "4번",
    diary: "오늘의 일기 1번",
    checklist: ["체크리스트1", "체크리스트2"],
    meal: ["breakfast", "lunch", "snack"],
    date: dayjs(),
};

const EditRecord = () => {
    return (
        <>
            <LeftSection>
                <Nav/>
                <RecordDetail originData={dummyData}/>
            </LeftSection>
            <RightSection>
                <RegCheckList/>
                <EditCheckList checklist={dummyData.checklist}/>
            </RightSection>
        </>
    );
};

export default EditRecord;