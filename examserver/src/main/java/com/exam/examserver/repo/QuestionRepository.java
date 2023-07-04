package com.exam.examserver.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.examserver.model.exam.Question;
import com.exam.examserver.model.exam.Quize;

public interface QuestionRepository extends JpaRepository<Question, Long>{
    
    public List<Question> findByQuiz(Quize quize);
}
