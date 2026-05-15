import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ResumeEditorPage.module.scss";
import { Page } from "widgets/Page";
import { ResumePersonalEditor } from "features/ResumePersonalEditor";


interface ResumeEditorPageProps {
    className?: string;
}

const ResumeEditorPage = ({ className }: ResumeEditorPageProps) => {
    return(
        <Page>
            <div className={ classNames(cls.ResumeEditorPage, {}, [className]) }>
                <ResumePersonalEditor />
            </div>
        </Page>
    );
};

export default ResumeEditorPage;