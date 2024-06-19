import '../scss/LoadFail.scss';
import {Link} from "react-router-dom";
import React from "react";
import Button from "./ui/Button";

const LoadFail = () => {
    return (
        <div className="LoadFail">
            <img src={process.env.PUBLIC_URL + '/assets/free-animated-icon-hot-11175793.gif'}/>
            <p className="fail-title">찾을 수 없는 페이지입니다.</p>
            <p className="fail-content">주소가 올바르지 않거나 알 수 없는 오류로 인해<br/>페이지를 찾을 수 없습니다.</p>
            <Link to={'/dashboard'}>
                <Button id={'SvgButton1'}
                        color={'yellow'}
                        text={"홈으로 가기"}/>
            </Link>
        </div>
    );
}

export default LoadFail;