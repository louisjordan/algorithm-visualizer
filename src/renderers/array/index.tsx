import React from 'react';
import './style.css';

type Props = {
    elements: Array<React.ReactNode>;
    pointer?: number | null;
};
const ArrayRenderer: React.FC<Props> = props => {
    const { elements, pointer } = props;
    return (
        <ol className="ArrayRenderer">
            {elements.map((value, index) => (
                <li className="ArrayRenderer__element">
                    {pointer === index && <span className="ArrayRenderer__pointer">↓</span>}
                    {value}
                </li>
            ))}
        </ol>
    );
};

export default ArrayRenderer;
