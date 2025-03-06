package workloadmanagement.academicrank.academicrankDetails;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("{academic-rank-id}")
    public ResponseEntity<AcademicRankDetailsResponse> findAcademicRankDetailsById(
            @PathVariable("academic-rank-id") Integer academicRankId
    ){
        return ResponseEntity.ok(academicRankDetailsService.findAcademicRankDetailsById(academicRankId));
    }
    @GetMapping
    public ResponseEntity<List<AcademicRankDetailsResponse>> findAllAcademicRankDetails(){
        return ResponseEntity.ok(academicRankDetailsService.findAllAcademicRankDetails());
    }
}
