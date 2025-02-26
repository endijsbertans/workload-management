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
    public ResponseEntity<Integer> saveAcademicRank(
            @Valid @RequestBody AcademicRankDetailsRequest request
    ){
        return ResponseEntity.ok(academicRankDetailsService.save(request));
    }
    @GetMapping("{academic-rank-id}")
    public ResponseEntity<AcademicRankDetailsResponse> findAcademicRankById(
            @PathVariable("academic-rank-id") Integer academicRankId
    ){
        return ResponseEntity.ok(academicRankDetailsService.findById(academicRankId));
    }
    @GetMapping
    public ResponseEntity<List<AcademicRankDetailsResponse>> findAllAcademicRank(){
        return ResponseEntity.ok(academicRankDetailsService.findAllAcademicRank());
    }
}
