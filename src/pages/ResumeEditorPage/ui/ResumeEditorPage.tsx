import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { Page } from "widgets/Page";
import { PersonalEditor } from "features/PersonalEditor";
import { ContactsEditor } from 'features/ContactsEditor';
import { JobsEditor } from 'features/JobsEditor';
import { ProjectsEditor } from 'features/ProjectsEditor';
import { EducationEditor } from 'features/EducationEditor';
import { NavButtons } from "shared/ui/NavButtons/NavButtons";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ResumeEditorPage.module.scss";


interface ResumeEditorPageProps {
    className?: string;
}

type ResumeEditorStep = 'personal' | 'contacts' | 'skills_jobs' | 'projects' | 'educations_langs';

const resumeEditorConfig: Record<ResumeEditorStep, {prev?: ResumeEditorStep, next?: ResumeEditorStep}> = {
    personal: { next: 'contacts' },
    contacts: { prev: 'personal', next: 'skills_jobs' },
    skills_jobs: { prev: 'contacts', next: 'projects' },
    projects: { prev: 'skills_jobs', next: 'educations_langs' },
    educations_langs: { prev: 'projects' }
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
                { step === 'contacts' && <ContactsEditor/> }
                { step === 'skills_jobs' && <JobsEditor /> }
                { step === 'projects' && <ProjectsEditor /> }
                { step === 'educations_langs' && <EducationEditor /> }
                <NavButtons 
                    {...resumeEditorConfig[step as ResumeEditorStep]}
                    onSwitchStep={switchStep}
                />
            </div>
        </Page>
    );
};

export default ResumeEditorPage;