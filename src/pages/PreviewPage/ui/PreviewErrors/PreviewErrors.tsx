import { classNames } from "shared/lib/classNames/classNames";
import cls from "./PreviewErrors.module.scss";

interface PreviewErrorsProps {
    className?: string;
}

export const PreviewErrors = ({ className }: PreviewErrorsProps) =>{
    return(
        <div className={ classNames(cls.PreviewErrors, {}, [className]) }>
            Some errors occured
        </div>
    );
};
