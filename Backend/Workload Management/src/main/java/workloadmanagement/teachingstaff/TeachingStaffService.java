package workloadmanagement.teachingstaff;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import workloadmanagement.repo.ITeachingStaffRepo;

@Service
@RequiredArgsConstructor
public class TeachingStaffService{
    private final TeachingStaffMapper tStaffMapper;
    private final ITeachingStaffRepo tStaffRepo;

    public Integer save(TeachingStaffRequest request) {
        TeachingStaff tStaff = tStaffMapper.toTeachingStaff(request);
        return tStaffRepo.save(tStaff).getTeachingStaffId();
    }
}
