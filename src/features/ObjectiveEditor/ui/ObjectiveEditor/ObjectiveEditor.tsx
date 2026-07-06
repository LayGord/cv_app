import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Currency, CurrencySelect } from "entities/Currency";
import { TypeOfEmplSelect, TypeOfEmplValue } from "entities/TypeOfEmpl";
import {
    Position, ObjectiveData,
    getObjective, getObjectiveErrors,
    objectiveDataValidation as val, 
    resumeActions, 
} from "entities/Resume";
import { Group } from "shared/ui/Group/Group";
import { Input, InputTheme } from "shared/ui/Input/Input";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { FormArray } from "shared/ui/FormArray/FormArray";
import { Checkbox, CheckboxTheme } from "shared/ui/Checkbox/Checkbox";
import { classNames } from "shared/lib/classNames/classNames";
import { PositionItem } from "../PositionItem/PositionItem";
import { FormatSelect } from "../FormatSelect/FormatSelect";
import { WorkweekInput } from "../WorkweekInput/WorkweekInput";
import cls from "./ObjectiveEditor.module.scss";


interface ObjectiveEditorProps {
    className?: string;
}

export const ObjectiveEditor = ({ className }: ObjectiveEditorProps) => {
    const { t } = useTranslation('resume');

    const objective = useSelector(getObjective);
    const dispatch = useAppDispatch();
    const errors = useSelector(getObjectiveErrors);

    const onAddPosition = useCallback(() => {
        let id = crypto.randomUUID();
        dispatch(resumeActions.addPosition(id));
    }, [dispatch]);
    
    const onValidatePosition = useCallback((id: string) => (field: keyof Position) => 
        (value: string) => {
            const error = val.validatePositionItemField('name', value);
            dispatch(resumeActions.setPositionError({id, field, error}));
        }, [dispatch]);

    const onValidateTypeOfEmpl = useCallback((data: TypeOfEmplValue[]) => {
        const valResult = val.validateTypeOfEmpl(data);
        dispatch(resumeActions.setTypeOfEmplErrors(valResult));
    }, [dispatch]);

    const onValidateField = useCallback((field: Exclude<keyof ObjectiveData, 'positions' | 'typeOfEmpl'>) => (value: string) => {
        const error = val.validateObjectiveDataField(field, value);
        dispatch(resumeActions.setObjectiveDataFieldError({ field, error}))
    }, [dispatch]);


    const renderPositions = useCallback((items: Position[]) => {

        return items?.map((item, index) => {
            const onUpdatePosition = (value: string) => {
                dispatch(resumeActions.updatePosition({id: item.id, name: value}))
            };

            const onDelete = () => {
                dispatch(resumeActions.deletePosition(item.id))
            };

            return (
                <PositionItem
                    key={item.id}
                    data={item}
                    onDelete={onDelete}
                    onUpdate={onUpdatePosition}
                    validateCb={onValidatePosition(item.id)}
                    errors={errors.positions?.[item.id]}
                />
            )
        })
    }, [dispatch, onValidatePosition, errors.positions]);

    const onChangeTypeOfEmpl = (value: ObjectiveData['typeOfEmpl']) => {
        dispatch(resumeActions.updateObjectiveData({ typeOfEmpl: value}))
    }

    const onChangeSalary = (value: string) => {
        dispatch(resumeActions.updateObjectiveData({ salary: value}))
    }

    const onChangeCurrency = (value: Currency) => {
        dispatch(resumeActions.updateObjectiveData({ currency: value}))
    }

    const onChangeFormat = (value: ObjectiveData['format']) => {
        dispatch(resumeActions.updateObjectiveData({format: value}))
    };

    const onChangeWorkweek = (value: string) => {
        dispatch(resumeActions.updateObjectiveData({workweek: value}))
    }

    const onChangeReadyToTrip = (checked: boolean) => {
        dispatch(resumeActions.updateObjectiveData({readyToBTrip: checked}))
    }

    const onChangeReadyToRelocate = (checked: boolean) => {
        dispatch(resumeActions.updateObjectiveData({readyToRelocate: checked}))
    }

    return (
        <div className={ classNames(cls.ObjectiveEditor, {}, [className]) }>
            <Group >
                <FormArray
                    title={t('ObjectiveEditor.titlePositions')}
                    value={objective.positions}
                    onAddNew={onAddPosition}
                    renderFunction={renderPositions}
                />
                <Group title={t('ObjectiveEditor.titleTypeOfEmpl')}>
                    <TypeOfEmplSelect 
                        value={objective.typeOfEmpl}
                        onChange={onChangeTypeOfEmpl}
                        onBlur={onValidateTypeOfEmpl}
                        error={errors.typeOfEmpl}
                    />
                </Group>
                <Group title={t('ObjectiveEditor.titleSalary')}>
                    <div className={cls.inputRow}>
                        <Input
                            className={cls.salary}
                            theme={ errors.salary ? InputTheme.ERROR : InputTheme.DEFAULT }
                            id={'salary'}
                            type="number"
                            placeholder={t('ObjectiveEditor.salary')}
                            value={objective.salary}
                            onChange={onChangeSalary}
                            onBlur={onValidateField('salary')}
                            error={errors.salary && t(errors.salary, {keyPrefix: 'errors'})}
                        />
                        <CurrencySelect
                            value={objective.currency}
                            onChange={onChangeCurrency}
                        />
                    </div>
                </Group>
                <Group title={t('ObjectiveEditor.titleAdditionalInfo')}>
                    
                    <FormatSelect 
                        value={objective.format}
                        onChange={onChangeFormat}
                        onBlur={onValidateField('format')}
                        error={errors.format && t(errors.format, {keyPrefix: 'errors'})}
                    />
                    <WorkweekInput 
                        value={objective.workweek}
                        onChange={onChangeWorkweek}
                        onBlur={onValidateField('workweek')}
                        error={errors.workweek && t(errors.workweek, {keyPrefix: 'errors'})}
                    />
                    <div className={cls.inputRow}>
                        <Checkbox
                            theme={CheckboxTheme.SECONDARY}
                            className={cls.checkbox}
                            label={t('ObjectiveEditor.readyToTrip')}
                            checked={objective.readyToBTrip}
                            onChange={onChangeReadyToTrip}
                        />
                        <Checkbox
                            theme={CheckboxTheme.SECONDARY}
                            className={cls.checkbox}
                            label={t('ObjectiveEditor.readyToRelocate')}
                            checked={objective.readyToRelocate}
                            onChange={onChangeReadyToRelocate}
                        />
                    </div>
                </Group>
            </Group>
        </div>
    );
};
