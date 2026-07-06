import { useCallback } from 'react';
import { useTranslation } from 'react-i18next'
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { ReactComponent as TranslationIcon } from 'shared/assets/icons/translate-outline.svg';
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./LangSwitcher.module.scss";
import { LANG_KEY } from 'shared/const/localstorage';


interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const onChangeLanguage = useCallback(() => {
        const next = i18n.language === 'en-EN' ? 'ru-RU' : 'en-EN'
        i18n.changeLanguage(next);
        localStorage.setItem(LANG_KEY, next)
    }, [i18n]);

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={ classNames(cls.LangSwitcher, {}, [className]) }
            onClick={onChangeLanguage}
        >
            <TranslationIcon />
            <span>{t('language')}</span>
        </Button>
    );
};
