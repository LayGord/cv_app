import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ResumeSaveBtn.module.scss";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { ReactComponent as SaveIcon } from 'shared/assets/icons/content-save-outline.svg';
import { ReactComponent as SaveIconSuccess } from 'shared/assets/icons/content-save-check-outline.svg';
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { getResumeCurrentId, getResumeDraft, updateResume } from "entities/Resume";
import { useSelector } from "react-redux";
import { useCallback, useRef, useState } from "react";

interface ResumeSaveBtnProps {
    className?: string;
}

export const ResumeSaveBtn = ({ className }: ResumeSaveBtnProps) => {
    const dispatch = useAppDispatch();

    const currentResumeId = useSelector(getResumeCurrentId);
    const resumeDraft = useSelector(getResumeDraft);

    const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const [isSaved, setIsSaved] = useState(false);

    const onSave = useCallback(() => {
        const updatedAt = new Date().toISOString()
        dispatch(updateResume({...resumeDraft, updatedAt}))

        setIsSaved(true);
        timerRef.current = setTimeout(() => setIsSaved(false), 2000)
    }, [dispatch, resumeDraft])


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
