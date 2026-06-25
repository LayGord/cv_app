import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
    getContacts,
    getContactsErrors,
    resumeActions,
    ContactLink,
    ContactsData,
    contactsDataValidation as val,
} from "entities/Resume";
import { classNames } from "shared/lib/classNames/classNames";
import { Group } from "shared/ui/Group/Group";
import { Input, InputTheme } from "shared/ui/Input/Input";
import { FormArray } from "shared/ui/FormArray/FormArray";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { ReactComponent as HeartIcon  } from 'shared/assets/icons/heart-outline.svg';
import { ContactLinkItem } from "../ContactLinkItem/ContactLinkItem";
import cls from "./ContactsEditor.module.scss";


interface ContactsEditorProps {
    className?: string;
}

export const ContactsEditor = ({ className }: ContactsEditorProps) => {
    const { t } = useTranslation('resume');
    const contactsData = useSelector(getContacts);
    const errors = useSelector(getContactsErrors);
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

    const onBlurField = useCallback((field: keyof ContactsData) => 
        (value: string) => {
            const valResult = val.validateContactsDataField(field, value);
            dispatch(resumeActions.setContactsDataFieldError(
                { field: field as Exclude<keyof ContactsData, 'links'>, error: valResult }
            ))
        }, [dispatch])
    
    const onValidateContactLink = useCallback((id: string) => (field: keyof ContactLink) => 
        (value: string) => {
            const error = val.validateContactLinkField(field as keyof ContactLink, value);
            dispatch(resumeActions.setContactLinkError({ id, field, error }));
        }, [dispatch])

    const renderContactLinks = useCallback((links: ContactLink[]) => {
        return links?.map((contact) => {

            const onDeleteLink = () => {
                dispatch(resumeActions.deleteContactLink(contact.id))
            };

            const onUpdateLink = (value: string, field: 'title' | 'link',) => {
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
                    validateCb={onValidateContactLink(contact.id)}
                    errors={errors.links?.[contact.id]}
                />
            )
        })
    }, [contactsData.preferred, dispatch, onPreferContact, onValidateContactLink, errors.links])

    return (
        <div className={ classNames(cls.ContactsEditor, {}, [className]) }>
            <Group title={t('ContactsEditor.titleContacts')}>
                <div className={cls.row}>
                    <Input 
                        id={'email'}
                        theme={ errors.email ? InputTheme.ERROR : InputTheme.DEFAULT}
                        placeholder={t('ContactsEditor.email')}
                        value={contactsData.email}
                        onChange={onChangeEmail}
                        onBlur={onBlurField('email')}
                        error={errors.email && t(errors.email, {keyPrefix: 'errors'})}
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
                        theme={ errors.phone ? InputTheme.ERROR : InputTheme.DEFAULT}
                        placeholder={t('ContactsEditor.phone')}
                        value={contactsData.phone}
                        onChange={onChangePhone}
                        onBlur={onBlurField('phone')}
                        error={errors.phone && t(errors.phone, {keyPrefix: 'errors'})}
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
