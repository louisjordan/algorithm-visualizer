import React, { useState } from 'react';
import { Router, navigate } from '@reach/router';
import { groups } from 'algorithms';
import { Button, Menu } from 'app/components';
import Visualiser from './visualiser';

import { AppContainer } from './style';
import './reset.css';

const App: React.FC = () => {
    const [theme, setTheme] = useState('dark');
    const toggleTheme = () =>
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

    if (window.location.pathname === '' || window.location.pathname === '/') {
        navigate('/insertion-sort');
    }

    return (
        <AppContainer>
            <Menu groups={groups} />
            <Button
                onClick={toggleTheme}
                style={{
                    position: 'absolute',
                    right: '1em',
                    top: '1em',
                    zIndex: 100,
                }}
            >
                {theme}
            </Button>
            <Router component={({ children }) => <>{children}</>}>
                <Visualiser path="/:algorithm" />
            </Router>
        </AppContainer>
    );
};

export default App;
