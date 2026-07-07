import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { ReactComponent as ExtrasIcon } from 'shared/assets/icons/dots-vertical.svg';
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-outline.svg';
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Portal } from "shared/ui/Portal/Portal";
import cls from "./ResumeCard.module.scss";
import { Resume } from "../../model/types/ResumeSchema";


interface ResumeCardProps {
    className?: string;
    data: { id: string, objective: Partial<Resume['objective']>, updatedAt?: string, createdAt?: string, prevImg?: string };
    onOpen?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const ResumeCard = (props: ResumeCardProps) => {

    const {
        className,
        data,
        onOpen,
        onDelete,
    } = props;

    const { t } = useTranslation();

    const { id, objective, updatedAt, createdAt } = data;
    const [showContextMenu, setShowContextMenu] = useState(false);

    const onToggleContextMenu = (e: React.MouseEvent) => {
        setShowContextMenu(prev => !prev)
        e.stopPropagation();
    }
    const onOpenHandler = () => onOpen?.(id)

    const onDeleteHandler = (e: React.MouseEvent) => {
        onDelete?.(id);
        setShowContextMenu(false)
        e.stopPropagation();
    }


    const title = useMemo(() => objective?.positions?.map((item) => item.name).join(', '), [objective.positions]);

    const dateOfUpdate =  useMemo(() => updatedAt 
        ? new Date(updatedAt).toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).replace(',', '')
        : new Date(createdAt!).toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).replace(',', ''),
    [createdAt, updatedAt]);

    return (
        <div 
            className={ classNames(cls.ResumeCard, {}, [className]) }
            onClick={onOpenHandler}
        >
            <div className={cls.image}>
                <img src={data.prevImg}/>
            </div>
            <div className={cls.footer}>
                <span className={cls.title}>
                    {
                        title || 'New resume'
                    }
                </span>
                <div className={cls.extras}>
                    <span className={cls.updDate}>
                        { dateOfUpdate }
                    </span>
                    <Button
                        className={cls.extrasBtn}
                        theme={ButtonTheme.CLEAR}
                        onClick={onToggleContextMenu}
                    >
                        <ExtrasIcon />
                    </Button>
                    { showContextMenu && 
                        <>
                            <div className={cls.contextMenu}>
                                <Button
                                    onClick={onDeleteHandler}
                                >
                                    <DeleteIcon />
                                    {t('ResumeCard.deleteBtn')}
                                </Button>
                            </div>
                            <Portal>
                                <div
                                    className={cls.overlay}
                                    onClick={onToggleContextMenu}
                                />
                            </Portal>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};
