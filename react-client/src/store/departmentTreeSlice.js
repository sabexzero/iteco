import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    nodePosition: {x: 0, y: 0},
    isRootNodeModalOpen: false,
    isModalOpen: false,
    modalNodeData: null,
}

const departmentTreeSlice = createSlice({
    name: 'departmentTree',
    initialState,
    reducers: {
        setNodePosition: (state, action) => {
            state.nodePosition = action.payload;
        },
        setRootNodeModal: (state, action) => {
            state.isRootNodeModalOpen = action.payload;
        },
        setModalOpen: (state, action) => {
            state.isModalOpen = action.payload;
        },
        setModalNodeData: (state, action) => {
            state.modalNodeData = action.payload;
        }
    }
});

export const {
    setNodePosition,
    setModalOpen,
    setRootNodeModal,
    setModalNodeData
} = departmentTreeSlice.actions;
export default departmentTreeSlice.reducer;