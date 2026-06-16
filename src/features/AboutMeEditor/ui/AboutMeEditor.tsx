import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
    getAboutMe,
    aboutMeValidation as val,
    resumeActions,
} from "entities/Resume";
import { Group } from "shared/ui/Group/Group";
import { TextArea } from "shared/ui/TextArea/TextArea";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./AboutMeEditor.module.scss";


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

    const onBlur = useCallback((value: string) => {
        const valResult = val.validateAboutMe(value);
        dispatch(resumeActions.setAboutMeError(valResult))
    }, [dispatch])

    return (
        <div className={ classNames(cls.AboutMeEditor, {}, [className]) }>
            <Group title={t('title')}>
                <TextArea
                    placeholder={t('placeholder')}
                    value={aboutMe}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </Group>
        </div>
    );
};


