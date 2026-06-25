import { classNames } from "shared/lib/classNames/classNames";
import cls from "./PreviewPage.module.scss";
import { Page } from "widgets/Page";
import { useSelector } from "react-redux";
import { Resume, getResume, getResumeErrors, validateResumeData } from "entities/Resume";
import { PreviewErrors } from "./PreviewErrors/PreviewErrors";
import { PreviewPdf } from "./PreviewPdf/PreviewPdf";
import { isEmptyObj } from "shared/lib/isEmptyObj/isEmptyObj";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { PageLoader } from "widgets/PageLoader";
import { useEffect } from "react";


interface PreviewPageProps {
    className?: string;
}

export const PreviewPage = ({ className }: PreviewPageProps) => {
    const { isLodaing, isValidating, resumeDraft } = useSelector(getResume);
    const valErrors = useSelector(getResumeErrors);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(validateResumeData(resumeDraft))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    return (
        <Page >
            <div className={ classNames(cls.PreviewPage, {}, [className]) }>
                { isValidating 
                    ? <PageLoader />
                    : isEmptyObj(valErrors) 
                        ?  <PreviewPdf resumeData={resumeDraft}/>
                        : <PreviewErrors errors={valErrors} />
                }   
            </div>
        </Page>
    );
};
