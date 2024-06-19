import React, {useState} from "react";
import {Box, Checkbox, FormControl, FormControlLabel, FormGroup} from "@mui/material";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import EditRoundedIcon from '@mui/icons-material/EditRounded';

const EditCheckList = ({checklist, handleEditCheck, handleEditCheckText, handleDeleteCheck}) => {
    const [editTexts, setEditTexts] = useState(new Array(checklist.length).fill(""));

    const handleEditTextChange = (event, index) => {
        const updatedEditTexts = [...editTexts];
        updatedEditTexts[index] = event.target.value;
        setEditTexts(updatedEditTexts);
    };

    const handleEditButtonClicked = (index) => {
        // 수정 버튼 클릭 시 해당 인덱스의 텍스트를 editTexts에 설정
        setEditTexts((prevEditTexts) => {
            const updatedEditTexts = [...prevEditTexts];
            updatedEditTexts[index] = checklist[index].text;
            return updatedEditTexts;
        });
    };

    const handleEditConfirm = (index) => {
        handleEditCheckText(checklist[index].seq, editTexts[index]); // 수정된 텍스트와 인덱스 전달
        const updatedEditTexts = [...editTexts];
        updatedEditTexts[index] = ""; // 입력 상자 초기화
        setEditTexts(updatedEditTexts);
    };

    return (
        <Box sx={{display: "flex"}}>
            <FormControl component="fieldset" variant="standard">
                <FormGroup>
                    {checklist &&
                        checklist.map((item, idx) => (
                            <div key={idx}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={item.isCheck}
                                            onChange={() => handleEditCheck(idx)}
                                        />
                                    }
                                    label={item.text}
                                />
                                <button onClick={() => handleEditButtonClicked(idx)} className="edit">
                                    <EditRoundedIcon/>
                                </button>
                                <button onClick={() => handleDeleteCheck(item.seq)} className="delete">
                                    <RemoveRoundedIcon/>
                                </button>
                                {editTexts[idx] && (
                                    <>
                                        <input type="text" value={editTexts[idx]}
                                               onChange={(e) => handleEditTextChange(e, idx)}/>
                                        <button onClick={() => handleEditConfirm(idx)}>Save</button>
                                    </>
                                )}
                            </div>
                        ))}
                </FormGroup>
            </FormControl>
        </Box>
    );
};

export default React.memo(EditCheckList);
