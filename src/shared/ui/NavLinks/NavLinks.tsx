import { classNames } from "shared/lib/classNames/classNames";
import cls from "./NavLinks.module.scss";
import { AppLink, AppLinkTheme } from "../AppLink/AppLink";
import { ReactComponent as ChevronRight } from 'shared/assets/icons/chevron-right.svg';
import { ReactComponent as ChevronLeft } from 'shared/assets/icons/chevron-left.svg';
import { useTranslation } from "react-i18next";

interface NavLinksProps {
    className?: string;
    prev?: string;
    next?: string;
}

export const NavLinks = (props: NavLinksProps) => {
    const {
        className,
        prev,
        next,
    } = props;

    const { t } = useTranslation();

    return (
        <div className={ classNames(cls.NavLinks, {}, [className]) }>
            { prev && 
                <AppLink
                    className={cls.prev}
                    to={prev}
                    theme={AppLinkTheme.CLEAR}
                >
                    <ChevronLeft />
                    <span>{t('NavLinks.previous')}</span>
                </AppLink>
            }
            { next && 
                <AppLink
                    className={cls.next}
                    to={next}
                    theme={AppLinkTheme.CLEAR}
                >
                    <span>{t('NavLinks.next')}</span>
                    <ChevronRight />
                </AppLink>
            }
        </div>
    );
};
