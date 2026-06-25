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
import { useEffect, useLayoutEffect } from "react";

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
        typeOfEmpl: ['fulltime'],
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
    skills: [],
    valErrors: {
        personal: {},
        contacts: {},
        aboutMe: {},
        objective: {},
        skills: {},
        jobs: {},
        projects: {},
        education: {},
        languages: {}
    }
}

export const PreviewPage = ({ className }: PreviewPageProps) => {
    const { isLodaing, isValidating, resumeDraft } = useSelector(getResume);
    const valErrors = useSelector(getResumeErrors);
    const dispatch = useAppDispatch();

    console.log(valErrors)
    console.log(`is empty: ${isEmptyObj(valErrors)}`)

    useEffect(() => {
        dispatch(validateResumeData(resumeDraft))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])
    

    // eslint-disable-next-line react-hooks/exhaustive-deps

    return (
        <Page >
            <div className={ classNames(cls.PreviewPage, {}, [className]) }>
                { isValidating 
                    ? <PageLoader />
                    : isEmptyObj(valErrors) 
                        ?  <PreviewPdf resumeData={resumeDraft}/>
                        : <PreviewErrors />
                }   
            </div>
        </Page>
    );
};
