package com.exam.examserver.services;

import java.util.List;

import com.exam.examserver.model.customException.NotFound;
import com.exam.examserver.model.exam.Category;

public interface CategoryService {
    public Category addCategory(Category category) throws Exception;

    public Category updateCategory(Category category) throws Exception;

    public List<Category> getCategories() throws Exception;

    public Category getCategoryById(Long CategoryId) throws NotFound;

    public void deleteCategory(Long CategoryId) throws Exception;
}
