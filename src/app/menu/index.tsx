import React, { useState } from 'react';
import { Link } from '@reach/router';
import './style.css';

export type MenuItem = {
    key: string;
    name: string;
};

export type MenuGroups = { [group: string]: MenuItem[] };

type Props = {
    groups: MenuGroups;
};
const Menu: React.FC<Props> = (props) => {
    const { groups } = props;
    const [open, setOpen] = useState(false);
    function toggleMenu() {
        setOpen((open) => !open);
    }
    return (
        <div className={`Menu ${open && 'Menu--open'}`}>
            <div className="Menu__toggle" onClick={toggleMenu}>
                {open ? 'Close' : 'Open'}
            </div>
            <ul className="Menu__groups">
                {Object.keys(groups).map((group) => (
                    <li key={group}>
                        <span className="Menu__group-title">{group}</span>
                        <ul className="Menu__group-items">
                            {groups[group].map((item) => (
                                <li key={item.key} className="Menu__group-item">
                                    <Link to={`/${item.key}`}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Menu;
