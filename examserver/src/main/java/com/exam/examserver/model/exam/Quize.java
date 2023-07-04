package com.exam.examserver.model.exam;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table
public class Quize {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    private String description;

    private String maMarks;

    private String NumberOfQuestion;

    private boolean active = false;

    @ManyToOne(fetch = FetchType.EAGER)
    private Category category;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "quiz")
    @JsonIgnore
    private Set<Question> questions = new HashSet<>();

    public Quize() {
    }

    public Quize(Long id, String title, String description, String maMarks, String numberOfQuestion, boolean active,
            Category category) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.maMarks = maMarks;
        NumberOfQuestion = numberOfQuestion;
        this.active = active;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMaMarks() {
        return maMarks;
    }

    public void setMaMarks(String maMarks) {
        this.maMarks = maMarks;
    }

    public String getNumberOfQuestion() {
        return NumberOfQuestion;
    }

    public void setNumberOfQuestion(String numberOfQuestion) {
        NumberOfQuestion = numberOfQuestion;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }

}
