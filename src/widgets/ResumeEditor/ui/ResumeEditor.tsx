import { PersonalEditor } from "features/PersonalEditor";
import { ContactsEditor } from "features/ContactsEditor";
import { AboutMeEditor } from "features/AboutMeEditor";
import { ObjectiveEditor } from "features/ObjectiveEditor";
import { JobsEditor } from "features/JobsEditor";
import { ProjectsEditor } from "features/ProjectsEditor";
import { EducationEditor } from "features/EducationEditor";
import { classNames } from "shared/lib/classNames/classNames";
import { NavButtons } from "shared/ui/NavButtons/NavButtons";
import cls from "./ResumeEditor.module.scss";
import { useCallback } from "react";
import { ResumeEditorStep } from "../model/types/resumeEditor";


interface ResumeEditorProps {
    className?: string;
    step: ResumeEditorStep;
    onSwitchStep: (step: string) => void | Promise<void>;
    onFinish?: () => void | Promise<void>;
}

const resumeEditorSteps: ResumeEditorStep[] = [
    'personal',
    'contacts',
    'about',
    'objective',
    'jobs',
    'projects',
    'education',
];

const stepComponents: Record<ResumeEditorStep, React.ComponentType> = {
    personal: PersonalEditor,
    contacts: ContactsEditor,
    about: AboutMeEditor,
    objective: ObjectiveEditor,
    jobs: JobsEditor,
    projects: ProjectsEditor,
    education: EducationEditor,
};

const getStepIndex = (step: ResumeEditorStep) =>
    resumeEditorSteps.indexOf(step);

const getPrevStep = (step: ResumeEditorStep): ResumeEditorStep | undefined => {
    const index = getStepIndex(step);
    return index > 0 ? resumeEditorSteps[index - 1] : undefined;
};

const getNextStep = (step: ResumeEditorStep): ResumeEditorStep | undefined => {
    const index = getStepIndex(step);
    return index < resumeEditorSteps.length - 1
        ? resumeEditorSteps[index + 1]
        : undefined;
};

const isResumeEditorStep = (value: string | null): value is ResumeEditorStep => {
    return !!value && resumeEditorSteps.includes(value as ResumeEditorStep);
};

export const normalizeResumeEditorStep = (
    value: string | null,
): ResumeEditorStep => {
    return isResumeEditorStep(value) ? value : "personal";
};

export const ResumeEditor = (props: ResumeEditorProps) => {
    const {
        className,
        step,
        onSwitchStep,
        onFinish,
    } = props;

    const StepComponent = stepComponents[step];
    const nextStep = getNextStep(step);
    const prevStep = getPrevStep(step);
    
    const onNext = useCallback(async () => {
        if (nextStep) onSwitchStep(nextStep)
    }, [nextStep, onSwitchStep]);

    const onPrev = useCallback(async () => {
        if (prevStep) onSwitchStep(prevStep);
    }, [prevStep, onSwitchStep]);

    return (
        <div className={ classNames(cls.ResumeEditor, {}, [className]) }>
            <StepComponent />
            <NavButtons
                hasNext={!!nextStep}
                hasPrev={!!prevStep}
                onNext={nextStep ? onNext : undefined}
                onPrev={prevStep ? onPrev : undefined}
                onFinish={onFinish}
            />
        </div>
    );
};


