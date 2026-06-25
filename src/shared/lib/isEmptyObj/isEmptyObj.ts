type PlainObject = Record<string, unknown>;

export function isEmptyObj(value: unknown): boolean {
    if (value === undefined || value === null) return true;
    if (!isPlainObject(value)) return false;

    const values = Object.values(value);

    if (values.length === 0) return true;

    return values.every(
        (item) => item === undefined || isEmptyPlainObject(item)
    );
}

function isEmptyPlainObject(value: unknown): value is PlainObject {
    return isPlainObject(value) && Object.keys(value).length === 0;
}

function isPlainObject(value: unknown): value is PlainObject {
    return (
        typeof value === "object" &&
        value !== null &&
        Object.prototype.toString.call(value) === "[object Object]"
    );
}

// console.log(isEmptyObj({item1: undefined, item2: undefined})) // must be true
// console.log(isEmptyObj({item1: {}, item2: {}})) // must be true
// console.log(isEmptyObj({item1: { key1: 'string'}, item2: {}})) // must be false
// console.log(isEmptyObj({item1: { key1: {}}, item2: { key1: {}}})) // must be false
// console.log(isEmptyObj({item1: { key1: undefined}, item2: { key1: undefined}})) // must be false