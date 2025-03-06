package workloadmanagement.statustype;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("status-type")
@RequiredArgsConstructor
@Tag(name = "StatusType")
public class StatusTypeController {
    private final StatusTypeService statusTypeService;
    @PostMapping
    public ResponseEntity<Integer> saveStatusType(
            @Valid @RequestBody StatusTypeRequest request){
        return ResponseEntity.ok(statusTypeService.save(request));
    }
    @GetMapping("{statusTypeId}")
    public ResponseEntity<StatusTypeResponse> findStatusTypeById(
            @PathVariable Integer statusTypeId){
        return ResponseEntity.ok(statusTypeService.findById(statusTypeId));
    }
    @GetMapping
    public ResponseEntity<List<StatusTypeResponse>> findAllStatusTypes(){
        return ResponseEntity.ok(statusTypeService.findAllStatusTypes());
    }
}
