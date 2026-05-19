import { classNames } from "shared/lib/classNames/classNames";
import cls from "./NavLinks.module.scss";
import { AppLink, AppLinkTheme } from "../AppLink/AppLink";
import { ReactComponent as ChevronRight } from 'shared/assets/icons/chevron-right.svg';
import { ReactComponent as ChevronLeft } from 'shared/assets/icons/chevron-left.svg';

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

    return (
        <div className={ classNames(cls.NavLinks, {}, [className]) }>
            { prev && 
                <AppLink
                    className={cls.prev}
                    to={prev}
                    theme={AppLinkTheme.CLEAR}
                >
                    <ChevronLeft />
                    <span>Назад</span>
                </AppLink>
            }
            { next && 
                <AppLink
                    className={cls.next}
                    to={next}
                    theme={AppLinkTheme.CLEAR}
                >
                    <span>Далее</span>
                    <ChevronRight />
                </AppLink>
            }
        </div>
    );
};
