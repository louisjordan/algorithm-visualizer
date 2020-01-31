import React from 'react';
import * as reach from '@reach/router';
import { RouteContainer } from './style';

export const basepath = process.env.PUBLIC_URL;

export const Router: React.FC<React.ComponentProps<typeof reach.Router>> = (
    props
) => (
    <reach.Router
        // {...props}
        basepath={basepath}
        component={RouteContainer}
        primary={false}
        children={props.children}
    />
);

export const Link: React.FC<React.ComponentProps<typeof reach.Link>> = (
    props
) => {
    const { ref, ...linkProps } = props;

    if (typeof linkProps.to === 'string') {
        // Links should operate relative to basepath
        linkProps.to = `${basepath}${linkProps.to}`;
    }

    return <reach.Link {...linkProps} />;
};

export const navigate: reach.NavigateFn = (
    absoluteTo: string | number,
    options?: reach.NavigateOptions<{}>
) => {
    if (typeof absoluteTo === 'number') {
        return reach.navigate(absoluteTo);
    } else {
        // navigate should operate relative to basepath
        const relativeTo = `${basepath}${absoluteTo}`;
        return reach.navigate(relativeTo, options);
    }
};
