import React from 'react';
import { Router, navigate } from '@reach/router';
import algorithms from 'algorithms';
import Menu, { MenuGroups } from './menu';
import Visualiser from './visualiser';

import './style.css';
import './reset.css';

const menuGroups = Object.keys(algorithms).reduce((groups: MenuGroups, key) => {
    const { name, group } = algorithms[key];
    groups[group] = groups[group] || [];
    groups[group].push({ key, name });
    return groups;
}, {});

const App: React.FC = () => {
    if (window.location.pathname === '' || window.location.pathname === '/') {
        navigate('/insertion-sort');
    }

    return (
        <div className="App">
            <Menu groups={menuGroups} />
            <Router component={({ children }) => <>{children}</>}>
                <Visualiser path="/:algorithm" />
            </Router>
        </div>
    );
};

export default App;
