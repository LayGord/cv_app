import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { Page } from "widgets/Page";
import { PersonalEditor } from "features/PersonalEditor";
import { ContactsEditor } from 'features/ContactsEditor';
import { ObjectiveEditor } from "features/ObjectiveEditor";
import { JobsEditor } from 'features/JobsEditor';
import { ProjectsEditor } from 'features/ProjectsEditor';
import { EducationEditor } from 'features/EducationEditor';
import { NavButtons } from "shared/ui/NavButtons/NavButtons";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ResumeEditorPage.module.scss";


interface ResumeEditorPageProps {
    className?: string;
}

type ResumeEditorStep = 'personal' | 'contacts' | 'objective' | 'jobs' | 'projects' | 'education';

const resumeEditorConfig: Record<ResumeEditorStep, {prev?: ResumeEditorStep, next?: ResumeEditorStep}> = {
    personal: { next: 'contacts' },
    contacts: { prev: 'personal', next: 'objective' },
    objective: { prev: 'contacts', next: 'jobs'},
    jobs: { prev: 'objective', next: 'projects' },
    projects: { prev: 'jobs', next: 'education' },
    education: { prev: 'projects' }
}

const ResumeEditorPage = ({ className }: ResumeEditorPageProps) => {
    const [searchParams, setSearchParams] = useSearchParams({step: 'personal'});
    const step = searchParams.get('step') || 'personal' as ResumeEditorStep;
    
    const switchStep = (step: string) => setSearchParams({step: step});

    useEffect(() => {
        setSearchParams(searchParams)
    }, [searchParams, setSearchParams]);

    return(
        <Page>
            <div className={ classNames(cls.ResumeEditorPage, {}, [className]) }>
                { step === 'personal' && <PersonalEditor /> }
                { step === 'contacts' && <ContactsEditor /> }
                { step === 'objective' && <ObjectiveEditor /> }
                { step === 'jobs' && <JobsEditor /> }
                { step === 'projects' && <ProjectsEditor /> }
                { step === 'education' && <EducationEditor /> }
                <NavButtons 
                    {...resumeEditorConfig[step as ResumeEditorStep]}
                    onSwitchStep={switchStep}
                />
            </div>
        </Page>
    );
};

export default ResumeEditorPage;