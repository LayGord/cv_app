import { classNames } from "shared/lib/classNames/classNames";
import cls from "./JobItem.module.scss";
import { Job } from "entities/Resume/model/types/ResumeSchema";
import { Input } from "shared/ui/Input/Input";
import { DatePicker } from "shared/ui/DatePicker/DatePicker";
import { TextArea } from "shared/ui/TextArea/TextArea";


interface JobItemProps {
    className?: string;
    data: Job;
    onUpdate: (data: Job) => void;
    onDelete: () => void;
}

export const JobItem = (props: JobItemProps) => {
    const {
        className,
        data,
        onUpdate,
        onDelete,
    } = props;
    return (
        <div className={ classNames(cls.JobItem, {}, [className]) }>
            <div className={cls.row}>
                <Input 
                    value={data.company}
                />
                <Input 
                    value={data.position}
                />
            </div>
            <div className={cls.row}>
                <DatePicker 
                    value={data.dateFrom}
                />
                <DatePicker 
                    value={data.dateTo}
                />
                <Input
                    value={data.location}
                />
            </div>
            <TextArea
                className={cls.row}
                value={data.comment}
            />
        </div>
    );
};
