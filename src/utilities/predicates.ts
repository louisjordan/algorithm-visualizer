// is object predicate
export function isObject(v: unknown): v is object {
    return typeof v === 'object' && v !== null;
}

export function isArray(v: unknown): v is Array<unknown> {
    return Array.isArray(v);
}

export function isFunction(v: unknown): v is Function {
    return typeof v === 'function';
}
