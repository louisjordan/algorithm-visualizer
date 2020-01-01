import React, { useState } from 'react';
import { StateTracer } from '../tracer';
import Menu from './menu';
import Visualiser from './visualiser';
import Controls from './controls';
import VisualiserLayout from './layouts/visualiser';

import './style.css';
import './reset.css';

import insertionSort from '../algorithms/insertion-sort';
import insertionSortSource from '../algorithms/insertion-sort/source.json';

const initial = [3, 5, 2, 7, 3];
const tracer = new StateTracer();
const result = insertionSort(tracer, initial);

const menuGroups = [
    {
        id: 'sorting',
        name: 'Sorting',
        items: [{ id: 'insertion-sort', name: 'Insertion Sort' }],
    },
];

const App: React.FC = () => {
    const [position, setPosition] = useState(0);

    function next() {
        setPosition((position) =>
            tracer.history.length - 1 > position ? position + 1 : position
        );
    }

    function prev() {
        setPosition((position) => (position > 0 ? position - 1 : position));
    }

    return (
        <div className="App">
            <Menu groups={menuGroups} />
            <VisualiserLayout
                source={insertionSortSource.functions.join('\n\n')}
                tracer={tracer}
                position={position}
                next={next}
                prev={prev}
            />
        </div>
    );
};

export default App;
