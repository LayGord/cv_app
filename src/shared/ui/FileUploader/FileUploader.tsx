import { InputHTMLAttributes, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./FileUploader.module.scss";
import { ReactComponent as UploadIcon } from 'shared/assets/icons/box-upload-icon.svg'
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/x-icon.svg'
import { Button, ButtonTheme } from "../Button/Button";

interface FileUploaderProps  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    id: string;
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export const FileUploader = (props: FileUploaderProps) => {
    const {
        id,
        className,
        value,
        onChange,
        ...otherProps
    } = props;

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const files = e.target.files;
            if (files && files.length > 0) {
                return onChange?.(files[0].name);
            }
            else {
                return onChange?.('');
            }
        } catch (e) {
            return onChange?.('');
        }
    }, [onChange]);

    const cancelUpload= useCallback(() => onChange?.(''), [onChange]);

    return(
        <div className={classNames(cls.FileUploader, {}, [])}>
            <input
                className={cls.inputField}
                hidden
                id={id}
                type="file"
                accept='image/*'
                onChange={onChangeHandler}
                {...otherProps}
            />
            { value && 
                <label htmlFor={id} className={cls.label}>
                    {value}
                    <Button
                        className={cls.cancelButton}
                        theme={ButtonTheme.CLEAR}
                        onClick={cancelUpload}
                    >
                        <DeleteIcon />
                    </Button>
                </label>
            }
            { !value && 
                <label htmlFor={id} className={cls.label}>
                    Выберите файл
                    <UploadIcon />
                </label>
            }
        </div>
    );
}
