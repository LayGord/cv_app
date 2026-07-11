import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { ReactComponent as ExtrasIcon } from 'shared/assets/icons/dots-vertical.svg';
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-outline.svg';
import { ReactComponent as EditIcon } from 'shared/assets/icons/edit-icon-bold.svg';
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Portal } from "shared/ui/Portal/Portal";
import cls from "./ResumeCard.module.scss";
import { Resume } from "../../model/types/ResumeSchema";
import { Modal } from "shared/ui/Modal/Modal";
import { Input, InputTheme } from "shared/ui/Input/Input";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { patchResume } from "../../model/services/patchResumeById/patchResumeById";


interface ResumeCardProps {
    className?: string;
    data: { id: string, title: string, objective: Partial<Resume['objective']>, updatedAt?: string, createdAt?: string, prevImg?: string };
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

    const { t } = useTranslation(undefined, {keyPrefix: "ResumeCard"});
    const dispatch = useAppDispatch();

    const { id, updatedAt, createdAt } = data;
    const [isContextMenu, setIsContextMenu] = useState(false);
    const [isModal, setIsModal] = useState(false);

    // contextMenu logic
    const onToggleContextMenu = useCallback((e?: React.MouseEvent) => {
        setIsContextMenu(prev => !prev)
        e?.stopPropagation();
    }, []);

    const keyDownHandler = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsContextMenu(false);
        }
    }, [setIsContextMenu]);

    const onOpenHandler = useCallback(() => onOpen?.(id), [id, onOpen]);
        
    const onDeleteHandler = useCallback((e: React.MouseEvent) => {
        onDelete?.(id);
        setIsContextMenu(false);
        e.stopPropagation();
    }, [id, onDelete]);


    // renameModal logic
    const onOpenRenameModal = useCallback((e: React.MouseEvent) => {
        setIsModal(true);
        setIsContextMenu(false);
        e.stopPropagation();
    }, []);

    const onCloseRenameModal = useCallback(() => setIsModal(false), []);

    const [title, setTitle] = useState(data.title);
    const [valError, setValError] = useState<string | undefined>(undefined);

    const validateTitle = useCallback((title: string) => {
        if (title.length <= 2) {
            setValError('TOO_SHORT_TITLE');
            return;
        } else {
            setValError(undefined);
            return;
        }
    }, []);

    const onChangeTitle = useCallback((value: string) => {
        setTitle(value);
        validateTitle(value);
    }, [validateTitle]);
    
    const onUpdateResumeTitle = useCallback(() => {
        dispatch(patchResume({ id: data.id, title: title}));
        onCloseRenameModal();
    }, [data.id, dispatch, title, onCloseRenameModal]);

    useEffect(() => {
        if (isContextMenu) {
            window.addEventListener('keydown', keyDownHandler);
        };

        return () => {
            setTitle(data.title)
            setValError(undefined);
            window.removeEventListener('keydown', keyDownHandler);
        }
    }, [isContextMenu, keyDownHandler, setTitle, data.title]);

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
            <div className={cls.imageWrapper}>
                <img className={cls.image} src={data.prevImg} alt={t('')}/>
            </div>
            <div className={cls.footer}>
                <span className={cls.title}>{ data.title }</span>
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
                    { isContextMenu && 
                        <>
                            <div className={cls.contextMenu}>
                                <Button
                                    theme={ButtonTheme.CLEAR}
                                    onClick={onOpenRenameModal}
                                >
                                    <EditIcon />
                                    {t('renameBtn')}
                                </Button>
                                <Button
                                    theme={ButtonTheme.CLEAR}
                                    onClick={onDeleteHandler}
                                >
                                    <DeleteIcon />
                                    {t('deleteBtn')}
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
                    <Modal
                        isOpen={isModal}
                        onClose={onCloseRenameModal}
                        lazy
                    >
                        <div className={cls.renameModalContent}>
                            <Input
                                theme={valError ? InputTheme.ERROR : InputTheme.DEFAULT}
                                value={title}
                                onChange={onChangeTitle}
                                error={valError ? t(valError, {keyPrefix: ''}) : undefined}
                            />
                            <div className={cls.renameModalBtns}>
                                <Button
                                    disabled={valError ? true : false}
                                    onClick={onUpdateResumeTitle}
                                >
                                    {t('renameSaveBtn')}
                                </Button>
                                <Button
                                    onClick={onCloseRenameModal}
                                >
                                    {t('renameCancelBtn')}
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
};