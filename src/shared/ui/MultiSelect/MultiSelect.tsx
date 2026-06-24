import { classNames } from "shared/lib/classNames/classNames";
import cls from "./MultiSelect.module.scss";
import { useCallback, useMemo, useState } from "react";
import { Input, InputTheme } from "../Input/Input";
import { Button, ButtonTheme } from "../Button/Button";
import { useTranslation } from "react-i18next";


export interface MultiSelectOption {
    id: string;
    displayName: string;
    category?: string;
}

type MultiSelectVisibility = 'opening' | 'opened' | 'closing' | 'closed';

interface MultiSelectProps {
    id: string
    className?: string;
    options: MultiSelectOption[];
    value: string[]; // id`s of options
    onChange?: (value: string[]) => void;
    groupByCategories?: boolean;
    onBlur?: (value: string[]) => void;
    errors?: Record<string, any>;
}

export const MultiSelect = (props: MultiSelectProps) => {
    const {
        className,
        options,
        value=[],
        onChange,
        onBlur,
        errors,
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
        onBlur?.(value)
    }, [value, onBlur]);


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
        let valueDraft: string[];
        if (value.includes(option.id)) {
            valueDraft = value.filter(
                (optionFromValue) => optionFromValue !== option.id
            );
        } else {
            valueDraft = [...value, option.id];
        }
        onChange?.(valueDraft);
        onBlur?.(valueDraft)
    }, [onChange, onBlur, value]);

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

    const renderOption = useCallback((option?: MultiSelectOption) => {
        if (!option) return
        const onClick = () => onOptionClick(option);

        return (
            <Button
                key={option.id}
                className={cls.option}
                theme={ value.includes(option.id) ? ButtonTheme.ACCENT : ButtonTheme.DEFAULT}
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
        <>  
            { visibility === 'opened' && 
                <div
                    className={cls.overlay}
                    onClick={onCloseClick} 
                />
            }
            <div className={ classNames(cls.MultiSelect, {}, [className, cls[visibility]]) }>

                { value.length > 0 && 
                    <div className={cls.selectedList}>
                        { value.map((option) => renderOption(options.find(item => item.id === option))) }
                    </div>
                }
                
                <div className={cls.searchBlock}>
                    <Input
                        className={cls.searchInput}
                        theme={ errors ? InputTheme.ERROR : InputTheme.DEFAULT }
                        placeholder={t('MultiSelect.search')}
                        value={search}
                        onChange={onSearchChange}
                        onClick={onOpenClick}
                        //onBlur={() => onBlur?.(value)}
                        error={errors?.['empty']?.id || undefined}
                    />
                </div>

                <div className={cls.optionsList} >
                    { filteredOptions.length
                        ? renderOptionsList(filteredOptions, groupByCategories)
                        : <span className={cls.searchNotFound}>{t('MultiSelect.notFound')}</span> 
                    }
                </div>

            </div>
        </>
    );
};
