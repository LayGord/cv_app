import { HTMLAttributes, memo, useCallback, useLayoutEffect, useRef } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./TextArea.module.scss";


export enum TextAreaTheme {
    'DEFAULT' = 'default',
    'ERROR' = 'error',
}

interface TextAreaProps extends Omit<HTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'onBlur'> {
    className?: string;
    theme?: TextAreaTheme;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
    placeholder?: string,
    minHeight?: number; // 24 * rownum + 26;
}

export const TextArea = memo((props: TextAreaProps) =>{
    const {
        className,
        theme = TextAreaTheme.DEFAULT,
        value,
        onChange,
        onBlur,
        placeholder,
        minHeight=76,
        ...otherProps
    } = props;

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        return onChange?.(e.target.value);
    }, [onChange]);

    const onBlurHandler = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
        return onChange?.(e.target.value);
    }, [onChange]);

    // dynamically adjust textarea height
    useLayoutEffect(() => {
        console.log(textareaRef.current?.scrollHeight);
        if (textareaRef.current) {
            textareaRef.current.style.height = "inherit";
            textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, minHeight)}px`;
        }
    }, [minHeight, value]);

    return(
        <textarea
            className={ classNames(cls.TextArea, {}, [className, cls[theme]]) }
            ref={textareaRef}
            value={value}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            placeholder={placeholder}
            style={{minHeight: minHeight}}
            {...otherProps}
        />
    );
});
