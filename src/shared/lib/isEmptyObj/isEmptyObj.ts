export const isEmptyObj = (obj?: object) => {
    if (!obj) return true
    for (let key in obj) {
        // @ts-ignore
        if ( obj[key] ) return false
    }
    return true;
}