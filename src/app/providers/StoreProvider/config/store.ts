import { StateSchema } from "./StateSchema";
import { resumeReducer } from 'entities/Resume';
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { userReducer } from "entities/User";


export function createReduxStore(initialState?: StateSchema) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
        resume: resumeReducer,
    };

    const store = configureStore({
        reducer: rootReducers,
        preloadedState: initialState,
    });

    return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];