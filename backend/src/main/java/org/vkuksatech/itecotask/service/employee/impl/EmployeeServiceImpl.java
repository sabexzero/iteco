package org.vkuksatech.itecotask.service.employee.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.vkuksatech.itecotask.domain.employee.Employee;
import org.vkuksatech.itecotask.repository.employee.EmployeeRepository;
import org.vkuksatech.itecotask.service.employee.EmployeeService;
import org.vkuksatech.itecotask.web.requests.employee.EmployeeHireRequest;
import org.vkuksatech.itecotask.web.requests.employee.EmployeeTransferRequest;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;

    @Override
    public void hire(EmployeeHireRequest request) {
        employeeRepository.save(
                request.toDomain()
        );
    }

    @Override
    public void dismiss(Long employeeId) {
        employeeRepository.save(
                employeeRepository.findById(employeeId)
                        .orElseThrow()
                        .dismiss()
        );
    }

    @Override
    public void rehire(Long employeeId) {
        employeeRepository.save(
                employeeRepository.findById(employeeId)
                        .orElseThrow()
                        .rehire()
        );
    }

    @Override
    public void transfer(
            EmployeeTransferRequest request
    ) {
        Employee employeeToTransfer = employeeRepository
                .findById(request.employeeId())
                .orElseThrow();

        employeeRepository.save(
                employeeToTransfer
                        .changeDepartment(request.transferDepartmentId())
        );
    }

    @Override
    public Page<Employee> findAll(
            Long departmentId,
            Pageable pageable
    ) {
        /*
         * For methods, LocalDate.now() is specified
         * to get employees who are still working and have not been fired.
         */

        /*
         * If the Pageable object is not passed,
         * it is assumed that the client wants to receive everything
         */
        if(pageable == null){
            pageable = PageRequest.of(0, Integer.MAX_VALUE);
        }

        return employeeRepository.findByDepartmentId(
                departmentId,
                LocalDate.now(),
                LocalDate.now(),
                pageable
        );
    }
    @Override
    public Page<Employee> findAllByDate(
            Long departmentId,
            LocalDate startDate,
            LocalDate endDate,
            Pageable pageable
    ) {
        /*
         * If the Pageable object is not passed,
         * it is assumed that the client wants to receive everything
         */
        if(pageable == null){
            pageable = PageRequest.of(0, Integer.MAX_VALUE);
        }

        return employeeRepository.findByDepartmentId(
                departmentId,
                startDate,
                endDate,
                pageable
        );
    }


    @Override
    public Page<Employee> findAll(Pageable pageable) {
        /*
         * If the Pageable object is not passed,
         * it is assumed that the client wants to receive everything
         */
        if(pageable == null){
            pageable = PageRequest.of(0, Integer.MAX_VALUE);
        }

        return employeeRepository.findAll(pageable);
    }

    @Override
    public Page<Employee> findAllByDate(
            Pageable pageable,
            LocalDate startDate,
            LocalDate endDate
    ) {
        /*
         * If the Pageable object is not passed,
         * it is assumed that the client wants to receive everything
         */
        if(pageable == null){
            pageable = PageRequest.of(0, Integer.MAX_VALUE);
        }

        return employeeRepository.findAllByStartDateAndEndDate(
                pageable,
                startDate,
                endDate
        );
    }


    @Override
    public Employee find(Long employeeId) {
        return employeeRepository.findById(employeeId)
                .orElse(null);
    }
}
