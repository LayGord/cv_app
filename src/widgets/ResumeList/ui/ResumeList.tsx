import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ResumeList.module.scss";
import { Resume, ResumeCard } from "entities/Resume";
import { ReactComponent as AddFileIcon } from 'shared/assets/icons/file-plus-outline.svg'
import { Button, ButtonTheme } from "shared/ui/Button/Button";


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

    return (
        <div className={ classNames(cls.ResumeList, {}, [className]) }>
            <div className={cls.header}>
                <Button
                    theme={ButtonTheme.CLEAR}
                    onClick={onAddNew}
                >
                    Создать новый файл <AddFileIcon />
                </Button>
            </div>
            <div className={cls.cardsContainer}>
                {
                    resumeIds.map(item => (
                        <ResumeCard
                            data={item}
                            onOpen={() => onOpen?.(item.id)}
                            onDelete={() => onDelete?.(item.id)}
                        />
                    ))
                }
            </div>
        </div>
    );
};
