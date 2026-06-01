import { classNames } from "shared/lib/classNames/classNames";
import cls from "./PreviewPage.module.scss";
import { PDFViewer } from "@react-pdf/renderer";

import { Page } from "widgets/Page";
import { ResumePdfTemplate } from "features/RenderResumeToPdf";
import { useSelector } from "react-redux";
import { getResume } from "entities/Resume/model/selectors/getResume";
import { Resume } from "entities/Resume";

interface PreviewPageProps {
    className?: string;
}


const resume: Resume = {
    id: '1',
    personal: {
        lastname: 'Lastname',
        firstname: 'Firstname',
        patronymic: 'Patronymic',
        sex: 'male',
        birthdate: '2026-05-01',
        city: 'Somecity',
        country: 'Russia',
        citizenship: 'Russia',
        photo: '',
    },
    contacts: {
        phone: '+7 900 99 99 99',
        email: 'example@mail.com',
        links: [],
        preferred: 'email'
    },
    objective: {
        readyToRelocate: true,
        readyToBTrip: false,
        format: 'any',
        positions: [{ id: '1', name: 'Trainee'}],
        typeOfEmpl: [{id: '1', displayName: 'Fulltime', value: 'fulltime'}]
    },
    experience: {
        education: [],
        jobs: [],
        langs: [],
        projects: [],
        skills: []
    },
}

export const PreviewPage = ({ className }: PreviewPageProps) => {
    const resumeData = useSelector(getResume);
    return (
        <Page >
            <div className={ classNames(cls.PreviewPage, {}, [className]) }>
                <PDFViewer style={{ width: '100%', height: '100%' }}>
                    <ResumePdfTemplate data={resumeData}/>
                </PDFViewer>
            </div>
        </Page>
    );
};
