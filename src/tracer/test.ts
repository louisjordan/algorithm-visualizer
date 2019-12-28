import { StateTracer } from './';

describe('StateTracer', () => {
    it('should track state changes', () => {
        const tracer = new StateTracer();

        tracer.set('test', 1);

        expect(tracer.state).toEqual({ test: 1 });
    });

    describe('history', () => {
        it('values should be immutable', () => {
            const tracer = new StateTracer();

            const arr: number[] = [];
            tracer.set('arr', arr);

            arr.push(1);
            tracer.set('arr', arr);

            arr.push(2);
            tracer.set('arr', arr);

            expect(tracer.at(0).value.arr).toEqual([]);
            expect(tracer.at(1).value.arr).toEqual([1]);
        });

        it('should only update after the first set is called', () => {
            const tracer = new StateTracer();

            const arr: number[] = [];
            tracer.set('arr', arr);

            expect(tracer.history.length).toBe(0);

            arr.push(1);

            expect(tracer.history.length).toBe(0);

            tracer.set('arr', arr);

            expect(tracer.at(0).value.arr).toEqual([]);

            arr.push(2);

            expect(tracer.at(0).value.arr).toEqual([]);
        });
    });
});
