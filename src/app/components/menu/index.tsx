import React, { useState } from 'react';
import { Link } from 'app/router';
import { MenuIcon, CloseIcon, LogoLightIcon, GitHubIcon } from 'app/components/icons';
import {
    MenuContainer,
    MenuToggle,
    MenuHeader,
    MenuFooter,
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
            <Link to="/">
                <MenuHeader>
                    <LogoLightIcon clickable />
                </MenuHeader>
            </Link>
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
            <MenuFooter>
                <Link to="https://github.com/louisjordan/algorithm-visualiser" external>
                    <GitHubIcon clickable />
                </Link>
            </MenuFooter>
        </MenuContainer>
    );
};
