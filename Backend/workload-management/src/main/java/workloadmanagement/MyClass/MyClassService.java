package workloadmanagement.MyClass;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import workloadmanagement.faculty.Faculty;
import workloadmanagement.faculty.FacultyResponse;
import workloadmanagement.faculty.FacultyService;
import workloadmanagement.repo.IMyClassRepo;

import java.io.*;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MyClassService {
    private final MyClassMapper MyClassMapper;
    private final IMyClassRepo myClassRepo;
    private final FacultyService facultyService;
    public Integer save(MyClassRequest request) {
        Faculty faculty = facultyService.findFacultyFromResponseId(request.classFacultyId());
        MyClass myClass = MyClassMapper.toMyClass(request, faculty);
        return myClassRepo.save(myClass).getClassId();
    }
    public Integer update(Integer myclassId, @Valid MyClassRequest request) {
        MyClass existingMyClass = findMyClassFromResponseId(myclassId);
        Faculty faculty = facultyService.findFacultyFromResponseId(request.classFacultyId());
        MyClass updatedMyClass = MyClassMapper.toMyClass(request, faculty);
        updatedMyClass.setClassId(existingMyClass.getClassId());
        return myClassRepo.save(updatedMyClass).getClassId();
    }
    public MyClass findMyClassFromResponseId(int id) {
        return myClassRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("MyClass with id: " + id + " not found."));
    }
    public MyClassResponse findById(Integer myClassId) {
        return myClassRepo.findById(myClassId)
                .map(MyClassMapper::toMyClassResponse)
                .orElseThrow(() -> new RuntimeException("MyClass not found"));
    }

    public List<MyClassResponse> findAllMyClass() {
        List<MyClass> myClass = myClassRepo.findByIsDeletedFalse();
        return myClass.stream()
                .map(MyClassMapper::toMyClassResponse)
                .toList();
    }


    public Integer delete(Integer myClassId) {
        MyClass myClass = findMyClassFromResponseId(myClassId);
        myClass.setDeleted(true);
        myClassRepo.save(myClass);
        return myClassId;
    }

    public Integer uploadMyClass(MultipartFile file) throws IOException {
        Set<MyClass> myClasses = parseCsv(file);
        myClassRepo.saveAll(myClasses);
        return myClasses.size();
    }

    private Set<MyClass> parseCsv(MultipartFile file) throws IOException {
        try(Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            HeaderColumnNameMappingStrategy<MyClassCsvRepresentation> strategy = new HeaderColumnNameMappingStrategy<>();
            strategy.setType(MyClassCsvRepresentation.class);
            CsvToBean<MyClassCsvRepresentation> csvToBean =
                    new CsvToBeanBuilder<MyClassCsvRepresentation>(reader)
                            .withMappingStrategy(strategy)
                            .withIgnoreEmptyLine(true)
                            .withIgnoreLeadingWhiteSpace(true)
                            .withSeparator(';')
                            .build();
            return csvToBean.parse()
                    .stream()
                    .map(csvLine -> {
                        System.out.println(csvLine.classLevel + "  " + csvLine.myClassProgram + "   " +  csvLine.degree +"   " +  csvLine.classFacultyId);
                        Faculty faculty = facultyService.findFacultyFromResponseId(csvLine.classFacultyId);
                        return  MyClassMapper.toMyClass(csvLine, faculty);
                    }).collect(Collectors.toSet());
        }
    }

    public byte[] generateCsvTemplate() {
        List<FacultyResponse> faculties = facultyService.findAllFaculties();

        StringBuilder csvContent = new StringBuilder();

        csvContent.append("classLevel;classFacultyId;myClassProgram;degree\n");

        csvContent.append("# Piemers zemak, pirms publicesanas izdzest visu kas sakas ar #, ka ari pasu piemeru\n");
        csvContent.append("1;1;CS;BACHELOR\n");

        csvContent.append("# Pieejamie fakultasu id:\n");
        for (FacultyResponse faculty : faculties) {
            csvContent.append("# ").append(faculty.getFacultyId())
                    .append(" - ").append(faculty.getFacultyName()).append("\n");
        }

        csvContent.append("\n# Pieejamie studiju limeni:\n");
        for (Degree degree : Degree.values()) {
            csvContent.append("# ").append(degree).append("\n");
        }

        return csvContent.toString().getBytes();
    }
}
