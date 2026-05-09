import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ResumeEditorPage.module.scss";
import { Page } from "widgets/Page";
import { InputGroup } from "shared/ui/InputGroup/InputGroup";
import { Input } from "shared/ui/Input/Input";
import { Select } from "shared/ui/Select/Select";
import { FileUploader } from "shared/ui/FileUploader/FileUploader";
import { useState } from "react";


interface ResumeEditorPageProps {
    className?: string;
}

const ResumeEditorPage = ({ className }: ResumeEditorPageProps) => {
    const [avatarUrl, setAvatarUrl] = useState('');
    return(
        <Page>
            <div className={ classNames(cls.ResumeEditorPage, {}, [className]) }>
                <InputGroup title="Основная информация">
                    <Input placeholder="Фамилия" id="lastname"/>
                    <Input placeholder="Имя" id="firstname"/>
                    <Input placeholder="Отчество" id="patronymic"/>
                    <div className={cls.inputGroupRow}>
                        <Select
                            placeholder="Пол"
                            options={
                                [{displayValue: 'Мужской', value: 'male'}, {displayValue: 'Женский', value: 'female'}]
                            }
                        />
                        <Input placeholder="Дата рождения"/>
                        <Input placeholder="Дата рождения"/>
                        
                    </div>
                    <FileUploader id={'Загрузить аватар'} value={avatarUrl} onChange={setAvatarUrl}/>
                </InputGroup>
            </div>
        </Page>
    );
};

export default ResumeEditorPage;