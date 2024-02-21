const Button = ({text, type, onClick}) => {
    // 이상한 타입값이 전달되면 무조건 default로 변환
    const btnType = ["positive", "negative"].includes(type) ? type : "default";

    return (
        <button className={["Button", `${btnType}`].join(" ")} onClick={onClick}>{text}</button>
    );
};

Button.defaultProps = {type: "default"}

export default Button;