import axiosInstance from "./axiosConfig";
import axios from "axios";

export const getDepartmentsByDate = async (updatedIsoString) => {
    const res = await axiosInstance.get(`http://localhost:8081/departments?date=${updatedIsoString}`);
    return res.data;
}

export const getAllDepartments = async () => {
    const res = await axios.get('http://localhost:8081/departments');
    return res.data;
}

export const deleteDepartmentById = async (nodeId) => {
    return axios.delete(`http://localhost:8081/departments?departmentId=${nodeId}`);
}

export const createNewNode = async (nodeTitle) => {
    const newNode = {
        name: nodeTitle || `Root Node`,
        parentId: null,
    };
    const res = await axiosInstance.post('http://localhost:8081/departments', newNode)
    return res.data;
}

export const createNodeNotRoot = async (nodeTitle, parentId) => {
    const newNode = {
        name: nodeTitle,
        parentId: parentId ? parseInt(parentId) : null,
    };

    const res = await axiosInstance.post('http://localhost:8081/departments', newNode);
    return res.data;
}

export const getEmployees = async () => {
    const res = await axios.get('http://localhost:8081/employees')
    return res.data.content;
}