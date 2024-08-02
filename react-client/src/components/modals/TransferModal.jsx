import React, {useState} from 'react';
import axios from "axios";

const TransferModal = ({setIsTransferModalOpen, selectedEmployee, setSelectedEmployee, departments, fetchEmployees}) => {

    const [newDepartmentId, setNewDepartmentId] = useState();

    const handleTransfer = async () => {
        try {
            await axios.put('http://localhost:8081/employees', {
                employeeId: selectedEmployee.id,
                transferDepartmentId: newDepartmentId
            });
            setIsTransferModalOpen(false);
            setSelectedEmployee(null);
            fetchEmployees();
            alert('Employee transferred successfully');
        } catch (error) {
            alert('Failed to transfer employee: ' + error.message);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Transfer Employee</h2>
                <select
                    value={newDepartmentId}
                    onChange={(e) => setNewDepartmentId(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                >
                    <option value="">Select Department</option>
                    {departments
                        .filter(dep => dep.id !== selectedEmployee?.departmentId) // Exclude current department
                        .map(dep => (
                            <option key={dep.id} value={dep.id}>
                                {dep.id} - {dep.name}
                            </option>
                        ))}
                </select>
                <div className="flex justify-end space-x-2">
                    <button
                        className="py-2 px-4 bg-gray-500 text-white rounded"
                        onClick={() => setIsTransferModalOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="py-2 px-4 bg-blue-500 text-white rounded"
                        onClick={handleTransfer}
                    >
                        Transfer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransferModal;