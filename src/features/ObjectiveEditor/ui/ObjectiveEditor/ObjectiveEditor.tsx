import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ObjectiveEditor.module.scss";
import { useTranslation } from "react-i18next";
import { Group } from "shared/ui/Group/Group";
import { Input } from "shared/ui/Input/Input";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { getResumeObjective, ObjectiveData, resumeActions } from "entities/Resume";
import { FormArray } from "shared/ui/FormArray/FormArray";
import { useCallback, useMemo } from "react";
import { Position } from "entities/Resume";
import { PositionItem } from "../PositionItem/PositionItem";
import { Currency, CurrencySelect } from "entities/Currency";
import { Checkbox, CheckboxTheme } from "shared/ui/Checkbox/Checkbox";
import { FormatSelect } from "../FormatSelect/FormatSelect";
import { WorkweekInput } from "../WorkweekInput/WorkweekInput";
import { MultiSelect } from "shared/ui/MultiSelect/MultiSelect";
import { typeOfEmplOptions } from "../../model/const/objectiveEditorConsts";

interface ObjectiveEditorProps {
    className?: string;
}

export const ObjectiveEditor = ({ className }: ObjectiveEditorProps) => {
    const { t, i18n } = useTranslation('resume');

    const objective = useSelector(getResumeObjective);
    const dispatch = useAppDispatch();

    const typeOfEmplOptionsTr = useMemo( () => typeOfEmplOptions.map(
        (item) => ({ id: item.id, displayName: i18n.t(item.displayName, {ns: 'resume'}), value: item.value})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ), [i18n.language])

    const onAddPosition = useCallback(() => {
        let id = crypto.randomUUID();
        dispatch(resumeActions.addPosition(id));
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
                />
            )
        })
    }, [dispatch]);

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
                    <MultiSelect 
                        id={'typeOfemployment'}
                        options={typeOfEmplOptionsTr}
                        value={objective.typeOfEmpl}
                        onChange={
                            onChangeTypeOfEmpl as 
                            unknown as (value: {id: string, displayName: string, category?: string}[]) => void
                        }
                    /> 
                </Group>
                <Group title={t('ObjectiveEditor.titleSalary')}>
                    <div className={cls.inputRow}>
                        <Input
                            className={cls.salary}
                            id={'salary'}
                            type="number"
                            placeholder={t('ObjectiveEditor.salary')}
                            value={objective.salary}
                            onChange={onChangeSalary}
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
                    />
                    <WorkweekInput 
                        value={objective.workweek}
                        onChange={onChangeWorkweek}
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
