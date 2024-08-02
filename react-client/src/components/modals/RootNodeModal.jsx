import React from 'react';
import ModalWrapper from "./ModalWrapper";
import {createNewNode} from "../../api/requests";
import {useDispatch, useSelector} from "react-redux";
import {setRootNodeModal} from "../../store/departmentTreeSlice";

const RootNodeModal = ({setNodes}) => {
    const dispatch = useDispatch();
    const [nodeTitle, setNodeTitle] = React.useState("");
    const isOpen = useSelector((state) => state.departmentTree.isRootNodeModalOpen);

    const handleAddRootNode = () => {
        createNewNode(nodeTitle)
            .then((response) => {

                const newNode = {
                    id: response.id.toString(),
                    position: {x: -20, y: 0},
                    type: 'custom',
                    data: {name: response.name},
                    origin: [0.5, 0.0],
                };

                setNodes((nds) => nds.concat(newNode));
            })
            .catch((error) => {
                console.error('Error creating root node:', error);
            });

        setNodeTitle('');
        dispatch(setRootNodeModal(false))
    };

    return (
        <ModalWrapper
            isOpen={isOpen}
            onRequestClose={() => dispatch(setRootNodeModal(false))}
            contentLabel="Add Root Node"
        >
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-semibold mb-4">New root department</h2>
                <input
                    type="text"
                    placeholder="Department Name"
                    value={nodeTitle}
                    onChange={(e) => setNodeTitle(e.target.value)}
                    className="border border-gray-300 rounded p-2 mb-4 w-full"
                />
                <div className="flex flex-row justify-center gap-2">
                    <button
                        className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                        onClick={handleAddRootNode}
                    >
                        Add
                    </button>
                    <button
                        className="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                        onClick={() => dispatch(setRootNodeModal(false))}
                    >
                        Close
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default RootNodeModal;