import '../../scss/ui/Button.scss';

const Button = ({text, type = 'default', submit, id, onClick}) => {
    const btnType = ["positive", "negative"].includes(type) ? type : (submit ? "submit" : "default");

    return (
        <button className={["Button", `${btnType}`].join(" ")} id={id} onClick={onClick}
                type={submit ? "submit" : "button"}>{text}</button>
    );
};

export default Button;