import { Page } from "widgets/Page";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./MainPage.module.scss";


interface MainPageProps {
    className?: string;
}

const MainPage = ({ className }: MainPageProps) =>{
    return(
        <Page>
            <div className={ classNames(cls.MainPage, {}, [className]) }>
                This is Main Page
            </div>
        </Page>
    );
};

export default MainPage;