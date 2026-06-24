import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { EducationData, EducationErrorTypes } from "entities/Resume";
import { Input, InputTheme } from "shared/ui/Input/Input";
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-outline.svg';
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { DatePicker, DatePickerTheme } from "shared/ui/DatePicker/DatePicker";
import { classNames } from "shared/lib/classNames/classNames";
import { GradeSelect } from "../GradeSelect/GradeSelect";
import cls from "./EducationItem.module.scss";


interface EducationItemProps {
    className?: string;
    data: EducationData;
    onUpdate: (value: string, field: keyof EducationData) => void;
    onDelete: () => void;
    validateCb?: (field: keyof EducationData) => (value: string) => void;
    errors?: EducationErrorTypes;
    index?: number;
}

export const EducationItem = (props: EducationItemProps) => {
    const {
        className,
        data,
        onUpdate,
        onDelete,
        validateCb,
        errors,
        index
    } = props;

    const { t } = useTranslation('resume', {keyPrefix: 'EducationEditor.EducationItem'});

    const onUpdateCity = useCallback((value: string) => {
        onUpdate(value, 'city')
    }, [onUpdate]);

    const onUpdateOrg = useCallback((value: string) => {
        onUpdate(value, 'org')
    }, [onUpdate]);

    const onUpdateFaculty = useCallback((value: string) => {
        onUpdate(value, 'faculty')
    }, [onUpdate]);

    const onUpdateProgram = useCallback((value: string) => {
        onUpdate(value, 'program')
    }, [onUpdate]);

    const onUpdateGrade = useCallback((value: string) => {
        onUpdate(value, 'grade')
    }, [onUpdate]);

    const onUpdateDateFrom = useCallback((value: string) => {
        onUpdate(value, 'dateFrom')
    }, [onUpdate]);

    const onUpdateDateTo = useCallback((value: string) => {
        onUpdate(value, 'dateTo')
    }, [onUpdate]);

    return (
        <div className={ classNames(cls.EducationItem, {}, [className]) }>
            <div className={cls.row}>
                { index && <span className={cls.index}>{index}</span>}
                <GradeSelect
                    id={`grade_${data.id}`}
                    value={data.grade}
                    onChange={onUpdateGrade}
                    onBlur={validateCb?.('grade')}
                    error={errors?.grade && t(errors.grade, {keyPrefix: 'errors'})}
                />
                <Input
                    id={`city_${data.id}`}
                    theme={errors?.city ? InputTheme.ERROR : InputTheme.DEFAULT }
                    placeholder={t('city')}
                    value={data.city}
                    onChange={onUpdateCity}
                    onBlur={validateCb?.('city')}
                    error={errors?.city && t(errors.city, {keyPrefix: 'errors'})}
                />
                <Button
                    theme={ButtonTheme.SECONDARY}
                    onClick={onDelete}
                >
                    <DeleteIcon />
                </Button>
            </div>
            <Input
                id={`org_${data.id}`}
                theme={errors?.org ? InputTheme.ERROR : InputTheme.DEFAULT }
                placeholder={t('org')}
                value={data.org}
                onChange={onUpdateOrg}
                onBlur={validateCb?.('org')}
                error={errors?.org && t(errors.org, {keyPrefix: 'errors'})}
            />
            <Input
                id={`faculty_${data.id}`}
                theme={errors?.faculty ? InputTheme.ERROR : InputTheme.DEFAULT }
                placeholder={t('faculty')}
                value={data.faculty}
                onChange={onUpdateFaculty}
                onBlur={validateCb?.('faculty')}
                error={errors?.faculty && t(errors.faculty, {keyPrefix: 'errors'})}
            />
            <Input
                id={`program_${data.id}`}
                theme={errors?.program ? InputTheme.ERROR : InputTheme.DEFAULT }
                placeholder={t('program')}
                value={data.program}
                onChange={onUpdateProgram}
                onBlur={validateCb?.('program')}
                error={errors?.program && t(errors.program, {keyPrefix: 'errors'})}
            />
            <div className={cls.row}>
                <DatePicker
                    id={`dateFrom_${data.id}`}
                    theme={errors?.dateFrom ? DatePickerTheme.ERROR : DatePickerTheme.DEFAULT }
                    label={t('dateFrom')}
                    value={data.dateFrom}
                    onChange={onUpdateDateFrom}
                    onBlur={validateCb?.('dateFrom')}
                    error={errors?.dateFrom && t(errors.dateFrom, {keyPrefix: 'errors'})}
                />
                <DatePicker
                    id={`dateTo_${data.id}`}
                    theme={errors?.dateTo ? DatePickerTheme.ERROR : DatePickerTheme.DEFAULT }
                    label={t('dateTo')}
                    value={data.dateTo}
                    onChange={onUpdateDateTo}
                    onBlur={validateCb?.('dateTo')}
                    error={errors?.dateTo && t(errors.dateTo, {keyPrefix: 'errors'})}
                />
            </div>
        </div>
    );
};
