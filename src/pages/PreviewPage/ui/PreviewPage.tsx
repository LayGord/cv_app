import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { PageLoader } from "widgets/PageLoader";
import { Page } from "widgets/Page";
import { fetchResumeById, getResume, getResumeErrors, resumeActions, validateResumeData } from "entities/Resume";
import { isEmptyObj } from "shared/lib/isEmptyObj/isEmptyObj";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { classNames } from "shared/lib/classNames/classNames";
import { RouterPaths } from "shared/config/router/paths";
import { PreviewErrors } from "./PreviewErrors/PreviewErrors";
import { PreviewPdf } from "./PreviewPdf/PreviewPdf";
import cls from "./PreviewPage.module.scss";


interface PreviewPageProps {
    className?: string;
}

const PreviewPage = ({ className }: PreviewPageProps) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { resumeDraft, resumeDraftStatus } =  useSelector(getResume)
    const valErrors = useSelector(getResumeErrors);

    
    useEffect(() => {
        if (!id) { navigate('/'); return; }

        dispatch(fetchResumeById(id))
            .unwrap()
            .then((resume) => {
                dispatch(resumeActions.setCurrentId(id));
                dispatch(validateResumeData(resume))
            }) // validate only after fetch current resumeDraft
            .catch(() => {
                navigate(RouterPaths.not_found); return;
            });
    }, [dispatch, id, navigate]);

    return (
        <Page >
            <div className={ classNames(cls.PreviewPage, {}, [className]) }>
                { (resumeDraftStatus === 'validating' || resumeDraftStatus === 'isLoading')
                    ? <PageLoader />
                    : isEmptyObj(valErrors) 
                        ?  <PreviewPdf resumeData={resumeDraft}/>
                        : <PreviewErrors id={resumeDraft.id} errors={valErrors} />
                }   
            </div>
        </Page>
    );
};

export default PreviewPage