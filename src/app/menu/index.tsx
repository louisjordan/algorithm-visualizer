import React, { useState } from 'react';
import './style.css';

type MenuGroup = {
    id: string;
    name: string;
    items: MenuItem[];
};

type MenuItem = {
    id: string;
    name: string;
};

type Props = {
    groups: MenuGroup[];
};
const Menu: React.FC<Props> = props => {
    const [open, setOpen] = useState(false);
    function toggleMenu() {
        setOpen(open => !open);
    }
    return (
        <div className={`Menu ${open && 'Menu--open'}`}>
            <div className="Menu__toggle" onClick={toggleMenu}>
                {open ? 'Close' : 'Open'}
            </div>
            <ul className="Menu__groups">
                {props.groups.map(group => (
                    <li key={group.id}>
                        <span className="Menu__group-title">{group.name}</span>
                        <ul className="Menu__group-items">
                            {group.items.map(item => (
                                <li key={item.id} className="Menu__group-item">
                                    {item.name}
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
