import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ResumeCard.module.scss";

interface ResumeCardProps {
    className?: string;
}

export const ResumeCard = ({ className }: ResumeCardProps) =>{
    return(
        <div className={ classNames(cls.ResumeCard, {}, [className]) }>

        </div>
    );
};
