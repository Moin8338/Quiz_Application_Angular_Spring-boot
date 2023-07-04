package com.exam.examserver.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.examserver.model.customException.NotFound;
import com.exam.examserver.model.exam.Category;
import com.exam.examserver.repo.CategoryRepository;
import com.exam.examserver.services.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category addCategory(Category category) throws Exception {

        return this.categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Category category) throws Exception {
        return this.categoryRepository.save(category);
    }

    @Override
    public List<Category> getCategories() throws Exception {
        return this.categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long CategoryId) throws NotFound {
        return this.categoryRepository.findById(CategoryId).orElse(null);
    }

    @Override
    public void deleteCategory(Long CategoryId) throws Exception {
        this.categoryRepository.deleteById(CategoryId);
    }

}
