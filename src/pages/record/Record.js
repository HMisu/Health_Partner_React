import LeftSection from "../../components/ui/layout/LeftSection";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import RightSection from "../../components/ui/layout/RightSection";
import React from "react";
import RecordModal from "../../components/record/RecordModal";
import RecordWater from "../../components/record/RecordWater";
import RecordStep from "../../components/record/RecordStep";

const Record = () => {
    return (
        <>
            <LeftSection>
                <RecordModal/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <RecordStep/>
                </LocalizationProvider>
            </LeftSection>
            <RightSection>
                <RecordWater/>
            </RightSection>
        </>
    );
};

export default Record;