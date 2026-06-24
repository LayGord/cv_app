export type TypeOfEmplValue = 'fulltime' | 'partial' | 'internship' | 'watch';

export interface TypeOfEmpl {
    id: string;
    displayName: string;
    value: TypeOfEmplValue;
};
