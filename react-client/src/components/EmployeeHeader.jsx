import React from 'react';

const EmployeeHeader = ({filters, setFilters, onClick}) => {

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        console.log(filters);
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    return (
        <div className="flex justify-between mb-4">
            <button
                className="py-2 px-4 bg-green-500 text-white rounded"
                onClick={onClick}
            >
                Hire Employee
            </button>
            <div className="flex space-x-4">
                <input
                    type="number"
                    name="departmentId"
                    placeholder="Department ID"
                    value={filters.departmentId}
                    onChange={handleFilterChange}
                    className="p-2 border border-gray-300 rounded"
                />
                <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    className="p-2 border border-gray-300 rounded"
                />
                <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    className="p-2 border border-gray-300 rounded"
                />
            </div>
        </div>
    );
};

export default EmployeeHeader;