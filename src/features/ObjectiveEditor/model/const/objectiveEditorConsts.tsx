import { ObjectiveData } from "entities/Resume";

export const formatOptions: {displayName: string, value: ObjectiveData['format'] }[] = [
    { displayName: 'ObjectiveEditor.FormatSelect.formatOptions.any', value: 'any' },
    { displayName: 'ObjectiveEditor.FormatSelect.formatOptions.hybrid', value: 'hybrid' },
    { displayName: 'ObjectiveEditor.FormatSelect.formatOptions.office', value: 'office' },
    { displayName: 'ObjectiveEditor.FormatSelect.formatOptions.remote', value: 'remote' },
];
