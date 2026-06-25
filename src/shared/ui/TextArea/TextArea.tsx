import { HTMLAttributes, memo, useCallback, useLayoutEffect, useRef } from "react";
import { ReactComponent as InfoIcon } from 'shared/assets/icons/alert-circle-outline.svg';
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./TextArea.module.scss";
import { Popup, PopupTheme } from "../Popup/Popup";


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
    error?: string;
    hint?: string;
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
        error,
        hint,
        placeholder,
        minHeight=76,
        ...otherProps
    } = props;

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        return onChange?.(e.target.value);
    }, [onChange]);

    const onBlurHandler = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
        return onBlur?.(e.target.value);
    }, [onBlur]);

    // dynamically adjust textarea height
    useLayoutEffect(() => {
        if (textareaRef.current && wrapperRef.current) {
            textareaRef.current.style.height = "inherit";
            wrapperRef.current.style.height = "inherit";
            textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, minHeight)}px`;
            wrapperRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, minHeight)}px`;
        }
    }, [minHeight, value]);

    return (
        <div
            className={cls.textAreaWrapper}
            ref={wrapperRef}
        >
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
            { error &&
                <>
                    <div className={cls.errorIcon}>
                        <InfoIcon />
                    </div>
                    <Popup
                        className={cls.popup}
                        theme={PopupTheme.ERROR}
                    >
                        {error}
                    </Popup>
                </>
            }
            { hint && 
                <>
                    <div className={cls.hintIcon}>
                        <InfoIcon />
                    </div>
                    <Popup
                        className={cls.popup}
                        theme={PopupTheme.DEFAULT}
                    >
                        {hint}
                    </Popup>
                </>
            }
        </div>
    );
});
