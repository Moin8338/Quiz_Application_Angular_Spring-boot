package com.exam.examserver.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.examserver.model.customException.NotFound;
import com.exam.examserver.model.exam.Question;
import com.exam.examserver.model.exam.Quize;
import com.exam.examserver.repo.QuestionRepository;
import com.exam.examserver.services.QuestionService;

@Service
public class QuestionServiceImpl implements QuestionService{

    @Autowired
    QuestionRepository questionRepository;

    @Override
    public Question addQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    @Override
    public Question updatQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    @Override
    public List<Question> getAllQuestions() {
       return this.questionRepository.findAll();
    }

    @Override
    public Question getQuestion(Long QuestionId) throws NotFound{
        return this.questionRepository.findById(QuestionId).orElse(null);
    }

    @Override
    public void deleteQuestion(Long QuestionId) {
        this.questionRepository.deleteById(QuestionId);
        
    }

    @Override
    public List<Question> getQuestionByQuiz(Quize quize) throws NotFound{
        return this.questionRepository.findByQuiz(quize);
    }
    
}
