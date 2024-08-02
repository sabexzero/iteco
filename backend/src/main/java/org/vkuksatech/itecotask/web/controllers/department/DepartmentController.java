package org.vkuksatech.itecotask.web.controllers.department;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.vkuksatech.itecotask.service.department.DepartmentService;
import org.vkuksatech.itecotask.web.requests.department.DepartmentCreateRequest;
import org.vkuksatech.itecotask.web.responses.DepartmentResponse;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/departments")
@Tag(
        name="DepartmentController",
        description=
                """
                <strong>
                This controller is responsible for actions related \
                to the Department entity👻.
                </strong>
                """
)
public class DepartmentController {
    private final DepartmentService departmentService;

    @PostMapping
    @Operation(
            description =
                    """
                    <strong>
                    Allows you to create a new department based on a request.
                    </strong>
                    """
    )
    public ResponseEntity<?> formDepartment(
            @RequestBody DepartmentCreateRequest request
    ) {
        try{
            return ResponseEntity
                    .ok()
                    .body(departmentService.create(request));
        } catch (Exception e){
            return ResponseEntity
                    .badRequest()
                    .body("It was not possible to form a department due to: "
                            + e.getMessage()
                    );
        }
    }

    @DeleteMapping
    @Operation(
            description =
                    """
                    <strong>
                    Allows you to disband a department by id.
                    </strong>
                    """
    )
    public ResponseEntity<?> disbandDepartment(
            @RequestParam Long departmentId
    ) {
        try{
            departmentService.disband(departmentId);
            return ResponseEntity
                    .ok()
                    .build();
        } catch (Exception e){
            return ResponseEntity
                    .badRequest()
                    .body("It was not possible to disband a department due to: "
                            + e.getMessage()
                    );
        }
    }

    @GetMapping
    @Operation(
            description =
                    """
                    <strong>
                    Allows you to get a department hierarchy by parameters.
                    </strong>
                    """
    )
    public ResponseEntity<?> getDepartment(
            @RequestParam(required = false) Long parentDepartmentId,
            @RequestParam(required = false) LocalDate date
    ) {
        try {
            if (parentDepartmentId != null) {
                List<DepartmentResponse> departments = departmentService.find(parentDepartmentId);
                return ResponseEntity.ok(departments);
            }

            if (date != null) {
                List<DepartmentResponse> departments = departmentService.findByDate(date);
                return ResponseEntity.ok(departments);
            }

            // Default case: get all departments
            List<DepartmentResponse> departments = departmentService.find();
            return ResponseEntity.ok(departments);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }
}
