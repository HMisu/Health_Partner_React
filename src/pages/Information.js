import Button from "../components/ui/Button";
import React from "react";
import '../scss/Infomation.scss';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import {Paper} from "@mui/material";
import Carousel from "react-material-ui-carousel";

const items = [
    {
        img: "assets/screenshots/mockup_img_home_detail_1.png",
        title: "<span>식단</span>과 <span>건강습관</span>을<br/> 기록할 수 있습니다",
        description: "설명1"
    },
    {
        img: "assets/screenshots/mockup_img_home_detail_2.png",
        title: "",
        description: "설명2"
    },
    {
        img: "assets/screenshots/mockup_img_home_detail_3.png",
        title: "",
        description: "설명3"
    },
    {
        img: "assets/screenshots/mockup_img_home_detail_4.png",
        title: "",
        description: "설명4"
    }
];

const Item = ({item}) => {
    return (
        <Paper className="Project">
            <div className="img-wrappers"><img src={process.env.PUBLIC_URL + item.img} alt=""/></div>
            <div className="desc-wrappers">
                <div className="title" dangerouslySetInnerHTML={{__html: item.title}}/>
                <div className="description">
                    {item.description}
                </div>
            </div>
        </Paper>
    );
};

const Information = () => {
    return (
        <section className="Information">
            <div className="link-container">
                <div className="title">건강을 기록하세요</div>
                <div className="description">하루 식단을 기록하고 부족한 영양소에 따라 음식을 추천합니다.</div>
                <div className="button-wrappers">
                    <Button text={<>
                        Go to Console
                        <ArrowForwardIosRoundedIcon/>
                    </>}/>
                </div>
                <div className="img-wrappers">
                    <img src={process.env.PUBLIC_URL + 'assets/screenshots/mockup_img_home.png'} alt=""/>
                </div>
            </div>
            <div className="description-container">
                <Carousel
                    className="Carousel"
                    indicatorIconButtonProps={{
                        style: {
                            fontSize: '20px',
                            color: '#C4C4C4'
                        }
                    }}
                    activeIndicatorIconButtonProps={{
                        style: {
                            color: '#7287FB'
                        }
                    }}
                    indicatorContainerProps={{
                        style: {
                            margin: '0 auto',
                            width: '200px',
                            padding: '8px',
                            borderRadius: '50px',
                            background: '#F4F6F9'
                        }
                    }}
                    autoPlay={true} animation={"slide"} indicators={true} duration={300}
                    navButtonsAlwaysVisible={false}
                    navButtonsAlwaysInvisible={false} cycleNavigation={true} fullHeightHover={true} swipe={true}>
                    {
                        items.map((item, index) => {
                            return <Item item={item} key={index}/>
                        })
                    }
                </Carousel>
            </div>
        </section>
    );
}

export default Information;