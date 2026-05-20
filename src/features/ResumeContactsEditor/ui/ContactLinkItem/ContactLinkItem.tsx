import { useTranslation } from 'react-i18next';
import { ContactLink } from 'entities/Resume';
import { ReactComponent as DeleteItemIcon } from 'shared/assets/icons/x-icon.svg';
import { Input } from "shared/ui/Input/Input";
import { Button } from "shared/ui/Button/Button";
import cls from "./ContactLinkItem.module.scss";


interface ContactLinkItemItemProps {
    contact: ContactLink;
    onUpdate: (value: string, field: 'title' | 'link') => void;
    onDelete: () => void;
}

export const ContactLinkItem = (props: ContactLinkItemItemProps) => {
    const {
        contact,
        onUpdate,
        onDelete
    } = props;

    const { t } = useTranslation('resume');

    return (
        <div className={cls.ContactLinkItem}>
            <Input
                className={cls.title}
                value={contact.title}
                onChange={(value) => onUpdate(value, 'title')}
                placeholder={t("ResumeContactsEditor.linkItemName")}
            />
            <Input 
                className={cls.link}
                value={contact.link}
                onChange={(value) => onUpdate(value, 'link')}
                placeholder={t("ResumeContactsEditor.linkItemLink")}
            />
            <Button
                className={cls.deleteBtn}
                onClick={onDelete}
            >
                <DeleteItemIcon />
            </Button>
        </div>
    );
};
