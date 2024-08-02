import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Transition } from '@headlessui/react';

const EmployeeForm = ({ isOpen, onClose, onEmployeeAdded }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [departments, setDepartments] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8081/employees', 
                { 
                    name,
                    surname,
                    patronymic,
                    departmentId,  
                });
            alert('Employee hired successfully');
            onClose();
            onEmployeeAdded();
        } catch (error) {
            alert('Failed to hire employee: ' + error.message);
        }
    };

    const getDepartments = async () => {
        try {
          const response = await axios.get('http://localhost:8081/departments');
          return response.data; // Предположим, что data - это массив объектов { id, name }
        } catch (error) {
          console.error('Error fetching departments:', error);
          return [];
        }
      };

    useEffect(() => {
        const fetchDepartments = async () => {
            const data = await getDepartments();
            setDepartments(data);
        }
        fetchDepartments();
    }, []);
        

    return (
        <Transition show={isOpen}>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-xl font-bold mb-4">Hire Employee</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-2">Employee Surname:</label>
                            <input
                                type="text"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Employee Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Employee Patronymic:</label>
                            <input
                                type="text"
                                value={patronymic}
                                onChange={(e) => setPatronymic(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Department:</label>
                            <select
                                value={departmentId}
                                onChange={(e) => setDepartmentId(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Select a department</option>
                                {departments.map(department => (
                                <option key={department.id} value={department.id}>
                                    {department.id} - {department.name}
                                </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="mr-4 py-2 px-4 bg-gray-500 text-white rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="py-2 px-4 bg-blue-500 text-white rounded"
                            >
                                Hire Employee
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
    );
};

export default EmployeeForm;
