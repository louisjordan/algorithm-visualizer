import { isObject } from './predicates';

// re-export predicates
export * from './predicates';

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

export function uuid(length: number = 8): string {
    if (length < 1) {
        throw new Error('Slug must be at least one character');
    } else if (length === Infinity) {
        throw new Error("We haven't got all day");
    }

    let slug = '';

    while (slug.length < length) {
        slug += Math.random()
            .toString(36)
            .slice(2, -1);
    }

    return slug.substr(0, length);
}
