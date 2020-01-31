import { isObject, deepFreeze } from './';

describe('Utilities', () => {
    describe('predicates', () => {
        describe('isObject', () => {
            it('should return true if an object is provided', () => {
                expect(isObject({})).toBe(true);
            });
            it('should return true if an array is provided', () => {
                expect(isObject([])).toBe(true);
            });
            it('should return false if an object is not provided', () => {
                expect(isObject(true)).toBe(false);
                expect(isObject(100)).toBe(false);
                expect(isObject('string')).toBe(false);
                expect(isObject(undefined)).toBe(false);
            });
            it('should return false if null is provided', () => {
                expect(isObject(null)).toBe(false);
            });
        });
    });

    describe('deepFreeze', () => {
        it('should freeze an object', () => {
            const obj: { [key: string]: any } = deepFreeze({ key: 'value' });
            expect(() => (obj.thing = 'throw')).toThrow();
            expect(() => (obj.key = 'new value')).toThrow();
            expect(() => delete obj.key).toThrow();
        });

        it('should freeze a nested object', () => {
            const obj: { [key: string]: any } = deepFreeze({
                nested: { key: 'value' },
            });
            expect(() => (obj.nested.thing = 'throw')).toThrow();
            expect(() => (obj.nested.key = 'new value')).toThrow();
            expect(() => delete obj.nested.key).toThrow();
        });

        it('should freeze an array', () => {
            const array: any[] = deepFreeze(['value']);
            expect(() => (array[0] = 'throw')).toThrow();
            expect(() => (array[0] = 'new value')).toThrow();
            expect(() => delete array[0]).toThrow();
        });

        it('should freeze a nested array', () => {
            const array: any[] = deepFreeze([['value']]);
            expect(() => (array[0][0] = 'throw')).toThrow();
            expect(() => (array[0][0] = 'new value')).toThrow();
            expect(() => delete array[0][0]).toThrow();
        });
    });
});
