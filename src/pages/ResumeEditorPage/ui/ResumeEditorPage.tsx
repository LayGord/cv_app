import { useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
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
import { AppRoutes } from "shared/config/router/paths";
import { AboutMeEditor } from "features/AboutMeEditor";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { fetchResumeById, getResumeIds, resumeActions } from "entities/Resume";
import { useSelector } from "react-redux";


interface ResumeEditorPageProps {
    className?: string;
}

type ResumeEditorStep = 'personal' | 'contacts' | 'objective' | 'about' | 'jobs' | 'projects' | 'education';

const resumeEditorConfig: Record<ResumeEditorStep, {prev?: ResumeEditorStep, next?: ResumeEditorStep}> = {
    personal: { next: 'contacts' },
    contacts: { prev: 'personal', next: 'about' },
    about: { prev: 'contacts', next: 'objective'},
    objective: { prev: 'about', next: 'jobs'},
    jobs: { prev: 'objective', next: 'projects' },
    projects: { prev: 'jobs', next: 'education' },
    education: { prev: 'projects' }
}

const ResumeEditorPage = ({ className }: ResumeEditorPageProps) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const resumeIds = useSelector(getResumeIds)

    const [searchParams, setSearchParams] = useSearchParams({step: 'personal'});
    const step = searchParams.get('step') || 'personal' as ResumeEditorStep;
    const switchStep = (step: string) => setSearchParams({step: step});


    useEffect(() => {
        setSearchParams(searchParams);
    }, [searchParams, setSearchParams]);
    

    useEffect(() => {
        if (!id || !resumeIds.find(item => item.id === id)) {
            navigate('/');
        }
        dispatch(resumeActions.setCurrentId(id))
        dispatch(fetchResumeById(id!))
    }, [dispatch, id, resumeIds, navigate])

    return (
        <Page>
            { ( id && resumeIds.find(item => item.id === id) ) &&
                <div className={ classNames(cls.ResumeEditorPage, {}, [className]) }>
                    { step === 'personal' && <PersonalEditor /> }
                    { step === 'contacts' && <ContactsEditor /> }
                    { step === 'about' && <AboutMeEditor /> }
                    { step === 'objective' && <ObjectiveEditor /> }
                    { step === 'jobs' && <JobsEditor /> }
                    { step === 'projects' && <ProjectsEditor /> }
                    { step === 'education' && <EducationEditor /> }
                    <NavButtons 
                        {...resumeEditorConfig[step as ResumeEditorStep]}
                        lastLink={`/${id}/${AppRoutes.PREVIEW}`}
                        onSwitchStep={switchStep}
                    />
                </div>
            }
        </Page>
    );
};

export default ResumeEditorPage;