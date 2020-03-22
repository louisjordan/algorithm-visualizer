export const baseD3Config = {
    maxZoom: 1,
    minZoom: 1,
    d3: {
        gravity: -1000,
        linkLength: 50,
    },
    node: {
        color: '#404040',
        fontColor: '#bfbfbf',
        fontSize: '1em',
        size: 500,
        strokeColor: '#333333',
        strokeWidth: 3,
        labelProperty: 'label',
    },
    link: {
        color: '#bfbfbf',
        strokeWidth: 2,
    },
};

export const nodeConfig = {
    highlight: {
        strokeColor: '#1a74a8',
        color: '#3c9bd3',
    },
    active: {
        strokeColor: '#999999',
        color: '#c5c8c6',
    },
};
