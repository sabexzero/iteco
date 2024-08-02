import React, { useState, useEffect } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';

const EmployeePage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        const handleOpenForm = () => setIsFormOpen(true);
        window.addEventListener('open-form', handleOpenForm);

        return () => {
            window.removeEventListener('open-form', handleOpenForm);
        };
    }, []);

    return (
        <div className="p-6">
            {/* Reminder Banner */}
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
                <h2 className="text-lg font-semibold">Reminder:</h2>
                <p className="mt-1">
                    1. In order for the date filter to work,
                </p>
                <p className="mt-1">
                    2 input fields must be filled in, on the left the start date, on the right the end date.
                </p>
            </div>
            <h1 className="text-2xl font-bold mb-6">Employee Management</h1>
            <EmployeeList />
            <EmployeeForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        </div>
    );
};

export default EmployeePage;
