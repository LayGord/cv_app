import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { Page } from "widgets/Page";
import { ResumeEditor, normalizeResumeEditorStep } from "widgets/ResumeEditor";

import {
    fetchResumeById,
    fetchResumeIds,
    getResumeDraft,
    getResumeIds,
    getResumeIdsStatus,
    resumeActions,
    updateResume
} from "entities/Resume";


import { AppRoutes } from "shared/config/router/paths";
import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import cls from "./ResumeEditorPage.module.scss";


interface ResumeEditorPageProps {
    className?: string;
}


const ResumeEditorPage = ({ className }: ResumeEditorPageProps) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const resumeIds = useSelector(getResumeIds)
    const resumeIdsStatus = useSelector(getResumeIdsStatus);
    const resumeDraft = useSelector(getResumeDraft);

    const [searchParams, setSearchParams] = useSearchParams({step: 'personal'});
    const step = normalizeResumeEditorStep(searchParams.get('step'))
    
    const onSwitchStep = useCallback((step: string) => {
        dispatch(updateResume(resumeDraft));
        setSearchParams({step: step});
    }, [dispatch, resumeDraft, setSearchParams]);


    const onFinish = useCallback(() => {
        dispatch(updateResume(resumeDraft));
        navigate(`/${id}/${AppRoutes.PREVIEW}`)
    }, [dispatch, id, navigate, resumeDraft]);

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
            { ( id ) &&
                <div className={ classNames(cls.ResumeEditorPage, {}, [className]) }>
                    <ResumeEditor
                        step={step}
                        onSwitchStep={onSwitchStep}
                        onFinish={onFinish}
                    />
                </div>
            }
        </Page>
    );
};

export default ResumeEditorPage;