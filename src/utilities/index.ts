// is object predicate
export function isObject(v: unknown): v is object {
    return typeof v === 'object' && v !== null;
}

// recursively freeze an object
export function deepFreeze<T extends object>(obj: T): T {
    return Object.freeze(
        Object.keys(obj).reduce((obj, k) => {
            const key = k as keyof T;
            const value = obj[key];
            if (isObject(value)) {
                obj[key] = deepFreeze(value);
            } else {
                obj[key] = value;
            }
            return obj;
        }, obj)
    );
}
