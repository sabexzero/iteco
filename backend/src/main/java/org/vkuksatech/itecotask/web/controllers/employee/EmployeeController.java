package org.vkuksatech.itecotask.web.controllers.employee;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.vkuksatech.itecotask.domain.employee.Employee;
import org.vkuksatech.itecotask.service.employee.EmployeeService;
import org.vkuksatech.itecotask.web.requests.employee.EmployeeHireRequest;
import org.vkuksatech.itecotask.web.requests.employee.EmployeeTransferRequest;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/employees")
@Tag(
        name="EmployeeController",
        description=
                """
                <strong>
                This controller is responsible for actions related \
                to the Employee entity🤠.
                </strong>
                """
)
public class EmployeeController {
    private final EmployeeService employeeService;

    @PostMapping
    @Operation(
            description =
                    """
                    <strong>
                    Allows you to hire a new employee based on a request.
                    </strong>
                    """
    )
    public ResponseEntity<?> hireEmployee(
            @RequestBody
            EmployeeHireRequest request
    ) {
        try{
            employeeService.hire(request);
            return ResponseEntity
                    .ok()
                    .build();
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body("It was not possible to hire an employee, due to: " +
                            e.getMessage()
                    );
        }

    }

    @PutMapping("/transfer")
    @Operation(
            description =
                    """
                    <strong>
                    Allows you transfer employee to another department \
                    based on a request.
                    </strong>
                    """
    )
    public ResponseEntity<?> transferEmployee(
            @RequestBody
            EmployeeTransferRequest request
    ) {
        try{
            employeeService.transfer(request);
            return ResponseEntity
                    .ok()
                    .build();
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body("It was not possible to transfer an employee, due to: " +
                            e.getMessage()
                    );
        }

    }

    @PutMapping("/rehire")
    @Operation(
            description =
                    """
                    <strong>
                    Allows you to rehire employee.
                    </strong>
                    """
    )
    public ResponseEntity<?> rehireEmployee(
            @RequestParam Long employeeId
    ) {
        try{
            employeeService.rehire(employeeId);
            return ResponseEntity
                    .ok()
                    .build();
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body("It was not possible to rehire an employee, due to: " +
                            e.getMessage()
                    );
        }

    }

    @DeleteMapping
    @Operation(
            description =
                    """
                    <strong>
                    Allows you to dismiss employee.
                    </strong>
                    """
    )
    public ResponseEntity<?> dismissEmployee(
            @RequestParam Long employeeId
    ) {
        try{
            employeeService.dismiss(employeeId);
            return ResponseEntity
                    .ok()
                    .build();
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body("It was not possible to dismiss an employee, due to: " +
                            e.getMessage()
                    );
        }

    }

    @GetMapping
    @Operation(
            description =
                    """
                    <strong>
                    Allows you to get employees.
                    </strong>
                    """
    )
    public ResponseEntity<?> getEmployee(
            @RequestParam(required = false) Long employeeId,
            @RequestParam(required = false) Long departmentId,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(required = false) Pageable pageable
    ) {
        try {
            if (employeeId != null) {
                Employee employee = employeeService.find(employeeId);
                if (employee != null) {
                    return ResponseEntity.ok(employee);
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
                }
            }

            if (departmentId != null && startDate != null && endDate != null) {
                Page<Employee> employees = employeeService.findAllByDate(departmentId, startDate, endDate, pageable);
                return ResponseEntity.ok(employees);
            }

            if (departmentId != null) {
                Page<Employee> employees = employeeService.findAll(departmentId, pageable);
                return ResponseEntity.ok(employees);
            }

            if (startDate != null && endDate != null) {
                Page<Employee> employees = employeeService.findAllByDate(pageable, startDate, endDate);
                return ResponseEntity.ok(employees);
            }

            Page<Employee> employees = employeeService.findAll(pageable);
            return ResponseEntity.ok(employees);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }
}
