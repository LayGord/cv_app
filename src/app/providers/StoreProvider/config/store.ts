import { StateSchema } from "./StateSchema";
import { resumeReducer } from 'entities/Resume';
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'


export function createReduxStore(initialState?: StateSchema) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        resume: resumeReducer,
    };

    const store = configureStore({
        reducer: rootReducers,
        preloadedState: initialState,
    });

    return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];