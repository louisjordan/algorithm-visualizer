import React, { useState } from 'react';
import {
    MenuContainer,
    MenuToggle,
    MenuGroupList,
    MenuGroup,
    MenuItemList,
    MenuItem,
    MenuGroupTitle,
    MenuLink,
} from './style';
import { Link } from '@reach/router';

type Props = {
    groups: {
        [group: string]: {
            key: string;
            name: string;
        }[];
    };
};
export const Menu: React.FC<Props> = (props) => {
    const { groups } = props;
    const [open, setOpen] = useState(true);
    function toggleMenu() {
        setOpen((open) => !open);
    }
    return (
        <MenuContainer open={open}>
            <MenuToggle onClick={toggleMenu}>
                {open ? 'Close' : 'Open'}
            </MenuToggle>
            <MenuGroupList>
                {Object.keys(groups).map((group) => (
                    <MenuGroup key={group}>
                        <MenuGroupTitle>{group}</MenuGroupTitle>
                        <MenuItemList>
                            {groups[group].map((item) => (
                                <MenuItem key={item.key}>
                                    <MenuLink to={`/${item.key}`}>
                                        {item.name}
                                    </MenuLink>
                                </MenuItem>
                            ))}
                        </MenuItemList>
                    </MenuGroup>
                ))}
            </MenuGroupList>
        </MenuContainer>
    );
};
