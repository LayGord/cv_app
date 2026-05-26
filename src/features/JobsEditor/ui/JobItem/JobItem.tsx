import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Job } from "entities/Resume";
import { Input } from "shared/ui/Input/Input";
import { DatePicker } from "shared/ui/DatePicker/DatePicker";
import { TextArea } from "shared/ui/TextArea/TextArea";
import { Button } from "shared/ui/Button/Button";
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-outline.svg';
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./JobItem.module.scss";


interface JobItemProps {
    className?: string;
    data: Job;
    onUpdate: (data: string, field: keyof Job) => void;
    onDelete: () => void;
    index?: number;
}

export const JobItem = (props: JobItemProps) => {
    const {
        className,
        data,
        onUpdate,
        onDelete,
        index
    } = props;

    const { t } = useTranslation('resume');

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
                    placeholder={t('JobsEditor.JobItem.company')}
                    value={data.company}
                    onChange={onUpdateCompany}
                />
                <Button
                    onClick={onDelete}
                >
                    <DeleteIcon />
                </Button>
            </div>
            <div className={cls.row}>
                <Input
                    id={`position_${data.id}`}
                    placeholder={t('JobsEditor.JobItem.position')}
                    value={data.position}
                    onChange={onUpdatePosition}
                />
                <Input
                    id={`location_${data.id}`}
                    placeholder={t('JobsEditor.JobItem.location')}
                    value={data.location}
                    onChange={onUpdateLocation}
                />
            </div>
            <div className={cls.row}>
                <DatePicker
                    id={`dateFrom_${data.id}`}
                    label={t('JobsEditor.JobItem.dateFrom')}
                    value={data.dateFrom}
                    onChange={onUpdateDateFrom}
                />
                <DatePicker
                    id={`dateTo_${data.id}`}
                    label={t('JobsEditor.JobItem.dateTo')}
                    value={data.dateTo}
                    onChange={onUpdateDateTo}
                />
            </div>
            <TextArea
                id={`comment_${data.id}`}
                className={cls.row}
                placeholder={t('JobsEditor.JobItem.comment')}
                value={data.comment}
                onChange={onUpdateComment}
            />
        </div>
    );
};
