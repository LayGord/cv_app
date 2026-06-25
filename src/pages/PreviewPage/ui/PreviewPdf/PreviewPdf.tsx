import { classNames } from "shared/lib/classNames/classNames";
import cls from "./PreviewPdf.module.scss";
import { PDFViewer } from "@react-pdf/renderer";
import { ResumePdfTemplate } from "features/RenderResumeToPdf";
import { Resume } from "entities/Resume";

interface PreviewPdfProps {
    className?: string;
    resumeData: Resume;
}

export const PreviewPdf = (props: PreviewPdfProps) => {
    const {
        className,
        resumeData,
    } = props;

    return (
        <div className={ classNames(cls.PreviewPdf, {}, [className]) }>
            <PDFViewer style={{ width: '100%', height: '100%' }}>
                <ResumePdfTemplate data={resumeData}/>
            </PDFViewer>
        </div>
    );
};
