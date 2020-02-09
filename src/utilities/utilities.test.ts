import { isObject, deepFreeze, uuid } from './';

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

    describe('uuid', () => {
        it('should generate an id of the specified length', () => {
            expect(uuid(1).length).toBe(1);
            expect(uuid(10).length).toBe(10);
            expect(uuid(432).length).toBe(432);
            expect(uuid(9999).length).toBe(9999);

            // random integer test
            const randomLength = Math.floor(Math.random() * 1000000); // random between 1 - 999,999
            expect(uuid(randomLength).length).toBe(randomLength);
        });

        it('should generate a unique id on each call', () => {
            const ids = new Array(1000).fill(undefined).map(() => uuid());
            const uniqueIds = [...new Set(ids)]; // remove duplicates (of which there should be none)

            expect(ids.length).toBe(uniqueIds.length);
        });

        it('should fail if length is less than 1', () => {
            expect(() => uuid(0)).toThrow();
            expect(() => uuid(-1)).toThrow();
            expect(() => uuid(-99)).toThrow();
        });

        it('should fail if length is unreachable (Infinity)', () => {
            expect(() => uuid(Infinity)).toThrow();
        });
    });
});
