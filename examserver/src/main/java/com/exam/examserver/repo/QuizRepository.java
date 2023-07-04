package com.exam.examserver.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.examserver.model.exam.Category;
import com.exam.examserver.model.exam.Quize;

public interface QuizRepository extends JpaRepository<Quize, Long>{
    
    public List<Quize> findByCategory(Category category);

    public List<Quize> findByActive(boolean b);
    
    /**
     * @param category
     * @return
     */
    public List<Quize> findByCategoryAndActive(Category c,boolean b);

    public List<Quize> findByIdAndActive(Long id,boolean b);

}
