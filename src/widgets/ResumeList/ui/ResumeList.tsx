import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ResumeList.module.scss";
import { Resume, ResumeCard } from "entities/Resume";
import { ReactComponent as AddFileIcon } from 'shared/assets/icons/file-plus-outline.svg'
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useTranslation } from "react-i18next";


interface ResumeListProps {
    className?: string;
    resumeIds: { id: string, objective: Partial<Resume['objective']>, createdAt: string, updatedAt?: string }[];
    onAddNew?: () => void;
    onOpen?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const ResumeList = (props: ResumeListProps) => {

    const { 
        className,
        resumeIds,
        onAddNew,
        onOpen,
        onDelete,
    } = props;

    const { t } = useTranslation();

    return (
        <div className={ classNames(cls.ResumeList, {}, [className]) }>
            <div className={cls.header}>
                <Button
                    theme={ButtonTheme.CLEAR}
                    onClick={onAddNew}
                >
                    {t('ResumeList.createNew')} <AddFileIcon />
                </Button>
            </div>
            <div className={cls.cardsContainer}>
                {
                    resumeIds.length > 0 
                        ? resumeIds.map(item => (
                            <ResumeCard
                                key={item.id}
                                data={item}
                                onOpen={() => onOpen?.(item.id)}
                                onDelete={() => onDelete?.(item.id)}
                            />
                        ))
                        : <div className={cls.emptyList}>{t('ResumeList.empty')}</div>
                }
            </div>
        </div>
    );
};
