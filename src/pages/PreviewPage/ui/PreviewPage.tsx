import { classNames } from "shared/lib/classNames/classNames";
import cls from "./PreviewPage.module.scss";
import { Page } from "widgets/Page";
import { useSelector } from "react-redux";
import { fetchResumeById, getResume, getResumeErrors, validateResumeData } from "entities/Resume";
import { PreviewErrors } from "./PreviewErrors/PreviewErrors";
import { PreviewPdf } from "./PreviewPdf/PreviewPdf";
import { isEmptyObj } from "shared/lib/isEmptyObj/isEmptyObj";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { PageLoader } from "widgets/PageLoader";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";


interface PreviewPageProps {
    className?: string;
}

export const PreviewPage = ({ className }: PreviewPageProps) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {resumeDraft, isLodaing, isValidating } =  useSelector(getResume)
    const valErrors = useSelector(getResumeErrors);

    //const { isLodaing, isValidating, resumeDraft } = useSelector(getResume);
    
    useEffect(() => {
        if (!id) {
            navigate('/')
            return;
        }
        dispatch(fetchResumeById(id))
        dispatch(validateResumeData(resumeDraft))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, id])

    return (
        <Page >
            <div className={ classNames(cls.PreviewPage, {}, [className]) }>
                { (isValidating || isLodaing)
                    ? <PageLoader />
                    : isEmptyObj(valErrors) 
                        ?  <PreviewPdf resumeData={resumeDraft}/>
                        : <PreviewErrors errors={valErrors} />
                }   
            </div>
        </Page>
    );
};
