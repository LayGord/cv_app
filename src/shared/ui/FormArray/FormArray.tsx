import { classNames } from "shared/lib/classNames/classNames";
import cls from "./FormArray.module.scss";
import { ReactNode } from "react";
import { Button, ButtonTheme } from "../Button/Button";
import { ReactComponent as AddItemIcon } from 'shared/assets/icons/plus-square.svg';


interface FormArrayProps<T extends {id: string}> {
    className?: string;
    title: string;
    value: T[],
    renderFunction: (value: T[]) => ReactNode, // should provide onChange, onDelete logic for each item
    onAddNew: () => void,
}

export const FormArray = <T extends { id: string }, >(props: FormArrayProps<T>) => {
    const {
        className,
        title,
        value,
        renderFunction,
        onAddNew,
    } = props;


    return ( 
        <div
            className={classNames(cls.FormArray, {}, [className])}
        >
            <div className={cls.header}>
                { title }
                <Button
                    className={cls.addNewBtn}
                    theme={ButtonTheme.CLEAR}
                    onClick={onAddNew}
                >
                    <AddItemIcon />
                </Button>
            </div>
            <div className={cls.items}>
                { renderFunction(value) }
            </div>
        </div>
    );
};
