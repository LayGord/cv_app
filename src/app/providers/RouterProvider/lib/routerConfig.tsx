import { MainPage } from "pages/MainPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { PreviewPage } from "pages/PreviewPage/ui/PreviewPage";
import { ResumeEditorPage } from "pages/ResumeEditorPage";
import { RouteProps } from "react-router";
import { AppRoutes, RouterPaths } from "shared/config/router/paths";


export type AppRouteProps = RouteProps & { };

export const routerConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.MAIN]: {
        path: RouterPaths.main,
        element: <MainPage />,
    },
    [AppRoutes.EDITOR]: {
        path: `${RouterPaths.editor}`,
        element: <ResumeEditorPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RouterPaths.not_found,
        element: <NotFoundPage />
    },
    [AppRoutes.PREVIEW]: {
        path: RouterPaths.preview,
        element: <PreviewPage />
    },
}
