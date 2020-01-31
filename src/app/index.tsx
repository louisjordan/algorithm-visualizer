import React from 'react';
import { Router, navigate, basepath } from 'app/router';
import { groups } from 'algorithms';
import { Menu } from 'app/components';
import Visualiser from './visualiser';

import { AppContainer } from './style';
import './reset.css';

const App: React.FC = () => {
    if (window.location.pathname.slice(0, -1) === basepath) {
        // TODO: use a default index page
        navigate('/insertion-sort');
    }

    return (
        <AppContainer>
            <Menu groups={groups} />
            <Router>
                <Visualiser path="/:algorithm" />
            </Router>
        </AppContainer>
    );
};

export default App;
