import { memo, Suspense, useCallback } from "react";
import { Route, Routes } from "react-router";
import { AppRouteProps, routerConfig } from "../lib/routerConfig";
import { PageLoader } from "widgets/PageLoader";


const AppRouter = () => {
    const renderRoute = useCallback((route: AppRouteProps) => {
        return (
            <Route
                path={route.path}
                element={route.element}
            />
        )
    }, []);

    return(
        <Suspense fallback={<PageLoader />}>
            <Routes>
                { Object.values(routerConfig).map(renderRoute)  }
            </Routes>
        </Suspense>
    );
};

export default memo(AppRouter);