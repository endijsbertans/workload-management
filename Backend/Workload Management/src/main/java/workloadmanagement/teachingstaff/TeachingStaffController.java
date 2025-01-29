package workloadmanagement.teachingstaff;

import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;


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
    @GetMapping("{tstaff-id}")
    public ResponseEntity<TeachingStaffResponse> findTeachingStaffById(
            @PathVariable("tstaff-id") Integer tstaffId
    ){
        return ResponseEntity.ok(tStaffService.findById(tstaffId));
    }
    @GetMapping
    public ResponseEntity<List<TeachingStaffResponse>> findAllTeachingStaff(){
        return ResponseEntity.ok(tStaffService.findAllTeachingStaff());
    }
}
