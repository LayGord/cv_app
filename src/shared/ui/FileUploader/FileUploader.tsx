import { ChangeEvent, InputHTMLAttributes, memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./FileUploader.module.scss";
import { ReactComponent as UploadIcon } from 'shared/assets/icons/upload.svg';
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/x-icon.svg';
import { Button, ButtonTheme } from "../Button/Button";
import { useTranslation } from "react-i18next";

interface FileUploaderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  id: string;
  className?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

export const FileUploader = memo((props: FileUploaderProps) => {
    const {
        id,
        className,
        value,
        onChange,
        onClear,
        ...otherProps
    } = props;

    const { t } = useTranslation();

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
    }, [onChange]);

    const cancelUpload = useCallback(() => {
        onClear?.();
    }, [onClear]);

    return (
        <div className={classNames(cls.FileUploader, {}, [className])}>
            <input
                className={cls.inputField}
                hidden
                id={id}
                type="file"
                accept="image/*"
                onChange={onChangeHandler}
                {...otherProps}
            />

            {value ? (
                <label htmlFor={id} className={cls.label}>
                    Удалить фото
                    <Button
                        className={cls.cancelButton}
                        theme={ButtonTheme.CLEAR}
                        onClick={cancelUpload}
                    >
                        <DeleteIcon />
                    </Button>
                </label>
            ) : (
                <label htmlFor={id} className={cls.label}>
                    {t('FileUploader.chooseFile')}
                    <UploadIcon />
                </label>
            )}
        </div>
    );
});
FileUploader.displayName = 'FileUploader';