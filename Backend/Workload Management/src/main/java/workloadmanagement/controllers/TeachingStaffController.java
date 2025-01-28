package workloadmanagement.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import workloadmanagement.teachingstaff.TeachingStaffRequest;
import workloadmanagement.teachingstaff.TeachingStaffService;


@RestController
@RequestMapping("teaching-staff")
@RequiredArgsConstructor
@Tag(name = "TeachingStaff")
public class TeachingStaffController {
    // Authentication conncetedUser // vēlākam lai iegūtu savu slodzi
    // MyUser user = ((User) connectedUser.getPrincipal())
    private final TeachingStaffService tStaffService;
    @PostMapping
    public ResponseEntity<Integer> saveBook(
            @Valid @RequestBody TeachingStaffRequest request
            ){
        return ResponseEntity.ok(tStaffService.save(request));
    }

}
