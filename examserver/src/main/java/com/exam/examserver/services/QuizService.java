package com.exam.examserver.services;

import java.util.List;

import com.exam.examserver.model.customException.NotFound;
import com.exam.examserver.model.exam.Category;
import com.exam.examserver.model.exam.Quize;

public interface QuizService {
    public Quize addQuiz(Quize quize) throws Exception;

    public Quize updateQuize(Quize quize) throws Exception;

    public Quize getQuize(Long QuizeId) throws NotFound;

    public List<Quize> getAllQuizzes() throws Exception;

    public void deleteQuiz(Long QuizeId) throws Exception;

    public List<Quize> getQuizByCategory(Category category) throws NotFound;

    public List<Quize> getActiveQuizzes(boolean b) throws NotFound;

    public List<Quize> getActiveQuizzesByCategorty(Category c,boolean b) throws NotFound;

    public List<Quize> getActiveQuizzesById(Long id,boolean b) throws NotFound;

}
