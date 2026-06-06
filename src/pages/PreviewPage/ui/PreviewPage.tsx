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
        links: [
            { id: '1', title: 'Telegram', link: '@**********'},
        ],
        preferred: 'email'
    },
    objective: {
        readyToRelocate: true,
        readyToBTrip: false,
        format: 'any',
        positions: [{ id: '1', name: 'Trainee'}, { id: '1', name: 'Engineer'}],
        typeOfEmpl: [{id: '1', displayName: 'Fulltime', value: 'fulltime'}],
        currency: 'RUB',
        salary: '200 000'
    },
    aboutMe: `Test automation engineer (QA Automation) with over 4 years of experience.
        I specialize in Python and building robust frameworks from scratch.
        I'm skilled at reducing regression testing time and building CI/CD processes.
        I'm focused on improving product stability in rapidly growing teams.`,
    education: [
        { 
            id: '1',
            program: '02.03.01 Math and Computer sciences',
            org: 'Kuban State University',
            faculty: 'Math and Computer sciences', 
            grade: 'bachelor', 
            dateFrom: '2019-08-08',
            dateTo: '2023-08-07',
            city: 'Somecity'
        },
        { 
            id: '2',
            program: '02.04.01 Math and Computer sciences',
            org: 'Kuban State University',
            faculty: 'Math and Computer sciences', 
            grade: 'master', 
            dateFrom: '2023-07-10',
            city: 'Somecity'
        }
    ],
    jobs: [
        {
            id: '1',
            company: 'SomeCompany LLC',
            dateFrom: '2023-08-07',
            dateTo: '2024-06-07',
            location: 'SomeCity',
            position: 'Junior QA automation',
            comment: 'Build a testing framework from scratch',
        },
        {
            id: '2',
            company: 'AnotherCompany Ltd.',
            dateFrom: '2024-07-01',
            dateTo: undefined,
            location: 'SomeCity2',
            position: 'Middle QA automation',
            comment: 'Build a e2e test pipeline for web-application',
        }
    ],
    langs: [{ id: '1', language: 'English', level: 'b2'}, {id: '2', language: 'Russian', level: 'c2'}],
    projects: [
        // eslint-disable-next-line max-len
        {id: '1', title: `CV generator App`, description: `Small and easy to use web app for making cv writing process as easy as possible`, link: 'https://github.com/LayGord/cv_app'},
        // eslint-disable-next-line max-len
        {id: '2', title: `Blog app`, description: `Comfortable forum, where you can read articles for lots of categories, or write your own`, link: 'https://github.com/LayGord/production-project'}
    ],
    skills: [
        {id: '1', displayName: 'React'},
        {id: '2', displayName: 'Webpack/Vite'},
        {id: '3', displayName: 'Node.js'},
        {id: '4', displayName: 'Typescript'},
        {id: '5', displayName: 'Jest'},
        {id: '6', displayName: 'Storybook / screenshot testing'},
        {id: '1', displayName: 'HTML/CSS'},
        {id: '2', displayName: 'Styled components'},
        {id: '3', displayName: 'ReduxToolkit'},
        {id: '4', displayName: 'RTK Querry'},
        {id: '5', displayName: 'Next.js'},
        {id: '6', displayName: 'System design'},
    ]
}

export const PreviewPage = ({ className }: PreviewPageProps) => {
    const resumeData = useSelector(getResume);
    return (
        <Page >
            <div className={ classNames(cls.PreviewPage, {}, [className]) }>
                <PDFViewer style={{ width: '100%', height: '100%' }}>
                    <ResumePdfTemplate data={resume}/>
                </PDFViewer>
            </div>
        </Page>
    );
};
