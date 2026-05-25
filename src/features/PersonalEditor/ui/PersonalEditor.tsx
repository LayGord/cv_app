import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { resumeActions, getResumePersonal, PersonalData } from "entities/Resume";
import { FileUploader } from "shared/ui/FileUploader/FileUploader";
import { Input } from "shared/ui/Input/Input";
import { Group } from "shared/ui/Group/Group";
import { DatePicker } from "shared/ui/DatePicker/DatePicker";
import { Avatar, AvatarSize } from "shared/ui/Avatar/Avatar";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { classNames } from "shared/lib/classNames/classNames";
import { SexSelect } from "./SexSelect/SexSelect";
import cls from "./PersonalEditor.module.scss";


interface PersonalEditorProps {
    className?: string;
}

export const PersonalEditor = ({ className }: PersonalEditorProps) => {

    const { t } = useTranslation('resume');

    const personalData = useSelector(getResumePersonal);
    const dispatch = useAppDispatch();

    const onChangeTextField = useCallback(
        (field: keyof PersonalData) => 
            (value: string) => dispatch(resumeActions.updatePersonalData({[field]: value})), 
        [dispatch]);

    const onChangePhoto = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const photo = URL.createObjectURL(file);
        dispatch(resumeActions.updatePersonalData({ photo }));
    }, [dispatch]);
  
    const onClearPhoto = useCallback(() => dispatch(resumeActions.updatePersonalData({ 'photo': '' })), [dispatch]);

    return (
        <div className={ classNames(cls.ResumePersonalEditor, {}, [className]) }>
            <Group title={t('PersonalEditor.titleMainInfo')}>
                <Input
                    id="lastname"
                    placeholder={t("PersonalEditor.lastname")}
                    value={personalData.lastname}
                    onChange={onChangeTextField('lastname')}
                />
                <Input
                    id="firstname"
                    placeholder={t("PersonalEditor.firstname")}
                    value={personalData.firstname}
                    onChange={onChangeTextField('firstname')}
                />
                <Input
                    id="patronymic"
                    placeholder={t("PersonalEditor.patronymic")}
                    value={personalData.patronymic}
                    onChange={onChangeTextField('patronymic')}
                />
                <Group direction={'row'}>
                    <SexSelect 
                        value={personalData.sex}
                        onChange={onChangeTextField('sex')}
                    />
                    <DatePicker
                        id="birthdate"
                        label={t("PersonalEditor.birthdate")}
                        value={personalData.birthdate}
                        onChange={onChangeTextField('birthdate')}
                    />

                </Group>
                <Group direction={'row'}>
                    <Input
                        id="citizenship"
                        placeholder={t("PersonalEditor.citizenship")}
                        value={personalData.citizenship}
                        onChange={onChangeTextField('citizenship')}
                    />
                    <Input
                        id="country"
                        placeholder={t("PersonalEditor.country")}
                        value={personalData.country}
                        onChange={onChangeTextField('country')}
                    />
                    <Input
                        id="city"
                        placeholder={t("PersonalEditor.city")}
                        value={personalData.city}
                        onChange={onChangeTextField('city')}
                    />
                </Group>
            </Group>
            <Group title={t("PersonalEditor.titlePhoto")} align={'center'}>
                <Avatar
                    src={personalData.photo}
                    size={AvatarSize.L}
                />
                <FileUploader
                    id="photo"
                    value={personalData.photo}
                    onChange={onChangePhoto}
                    onClear={onClearPhoto}
                />
            </Group>
        </div>
    );
};
