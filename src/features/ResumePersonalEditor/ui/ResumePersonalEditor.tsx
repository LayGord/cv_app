import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { resumeActions, getResumePersonal, ResumePersonalData } from "entities/Resume";
import { FileUploader } from "shared/ui/FileUploader/FileUploader";
import { Input } from "shared/ui/Input/Input";
import { Group } from "shared/ui/Group/Group";
import { Select } from "shared/ui/Select/Select";
import { DatePicker } from "shared/ui/DatePicker/DatePicker";
import { Avatar, AvatarSize } from "shared/ui/Avatar/Avatar";
import { NavLinks } from "shared/ui/NavLinks/NavLinks";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ResumePersonalEditor.module.scss";


interface ResumePersonalEditorProps {
    className?: string;
}

export const ResumePersonalEditor = ({ className }: ResumePersonalEditorProps) => {

    const { t, i18n } = useTranslation('resume');

    const sexOptions = useMemo(() => [
        {displayValue: i18n.t("male"), value: 'male'},
        {displayValue: i18n.t("female"), value: 'female'}
    ], [i18n]);

    const personalData = useSelector(getResumePersonal);
    const dispatch = useAppDispatch();

    const onChangeTextField = useCallback(
        (field: keyof ResumePersonalData) => 
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
            <Group title={t('ResumePersonalEditor.titleMainInfo')}>
                <Input
                    id="lastname"
                    placeholder={t("ResumePersonalEditor.lastname")}
                    value={personalData.lastname}
                    onChange={onChangeTextField('lastname')}
                />
                <Input
                    id="firstname"
                    placeholder={t("ResumePersonalEditor.firstname")}
                    value={personalData.firstname}
                    onChange={onChangeTextField('firstname')}
                />
                <Input
                    id="patronymic"
                    placeholder={t("ResumePersonalEditor.patronymic")}
                    value={personalData.patronymic}
                    onChange={onChangeTextField('patronymic')}
                />
                <Group direction={'row'}>
                    <Select
                        id="sex"
                        placeholder={t("ResumePersonalEditor.sex")}
                        options={sexOptions}
                        value={personalData.sex}
                        onChange={onChangeTextField('sex')}
                    />

                    <DatePicker
                        id="birthdate"
                        label={t("ResumePersonalEditor.birthdate")}
                        value={personalData.birthdate}
                        onChange={onChangeTextField('birthdate')}
                    />

                </Group>
                <Group direction={'row'}>
                    <Input
                        id="citizenship"
                        placeholder={t("ResumePersonalEditor.citizenship")}
                        value={personalData.citizenship}
                        onChange={onChangeTextField('citizenship')}
                    />
                    <Input
                        id="country"
                        placeholder={t("ResumePersonalEditor.country")}
                        value={personalData.country}
                        onChange={onChangeTextField('country')}
                    />
                    <Input
                        id="city"
                        placeholder={t("ResumePersonalEditor.city")}
                        value={personalData.city}
                        onChange={onChangeTextField('city')}
                    />
                </Group>
            </Group>
            <Group title={t("ResumePersonalEditor.titlePhoto")} align={'center'}>
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
            <NavLinks next={'/edit/contacts'}/>
        </div>
    );
};
