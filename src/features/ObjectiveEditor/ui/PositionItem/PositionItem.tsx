import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Position, PositionErrorTypes } from "entities/Resume";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-outline.svg';
import { classNames } from "shared/lib/classNames/classNames";
import { Input, InputTheme } from "shared/ui/Input/Input";
import cls from "./PositionItem.module.scss";


interface PositionItemProps {
    className?: string;
    data: Position;
    onUpdate: (value: string) => void;
    onDelete: () => void;
    validateCb?: (field: keyof Position) => (value: string) => void
    errors?: PositionErrorTypes;
}

export const PositionItem = memo((props: PositionItemProps) => {
    const {
        className,
        data,
        onUpdate,
        onDelete,
        validateCb,
        errors,
    } = props;

    const { t } = useTranslation('resume');

    return (
        <div className={ classNames(cls.PositionItem, {}, [className]) }>

            <Input 
                placeholder={t('ObjectiveEditor.PositionItem.position')}
                theme={ errors ? InputTheme.ERROR : InputTheme.DEFAULT }
                value={data.name}
                onChange={onUpdate}
                onBlur={validateCb?.('name')}
                error={errors?.name && t(errors.name, {keyPrefix: 'errors'})}
            />
            <Button
                theme={ButtonTheme.SECONDARY}
                onClick={onDelete}
            >
                <DeleteIcon />
            </Button>
        </div>
    );
});
