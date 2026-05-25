import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "shared/ui/Select/Select";
import { Currency } from "../../model/types/currency";
import { currencyOptions } from "../../model/const/currencyConsts";


interface CurrencySelectProps {
    className?: string;
    value?: Currency
    onChange?: (value: Currency) => void;
}

export const CurrencySelect = ({ className, onChange, value='EUR' }: CurrencySelectProps) => {
    const { t, i18n } = useTranslation();

    const options = useMemo(() => 
        currencyOptions.map(
            (item) => ({displayName: i18n.t(item.displayValue), value: item.value})
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ), [i18n.language]
    );

    return (
        <Select
            placeholder={t('currency')}
            className={className}
            options={options}
            value={value}
            onChange={onChange as (value: string) => void}
        />
    );
};
