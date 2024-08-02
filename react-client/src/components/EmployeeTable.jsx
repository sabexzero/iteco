import React from 'react';
import axios from "axios";

const EmployeeTable = ({employees, setEmployees, fetchEmployees, openTransferModal}) => {
    const handleDismiss = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/employees?employeeId=${id}`);
            setEmployees(employees.filter(emp => emp.id !== id));
            fetchEmployees();
        } catch (error) {
            console.error('Error fetching employee count: ', error);
        }
    };

    const handleRehire = async (id) => {
        try {
            await axios.put(`http://localhost:8081/employees/rehire?employeeId=${id}`);
            fetchEmployees();
        } catch (error) {
            console.error('Failed to rehire employee: ', error.message);
        }
    };

    const activeEmployees = employees.filter(emp => !emp.firedAt);
    const dismissedEmployees = employees.filter(emp => emp.firedAt).sort((a, b) => new Date(a.firedAt) - new Date(b.firedAt));


    return (
        <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
            <tr className="w-full bg-gray-100 border-b border-gray-300">
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Surname</th>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Patronymic</th>
                <th className="text-left p-4">Department ID</th>
                <th className="text-left p-4">Hired At</th>
                <th className="text-left p-4">Fired At</th>
                <th className="text-left p-4">Actions</th>
            </tr>
            </thead>
            <tbody>
            {activeEmployees.map(emp => (
                <tr key={emp.id} className="border-b border-gray-300">
                    <td className="p-4">{emp.id}</td>
                    <td className="p-4">{emp.surname}</td>
                    <td className="p-4">{emp.name}</td>
                    <td className="p-4">{emp.patronymic}</td>
                    <td className="p-4">{emp.departmentId}</td>
                    <td className="p-4">{emp.hiredAt}</td>
                    <td className="p-4">{emp.firedAt ? emp.firedAt : '-'}</td>
                    <td className="p-4 space-x-2">
                        <button
                            className="py-1 px-3 bg-red-500 text-white rounded"
                            onClick={() => {handleDismiss(emp.id)}}
                        >
                            Dismiss
                        </button>
                        <button
                            className="py-1 px-3 bg-yellow-500 text-white rounded"
                            onClick={() => openTransferModal(emp)}
                        >
                            Transfer
                        </button>
                    </td>
                </tr>
            ))}
            {dismissedEmployees.map(emp => (
                <tr key={emp.id} className="border-b border-gray-300 bg-red-500 text-white">
                    <td className="p-4">{emp.id}</td>
                    <td className="p-4">{emp.surname}</td>
                    <td className="p-4">{emp.name}</td>
                    <td className="p-4">{emp.patronymic}</td>
                    <td className="p-4">{emp.departmentId}</td>
                    <td className="p-4">{emp.hiredAt}</td>
                    <td className="p-4">{emp.firedAt}</td>
                    <td className="p-4 space-x-2">
                        <button
                            className="py-1 px-3 bg-green-500 text-white rounded"
                            onClick={() => handleRehire(emp.id)}
                        >
                            Rehire
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default EmployeeTable;