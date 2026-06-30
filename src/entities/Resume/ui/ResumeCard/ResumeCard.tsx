import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ResumeCard.module.scss";
import { Resume } from "../../model/types/ResumeSchema";
import { ReactComponent as ExtrasIcon } from 'shared/assets/icons/dots-vertical.svg';
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-outline.svg';
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useState } from "react";
import { Portal } from "shared/ui/Portal/Portal";

interface ResumeCardProps {
    className?: string;
    data: { id: string, objective: Partial<Resume['objective']>, updatedAt?: string, createdAt?: string };
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

    const title = objective?.positions?.map((item) => item.name).join(', ')

    return (
        <div 
            className={ classNames(cls.ResumeCard, {}, [className]) }
            onClick={onOpenHandler}
        >
            <div className={cls.image}>

            </div>
            <div className={cls.footer}>
                <span className={cls.title}>
                    {
                        title || 'New resume'
                    }
                </span>
                <div className={cls.extras}>
                    <span className={cls.updDate}>
                        { updatedAt 
                            ? new Date(updatedAt).toLocaleDateString() 
                            : new Date(createdAt!).toLocaleDateString()
                        }
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
                                    Delete
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
