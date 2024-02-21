import '../../scss/Menu.scss';

const Menu = ({text, href, isSelected}) => {
    return (
        <li className={["Menu", isSelected ? "menu-active" : ""].join(" ")}>
            <a href={href}>{text}</a>
        </li>
    );
};

export default Menu;