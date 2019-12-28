import { stripTracerParameter, stripTracerCalls } from './';

describe('Code Generator', () => {
    describe('tracer parameter', () => {
        it('should remove tracer as first parameter', () => {
            const source = `
function algorithm(tracer: Tracer, x: number, y: number) {
    // function body
}
`;

            const output = `
function algorithm(x: number, y: number) {
    // function body
}
`;
            expect(stripTracerParameter(source)).toBe(output);
        });

        it('should remove tracer as middle parameter', () => {
            const source = `
function algorithm(x: number, tracer: Tracer, y: number) {
    // function body
}
`;

            const output = `
function algorithm(x: number, y: number) {
    // function body
}
`;
            expect(stripTracerParameter(source)).toBe(output);
        });

        it('should remove tracer as last parameter', () => {
            const source = `
function algorithm(x: number, y: number, tracer: Tracer) {
    // function body
}
`;

            const output = `
function algorithm(x: number, y: number) {
    // function body
}
`;
            expect(stripTracerParameter(source)).toBe(output);
        });
    });

    describe('tracer calls', () => {
        it('should remove single line calls', () => {
            const source = `
function algorithm() {
    let x = 42;
    tracer.set('x', x);

    let y = 1337;
    tracer.set('y', y);
}
`;

            const output = `
function algorithm() {
    let x = 42;

    let y = 1337;
}
`;
            expect(stripTracerCalls(source)).toBe(output);
        });

        it('should remove multiline calls', () => {
            const source = `
function algorithm() {
    let x = 42;
    let y = 1337;
    tracer.set('x', x);
    tracer.set('y', y);
}
`;

            const output = `
function algorithm() {
    let x = 42;
    let y = 1337;
}
`;
            expect(stripTracerCalls(source)).toBe(output);
        });

        it('should remove multiline chained calls', () => {
            const source = `
function algorithm() {
    let x = 42;
    let y = 1337;
    tracer
        .set('x', x)
        .set('y', y);
}
`;

            const output = `
function algorithm() {
    let x = 42;
    let y = 1337;
}
`;
            expect(stripTracerCalls(source)).toBe(output);
        });
    });
});
