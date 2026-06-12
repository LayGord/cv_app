import { classNames } from "shared/lib/classNames/classNames";
import cls from "./AboutMeEditor.module.scss";
import { Group } from "shared/ui/Group/Group";
import { TextArea } from "shared/ui/TextArea/TextArea";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { getAboutMe } from "entities/Resume/model/selectors/getAboutMe";
import { useCallback } from "react";
import { resumeActions } from "entities/Resume";


interface AboutMeEditorProps {
    className?: string;
}

export const AboutMeEditor = ({ className }: AboutMeEditorProps) => {
    const { t } = useTranslation('resume', {keyPrefix: 'AboutMeEditor'});
    const dispatch = useAppDispatch();
    const aboutMe = useSelector(getAboutMe);

    const onChange = useCallback((value: string) => {
        dispatch(resumeActions.updateAboutMe(value))
    }, [dispatch])  

    return (
        <div className={ classNames(cls.AboutMeEditor, {}, [className]) }>
            <Group title={t('title')}>
                <TextArea
                    placeholder={t('placeholder')}
                    value={aboutMe}
                    onChange={onChange}
                />
            </Group>
        </div>
    );
};


