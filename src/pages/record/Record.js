import LeftSection from "../../components/ui/layout/LeftSection";
import RightSection from "../../components/ui/layout/RightSection";
import RecommendModal from "../../components/recommend/RecommendModal";
import React from "react";
import Nav from "../../components/ui/layout/Nav";
import dayjs from "dayjs";
import RecordDetail from "../../components/record/RecordDetail";

const dummyData = {
    id: 4,
    title: "4번",
    diary: "오늘의 일기 1번",
    checklist: ["체크리스트1", "체크리스트2"],
    meal: ["breakfast", "lunch", "snack"],
    date: dayjs(),
};

const Record = () => {
    return (
        <>
            <LeftSection>
                <Nav/>
                <RecordDetail originData={dummyData}/>
            </LeftSection>
            <RightSection>
                <RecommendModal/>
            </RightSection>
        </>
    );
};

export default Record;