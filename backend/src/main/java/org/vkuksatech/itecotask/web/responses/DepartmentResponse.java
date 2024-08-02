package org.vkuksatech.itecotask.web.responses;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import java.util.List;

@Schema(
        description =
                """
                <strong>
                The response to receiving the hierarchy of departments.
                <strong>
                """
)
@ApiResponse
public record DepartmentResponse(
        @Schema(
                description =
                        """
                        <strong>
                        The department identifier, in this case, \
                        will be the identifier of the root element.
                        <strong>
                        """
        )
        Long id,
        @Schema(
                description = "<strong>Department name<strong>"
        )
        String name,
        @Schema(
                description =
                        """
                        <strong>
                        Subsidiary departments that will have a similar structure.
                        <strong>
                        """
        )
        List<DepartmentResponse> childs
) { }
