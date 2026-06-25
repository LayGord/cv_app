import { classNames } from "shared/lib/classNames/classNames";
import cls from "./PreviewErrors.module.scss";
import { ValidationErrors } from "entities/Resume";
import { ReactComponent as InfoIcon } from 'shared/assets/icons/alert-circle-outline.svg';
import { ReactComponent as GoToIcon } from 'shared/assets/icons/arrow-top-right-bold-box-outline.svg';
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { AppRoutes, RouterPaths } from "shared/config/router/paths";
import { TFunction, useTranslation } from "react-i18next";

interface PreviewErrorsProps {
    className?: string;
    errors: ValidationErrors;
}

type Section = keyof typeof stepMapping;

const stepMapping = {
    personal: 'personal',
    contacts: 'contacts',
    aboutMe: 'about',
    objective: 'objective',
    skills: 'jobs',
    jobs: 'jobs',
    projects: 'projects',
    education: 'education',
    languages: 'education',
}

const ErrorItem = (
    section: Section,
    field: string,
    error: string | Record<string, unknown>,
    t: TFunction<"preview", undefined>,
    path = field
): React.ReactNode => {
    if (typeof error === "string") {
        return (
            <div className={cls.errorItem} key={`${section}_${path}`}>
                <span>{t(`fields.${path}`)}</span>
                <span>{t(`errors.${error}`)}</span>
            </div>
        );
    }

    if (error && typeof error === "object") {
        return Object.entries(error).map(([nestedField, nestedError]) =>
            ErrorItem(
                section,
                nestedField,
                nestedError as string | Record<string, unknown>,
                t
            )
        )
    }

    return null;
};

export const PreviewErrors = (props: PreviewErrorsProps) => {
    const {
        className,
        errors,
    } = props;

    const { t } = useTranslation('resume')

    return (
        <div className={ classNames(cls.PreviewErrors, {}, [className]) }>
            <div className={cls.header}>
                {t('header', {keyPrefix: 'PreviewErrors'})}
            </div>
            <div className={cls.errorsSection}>
                {
                    Object.entries(errors).map(([section, errors]) => {
                        const step = stepMapping[section as Section];
                        const sectionErrs = Object.entries(errors);
                        
                        if (sectionErrs.length === 0) return null

                        return (
                            <div>
                                <div className={cls.sectionHeader}>
                                    { t(section, { keyPrefix: 'sections'}) }
                                    <AppLink
                                        className={cls.link}
                                        theme={AppLinkTheme.CLEAR}
                                        to={`${RouterPaths.editor}?step=${step}`}
                                    >
                                        <GoToIcon />
                                    </AppLink>
                                </div>
                                <div className={cls.errorsSection}>
                                    {
                                        sectionErrs.map(([field, value]) =>
                                            ErrorItem(section as Section, field, value as string, t)
                                        )
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}