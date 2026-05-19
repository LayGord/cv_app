import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ResumeContactsEditor.module.scss";
import { Group } from "shared/ui/Group/Group";
import { Input } from "shared/ui/Input/Input";
import { NavLinks } from "shared/ui/NavLinks/NavLinks";
import { getResumeContacts } from "entities/Resume/model/selectors/getResumeContacts";
import { useSelector } from "react-redux";

import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { resumeActions } from "entities/Resume";
import { ContactLinkItem } from "../ContactLinkItem/ContactLinkItem";
import { FormArray } from "shared/ui/FormArray/FormArray";
import { ContactLink } from "entities/Resume/model/types/ResumeSchema";


interface ResumeContactsEditorProps {
    className?: string;
}

export const ResumeContactsEditor = ({ className }: ResumeContactsEditorProps) => {
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
                    contact={contact}
                    onUpdate={onUpdateLink}
                    onDelete={onDeleteLink}
                />
            )
        })
    }

    return (
        <div className={ classNames(cls.ResumeContactsEditor, {}, [className]) }>
            <Group title={"Контактная информация"}>
                <Input 
                    id={'email'}
                    placeholder={"E-mail *"}
                    value={contactsData.email}
                    onChange={onChangeEmail}
                />
                <Input 
                    id={'phone'}
                    placeholder={"Телефонный номер"}
                    value={contactsData.phone}
                    onChange={onChangePhone}
                />

            </Group>
            <FormArray 
                title={"Ссылки на мессенджеры / соц-сети"}
                value={contactsData.links}
                onAddNew={onAddContactLink}
                renderFunction={renderContactLinks}
            />
            <NavLinks prev={'/edit/personal'} next={'/edit/experience'}/>
        </div>
    );
};
