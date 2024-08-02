package org.vkuksatech.itecotask.web.requests.employee;

import io.swagger.v3.oas.annotations.media.Schema;


@Schema(
        description =
                        """
                        <strong>
                        Request for the transfer employee to another department.
                        <strong>
                        """
)
public record EmployeeTransferRequest(
        @Schema(
                description =
                        """
                        <strong>
                        The ID of the employee who needs to be transferred \
                        to another department.
                        <strong>
                        """
        )
        Long employeeId,
        @Schema(
                description =
                        """
                        <strong>
                        The ID of the department to which the employee \
                        is being transferred.
                        <strong>
                        """
        )
        Long transferDepartmentId
){

}
