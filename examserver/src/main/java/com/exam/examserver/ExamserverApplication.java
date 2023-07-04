package com.exam.examserver;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner {


	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	public void run(String... args) {

		System.out.println("-------------------------------------------------------------------------------------\n"
				+ "-------------------------------------------------------------------------------------\n"
				+ "-------------------------------------------------------------------------------------\n"
				+ "------------------------------------Exam Server is Strated---------------------------\n"
				+ "-------------------------------------------------------------------------------------\n"
				+ "-------------------------------------------------------------------------------------\n"
				+ "-------------------------------------------------------------------------------------");
	}

}
