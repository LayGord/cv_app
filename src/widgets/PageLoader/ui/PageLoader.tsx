import { classNames } from "shared/lib/classNames/classNames";
import { ReactComponent as SpinnerIcon } from 'shared/assets/icons/ring-resize-icon.svg';
import cls from "./PageLoader.module.scss";
import { useTranslation } from "react-i18next";


interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => {
    const { t } = useTranslation();
    return (
        <div className={ classNames(cls.PageLoader, {}, [className]) }>
            <div className={cls.content}>
                <span>{t('loading', {keyPrefix: 'PageLoader'})}</span>
                <SpinnerIcon />
            </div>
        </div>
    );
};
