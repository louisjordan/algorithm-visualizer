import { Tracer } from './';

type TestTracerState = {
    x?: number;
    y?: number;
};

const newTracer = () => new Tracer<TestTracerState>();

const fail = (msg: string) => {
    throw new Error(`Test Failed: ${msg}`);
};

describe('Tracer', () => {
    describe('#assign', () => {
        it('should track and group assignments', () => {
            const tracer = newTracer();

            tracer.assign('x', 1);

            expect(tracer.state).toEqual({ x: 1 });

            tracer.assign('y', 99);

            expect(tracer.state).toEqual({ x: 1, y: 99 });

            tracer.assign('x', 2);

            expect(tracer.state).toEqual({ x: 2, y: 99 });
        });

        it('should allow chained assignments', () => {
            const tracer = newTracer();

            tracer.assign('x', 100).assign('y', 200);

            expect(tracer.state).toEqual({ x: 100, y: 200 });
        });
    });

    describe('#at', () => {
        it('should return the trace at the index provided', () => {
            const tracer = newTracer();

            tracer.assign('x', 100).break(1);
            tracer.assign('x', 200).break(2);
            tracer.assign('x', 300).break(3);

            expect(tracer.at(0)).toEqual({ state: { x: 100 }, line: 1 });
            expect(tracer.at(1)).toEqual({ state: { x: 200 }, line: 2 });
            expect(tracer.at(2)).toEqual({ state: { x: 300 }, line: 3 });
        });

        it('should return the trace offset from the most recent if a negative number is provided', () => {
            const tracer = newTracer();

            tracer.assign('x', 100).break(1);
            tracer.assign('x', 200).break(2);
            tracer.assign('x', 300).break(3);

            expect(tracer.at(-1)).toEqual({ state: { x: 300 }, line: 3 });
            expect(tracer.at(-2)).toEqual({ state: { x: 200 }, line: 2 });
            expect(tracer.at(-3)).toEqual({ state: { x: 100 }, line: 1 });
        });

        it('should return null if the trace at the index provided does not exist', () => {
            const tracer = newTracer();

            tracer.assign('x', 100).break(1);

            expect(tracer.at(1)).toEqual(null);
            expect(tracer.at(-2)).toEqual(null);
        });
    });

    describe('#break', () => {
        it('should commit the current state when called', () => {
            const tracer = newTracer();

            tracer.assign('x', 100).assign('y', 200);

            tracer.break(10);

            expect(tracer.at(0)).toEqual(
                expect.objectContaining({ state: { x: 100, y: 200 } })
            );
        });

        it('should commit the line number it is called with', () => {
            const tracer = newTracer();
            tracer.break(10);

            expect(tracer.at(0)).toEqual(expect.objectContaining({ line: 10 }));
        });

        it('should not clear the current state when committing', () => {
            const tracer = newTracer();

            tracer.assign('x', 100).break(1);

            expect(tracer.at(0)).toEqual(
                expect.objectContaining({ state: { x: 100 } })
            );

            tracer.assign('y', 200).break(2);

            expect(tracer.at(1)).toEqual(
                expect.objectContaining({ state: { x: 100, y: 200 } })
            );
        });

        it('should create new references for committed traces', () => {
            const tracer = new Tracer<{ array: number[] }>();

            const arr: number[] = [];
            tracer.assign('array', arr).break(1);

            arr.push(1);
            tracer.assign('array', arr).break(2);

            arr.push(2);
            tracer.assign('array', arr).break(3);

            expect(tracer.at(0)).toEqual(
                expect.objectContaining({ state: { array: [] } })
            );
            expect(tracer.at(1)).toEqual(
                expect.objectContaining({ state: { array: [1] } })
            );
            expect(tracer.at(2)).toEqual(
                expect.objectContaining({ state: { array: [1, 2] } })
            );
        });

        it('should make committed traces immutable', () => {
            const tracer = new Tracer<{
                object: any;
                nestedObject: any;
            }>();

            tracer
                .assign('object', {})
                .assign('nestedObject', { nested: {} })
                .break(1);

            const trace = tracer.at(0);

            if (trace === null) {
                return fail('Trace should not be null');
            }

            expect(() => (trace.state.object = 200)).toThrow();
            expect(() => (trace.state.object.test = 'throw')).toThrow();
            expect(
                () => (trace.state.nestedObject.nested.test = 'throw')
            ).toThrow();
        });
    });
});
