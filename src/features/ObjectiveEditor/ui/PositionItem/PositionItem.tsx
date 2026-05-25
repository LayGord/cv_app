import { classNames } from "shared/lib/classNames/classNames";
import cls from "./PositionItem.module.scss";
import { Input } from "shared/ui/Input/Input";
import { Position } from "entities/Resume";
import { Button } from "shared/ui/Button/Button";
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-outline.svg';
import { useTranslation } from "react-i18next";
import { memo } from "react";


interface PositionItemProps {
    className?: string;
    data: Position;
    onUpdate: (value: string) => void;
    onDelete: () => void;
}

export const PositionItem = memo((props: PositionItemProps) => {
    const {
        className,
        data,
        onUpdate,
        onDelete,
    } = props;

    const { t } = useTranslation('resume');

    return (
        <div className={ classNames(cls.PositionItem, {}, [className]) }>

            <Input 
                placeholder={t('ObjectiveEditor.PositionItem.position')}
                value={data.name}
                onChange={onUpdate}
            />
            <Button
                onClick={onDelete}
            >
                <DeleteIcon />
            </Button>
        </div>
    );
});
