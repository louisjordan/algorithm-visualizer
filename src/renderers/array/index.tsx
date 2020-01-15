import React from 'react';

import { Array, ArrayElement, ArrayPointer } from './style';

type Props = {
    elements: Array<React.ReactNode>;
    pointer?: number | null;
    position?: number | null;
};
const ArrayRenderer: React.FC<Props> = (props) => {
    const { elements, pointer, position } = props;
    return (
        <Array>
            {elements.map((value, index) => (
                <ArrayElement>
                    {pointer === index && <ArrayPointer>↓</ArrayPointer>}
                    {position === index && <ArrayPointer>{value}</ArrayPointer>}
                    {position !== index && value}
                </ArrayElement>
            ))}
        </Array>
    );
};

export default ArrayRenderer;
