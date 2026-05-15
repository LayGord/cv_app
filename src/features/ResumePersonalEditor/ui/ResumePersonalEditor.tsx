import { useCallback } from "react";
import { useSelector } from "react-redux";
import { resumeActions, ResumeSchema, getResumePersonal } from "entities/Resume";
import { classNames } from "shared/lib/classNames/classNames";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { FileUploader } from "shared/ui/FileUploader/FileUploader";
import { Input } from "shared/ui/Input/Input";
import { InputGroup } from "shared/ui/InputGroup/InputGroup";
import { Select } from "shared/ui/Select/Select";
import { DatePicker } from "shared/ui/DatePicker/DatePicker";
import { Avatar, AvatarSize } from "shared/ui/Avatar/Avatar";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { ReactComponent as ChevronRight } from 'shared/assets/icons/chevron-right.svg';
import cls from "./ResumePersonalEditor.module.scss";


interface ResumePersonalEditorProps {
    className?: string;
}


export const ResumePersonalEditor = ({ className }: ResumePersonalEditorProps) => {
    const personalData = useSelector(getResumePersonal);
    const dispatch = useAppDispatch();

    const onChangeTextField = useCallback(
        (field: keyof ResumeSchema['resumeDraft']['personal']) => 
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
            <InputGroup title="Основная информация">
                <Input
                    id="lastname"
                    placeholder="Фамилия"
                    value={personalData.lastname}
                    onChange={onChangeTextField('lastname')}
                />
                <Input
                    id="firstname"
                    placeholder="Имя"
                    value={personalData.firstname}
                    onChange={onChangeTextField('firstname')}
                />
                <Input
                    id="patronymic"
                    placeholder="Отчество"
                    value={personalData.patronymic}
                    onChange={onChangeTextField('patronymic')}
                />
                <div className={cls.inputGroupRow}>
                    <Select
                        id="sex"
                        placeholder="Пол"
                        options={
                            [{displayValue: 'Мужской', value: 'male'}, {displayValue: 'Женский', value: 'female'}]
                        }
                        value={personalData.sex}
                        onChange={onChangeTextField('sex')}
                    />
                    
                    <Input
                        id="citizenship"
                        placeholder="Гражданство"
                        value={personalData.citizenship}
                        onChange={onChangeTextField('citizenship')}
                    />

                    <DatePicker
                        id="birthdate"
                        label="Дата рождения"
                        value={personalData.birthdate}
                        onChange={onChangeTextField('birthdate')}
                    />

                </div>
                <div className={cls.inputGroupRow}>
                    
                    <Input
                        id="country"
                        placeholder="Страна"
                        value={personalData.country}
                        onChange={onChangeTextField('country')}
                    />
                    <Input
                        id="city"
                        placeholder="Город"
                        value={personalData.city}
                        onChange={onChangeTextField('city')}
                    />
                </div>
            </InputGroup>
            <InputGroup title="Фото для резюме" align={'center'}>
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
            </InputGroup>
            <InputGroup align={'right'}>
                <div className={cls.inputGroupRow}>
                    <AppLink
                        className={cls.nextStepBtn}
                        to={'/'}
                    >
                        Далее
                        <ChevronRight />
                    </AppLink>
                </div>
            </InputGroup>
        </div>
    );
};
