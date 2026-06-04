import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getResumeContacts, resumeActions, ContactLink } from "entities/Resume";
import { classNames } from "shared/lib/classNames/classNames";
import { Group } from "shared/ui/Group/Group";
import { Input } from "shared/ui/Input/Input";
import { FormArray } from "shared/ui/FormArray/FormArray";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { ReactComponent as HeartIcon  } from 'shared/assets/icons/heart-outline.svg';
import { ContactLinkItem } from "../ContactLinkItem/ContactLinkItem";
import cls from "./ContactsEditor.module.scss";
import { useCallback } from "react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";


interface ContactsEditorProps {
    className?: string;
}

export const ContactsEditor = ({ className }: ContactsEditorProps) => {
    const { t } = useTranslation('resume');
    const contactsData = useSelector(getResumeContacts);
    const dispatch = useAppDispatch();

    const onChangeEmail = useCallback((value: string) => {
        dispatch(resumeActions.updateContactsData({'email': value}))
    }, [dispatch])

    const onChangePhone = useCallback((value: string) => {
        dispatch(resumeActions.updateContactsData({'phone': value}))
    }, [dispatch])

    const onPreferContact = useCallback((fieldId: string) => () => {
        dispatch(resumeActions.preferContact(fieldId))
    }, [dispatch])

    const onAddContactLink = useCallback(() => {
        const newId = crypto.randomUUID();
        dispatch(resumeActions.addContactLink(newId));
    }, [dispatch])

    const renderContactLinks = useCallback((links: ContactLink[]) => {
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
                    prefer={ contact.id === contactsData.preferred }
                    onPrefer={onPreferContact(contact.id)}
                />
            )
        })
    }, [contactsData.preferred, dispatch, onPreferContact])

    return (
        <div className={ classNames(cls.ContactsEditor, {}, [className]) }>
            <Group title={t('ContactsEditor.titleContacts')}>
                <div className={cls.row}>
                    <Input 
                        id={'email'}
                        placeholder={t('ContactsEditor.email')}
                        value={contactsData.email}
                        onChange={onChangeEmail}
                    />
                
                    <Button
                        className={classNames(cls.preferBtn, {[cls.preferred]: contactsData.preferred === 'email'}, [])}
                        theme={ contactsData.preferred === 'email' ? ButtonTheme.ACCENT : ButtonTheme.DEFAULT }
                        onClick={onPreferContact('email')}
                    >
                        <HeartIcon />
                    </Button>
                </div>
                <div className={cls.row}>
                    <Input 
                        id={'phone'}
                        placeholder={t('ContactsEditor.phone')}
                        value={contactsData.phone}
                        onChange={onChangePhone}
                    />

                    <Button
                        className={classNames(cls.preferBtn, {[cls.preferred]: contactsData.preferred === 'phone'}, [])}
                        theme={ contactsData.preferred === 'phone' ? ButtonTheme.ACCENT : ButtonTheme.DEFAULT }
                        onClick={onPreferContact('phone')}
                    >
                        <HeartIcon />
                    </Button>
                </div>
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
