package workloadmanagement.academicrank.academicrankDetails;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import workloadmanagement.academicrank.AcademicRankRequest;

import java.util.List;

@RestController
@RequestMapping("academic-rank/details")
@RequiredArgsConstructor
@Tag(name = "AcademicRankDetails")
public class AcademicRankDetailsController {
    private final AcademicRankDetailsService academicRankDetailsService;
    @PostMapping
    public ResponseEntity<Integer> saveAcademicRankDetails(
            @Valid @RequestBody AcademicRankDetailsRequest request
    ){
        return ResponseEntity.ok(academicRankDetailsService.save(request));
    }
    @PatchMapping("{academicRankDetailsId}")
    public ResponseEntity<Integer> updateAcademicRankDetailsById(
            @PathVariable Integer academicRankDetailsId,
            @Valid @RequestBody AcademicRankDetailsRequest request
    ){
        return ResponseEntity.ok(academicRankDetailsService.update(academicRankDetailsId, request));
    }
    @DeleteMapping("{academicRankDetailsId}")
    public ResponseEntity<Integer> deleteAcademicRankDetailsById(
            @PathVariable Integer academicRankDetailsId
    ){
        return ResponseEntity.ok(academicRankDetailsService.delete(academicRankDetailsId));
    }
    @GetMapping("{academicRankDetailsId}")
    public ResponseEntity<AcademicRankDetailsResponse> findAcademicRankDetailsById(
            @PathVariable Integer academicRankDetailsId
    ){
        return ResponseEntity.ok(academicRankDetailsService.findAcademicRankDetailsById(academicRankDetailsId));
    }
    @GetMapping
    public ResponseEntity<List<AcademicRankDetailsResponse>> findAllAcademicRankDetails(){
        return ResponseEntity.ok(academicRankDetailsService.findAllAcademicRankDetails());
    }
}
