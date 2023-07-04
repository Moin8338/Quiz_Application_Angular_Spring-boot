package com.exam.examserver.model.customException;

public class NotFound extends Exception {
    
    public NotFound(String str){
        super(str);
    }
}
