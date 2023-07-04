package com.exam.examserver.controller;

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
import com.exam.examserver.model.exam.Category;
import com.exam.examserver.model.exam.Quize;
import com.exam.examserver.services.CategoryService;
import com.exam.examserver.services.QuizService;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {
    @Autowired
    QuizService quizService;

    @Autowired
    CategoryService categoryService;

    // Add Quiz
    @PostMapping("/")
    public ResponseEntity<?> addQuiz(@RequestBody Quize quiz) {
        try {
            return new ResponseEntity<>(this.quizService.addQuiz(quiz), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get Quiz By Id
    @GetMapping("/{quizId}")
    public ResponseEntity<?> getCategoryById(@PathVariable("quizId") String QuizId) {
        try {
            Quize quiz = this.quizService.getQuize(Long.parseLong(QuizId));
            if (quiz == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(quiz, HttpStatus.OK);

        } catch (NotFound e) {
            return new ResponseEntity<>("No Quiz Found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get All Quiz
    @GetMapping("/")
    public ResponseEntity<List<Quize>> getCategories() {
        try {
            return new ResponseEntity<>(this.quizService.getAllQuizzes(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update Quiz
    @PutMapping("/")
    public ResponseEntity<?> updateCategory(@RequestBody Quize quiz) {
        try {
            return new ResponseEntity<Quize>(this.quizService.updateQuize(quiz), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete Quiz
    @DeleteMapping("/{quizId}")
    public ResponseEntity<Quize> deleteCategory(@PathVariable("quizId") String quizId) {
        try {
            System.out.println(quizId);
            this.quizService.deleteQuiz(Long.parseLong(quizId));
            return new ResponseEntity<>(new Quize(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // get all Quiz of any Category (find Quiz by Category)
    @GetMapping("/category/{cId}")
    public ResponseEntity<?> getQuizByCategory(@PathVariable("cId") String cId) {
        try {
            Category category = this.categoryService.getCategoryById(Long.parseLong(cId));
            Set<Quize> quiz = category.getQuizzes();
            return new ResponseEntity<>(quiz, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //get Active Quizzes
    @GetMapping("/active")
    public ResponseEntity<?> getActiveQuizzes(){
        try {
            List<Quize> Lq=new ArrayList<Quize>();
            Lq=this.quizService.getActiveQuizzes(true);
            if(Lq.isEmpty()){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(Lq, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //get Active Quizzes By Category
    @GetMapping("/category/active/{cId}")
    public ResponseEntity<?> getActiveQuizzesByCategory(@PathVariable("cId") String cId){
        try {
            System.out.println("--------------------------------------\n-------------------------------\n------------------------------");
            List<Quize> Lq=new ArrayList<Quize>();
            Category c=this.categoryService.getCategoryById(Long.parseLong(cId));
            Lq=this.quizService.getActiveQuizzesByCategorty(c,true);
            return new ResponseEntity<>(Lq, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //get Active Quizzes By Id
    @GetMapping("/active/{qId}")
    public ResponseEntity<?> getActiveQuizzesById(@PathVariable("qId") String qId){
        try {
            List<Quize> Lq=new ArrayList<Quize>();
            Lq=this.quizService.getActiveQuizzesById(Long.parseLong(qId), true);
            return new ResponseEntity<>(Lq, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
