import { useTranslation } from "react-i18next";
import { ReactComponent as ChevronRight } from 'shared/assets/icons/chevron-right.svg';
import { ReactComponent as ChevronLeft } from 'shared/assets/icons/chevron-left.svg';
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "../Button/Button";
import { AppLink, AppLinkTheme } from "../AppLink/AppLink";
import cls from "./NavButtons.module.scss";


interface NavButtonsProps {
    className?: string;
    prev?: string;
    next?: string;
    onSwitchStep: (step: string) => void;
    lastLink?: string;
}

export const NavButtons = (props: NavButtonsProps) => {
    const {
        className,
        prev,
        next,
        onSwitchStep,
        lastLink,
    } = props;

    const { t } = useTranslation();


    const onNext = () => onSwitchStep(next || '');
    const onPrev = () => onSwitchStep(prev || '');

    return (
        <div className={ classNames(cls.NavButtons, {}, [className]) }>
            { prev && 
                <Button
                    className={cls.prev}
                    onClick={onPrev}
                    theme={ButtonTheme.CLEAR}
                >
                    <ChevronLeft />
                    <span>{t('NavButtons.previous')}</span>
                </Button>
            }
            { next && 
                <Button
                    className={cls.next}
                    onClick={onNext}
                    theme={ButtonTheme.CLEAR}
                >
                    <span>{t('NavButtons.next')}</span>
                    <ChevronRight />
                </Button>
            }
            { !next && lastLink &&
                <AppLink 
                    to={lastLink}
                    className={cls.preview}
                    theme={AppLinkTheme.CLEAR}
                >
                    <span>{t('NavButtons.preview')}</span>
                    <ChevronRight />
                </AppLink>
            }
        </div>
    );
};
