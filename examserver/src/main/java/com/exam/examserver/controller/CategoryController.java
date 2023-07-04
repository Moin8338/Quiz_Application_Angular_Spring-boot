package com.exam.examserver.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.examserver.model.customException.NotFound;
import com.exam.examserver.model.exam.Category;
import com.exam.examserver.services.CategoryService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    // Add Category
    @PostMapping("/")
    public ResponseEntity<?> addCategory(@RequestBody Category category) {
        try {
            return new ResponseEntity<>(this.categoryService.addCategory(category), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get Category By Id
    @GetMapping("/{categoryId}")
    public ResponseEntity<?> getCategoryById(@PathVariable("categoryId") String categoryId) {
        try {
            Category c = this.categoryService.getCategoryById(Long.parseLong(categoryId));
            if (c == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(c, HttpStatus.OK);

        } catch (NotFound e) {
            return new ResponseEntity<>("No Category Found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get All Categories
    @GetMapping("/")
    public ResponseEntity<List<Category>> getCategories() {
        try {
            return new ResponseEntity<>(this.categoryService.getCategories(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Update Category
    @PutMapping("/")
    public ResponseEntity<?> updateCategory(@RequestBody Category category) {
        try {
            return new ResponseEntity<Category>(this.categoryService.updateCategory(category), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Delete Category
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<String> deleteCategory(@PathVariable("categoryId") String categoryId) {
        try {
            this.categoryService.deleteCategory(Long.parseLong(categoryId));
            return new ResponseEntity<>("sucessfully deleted",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("somthing went wrong",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

}
