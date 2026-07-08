import { Page } from "widgets/Page";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./MainPage.module.scss";
import { useEffect } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { deleteResumeById, fetchResumeIds, getResumeIds, getResumeIdsStatus, Resume, resumeActions, updateResume } from "entities/Resume";
import { ResumeList } from "widgets/ResumeList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { generateResumePreviewUrl } from "features/RenderResumeToPdf";


interface MainPageProps {
    className?: string;
}


const resumeTemplate: Resume = {
    id: '',
    title: 'New resume',
    personal: {
        firstname: '',
        lastname: '',
        patronymic: undefined,
        birthdate: undefined,
        photo: undefined,
        sex: 'male',
        citizenship: '',
        country: '',
        city: '',
    },
    contacts: {
        email: 'example@mail.com',
        phone: undefined,
        links: [{id: '1', title: 'Telegram', link: ''}],
        preferred: 'email',
    },
    objective: {
        positions: [{id: '1', name: ''}],
        typeOfEmpl: [],
        format: 'any',
        readyToRelocate: false,
        readyToBTrip: false,
        currency: 'USD'
    },
    aboutMe: '',
    skills: [],
    jobs: [{id: '1', company: '', position: '', dateFrom: ''}],
    projects: [{id: '1', title: '', link: '', description: ''}],
    education: [{id: '1', org: '', grade: 'bachelor', faculty: '', program: '', dateFrom: '', city: ''}],
    langs: [{id: '1', language: '',  level: 'a1'}],
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
    },
    createdAt: '',
};

const MainPage = ({ className }: MainPageProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const resumeIds = useSelector(getResumeIds);
    const resumeIdsStatus = useSelector(getResumeIdsStatus);

    const onAddNew = async () => {
        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();

        const resumeDraft: Resume = { 
            ...resumeTemplate,
            id: id,
            createdAt: createdAt,
            updatedAt: createdAt,
        }
        
        resumeDraft.prevImg = await generateResumePreviewUrl(resumeDraft)

        dispatch(updateResume(resumeDraft))
    }

    const onDelete = (id: string) => {
        dispatch(deleteResumeById(id))
    };

    const onOpen = (id: string) => {
        navigate(`/${id}/edit?step=personal`);
    }


    useEffect(() => {
        dispatch(fetchResumeIds());
        dispatch(resumeActions.setCurrentId())
    }, [dispatch])

    return (
        <Page>
            <div className={ classNames(cls.MainPage, {}, [className]) }>
                <ResumeList
                    resumeIds={resumeIds || []}
                    resumeIdsStatus={resumeIdsStatus}
                    onAddNew={onAddNew}
                    onOpen={onOpen}
                    onDelete={onDelete}
                />
            </div>
        </Page>
    );
};

export default MainPage;