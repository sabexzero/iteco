package org.vkuksatech.itecotask.service.employee;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.vkuksatech.itecotask.domain.employee.Employee;
import org.vkuksatech.itecotask.web.requests.employee.EmployeeHireRequest;
import org.vkuksatech.itecotask.web.requests.employee.EmployeeTransferRequest;

import java.time.LocalDate;
import java.util.Collection;

public interface EmployeeService {
    void hire(EmployeeHireRequest request);
    void dismiss(Long employeeId);

    /**
     * Returns the employee to work,
     * the department remains the same where the employee was last.
     */
    void rehire(Long employeeId);

    /**
     * Transfers an employee to another department.
     */
    void transfer(EmployeeTransferRequest request);

    /**
     * @return All employees of the department.
     */
    Page<Employee> findAll(Long departmentId, Pageable pageable);

    /**
     * @return All employees of the department, starting from a certain date.
     */
    Page<Employee> findAllByDate(
            Long departmentId,
            LocalDate startDate,
            LocalDate endDate,
            Pageable pageable
    );

    /**
     * @return All employees of the company.
     */
    Page<Employee> findAll(Pageable pageable);

    /**
     * @return All employees of the company, starting from a certain date.
     */
    Page<Employee> findAllByDate(
            Pageable pageable,
            LocalDate startDate,
            LocalDate endDate
    );

    Employee find(Long employeeId);
}
