export const isEmptyObj = (obj: object) => {
    for (let key in obj) {
        // @ts-ignore
        if ( obj[key] ) return false
    }
    return true;
}