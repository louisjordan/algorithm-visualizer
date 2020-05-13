/*eslint import/no-webpack-loader-syntax: "off"*/
import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Link } from 'app/router';

import { LogoLightIcon } from 'app/components/icons';
import { HomepageContainer, HomepageLogoContainer } from './style';

const HomepageLayout: React.FC<RouteComponentProps> = () => {
    return (
        <HomepageContainer>
            <HomepageLogoContainer>
                <LogoLightIcon />
            </HomepageLogoContainer>
            <h1>Algorithm Visualiser</h1>
            <i>
                Learn popular algorithms by visualising every step of their
                execution
            </i>

            <p>Select an algorithm from the menu to get started.</p>

            <h2>Inspiration</h2>
            <p>
                Algorithm Visualiser was inspired by a number of awesome
                projects:
            </p>

            <ul>
                <li>
                    <a href="https://algorithm-visualiser.org">
                        algorithm-visualiser.org
                    </a>{' '}
                    (
                    <a href="https://github.com/algorithm-visualizer/algorithm-visualizer">
                        GitHub
                    </a>
                    )
                </li>
                <li>
                    <a href="https://github.com/CCExtractor/vardbg">vardbg</a> (
                    <a href="https://algorithvipm-visualiser.org">GitHub</a>)
                </li>
                <li>
                    <a href="https://visualgo.net/">visualgo</a>
                </li>
            </ul>

            <p>
                They all offer a range of fantastic features, each with their
                own benefits and trade-offs. This project aims to bring together
                the best of all of these while avoiding some of the trade-offs
                they've made
            </p>

            <h2>Contributing</h2>
            <p>
                Algorithm Visualiser is an open-source project, checkout the{' '}
                <Link
                    to="https://github.com/louisjordan/algorithm-visualiser"
                    external
                >
                    GitHub repo
                </Link> for more information.
            </p>
        </HomepageContainer>
    );
};

export default HomepageLayout;
