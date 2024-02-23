import '../../scss/ui/Tab.scss';

const Tab = ({text, href, isSelected, onClick}) => {
    return (
        <li className={["Tab", isSelected ? "tab-active" : ""].join(" ")} onClick={onClick}>
            <a href={href}>{text}</a>
        </li>
    );
};

export default Tab;