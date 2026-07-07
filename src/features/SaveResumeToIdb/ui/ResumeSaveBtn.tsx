import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getResumeCurrentId, getResumeDraft, Resume, updateResume } from "entities/Resume";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { ReactComponent as SaveIcon } from 'shared/assets/icons/content-save-outline.svg';
import { ReactComponent as SaveIconSuccess } from 'shared/assets/icons/content-save-check-outline.svg';
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ResumeSaveBtn.module.scss";


interface ResumeSaveBtnProps {
    className?: string;
    previewGenerateCb?: (data: Resume) => Promise<string>
}

export const ResumeSaveBtn = ({ className, previewGenerateCb }: ResumeSaveBtnProps) => {
    const dispatch = useAppDispatch();

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

    useEffect(() => () => clearTimeout(timerRef.current), [])

    return (
        <div className={ classNames(cls.ResumeSaveBtn, {}, [className]) }>
            { currentResumeId
                ? 
                <Button
                    theme={ButtonTheme.CLEAR}
                    onClick={onSave}
                >
                    { isSaved 
                        ? <SaveIconSuccess />
                        : <SaveIcon />
                    }
                </Button>
                : <div></div>
            }
        </div>
    );
};
