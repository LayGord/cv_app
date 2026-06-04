import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Education } from "entities/Resume";
import { Input } from "shared/ui/Input/Input";
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-outline.svg';
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { DatePicker } from "shared/ui/DatePicker/DatePicker";
import { classNames } from "shared/lib/classNames/classNames";
import { GradeSelect } from "../GradeSelect/GradeSelect";
import cls from "./EducationItem.module.scss";


interface EducationItemProps {
    className?: string;
    data: Education;
    onUpdate: (value: string, field: keyof Education) => void;
    onDelete: () => void;
    index?: number;
}

export const EducationItem = (props: EducationItemProps) => {
    const {
        className,
        data,
        onUpdate,
        onDelete,
        index
    } = props;

    const { t } = useTranslation('resume');

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
                />
                <Input
                    id={`org_${data.id}`}
                    placeholder={t('EducationEditor.EducationItem.org')}
                    value={data.org}
                    onChange={onUpdateOrg}
                />
                <Button
                    theme={ButtonTheme.SECONDARY}
                    onClick={onDelete}
                >
                    <DeleteIcon />
                </Button>
            </div>
            <Input
                id={`faculty_${data.id}`}
                placeholder={t('EducationEditor.EducationItem.faculty')}
                value={data.faculty}
                onChange={onUpdateFaculty}
            />
            <Input
                id={`program_${data.id}`}
                placeholder={t('EducationEditor.EducationItem.program')}
                value={data.program}
                onChange={onUpdateProgram}
            />
            <div className={cls.row}>
                <DatePicker
                    id={`dateFrom_${data.id}`}
                    label={t('EducationEditor.EducationItem.dateFrom')}
                    value={data.dateFrom}
                    onChange={onUpdateDateFrom}
                />
                <DatePicker
                    id={`dateTo_${data.id}`}
                    label={t('EducationEditor.EducationItem.dateTo')}
                    value={data.dateTo}
                    onChange={onUpdateDateTo}
                />
            </div>
        </div>
    );
};
