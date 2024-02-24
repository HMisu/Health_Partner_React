import React, {useState} from "react";
import {Box, Checkbox, FormControl, FormControlLabel, FormGroup} from "@mui/material";
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

const EditCheckList = ({checklist}) => {
    const [checkedItems, setCheckedItems] = useState(checklist.map(() => false)); // 체크 상태를 관리합니다.

    const handleCheckboxChange = (index) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
    };

    const handleAddButtonClick = () => {
        // 추가 버튼 클릭 시 수행할 작업을 여기에 추가합니다.
        console.log("Add button clicked");
    };

    const handleEditButtonClick = () => {
        // 편집 버튼 클릭 시 수행할 작업을 여기에 추가합니다.
        console.log("Edit button clicked");
    };

    return (
        <Box sx={{display: "flex"}}>
            <FormControl component="fieldset" variant="standard">
                <FormGroup>
                    {checklist.map((item, idx) => (
                        <div key={idx}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkedItems[idx]}
                                        onChange={() => handleCheckboxChange(idx)}
                                    />
                                }
                                label={item}
                            />
                            <button onClick={handleAddButtonClick} className="delete">
                                <RemoveRoundedIcon/>
                            </button>
                            <button onClick={handleEditButtonClick} className="edit">
                                <EditRoundedIcon/>
                            </button>
                        </div>
                    ))}
                </FormGroup>
            </FormControl>
        </Box>
    );
};

export default React.memo(EditCheckList);
