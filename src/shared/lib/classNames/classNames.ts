export type Mods = Record<string, boolean | string | undefined>

export const classNames = (cls: string, mods: Mods = {}, additional: Array<string | undefined> = []) => {
    return [
        cls,
        ...additional,
        ...Object
            .entries(mods)
            .filter(([classname, value]) => Boolean(value))
            .map(([classname, value]) => classname)
    ].join(' ')
};