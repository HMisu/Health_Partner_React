import {useLocation} from 'react-router-dom';
import '../../scss/ui/Tab.scss';

const Menu = ({text, href, onClick}) => {
    const location = useLocation();

    const isSelected = location.pathname === href;

    return (
        <li className={`Tab ${isSelected ? 'tab-active' : ''}`} onClick={onClick}>
            <a href={href}>{text}</a>
        </li>
    );
};

export default Menu;
