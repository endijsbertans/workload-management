package workloadmanagement.academicrank;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("academic-rank")
@RequiredArgsConstructor
@Tag(name = "AcademicRank")
public class AcademicRankController {

    private final AcademicRankService academicRankService;
    @PostMapping
    public ResponseEntity<Integer> saveAcademicRank(
            @Valid @RequestBody AcademicRankRequest request
    ){
        return ResponseEntity.ok(academicRankService.save(request));
    }
    @PatchMapping("{academicRankId}")
    public ResponseEntity<Integer> updateAcademicRankById(
            @PathVariable Integer academicRankId,
            @Valid @RequestBody AcademicRankRequest request
    ){
        return ResponseEntity.ok(academicRankService.update(academicRankId, request));
    }
    @DeleteMapping("{academicRankId}")
    public ResponseEntity<Integer> deleteAcademicRankById(
            @PathVariable Integer academicRankId
    ){
        return ResponseEntity.ok(academicRankService.delete(academicRankId));
    }
    @GetMapping("{academicRankId}")
    public ResponseEntity<AcademicRankResponse> findAcademicRankById(
            @PathVariable Integer academicRankId
    ){
        return ResponseEntity.ok(academicRankService.findById(academicRankId));
    }
    @GetMapping
    public ResponseEntity<List<AcademicRankResponse>> findAllAcademicRank(){
        return ResponseEntity.ok(academicRankService.findAllAcademicRank());
    }
}
