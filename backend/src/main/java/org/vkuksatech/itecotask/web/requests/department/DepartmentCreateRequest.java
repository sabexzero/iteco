package org.vkuksatech.itecotask.web.requests.department;

import io.swagger.v3.oas.annotations.media.Schema;
import org.vkuksatech.itecotask.domain.department.Department;

import java.time.LocalDate;

@Schema(
        description = "<strong>Request for the formation of a new department<strong>"
)
public record DepartmentCreateRequest(
        @Schema(
                description =
                        """
                        <strong>
                        The name of the department can be any \
                        combination of characters and spaces.
                        <strong>
                        """,
                example = "Mega department 112"
        )
        String name,
        @Schema(
                description =
                        """
                        <strong>
                        The ID of the parent department, this is necessary \
                        because the department structure has a hierarchical type. \
                        If a department is being created that will be the main one, \
                        this identifier must be left with the NULL value.
                        <strong>
                        """,
                example = "13"
        )
        Long parentId
){
    public Department toDomain(String createdPath){
        return Department.builder()
                .id(null)
                .name(name)
                .path(createdPath)
                .createdAt(LocalDate.now())
                .disbandedAt(null)
                .build();
    }
}
