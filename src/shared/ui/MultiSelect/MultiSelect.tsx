import { classNames } from "shared/lib/classNames/classNames";
import cls from "./MultiSelect.module.scss";
import { useCallback, useMemo, useState } from "react";
import { Input } from "../Input/Input";
import { Button, ButtonTheme } from "../Button/Button";
import { ReactComponent as CloseIcon } from 'shared/assets/icons/x-icon.svg';
import { useTranslation } from "react-i18next";

interface MultiSelectOption {
    id: string;
    displayName: string;
    category?: string;
}

type MultiSelectVisibility = 'opening' | 'opened' | 'closing' | 'closed';

interface MultiSelectProps {
    id: string
    className?: string;
    options: MultiSelectOption[];
    value?: MultiSelectOption[]; // id`s of options
    onChange?: (value: MultiSelectOption[]) => void;
    groupByCategories?: boolean;
}

export const MultiSelect = (props: MultiSelectProps) => {
    const {
        className,
        options,
        value=[],
        onChange,
        groupByCategories=false,
    } = props;

    const { t, i18n } = useTranslation();

    // display logic 
    const [visibility, setVisibility] = useState<MultiSelectVisibility>('closed');

    const onOpenClick = useCallback(() => {
        if (visibility !== 'opened') {setVisibility('opening')};
        setTimeout(() => {
            setVisibility('opened');
        }, 10)
    }, [visibility]);

    const onCloseClick = useCallback(() => {
        setVisibility('closing');
        setTimeout(() => {
            setVisibility('closed');
        }, 250)
    }, []);

    // filtration logic
    const [search, setSearch] = useState('');
    const onSearchChange = useCallback((value: string) => {
        setSearch(value);
    }, [setSearch]);

    const filteredOptions = useMemo(
        () => {
            return  Object.values(options).filter(
                (option) => option.displayName.includes(search)
            );
        },
        [options, search]
    );

    // render logic
    const onOptionClick = useCallback((option: MultiSelectOption) => {
        let valueDraft;
        if (value.includes(option)) {
            valueDraft = value.filter(
                (optionFromValue) => optionFromValue.id !== option.id
            );
        } else {
            valueDraft = [...value, option];
        }
        onChange?.(valueDraft);
    }, [onChange, value]);

    const groupOptionsByCategory = useCallback((options: MultiSelectOption[]): Record<string, MultiSelectOption[]>  => {
        return options.reduce<Record<string, MultiSelectOption[]>>(
            (acc, option) => {
                const category = option.category ?? i18n.t('MultiSelect.others');

                if (!acc[category]) {
                    acc[category] = [];
                }

                acc[category].push(option);
                return acc;
            },
            {}
        );
    }, [i18n]);

    const renderOption = useCallback((option: MultiSelectOption) => {
        const onClick = () => onOptionClick(option);

        return (
            <Button
                key={option.id}
                className={cls.option}
                theme={ value.includes(option) ? ButtonTheme.ACCENT : ButtonTheme.DEFAULT}
                onClick={onClick} 
            >
                { option?.displayName }
            </Button>
        )
    }, [onOptionClick, value]);

    const renderOptionsList = useCallback((options: MultiSelectOption[], grouped: boolean) => {
        if (grouped) {
            return Object.entries(groupOptionsByCategory(options)).map(([category, options]) => {
                return (
                    <>
                        <div key={category} className={cls.categoryName}>{ category }</div>
                        {
                            options.map((option) => renderOption(option))
                        }
                    </>
                )
            })
        } else {
            return options.map((option) => renderOption(option))
        }
    }, [groupOptionsByCategory, renderOption]);

    return(
        <div className={ classNames(cls.MultiSelect, {}, [className, cls[visibility]]) }>

            { value.length > 0 && 
                <div className={cls.selectedList}>
                    { value.map((option) => renderOption(option)) }
                </div>
            }

            <div className={cls.searchBlock}>
                <Input
                    className={cls.searchInput}
                    placeholder={t('MultiSelect.search')}
                    value={search}
                    onChange={onSearchChange}
                    onClick={onOpenClick}
                />

                <Button
                    className={cls.closeBtn}
                    theme={ButtonTheme.CLEAR}
                    onClick={onCloseClick}
                >
                    <CloseIcon />
                </Button>
            </div>
 
            <div className={cls.optionsList} >
                { filteredOptions.length
                    ? renderOptionsList(filteredOptions, groupByCategories)
                    : <span className={cls.searchNotFound}>{t('MultiSelect.notFound')}</span> 
                }
            </div>
   
        </div>
    );
};
