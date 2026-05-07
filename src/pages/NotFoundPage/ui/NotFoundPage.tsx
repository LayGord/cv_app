import { classNames } from "shared/lib/classNames/classNames";
import cls from "./NotFoundPage.module.scss";
import { Page } from "widgets/Page";

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
    return(
        <Page>
            <div className={ classNames(cls.NotFoundPage, {}, [className]) }>
                {'Page not found :('}
            </div>
        </Page>
    );
};
