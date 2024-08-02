import React from 'react';
import DepartmentTree from '../components/DepartmentTree';

const DepartmentPage = () => {
    return (
        <div className="p-6">
            {/* Reminder Banner */}
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
                <h2 className="text-lg font-semibold">Reminder:</h2>
                <p className="mt-1">1. To create a root node, use the "Create Root Node" button.</p>
                <p className="mt-1">2. To create a child node, make a connection from the "parent" node and swipe to any place on the panel.</p>
            </div>

            {/* Department Tree */}
            <DepartmentTree />
        </div>
    );
};
export default DepartmentPage;