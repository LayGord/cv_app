import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getResumeCurrentId, getResumeDraft, Resume, updateResume } from "entities/Resume";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { ReactComponent as SaveIcon } from 'shared/assets/icons/content-save-outline.svg';
import { ReactComponent as SaveIconSuccess } from 'shared/assets/icons/content-save-check-outline.svg';
import { ReactComponent as DocumentIcon } from 'shared/assets/icons/document.svg';
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ResumeSaveBtn.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { AppRoutes } from "shared/config/router/paths";


interface ResumeSaveBtnProps {
    className?: string;
    previewGenerateCb?: (data: Resume) => Promise<string>
}

export const ResumeSaveBtn = ({ className, previewGenerateCb }: ResumeSaveBtnProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const currentResumeId = useSelector(getResumeCurrentId);
    const resumeDraft = useSelector(getResumeDraft);

    const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const [isSaved, setIsSaved] = useState(false);

    const onSave = useCallback(async () => {
        const updatedAt = new Date().toISOString();

        const prevImg = await previewGenerateCb?.(resumeDraft);
        
        dispatch(updateResume({...resumeDraft, updatedAt, prevImg}))

        setIsSaved(true);
        timerRef.current = setTimeout(() => setIsSaved(false), 2000)
    }, [dispatch, resumeDraft, previewGenerateCb])

    const onPreview = useCallback(() => {
        navigate(`${resumeDraft.id}/${AppRoutes.PREVIEW}`)
    }, [navigate, resumeDraft.id]);

    const updAt =  t('lastUpdate', { 
        updatedAt: resumeDraft.updatedAt 
            ? new Date(resumeDraft.updatedAt).toLocaleString().replace(', ', ' ')
            : new Date(resumeDraft.createdAt).toLocaleString().replace(', ', ' '), 
        keyPrefix: 'ResumeSaveBtn' 
    });

    useEffect(() => () => clearTimeout(timerRef.current), [])

    return (
        <div className={ classNames(cls.ResumeSaveBtn, {}, [className]) }>
            { currentResumeId
                ? 
                <>
                    {/* <Button
                        theme={ButtonTheme.CLEAR}
                        onClick={onSave}
                    >
                        { isSaved 
                            ? <SaveIconSuccess />
                            : <SaveIcon />
                        }
                    </Button> */}
                    <div className={cls.resumeControls}>
                        <div className={cls.resumeInfo}>
                            <div className={cls.resumeTitle}>{ resumeDraft.title }</div>
                            <div className={cls.resumeUpdAt}>{ updAt }</div>
                        </div>
                        
                        <Button
                            theme={ButtonTheme.CLEAR}
                            onClick={onSave}
                        >
                            { isSaved 
                                ? <SaveIconSuccess />
                                : <SaveIcon />
                            }
                        </Button>
                        <Button
                            theme={ButtonTheme.CLEAR}
                            onClick={onPreview}
                        >
                            <DocumentIcon />
                        </Button>
                    </div>
                </>

                : <div></div>
            }
        </div>
    );
};
