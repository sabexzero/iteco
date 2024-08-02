import {configureStore} from "@reduxjs/toolkit";
import departmentTreeReducer from './departmentTreeSlice';

export const store = configureStore({
    reducer: {
        departmentTree: departmentTreeReducer,
    }
});

