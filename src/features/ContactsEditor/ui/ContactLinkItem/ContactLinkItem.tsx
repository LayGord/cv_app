import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactLink } from 'entities/Resume';
import { Input } from "shared/ui/Input/Input";
import { Button } from "shared/ui/Button/Button";
import { ReactComponent as DeleteItemIcon } from 'shared/assets/icons/x-icon.svg';
import cls from "./ContactLinkItem.module.scss";


interface ContactLinkItemItemProps {
    contact: ContactLink;
    onUpdate: (value: string, field: 'title' | 'link') => void;
    onDelete: () => void;
}

export const ContactLinkItem = memo((props: ContactLinkItemItemProps) => {
    const {
        contact,
        onUpdate,
        onDelete
    } = props;

    const { t } = useTranslation('resume');

    const onUpdateTitle = useCallback((value: string) => {
        onUpdate(value, 'title') 
    }, [onUpdate]);

    const onUpdateLink =  useCallback((value: string) => {
        onUpdate(value, 'link') 
    }, [onUpdate])

    return (
        <div className={cls.ContactLinkItem}>
            <Input
                className={cls.title}
                value={contact.title}
                onChange={onUpdateTitle}
                placeholder={t("ContactsEditor.linkItemName")}
            />
            <Input 
                className={cls.link}
                value={contact.link}
                onChange={onUpdateLink}
                placeholder={t("ContactsEditor.linkItemLink")}
            />
            <Button
                className={cls.deleteBtn}
                onClick={onDelete}
            >
                <DeleteItemIcon />
            </Button>
        </div>
    );
});
