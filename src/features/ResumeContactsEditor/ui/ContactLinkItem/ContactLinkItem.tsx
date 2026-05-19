import { ReactComponent as DeleteItemIcon } from 'shared/assets/icons/x-icon.svg';
import { Input } from "shared/ui/Input/Input";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
//import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ContactLinkItem.module.scss";
import { useState } from 'react';
import { ContactLink } from 'entities/Resume/model/types/ResumeSchema';


interface ContactLinkItemItemProps {
    className?: string;
    contact: ContactLink;
    onUpdate: (value: string, field: 'title' | 'link') => void;
    onDelete: () => void;
}

export const ContactLinkItem = (props: ContactLinkItemItemProps) => {
    const {
        className,
        contact,
        onUpdate,
        onDelete
    } = props;

    return (
        <div className={cls.ContactLinkItem}>
            <Input
                className={cls.title}
                value={contact.title}
                onChange={(value) => onUpdate(value, 'title')}
                placeholder='Описание'
            />
            <Input 
                className={cls.link}
                value={contact.link}
                onChange={(value) => onUpdate(value, 'link')}
                placeholder='Ссылка'
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
