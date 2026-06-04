import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactLink } from 'entities/Resume';
import { Input } from "shared/ui/Input/Input";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-outline.svg';
import { ReactComponent as HeartIcon  } from 'shared/assets/icons/heart-outline.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from "./ContactLinkItem.module.scss";


interface ContactLinkItemItemProps {
    contact: ContactLink;
    onUpdate: (value: string, field: 'title' | 'link') => void;
    onDelete: () => void;
    prefer?: boolean;
    onPrefer?: () => void;
}

export const ContactLinkItem = memo((props: ContactLinkItemItemProps) => {
    const {
        contact,
        onUpdate,
        onDelete,
        prefer = false,
        onPrefer,
    } = props;

    const { t } = useTranslation('resume');

    const onUpdateTitle = useCallback((value: string) => {
        onUpdate(value, 'title') 
    }, [onUpdate]);

    const onUpdateLink =  useCallback((value: string) => {
        onUpdate(value, 'link') 
    }, [onUpdate])

    const mods = useMemo(() => {
        return {[cls.preferred]: prefer}
    }, [prefer]);

    return (
        <div className={cls.ContactLinkItem}>
            <Input
                className={cls.title}
                value={contact.title}
                onChange={onUpdateTitle}
                placeholder={t("ContactsEditor.ContactLinkItem.name")}
            />
            <Input 
                className={cls.link}
                value={contact.link}
                onChange={onUpdateLink}
                placeholder={t("ContactsEditor.ContactLinkItem.link")}
            />
            { onPrefer && 
                <Button
                    className={classNames(cls.preferBtn, mods, [])}
                    theme={ prefer ? ButtonTheme.ACCENT : ButtonTheme.DEFAULT }
                    onClick={onPrefer}
                >
                    <HeartIcon />
                </Button>
            }
            <Button
                className={cls.deleteBtn}
                onClick={onDelete}
            >
                <DeleteIcon />
            </Button>
        </div>
    );
});
