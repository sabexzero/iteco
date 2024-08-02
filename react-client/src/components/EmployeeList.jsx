import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import EmployeeHeader from "./EmployeeHeader";
import EmployeeTable from "./EmployeeTable";
import TransferModal from "./modals/TransferModal";
import {getEmployees} from "../api/requests";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [filters, setFilters] = useState({
        departmentId: '',
        startDate: '',
        endDate: ''
    });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const fetchEmployees = async () => {
        try {
            let employees = await getEmployees();
            if (filters.departmentId.length > 0) {
                employees = employees.filter((employee) => employee.departmentId === +filters.departmentId);
            }
            if (filters.startDate.length === 10) {
                const fDate = new Date(filters.startDate);
                employees = employees.filter((employee) => {
                    const eDate = new Date(employee.hiredAt);
                    return eDate >= fDate;
                });
            }
            if (filters.endDate.length === 10) {
                const fDate = new Date(filters.endDate);
                employees = employees.filter((employee) => {
                    const eDate = new Date(employee.hiredAt);
                    return eDate <= fDate;
                });
            }
            setEmployees(employees);
        } catch (error) {
            console.error('Failed to fetch employees:', error);
        }
    };

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:8081/departments');
            setDepartments(response.data);
        } catch (error) {
            console.error('Failed to fetch departments:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [filters]);

    const openTransferModal = (employee) => {
        setSelectedEmployee(employee);
        fetchDepartments();
        setIsTransferModalOpen(true);
    };

    return (
        <div className="p-6">
            <EmployeeHeader
                filters={filters}
                setFilters={setFilters}
                onClick={() => setIsFormOpen(true)}
            />
            <div className="overflow-x-auto">

            </div>
            {isFormOpen && (
                <EmployeeForm
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    onEmployeeAdded={() => fetchEmployees()}
                />
            )}
            <EmployeeTable
                employees={employees}
                setEmployees={setEmployees}
                fetchEmployees={fetchEmployees}
                openTransferModal={openTransferModal}
            />
            {isTransferModalOpen &&
                <TransferModal
                    selectedEmployee={selectedEmployee}
                    setSelectedEmployee={setSelectedEmployee}
                    departments={departments}
                    fetchEmployees={fetchEmployees}
                    setIsTransferModalOpen={setIsTransferModalOpen}
                />
            }
        </div>
    );
};

export default EmployeeList;
