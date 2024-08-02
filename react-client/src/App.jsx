import React from 'react';
import DepartmentPage from './pages/DepartmentPage';
import EmployeePage from './pages/EmployeePage';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import PageHeader from "./components/modals/PageHeader";

const App = () => {
    return (
        <Router>
            <PageHeader/>
            <Routes>
                <Route
                    path="/departments"
                    element={<DepartmentPage/>}
                />
                <Route
                    path='/employees'
                    element={<EmployeePage/>}
                />
                <Route
                    path="*"
                    element={<Navigate to="/departments"/>}
                />
            </Routes>
        </Router>
    );
};

export default App;
