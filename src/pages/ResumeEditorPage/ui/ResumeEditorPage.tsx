import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { Page } from "widgets/Page";

import { PersonalEditor } from "features/PersonalEditor";
import { ContactsEditor } from 'features/ContactsEditor';
import { AboutMeEditor } from "features/AboutMeEditor";
import { ObjectiveEditor } from "features/ObjectiveEditor";
import { JobsEditor } from 'features/JobsEditor';
import { ProjectsEditor } from 'features/ProjectsEditor';
import { EducationEditor } from 'features/EducationEditor';
import { fetchResumeById, fetchResumeIds, getResumeIds, getResumeIdsStatus, resumeActions } from "entities/Resume";

import { NavButtons } from "shared/ui/NavButtons/NavButtons";
import { classNames } from "shared/lib/classNames/classNames";
import { AppRoutes } from "shared/config/router/paths";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import cls from "./ResumeEditorPage.module.scss";


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
    const resumeIdsStatus = useSelector(getResumeIdsStatus);

    const [searchParams, setSearchParams] = useSearchParams({step: 'personal'});
    const step = (searchParams.get('step') ?? 'personal') as ResumeEditorStep;
    const switchStep = (step: string) => setSearchParams({step: step});


    useEffect(() => {
        if (!id) {
            navigate('/');
            return;
        }

        if (resumeIdsStatus === 'idle') {
            dispatch(fetchResumeIds());
            return;
        }

        if (resumeIdsStatus === 'isLoading') {
            return;
        }

        const exists = resumeIds?.some((item) => item.id === id);

        if (!exists) {
            navigate('/');
            return;
        }

        dispatch(resumeActions.setCurrentId(id));
        dispatch(fetchResumeById(id));
    }, [dispatch, id, resumeIds, navigate, resumeIdsStatus])

    return (
        <Page>
            { ( id ) && // && resumeIds.find(item => item.id === id)
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