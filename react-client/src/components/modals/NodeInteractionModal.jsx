import React from 'react';
import NodeOnClickModal from "./NodeOnClickModal";
import CreateNewNodeModal from "./CreateNewNodeModal";
import {useSelector} from "react-redux";

const NodeInteractionModal = (
    {
        setEdges,
        setNodes,
        parentId,
        employeesAmount
    }
) => {

    const modalNodeData = useSelector((state) => state.departmentTree.modalNodeData);

    return (
        <>
            {modalNodeData ?
                <NodeOnClickModal
                    employeesAmount={employeesAmount}
                    modalNodeData={modalNodeData}
                    setNodes={setNodes}
                    setEdges={setEdges}
                /> :
                <CreateNewNodeModal
                    setNodes={setNodes}
                    setEdges={setEdges}
                    parentId={parentId}
                />
            }
        </>
    );
};

export default NodeInteractionModal;