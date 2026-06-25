import { isEmpty, isShorterThan, isValidLink } from "shared/lib/validation/validation";
import { ProjectData } from "../../types/ResumeSchema";
import { ErrorTypes, ProjectErrorTypes, ProjectsDataErrors } from "../../types/resumeValidationSchema";
import { isEmptyObj } from "shared/lib/isEmptyObj/isEmptyObj";


const validateProjectItemField = (
    field: keyof ProjectData, value?: string
): ErrorTypes | undefined => {
    switch (field) {
    case 'id':
        if (!value || isEmpty(value)) return 'REQUIRED';
        return;
    case 'title':
        if (!value || isEmpty(value)) return 'REQUIRED';
        if (isShorterThan(value, 2)) return 'TOO_SHORT';
        return;
    case 'link':
        if (!value || isShorterThan(value, 2)) return 'REQUIRED';
        if (!isValidLink(value)) return 'INVALID_LINK';
        return;
    case 'description':
        if (!value) return;
        if (value && (isShorterThan(value, 2) || isEmpty(value))) return 'TOO_SHORT';
        return;
    };

};

const validateProjectItem = (
    value: ProjectData
): ProjectErrorTypes | undefined => {
    const errors: ProjectErrorTypes = { };
    errors.id = validateProjectItemField('id', value.id);
    errors.title = validateProjectItemField('title', value.title);
    errors.link = validateProjectItemField('link', value.link);
    errors.description = validateProjectItemField('description', value.description);

    return Object.values(errors).length > 0 ? errors : undefined
}

const validateProjectsData = (data: ProjectData[]): ProjectsDataErrors => {
    return data.reduce<ProjectsDataErrors>((acc, projectItem) => {
        const projectErrors = validateProjectItem(projectItem);
        if (projectErrors && !isEmptyObj(projectErrors)) {
            acc[projectItem.id] = projectErrors;
        }
        return acc;
    }, {});
}

export const projectsDataValidation = {
    validateProjectItemField,
    validateProjectsData,
}