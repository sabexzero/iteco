package org.vkuksatech.itecotask.web.requests.employee;

import io.swagger.v3.oas.annotations.media.Schema;
import org.vkuksatech.itecotask.domain.employee.Employee;

import java.time.LocalDate;

@Schema(
        description = "<strong>Request for the hire a new employee<strong>"
)
public record EmployeeHireRequest(
        @Schema(
                description = "<strong>The name of the new employee<strong>",
                example = "Ivan"
        )
        String name,
        @Schema(
                description = "<strong>The surname of the new employee<strong>",
                example = "Ivanov"
        )
        String surname,
        @Schema(
                description = "<strong>The patronymic of the new employee<strong>",
                example = "Ivanovich"
        )
        String patronymic,
        @Schema(
                description =
                        """
                        <strong>
                        ID of the department where the new employee is being hired
                        <strong>
                        """,
                example = "13"
        )
        Long departmentId
){
    public Employee toDomain(){
        return Employee.builder()
                .id(null)
                .name(this.name)
                .surname(this.surname)
                .patronymic(this.patronymic)
                .departmentId(this.departmentId)
                .hiredAt(LocalDate.now())
                .build();
    }
}
