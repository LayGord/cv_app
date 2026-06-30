export enum AppRoutes {
    MAIN = 'main',
    EDITOR = 'editor',
    NOT_FOUND = 'not_found',
    PREVIEW = 'preview'
};

export const RouterPaths: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.EDITOR]: '/:id/edit',
    [AppRoutes.NOT_FOUND]: '*',
    [AppRoutes.PREVIEW]: '/:id/preview'
};
