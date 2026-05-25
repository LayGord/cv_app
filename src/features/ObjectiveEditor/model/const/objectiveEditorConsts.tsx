import { ObjectiveData } from "entities/Resume";

export const formatOptions: {displayName: string, value: ObjectiveData['format'] }[] = [
    { displayName: 'ObjectiveEditor.FormatSelect.formatOptions.any', value: 'any' },
    { displayName: 'ObjectiveEditor.FormatSelect.formatOptions.hybrid', value: 'hybrid' },
    { displayName: 'ObjectiveEditor.FormatSelect.formatOptions.office', value: 'office' },
    { displayName: 'ObjectiveEditor.FormatSelect.formatOptions.remote', value: 'remote' },
];

export const typeOfEmplOptions: ObjectiveData['typeOfEmpl'] = [
    { id: '1', displayName: 'ObjectiveEditor.typeOfEmplOptions.fulltime', value: 'fulltime' },
    { id: '2', displayName: 'ObjectiveEditor.typeOfEmplOptions.partial', value: 'partial' },
    { id: '3', displayName: 'ObjectiveEditor.typeOfEmplOptions.internship', value: 'internship' },
    { id: '4', displayName: 'ObjectiveEditor.typeOfEmplOptions.watch', value: 'watch' },
]