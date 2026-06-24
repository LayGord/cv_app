import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { JobData, JobErrorTypes } from "entities/Resume";
import { Input, InputTheme } from "shared/ui/Input/Input";
import { DatePicker, DatePickerTheme } from "shared/ui/DatePicker/DatePicker";
import { TextArea, TextAreaTheme } from "shared/ui/TextArea/TextArea";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-outline.svg';
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./JobItem.module.scss";


interface JobItemProps {
    className?: string;
    data: JobData;
    onUpdate: (data: string, field: keyof JobData) => void;
    onDelete: () => void;
    validateCb: (field: keyof JobData) => (value: string) => void;
    errors?: JobErrorTypes;
    index?: number;
}

export const JobItem = (props: JobItemProps) => {
    const {
        className,
        data,
        onUpdate,
        onDelete,
        validateCb,
        errors,
        index
    } = props;

    const { t } = useTranslation('resume', {keyPrefix: 'JobsEditor.JobItem'});

    const onUpdateCompany = useCallback((value: string) => {
        onUpdate(value, 'company');
    }, [onUpdate])

    const onUpdatePosition = useCallback((value: string) => {
        onUpdate(value, 'position');
    }, [onUpdate])

    const onUpdateDateFrom = useCallback((value: string) => {
        onUpdate(value, 'dateFrom');
    }, [onUpdate])

    const onUpdateDateTo = useCallback((value: string) => {
        onUpdate(value, 'dateTo');
    }, [onUpdate])
    
    const onUpdateLocation = useCallback((value: string) => {
        onUpdate(value, 'location');
    }, [onUpdate])
    
    const onUpdateComment = useCallback((value: string) => {
        onUpdate(value, 'comment');
    }, [onUpdate])

    return (
        <div className={ classNames(cls.JobItem, {}, [className]) }>
            <div className={cls.row}>
                { index && <span className={cls.index}>{index}</span>}
                <Input
                    id={`company_${data.id}`}
                    theme={ errors?.company ? InputTheme.ERROR : InputTheme.DEFAULT }
                    placeholder={t('company')}
                    value={data.company}
                    onChange={onUpdateCompany}
                    onBlur={validateCb('company')}
                    error={errors?.company && t(errors.company, {keyPrefix: 'errors'})}
                />
                <Button
                    theme={ButtonTheme.SECONDARY}
                    onClick={onDelete}
                >
                    <DeleteIcon />
                </Button>
            </div>
            <div className={cls.row}>
                <Input
                    id={`position_${data.id}`}
                    theme={ errors?.position ? InputTheme.ERROR : InputTheme.DEFAULT }
                    placeholder={t('position')}
                    value={data.position}
                    onChange={onUpdatePosition}
                    onBlur={validateCb('position')}
                    error={errors?.position && t(errors.position, {keyPrefix: 'errors'})}
                />
                <Input
                    id={`location_${data.id}`}
                    theme={ errors?.location ? InputTheme.ERROR : InputTheme.DEFAULT }
                    placeholder={t('location')}
                    value={data.location}
                    onChange={onUpdateLocation}
                    onBlur={validateCb('location')}
                    error={errors?.location && t(errors.location, {keyPrefix: 'errors'})}
                />
            </div>
            <div className={cls.row}>
                <DatePicker
                    id={`dateFrom_${data.id}`}
                    theme={ errors?.dateFrom ? DatePickerTheme.ERROR : DatePickerTheme.DEFAULT }
                    label={t('dateFrom')}
                    value={data.dateFrom}
                    onChange={onUpdateDateFrom}
                    onBlur={validateCb('dateFrom')}
                    error={errors?.dateFrom && t(errors.dateFrom, {keyPrefix: 'errors'})}
                />
                <DatePicker
                    id={`dateTo_${data.id}`}
                    theme={ errors?.dateTo ? DatePickerTheme.ERROR : DatePickerTheme.DEFAULT }
                    label={t('dateTo')}
                    value={data.dateTo}
                    onChange={onUpdateDateTo}
                    onBlur={validateCb('dateTo')}
                    error={errors?.dateTo && t(errors.dateTo, {keyPrefix: 'errors'})}
                />
            </div>
            <TextArea
                id={`comment_${data.id}`}
                theme={ errors?.comment ? TextAreaTheme.ERROR : TextAreaTheme.DEFAULT }
                className={cls.row}
                placeholder={t('comment')}
                value={data.comment}
                onChange={onUpdateComment}
                onBlur={validateCb('comment')}
                error={errors?.comment && t(errors.comment, {keyPrefix: 'errors'})}
            />
        </div>
    );
};
