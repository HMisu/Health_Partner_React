import '../../scss/ui/Button.scss';

const Button = ({text, type, submit, id, onClick}) => {
    const btnType = ["positive", "negative"].includes(type) ? type : (submit ? "submit" : "default");

    return (
        <button className={["Button", `${btnType}`].join(" ")} id={id} onClick={onClick}
                type={submit ? "submit" : "button"}>{text}</button>
    );
};

Button.defaultProps = {type: "default"}

export default Button;