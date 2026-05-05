import { classNames } from "shared/lib/classNames/classNames";
import cls from "./MultiSelect.module.scss";
import { useCallback, useMemo, useState } from "react";
import { Input } from "../Input/Input";
import { Button, ButtonTheme } from "../Button/Button";
import { ReactComponent as CloseIcon } from 'shared/assets/icons/x-icon.svg';

interface MultiSelectData {
    id: string;
    displayName: string;
    category?: string;
}

type MultiSelectOptions = Record<string, MultiSelectData>;
type GroupedMultiSelectOptions = Record<string, MultiSelectData[]>

type MultiSelectVisibility = 'opening' | 'opened' | 'closing' | 'closed';

interface MultiSelectProps {
    id: string
    className?: string;
    options: MultiSelectOptions;
    value?: string[]; // id`s of options
    onChange?: (value: string[]) => void;
    groupByCategories?: boolean;
}

export const MultiSelect = (props: MultiSelectProps) => {
    const {
        className,
        options,
        //value=[],
        //onChange,
        groupByCategories=false,
    } = props;

    const [value, onChange] = useState<string[]>([]);

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
    const onOptionClick = useCallback((optionId: string) => {
        let optionsIds;
        if (value.includes(optionId)) {
            optionsIds = value.filter(
                (optionIdfromValue) => optionIdfromValue !== optionId
            );
        } else {
            optionsIds = [...value, optionId];
        }
        onChange?.(optionsIds);
    }, [onChange, value]);

    const groupOptionsByCategory = useCallback((options: MultiSelectData[]): GroupedMultiSelectOptions  => {
        return options.reduce<GroupedMultiSelectOptions>(
            (acc, option) => {
                const category = option.category ?? 'Other';

                if (!acc[category]) {
                    acc[category] = [];
                }

                acc[category].push(option);
                return acc;
            },
            {}
        );
    }, []);

    const renderOption = useCallback((option: MultiSelectData) => {
        const onClick = () => onOptionClick(option.id);

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

    const renderOptionsList = useCallback((options: MultiSelectData[], grouped: boolean) => {
        if (grouped) {
            return Object.entries(groupOptionsByCategory(options)).map(([category, options]) => {
                return (
                    <>
                        <div className={cls.categoryName}>{ category }</div>
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

            <div className={cls.selectedList}>
                { value?.map((optionId) => renderOption(options[optionId])) }
            </div>

            <div className={cls.searchBlock}>
                <Input
                    className={cls.searchInput}
                    placeholder={"Search"}
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
 
            <div
                className={cls.optionsList}
            >
                { !filteredOptions.length && <span className={cls.searchNotFound}>не найдено записей</span> }
                { renderOptionsList(filteredOptions, groupByCategories) }
            </div>
   
        </div>
    );
};
