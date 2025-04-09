package workloadmanagement.teachingstaff;

import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import workloadmanagement.workload.WorkloadRequest;


import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("teaching-staff")
@RequiredArgsConstructor
@Tag(name = "TeachingStaff")
public class TeachingStaffController {
    private final TeachingStaffService tStaffService;
    @PostMapping
    public ResponseEntity<Integer> saveTeachingStaff(
            @Valid @RequestBody TeachingStaffRequest request
            ) throws MessagingException {
        return ResponseEntity.ok(tStaffService.save(request));
    }
    @PatchMapping("{tStaffId}")
    public ResponseEntity<Integer> updateTeachingStaffById(
            @PathVariable Integer tStaffId,
            @Valid @RequestBody TeachingStaffRequest request
    ) throws MessagingException {
        return ResponseEntity.ok(tStaffService.update(tStaffId, request));
    }
    @GetMapping("{tStaffId}")
    public ResponseEntity<TeachingStaffResponse> findTeachingStaffById(
            @PathVariable Integer tStaffId
    ){
        return ResponseEntity.ok(tStaffService.findById(tStaffId));
    }
    @DeleteMapping("{tStaffId}")
    public ResponseEntity<Integer> deleteTeachingStaffById(
            @PathVariable Integer tStaffId
    ){
        return ResponseEntity.ok(tStaffService.delete(tStaffId));
    }
    @GetMapping
    public ResponseEntity<List<TeachingStaffResponse>> findAllTeachingStaff(){
        return ResponseEntity.ok(tStaffService.findAllTeachingStaff());
    }
    @PostMapping(value="/upload", consumes = {"multipart/form-data"})
    public ResponseEntity<Integer> uploadTeachingStaff(
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        return ResponseEntity.ok(tStaffService.uploadTeachingStaff(file));
    }
    @GetMapping(value = "/template", produces = "text/csv")
    public ResponseEntity<ByteArrayResource> getTStaffCSVTemplate() {
        String filename = "tStaff_import_template.csv";
        ByteArrayResource resource = new ByteArrayResource(tStaffService.generateCsvTemplate());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(resource);
    }
}
