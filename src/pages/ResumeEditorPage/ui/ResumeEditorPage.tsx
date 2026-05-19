import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ResumeEditorPage.module.scss";
import { Page } from "widgets/Page";
import { ResumePersonalEditor } from "features/ResumePersonalEditor";
import { ResumeContactsEditor } from 'features/ResumeContactsEditor';
import { ResumeExperienceEditor } from 'features/ResumeExperienceEditor';
import { useParams } from "react-router";


interface ResumeEditorPageProps {
    className?: string;
}

type ResumeEditorSteps = 'personal' | 'contacts' | 'experience';

const ResumeEditorPage = ({ className }: ResumeEditorPageProps) => {
    const { step } = useParams<{step: ResumeEditorSteps}>();
    return(
        <Page>
            <div className={ classNames(cls.ResumeEditorPage, {}, [className]) }>
                {  step === 'personal' && <ResumePersonalEditor />}
                {  step === 'contacts' && <ResumeContactsEditor />}
                {  step === 'experience' && <ResumeExperienceEditor />}
            </div>
        </Page>
    );
};

export default ResumeEditorPage;