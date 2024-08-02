import React from 'react';
import ModalWrapper from "./ModalWrapper";
import {useDispatch, useSelector} from "react-redux";
import {setModalOpen} from "../../store/departmentTreeSlice";
import {deleteDepartmentById, getAllDepartments} from "../../api/requests";

const NodeOnClickModal = (
    {
        employeesAmount,
        modalNodeData,
        setNodes,
        setEdges,
    }
) => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.departmentTree.isModalOpen);

    const getDescendants = (nodeId, nodes) => {
        const descendants = [];
        const queue = [nodeId];

        while (queue.length > 0) {
            const currentId = queue.shift();
            const childNodes = nodes.filter(node => node.parent === currentId);
            descendants.push(...childNodes);
            queue.push(...childNodes.map(child => child.id));
        }

        return descendants;
    };

    const handleDeleteNode = async (nodeId) => {
        try {
            await deleteDepartmentById(nodeId);

            const allNodes = await getAllDepartments() // Assume this returns the full list of nodes
            const descendants = getDescendants(nodeId, allNodes);
            const allNodeIds = [nodeId, ...descendants.map(node => node.id)];

            // Update state to remove the nodes
            setNodes(nds => nds.filter(node => !allNodeIds.includes(node.id)));
            setEdges(eds => eds.filter(edge => !allNodeIds.includes(edge.source) && !allNodeIds.includes(edge.target)));

            dispatch(setModalOpen(false));
        } catch (error) {
            console.error('Error deleting node:', error);
        }
    };

    return (
        <ModalWrapper
            isOpen={isOpen}
            onRequestClose={() => dispatch(setModalOpen(false))}
            contentLabel="Node Details"
        >
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <div>
                    <p className="mb-2"><strong>Name:</strong> {modalNodeData.data.name}</p>
                    <p className="mb-2"><strong>Number of employees:</strong> {employeesAmount}</p>
                    <div className="flex flex-row justify-end">
                        <button
                            onClick={() => handleDeleteNode(modalNodeData.id)}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default NodeOnClickModal;