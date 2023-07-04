package com.exam.examserver.services.impl;

import com.exam.examserver.model.customException.NotFound;
import com.exam.examserver.model.exam.Category;
import com.exam.examserver.model.exam.Quize;
import com.exam.examserver.repo.QuizRepository;
import com.exam.examserver.services.QuizService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    QuizRepository quizRepository;

    @Override
    public Quize addQuiz(Quize quize) {
        return this.quizRepository.save(quize);
    }

    @Override
    public Quize updateQuize(Quize quize) {
        return this.quizRepository.save(quize);
    }

    @Override
    public Quize getQuize(Long QuizeId) throws NotFound{
        return this.quizRepository.findById(QuizeId).orElse(null);
    }

    @Override
    public List<Quize> getAllQuizzes() {
        return this.quizRepository.findAll();
    }

    @Override
    public void deleteQuiz(Long QuizeId) {
        this.quizRepository.deleteById(QuizeId);

    }

    @Override
    public List<Quize> getQuizByCategory(Category category) throws NotFound{
        return this.quizRepository.findByCategory(category);
    }

    @Override
    public List<Quize> getActiveQuizzes(boolean b) throws NotFound {
        
        return this.quizRepository.findByActive(true);
    }

    @Override
    public List<Quize> getActiveQuizzesByCategorty(Category c,boolean b) throws NotFound {
        return this.quizRepository.findByCategoryAndActive(c,b);
    }

    @Override
    public List<Quize> getActiveQuizzesById(Long id, boolean b) throws NotFound {
        return this.quizRepository.findByIdAndActive(id, b);
    }
    
    

}
