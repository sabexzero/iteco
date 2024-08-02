import React from 'react';
import {Link, useLocation} from "react-router-dom";

const PageHeader = () => {
    const navigate = useLocation();

    return (
        <header style={{padding: '20px', textAlign: 'center'}}>
            <div className="flex flex-row gap-2 justify-center">
                <Link
                    to='departments'
                    className={`px-2 py-4 cursor-pointer rounded-[4px] text-white 
                        ${navigate.pathname === '/departments' ? 'bg-[#007bff]' : 'bg-[#6c757d]'}`}
                >
                    Manage Departments
                </Link>
                <Link
                    to='employees'
                    className={`px-2 py-4 cursor-pointer rounded-[4px] text-white 
                        ${navigate.pathname === '/employees' ? 'bg-[#007bff]' : 'bg-[#6c757d]'}`}
                >
                    Manage Employees
                </Link>
            </div>
        </header>
    );
};

export default PageHeader;