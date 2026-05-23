import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getResumeContacts, resumeActions, ContactLink } from "entities/Resume";
import { classNames } from "shared/lib/classNames/classNames";
import { Group } from "shared/ui/Group/Group";
import { Input } from "shared/ui/Input/Input";
import { FormArray } from "shared/ui/FormArray/FormArray";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { ContactLinkItem } from "../ContactLinkItem/ContactLinkItem";
import cls from "./ContactsEditor.module.scss";


interface ContactsEditorProps {
    className?: string;
}

export const ContactsEditor = ({ className }: ContactsEditorProps) => {
    const { t } = useTranslation('resume');
    const contactsData = useSelector(getResumeContacts);
    const dispatch = useAppDispatch();
    const newId = crypto.randomUUID();

    const onChangeEmail = (value: string) => {
        dispatch(resumeActions.updateContactsData({'email': value}))
    }

    const onChangePhone = (value: string) => {
        dispatch(resumeActions.updateContactsData({'phone': value}))
    }

    const onAddContactLink = () => {
        dispatch(resumeActions.addContactLink(newId));
    }

    const renderContactLinks = (links: ContactLink[]) => {
        return links?.map((contact) => {

            const onDeleteLink = () => {
                dispatch(resumeActions.deleteContactLink(contact.id))
            };

            const onUpdateLink = (value: string, field: 'title' | 'link',) => {
                console.log({
                    ...contact,
                    [field]: value,
                })
                dispatch(
                    resumeActions.updateContactLink({
                        ...contact,
                        [field]: value,
                    })
                );
            };

            return (
                <ContactLinkItem
                    key={contact.id}
                    contact={contact}
                    onUpdate={onUpdateLink}
                    onDelete={onDeleteLink}
                />
            )
        })
    }

    return (
        <div className={ classNames(cls.ContactsEditor, {}, [className]) }>
            <Group title={t('ContactsEditor.titleContacts')}>
                <Input 
                    id={'email'}
                    placeholder={t('ContactsEditor.email')}
                    value={contactsData.email}
                    onChange={onChangeEmail}
                />
                <Input 
                    id={'phone'}
                    placeholder={t('ContactsEditor.phone')}
                    value={contactsData.phone}
                    onChange={onChangePhone}
                />

            </Group>
            <FormArray 
                title={t('ContactsEditor.titleLinks')}
                value={contactsData.links}
                onAddNew={onAddContactLink}
                renderFunction={renderContactLinks}
            />
        </div>
    );
};
