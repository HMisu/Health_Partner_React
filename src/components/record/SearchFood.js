import {TextField} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import React from "react";

const SearchFood = () => {
    return (<>
            <div className="SearchFood">
                <TextField fullWidth label="SearchFood" name="search"/>
                <div className="search-list">
                    <div className="food">
                        <div className="info">
                            <span className="name">돼지고기 김치찌개</span>
                            &nbsp;<span className="kcal">350kcal</span>
                        </div>
                        <button onClick={(e) => console.log(e.target)}><AddRoundedIcon/></button>
                    </div>
                    <div className="food">
                        <div className="info">
                            <span className="name">돼지고기 김치찌개</span>
                            &nbsp;<span className="kcal">350kcal</span>
                        </div>
                        <button onClick={(e) => console.log(e.target)}><AddRoundedIcon/></button>
                    </div>
                </div>
            </div>
            <div className="info">
                <img src={process.env.PUBLIC_URL + 'assets/food.jpg'} alt=""/>
                <div>
                    <h4 className="name">돼지고기 김치찌개</h4>
                    &nbsp;<span className="kcal">350kcal</span>
                    <div className="nutrient">
                        <h6>영양소</h6>
                        단백질 10g
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchFood;