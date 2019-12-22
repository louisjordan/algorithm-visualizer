import React, { useState } from 'react';
import insertionSort, { InsertionSortState } from '../algorithms/insertion-sort';
import InsertionSort from '../visualisers/insertion-sort';
import { StateTracer } from '../tracer';
import './style.css';

const initial = [3, 5, 2, 7, 3];
const tracer = new StateTracer();
const result = insertionSort(tracer, initial);

const App: React.FC = () => {
    const [position, setPosition] = useState(0);

    function next() {
        setPosition(position => (tracer.history.length - 1 > position ? position + 1 : position));
    }

    function prev() {
        setPosition(position => (position > 0 ? position - 1 : position));
    }
    return (
        <div className="App">
            <InsertionSort trace={tracer.at(position).value as InsertionSortState} />
            <button onClick={prev}>Prev</button>
            <button onClick={next}>Next</button>
            <br />
            {position + 1}/{tracer.history.length}
        </div>
    );
};

export default App;
