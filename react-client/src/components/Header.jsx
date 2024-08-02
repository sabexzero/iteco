import React from 'react';
import DatePicker from "react-datepicker";
import {setRootNodeModal} from "../store/departmentTreeSlice";
import {useDispatch} from "react-redux";

const Header = ({date, setDate}) => {
    const dispatch = useDispatch();

    const formDate = (date) => {
        const d = date.toDateString().split(' ');
        d.splice(0, 1)
        return d.join(' ');
    }

    return (
        <header className="bg-blue-500 p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Department Management</h1>
            <div className="flex space-x-4 text-black">
                <button
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                    onClick={() => dispatch(setRootNodeModal(true))}
                >
                    New root department
                </button>
                <DatePicker
                    onChange={setDate}
                    value={formDate(date)}
                    className="border border-gray-300 rounded p-2 text-black background-green"
                    format="y-MM-dd"
                />
            </div>
        </header>
    );
};

export default Header;