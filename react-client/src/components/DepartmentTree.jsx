import React, {useCallback, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
    ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Modal from 'react-modal';
import CustomNode from './CustomNode';
import 'react-datepicker/dist/react-datepicker.css';
import {getDepartmentsByDate} from "../api/requests";
import RootNodeModal from "./modals/RootNodeModal";
import {useDispatch} from "react-redux";
import {setModalNodeData, setModalOpen, setNodePosition, setRootNodeModal} from "../store/departmentTreeSlice";
import NodeInteractionModal from "./modals/NodeInteractionModal";
import Header from "./Header";
import {buildHierarchy, getGlOffset} from "../lib/utils";

const nodeTypes = {
    custom: CustomNode,
};

Modal.setAppElement('#root');

const DepartmentTreeBody = () => {
    const dispatch = useDispatch();
    const connectingNodeId = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const {screenToFlowPosition} = useReactFlow();
    const [employeesAmount, setEmployeesAmount] = useState(0)
    const [date, setDate] = useState(new Date());

    const fetchData = useCallback((date) => {
        const isoString = date.toISOString(); // Получаем строку в формате ISO
        const isoDate = new Date(isoString);
        isoDate.setHours(isoDate.getHours() + 3); //UTC+3
        const updatedIsoString = isoDate.toISOString().split('T')[0];

        getDepartmentsByDate(updatedIsoString).then((response) => {
            const {nodes, edges} = buildHierarchy(response);
            setNodes(nodes);
            setEdges(edges);
            getGlOffset([...nodes]);
        });
    }, [setNodes, setEdges]);

    useEffect(() => {
        fetchData(date);
    }, [fetchData, date]);

    const onConnect = useCallback((params) => {
        connectingNodeId.current = null;
        setEdges((eds) => addEdge(params, eds));
    }, []);

    const onConnectStart = useCallback((_, {nodeId}) => {
        connectingNodeId.current = nodeId;
    }, []);

    const onConnectEnd = useCallback(
        (event) => {
            if (!connectingNodeId.current) return;

            const targetIsPane = event.target.classList.contains('react-flow__pane');

            if (targetIsPane) {
                const id = -1;
                const position = screenToFlowPosition({
                    x: event.clientX,
                    y: event.clientY,
                });

                dispatch(setNodePosition(position));
                dispatch(setModalNodeData(null));
                dispatch(setModalOpen(true));
            }
        },
        [screenToFlowPosition]
    );

    const onNodeClick = useCallback((event, node) => {
        dispatch(setModalNodeData(node));
        dispatch(setModalOpen(true));
        getEmployeesCount(node.id)
    }, []);


    const getEmployeesCount = async (departmentId) => {
        try {
            const response = await axios.get(`http://localhost:8081/employees?departmentId=${departmentId}`);
            const data = response.data;
            setEmployeesAmount(data.totalElements);
        } catch (error) {
            console.error('Error fetching employee count:', error);
            throw error;
        }
    }

    return (
        <div className="flex flex-col h-[60vh]">
            <Header date={date} setDate={setDate} />

            <div className="flex-1 relative border-4 border-blue-500">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onConnectStart={onConnectStart}
                    onConnectEnd={onConnectEnd}
                    onNodeClick={onNodeClick}
                    nodeTypes={nodeTypes}
                    fitView
                    className="bg-gray-100"
                />
            </div>

            <NodeInteractionModal
                setNodes={setNodes}
                setEdges={setEdges}
                parentId={connectingNodeId.current}
                employeesAmount={employeesAmount}
            />

            <RootNodeModal setNodes={setNodes} />
        </div>
    );
};


const DepartmentTree = () => (
    <ReactFlowProvider>
        <DepartmentTreeBody />
    </ReactFlowProvider>
);

export default DepartmentTree;
