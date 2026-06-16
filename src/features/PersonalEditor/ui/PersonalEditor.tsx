import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
    resumeActions,
    PersonalData,
    getPersonal,
    getPersonalErrors,
    personalDataValidation as val,
} from "entities/Resume";
import { FileUploader } from "shared/ui/FileUploader/FileUploader";
import { Input, InputTheme } from "shared/ui/Input/Input";
import { Group } from "shared/ui/Group/Group";
import { DatePicker, DatePickerTheme } from "shared/ui/DatePicker/DatePicker";
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

    const personalData = useSelector(getPersonal);
    const errors = useSelector(getPersonalErrors);
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

    const onBlurField = useCallback((field: keyof PersonalData) => (value: PersonalData[keyof PersonalData]) => {
        const valResult = val.validatePersonalDataField(field, value);
        dispatch(resumeActions.setPersonalDataFieldError({ field: field, error: valResult }))
    }, [dispatch])

    return (
        <div className={ classNames(cls.ResumePersonalEditor, {}, [className]) }>
            <Group title={t('PersonalEditor.titleMainInfo')}>
                <Input
                    id="lastname"
                    theme={ errors.lastname ? InputTheme.ERROR : InputTheme.DEFAULT }
                    placeholder={t("PersonalEditor.lastname")}
                    value={personalData.lastname}
                    onChange={onChangeTextField('lastname')}
                    onBlur={onBlurField('lastname')}
                    error={errors.lastname && t(errors.lastname, {keyPrefix: 'errors'})}
                />
                <Input
                    id="firstname"
                    theme={ errors.firstname ? InputTheme.ERROR : InputTheme.DEFAULT }
                    placeholder={t("PersonalEditor.firstname")}
                    value={personalData.firstname}
                    onChange={onChangeTextField('firstname')}
                    onBlur={onBlurField('firstname')}
                    error={errors.firstname && t(errors.firstname, {keyPrefix: 'errors'})}
                />
                <Input
                    id="patronymic"
                    theme={ errors.patronymic ? InputTheme.ERROR : InputTheme.DEFAULT }
                    placeholder={t("PersonalEditor.patronymic")}
                    value={personalData.patronymic}
                    onChange={onChangeTextField('patronymic')}
                    onBlur={onBlurField('patronymic')}
                    error={errors.patronymic && t(errors.patronymic, {keyPrefix: 'errors'})}
                />
                <Group direction={'row'}>
                    <SexSelect 
                        value={personalData.sex}
                        onChange={onChangeTextField('sex')}
                    />
                    <DatePicker
                        id="birthdate"
                        theme={ errors.birthdate ? DatePickerTheme.ERROR : DatePickerTheme.DEFAULT }
                        label={t("PersonalEditor.birthdate")}
                        value={personalData.birthdate}
                        onChange={onChangeTextField('birthdate')}
                        onBlur={onBlurField('birthdate')}
                    />

                </Group>
                <Group direction={'row'}>
                    <Input
                        id="citizenship"
                        theme={ errors.citizenship ? InputTheme.ERROR : InputTheme.DEFAULT }
                        placeholder={t("PersonalEditor.citizenship")}
                        value={personalData.citizenship}
                        onChange={onChangeTextField('citizenship')}
                        onBlur={onBlurField('citizenship')}
                        error={errors.citizenship && t(errors.citizenship, {keyPrefix: 'errors'})}
                    />
                    <Input
                        id="country"
                        theme={ errors.country ? InputTheme.ERROR : InputTheme.DEFAULT }
                        placeholder={t("PersonalEditor.country")}
                        value={personalData.country}
                        onChange={onChangeTextField('country')}
                        onBlur={onBlurField('country')}
                        error={errors.country && t(errors.country, {keyPrefix: 'errors'})}
                    />
                    <Input
                        id="city"
                        theme={ errors.city ? InputTheme.ERROR : InputTheme.DEFAULT }
                        placeholder={t("PersonalEditor.city")}
                        value={personalData.city}
                        onChange={onChangeTextField('city')}
                        onBlur={onBlurField('city')}
                        error={errors.city && t(errors.city, {keyPrefix: 'errors'})}
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
