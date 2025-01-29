package workloadmanagement.teachingstaff;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import workloadmanagement.repo.ITeachingStaffRepo;
import java.util.List;


@Service
@RequiredArgsConstructor
public class TeachingStaffService{
    private final TeachingStaffMapper tStaffMapper;
    private final ITeachingStaffRepo tStaffRepo;

    public Integer save(TeachingStaffRequest request) {
        TeachingStaff tStaff = tStaffMapper.toTeachingStaff(request);
        return tStaffRepo.save(tStaff).getTeachingStaffId();
    }

    public TeachingStaffResponse findById(Integer tstaffId) {
        return tStaffRepo.findById(tstaffId)
                .map(tStaffMapper::toTeachingStaffResponse)
                .orElseThrow(() -> new EntityNotFoundException("Teaching staff with id: " + tstaffId + " not found."));
    }

    public List<TeachingStaffResponse> findAllTeachingStaff() {
        List<TeachingStaff> staff = (List<TeachingStaff>) tStaffRepo.findAll();
        return staff.stream()
                .map(tStaffMapper::toTeachingStaffResponse)
                .toList();
    }
}
