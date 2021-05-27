package com.revature;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.revature.controller.ForumController;
import com.revature.service.IForumService;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication(scanBasePackages = {"com.revature.service", "com.revature.service.impl", "com.revature.dao", "com.revature.controller"})
@ComponentScan(basePackageClasses = {ForumController.class, IForumService.class})
@EnableSwagger2
public class Project2Application {

    public static void main(String[] args) {
        SpringApplication.run(Project2Application.class, args);
    }

}
