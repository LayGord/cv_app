import { classNames } from "shared/lib/classNames/classNames";
import cls from "./EducationItem.module.scss";
import { Education } from "entities/Resume";
import { Input } from "shared/ui/Input/Input";
import { ReactComponent as DeleteItemIcon } from 'shared/assets/icons/x-icon.svg';
import { Button } from "shared/ui/Button/Button";
import { useCallback } from "react";
import { Select } from "shared/ui/Select/Select";
import { DatePicker } from "shared/ui/DatePicker/DatePicker";
import { useTranslation } from "react-i18next";


interface EducationItemProps {
    className?: string;
    data: Education;
    onUpdate: (value: string, field: keyof Education) => void;
    onDelete: () => void;
    index?: number;
}

const grades = [
    {displayValue: 'Bachelor', value: 'bachelor'},
    {displayValue: 'Master', value: 'master'},
    {displayValue: 'PhD', value: 'phd'},
    {displayValue: 'Specialist', value: 'specialist'},
    {displayValue: 'College / Further Education / SPO', value: 'ad_fe_spo'},
]

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
                <Select
                    id={`grade_${data.id}`}
                    placeholder={t('EducationEditor.educationGrade')}
                    value={data.grade}
                    onChange={onUpdateGrade}
                    options={grades}
                />
                <Input
                    id={`org_${data.id}`}
                    placeholder={t('EducationEditor.educationOrg')}
                    value={data.org}
                    onChange={onUpdateOrg}
                />
                <Button
                    onClick={onDelete}
                >
                    <DeleteItemIcon />
                </Button>
            </div>
            <Input
                id={`faculty_${data.id}`}
                placeholder={t('EducationEditor.educationFaculty')}
                value={data.faculty}
                onChange={onUpdateFaculty}
            />
            <Input
                id={`program_${data.id}`}
                placeholder={t('EducationEditor.educationProgram')}
                value={data.program}
                onChange={onUpdateProgram}
            />
            <div className={cls.row}>
                <DatePicker
                    id={`dateFrom_${data.id}`}
                    label={t('EducationEditor.educationDateFrom')}
                    value={data.dateFrom}
                    onChange={onUpdateDateFrom}
                />
                <DatePicker
                    id={`dateTo_${data.id}`}
                    label={t('EducationEditor.educationDateTo')}
                    value={data.dateTo}
                    onChange={onUpdateDateTo}
                />
            </div>
        </div>
    );
};
