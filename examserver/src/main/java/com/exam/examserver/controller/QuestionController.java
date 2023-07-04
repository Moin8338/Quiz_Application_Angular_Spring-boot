package com.exam.examserver.controller;

import java.util.ArrayList;
import java.util.Collections;
// import java.util.HashMap;
import java.util.List;
// import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.examserver.model.customException.NotFound;
import com.exam.examserver.model.exam.Question;
import com.exam.examserver.model.exam.Quize;
import com.exam.examserver.services.QuestionService;
import com.exam.examserver.services.QuizService;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {
    @Autowired
    QuestionService questionService;

    @Autowired
    QuizService quizService;

    // private int correctAnswer=0;
    // private int marksSingle=0;
    // private int Gotmarks=0;

    // Add Question
    @PostMapping("/")
    public ResponseEntity<?> addQuestion(@RequestBody Question question) {
        try {
            return new ResponseEntity<>(this.questionService.addQuestion(question), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get Question By Id
    @GetMapping("/{questionId}")
    public ResponseEntity<?> getQuestionById(@PathVariable("questionId") String QuestionId) {
        try {
            Question question = this.questionService.getQuestion(Long.parseLong(QuestionId));
            if (question == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(question, HttpStatus.OK);

        } catch (NotFound e) {
            return new ResponseEntity<>("No Quiz Found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get All Question
    @GetMapping("/")
    public ResponseEntity<List<Question>> getQuestions() {
        try {
            return new ResponseEntity<>(this.questionService.getAllQuestions(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update Question
    @PutMapping("/")
    public ResponseEntity<?> updateQuestion(@RequestBody Question question) {
        try {
            return new ResponseEntity<Question>(this.questionService.updatQuestion(question), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete Question
    @DeleteMapping("/{questionId}")
    public ResponseEntity<?> deleteCategory(@PathVariable("questionId") String QuestionId) {
        try {
            this.questionService.deleteQuestion(Long.parseLong(QuestionId));
            return new ResponseEntity<>(new Question(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // get Question of any Quiz (find question by Quiz)
    @GetMapping("/quiz/{qId}")
    public ResponseEntity<?> getQuestionByQuize(@PathVariable("qId") String qId) {
        try {
            Quize quiz = this.quizService.getQuize(Long.parseLong(qId));

            Set<Question> questionsByQuiz = quiz.getQuestions();
            List<Question> list = new ArrayList<>(questionsByQuiz);

            if (list.size() > Integer.parseInt(quiz.getNumberOfQuestion())) {
                // questionsByQuiz.clear();
                list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestion()));
            }
            // questionsByQuiz.forEach(q ->{
            //     q.setAnswer("");
            // });
            Collections.shuffle(list);
            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // get all Question of any Quiz (find question by Quiz)
    @GetMapping("/quiz/all/{qId}")
    public ResponseEntity<?> getAllQuestionByQuize(@PathVariable("qId") String qId) {
        try {
            Quize quiz = this.quizService.getQuize(Long.parseLong(qId));

            Set<Question> questionsByQuiz = quiz.getQuestions();
            List<Question> list = new ArrayList<>(questionsByQuiz);
            Collections.shuffle(list);
            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // evaluate quiz after attempt a quiz
    @PostMapping("/eval-quiz")
    public ResponseEntity<?> evaluate_question(@RequestBody List<Question> question) {
        // Map result = new HashMap<>();
        try {
            question.forEach(q -> {
                // if (q.getAnswer().equalsIgnoreCase(q.getGivenAnswer())) {
                //     this.correctAnswer++;
                //     this.marksSingle = Integer.parseInt(q.getQuiz().getMaMarks()) / question.size();
                //     this.Gotmarks += marksSingle;
                    
                // }
            });
            // result.put("correctAnswer", correctAnswer);
            // result.put("marksSingle", marksSingle);
            // result.put("Gotmarks", Gotmarks);
            return new ResponseEntity<>(question, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
