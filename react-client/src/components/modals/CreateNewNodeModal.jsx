import React, {useState} from 'react';
import ModalWrapper from "./ModalWrapper";
import {useDispatch, useSelector} from "react-redux";
import {setModalOpen} from "../../store/departmentTreeSlice";
import {createNodeNotRoot} from "../../api/requests";

const CreateNewNodeModal = (
    {
        setNodes,
        setEdges,
        parentId
    }
) => {
    const isOpen = useSelector((state) => state.departmentTree.isModalOpen);
    const dispatch = useDispatch();
    const [nodeTitle, setNodeTitle] = React.useState("");
    const [showError, setShowError] = useState(false);
    const nodePosition = useSelector((state) => state.departmentTree.nodePosition);

    const handleAddNode = () => {
        console.log(nodeTitle.length);
        if (nodeTitle.length > 0) {
            createNodeNotRoot(nodeTitle, parentId)
                .then((response) => {
                    const createdNodeId = response.id.toString();

                    const newNode = {
                        id: createdNodeId,
                        position: nodePosition,
                        type: 'custom',
                        data: {name: response.name},
                        origin: [0.5, 0.0],
                    };

                    setNodes((nds) => nds.concat(newNode));
                    setEdges((eds) =>
                        eds.concat({
                            id: `e${parentId}-${createdNodeId}`,
                            source: parentId,
                            target: createdNodeId,
                        })
                    );
                })
                .catch((error) => {
                    console.error('Error creating node:', error);
                });

            setNodeTitle('');
            dispatch(setModalOpen());
        } else {
            setShowError(true);
        }
    };

    return (
        <ModalWrapper
            isOpen={isOpen}
            onRequestClose={() => dispatch(setModalOpen())}
            contentLabel="Node Details"
        >

            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <div>
                    <h2 className="text-lg font-semibold mb-2">Add new department</h2>
                    <input
                        type="text"
                        value={nodeTitle}
                        onChange={(e) => setNodeTitle(e.target.value)}
                        placeholder="Department Name"
                        className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                    />
                    {showError && nodeTitle.length < 1 &&
                        <p className="text-[12px] text-red-700 mb-4">Название должно состоять хотя бы из 1 символа</p>
                    }
                    <button
                        onClick={handleAddNode}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Add
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default CreateNewNodeModal;