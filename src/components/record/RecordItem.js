import {Box, Checkbox, FormControl, FormControlLabel, FormGroup} from "@mui/material";

const RecordItem = () => {
    return (
        <article className="UserInfoItem">
            <div className="thumbnail"></div>
            <div className="info">
                <h6 className="title">
                    오늘의 건강 기록
                </h6>
                <div className="checklist">
                    <Box sx={{display: 'flex'}}>
                        <FormControl sx={{m: 3}} component="fieldset" variant="standard">
                            <FormGroup>
                                <FormControlLabel name="label1" control={<Checkbox defaultChecked/>} label="물 1L 마시기"/>
                                <FormControlLabel name="label2" control={<Checkbox/>} label="영양제 먹기"/>
                                <FormControlLabel name="label3" control={<Checkbox/>} label="유산소"/>
                            </FormGroup>
                        </FormControl>
                    </Box>
                </div>
            </div>
        </article>
    );
};

export default RecordItem;