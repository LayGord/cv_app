import { classNames } from "shared/lib/classNames/classNames";
import { ReactComponent as SpinnerIcon } from 'shared/assets/icons/ring-resize-icon.svg';
import cls from "./PageLoader.module.scss";


interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => {
    return(
        <div className={ classNames(cls.PageLoader, {}, [className]) }>
            <div className={cls.content}>
                <span>Загрузка</span>
                <SpinnerIcon />
            </div>
        </div>
    );
};
