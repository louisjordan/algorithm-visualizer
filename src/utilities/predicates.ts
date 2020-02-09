// is object predicate
export function isObject(v: unknown): v is object {
    return typeof v === 'object' && v !== null;
}
