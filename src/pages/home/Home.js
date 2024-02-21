import Header from "../../components/Header";
import RecordModal from "../../components/record/RecordModal";
import RecommendModal from "../../components/recommend/RecommendModal";
import React from "react";
import UserInfoModal from "../../components/record/UserInfoModal";
import BottomLeftSection from "../../components/ui/BottomLeftSection";
import TopLeftSection from "../../components/ui/TopLeftSection";
import RightSection from "../../components/ui/RightSection";

const Home = () => {
    return (
        <>
            <Header/>
            <TopLeftSection component={<UserInfoModal/>}/>
            <BottomLeftSection component={<RecordModal/>}/>
            <RightSection component={<RecommendModal/>}/>
        </>
    );
}

export default Home;