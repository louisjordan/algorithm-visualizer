import React from 'react';
import { Router, navigate } from '@reach/router';
import { groups } from 'algorithms';
import { Menu } from 'app/components';
import Visualiser from './visualiser';

import { AppContainer, RouteContainer } from './style';
import './reset.css';

const App: React.FC = () => {
    if (window.location.pathname === '' || window.location.pathname === '/') {
        navigate('/insertion-sort');
    }

    return (
        <AppContainer>
            <Menu groups={groups} />
            <Router component={RouteContainer} primary={false}>
                <Visualiser path="/:algorithm" />
            </Router>
        </AppContainer>
    );
};

export default App;
