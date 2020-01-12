import React from 'react';
import { Router, navigate } from '@reach/router';
import Menu from './menu';
import Visualiser from './visualiser';

import './style.css';
import './reset.css';

const menuGroups = [
    {
        id: 'sorting',
        name: 'Sorting',
        items: [{ id: 'insertion-sort', name: 'Insertion Sort' }],
    },
];

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
