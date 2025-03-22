package workloadmanagement.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import workloadmanagement.MyClass.MyClass;

import java.util.List;


@Repository
public interface IMyClassRepo extends CrudRepository<MyClass, Integer> {
    List<MyClass> findByIsDeletedFalse();
}
