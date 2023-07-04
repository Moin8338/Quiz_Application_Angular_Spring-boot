package com.exam.examserver.services;

import java.util.List;

import com.exam.examserver.model.customException.NotFound;
import com.exam.examserver.model.exam.Question;
import com.exam.examserver.model.exam.Quize;

public interface QuestionService {

    public Question addQuestion(Question question) throws Exception;

    public Question updatQuestion(Question question) throws Exception;

    public List<Question> getAllQuestions() throws Exception;

    public Question getQuestion(Long QuestionId) throws NotFound;

    public void deleteQuestion(Long QuestionId) throws Exception;

    public List<Question> getQuestionByQuiz(Quize quize) throws NotFound;
}
