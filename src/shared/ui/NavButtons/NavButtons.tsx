import { useTranslation } from "react-i18next";
import { ReactComponent as ChevronRight } from 'shared/assets/icons/chevron-right.svg';
import { ReactComponent as ChevronLeft } from 'shared/assets/icons/chevron-left.svg';
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "../Button/Button";
import cls from "./NavButtons.module.scss";


interface NavButtonsProps {
  className?: string;
  hasPrev?: boolean;
  hasNext?: boolean;
  onPrev?: () => void | Promise<void>;
  onNext?: () => void | Promise<void>;
  onFinish?: () => void | Promise<void>;
}

export const NavButtons = (props: NavButtonsProps) => {
    const {
        className,
        hasPrev,
        hasNext,
        onPrev,
        onNext,
        onFinish,
    } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames(cls.NavButtons, {}, [className])}>
            {hasPrev && (
                <Button
                    className={cls.prev}
                    onClick={onPrev}
                    theme={ButtonTheme.CLEAR}
                >
                    <ChevronLeft />
                    <span>{t("NavButtons.previous")}</span>
                </Button>
            )}

            {hasNext && (
                <Button
                    className={cls.next}
                    onClick={onNext}
                    theme={ButtonTheme.CLEAR}
                >
                    <span>{t("NavButtons.next")}</span>
                    <ChevronRight />
                </Button>
            )}

            {!hasNext && onFinish && (
                <Button
                    className={cls.preview}
                    onClick={onFinish}
                    theme={ButtonTheme.CLEAR}
                >
                    <span>{t("NavButtons.preview")}</span>
                    <ChevronRight />
                </Button>
            )}
        </div>
    );
};