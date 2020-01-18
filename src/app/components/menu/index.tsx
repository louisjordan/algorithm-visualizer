import React, { useState } from 'react';
import { MenuIcon, CloseIcon } from 'app/components/icons';
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
    const [open, setOpen] = useState(false);
    function toggleMenu() {
        setOpen((open) => !open);
    }
    return (
        <MenuContainer open={open}>
            <MenuToggle onClick={toggleMenu}>
                {open ? <CloseIcon clickable /> : <MenuIcon clickable />}
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
