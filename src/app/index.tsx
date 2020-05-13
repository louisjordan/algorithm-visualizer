import React from 'react';
import { Router, navigate, basepath } from 'app/router';
import { groups } from 'algorithms';
import { Menu } from 'app/components';
import Homepage from './homepage';
import Visualiser from './visualiser';

import { AppContainer } from './style';
import './reset.css';

const App: React.FC = () => {
    return (
        <AppContainer>
            <Menu groups={groups} />
            <Router>
                <Homepage path="/" />
                <Visualiser path="/:algorithm" />
            </Router>
        </AppContainer>
    );
};

export default App;
