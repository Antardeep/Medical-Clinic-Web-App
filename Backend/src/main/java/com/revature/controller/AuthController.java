package com.revature.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.revature.pojo.Admin;
import com.revature.pojo.Doctor;
import com.revature.pojo.Patient;
import com.revature.pojo.User;
import com.revature.service.IAuthService;

@RestController
@CrossOrigin
public class AuthController {
	
	 @Autowired
	 private IAuthService authService;
	 
	 @Autowired
	 private JavaMailSender javaMailSender;
	
	
	  @PostMapping("/registerDoctor")
	    @CrossOrigin
	    public ResponseEntity<Doctor> registerDoctor(@RequestBody Doctor doctor){
	        return new ResponseEntity<Doctor>(authService.registerDoctorService(doctor) , HttpStatus.CREATED);
	    }
	  
	  @PostMapping("/registerPatient")
	    @CrossOrigin
	    public ResponseEntity<Patient> registerPatient(@RequestBody Patient patient){
	        return new ResponseEntity<Patient>(authService.registerPatientService(patient), HttpStatus.CREATED);
	    }
	  
	  @PostMapping("/loginDoctor")
	    @CrossOrigin
	    public ResponseEntity<Doctor> loginDoctor(@RequestBody User user) {
	        return new ResponseEntity<Doctor>(authService.loginDoctorService(user), HttpStatus.OK);
	    }
	  
	  @PostMapping("/loginPatient")
	    @CrossOrigin
	    public ResponseEntity<Patient> loginPatient(@RequestBody User user) {
	        return new ResponseEntity<Patient>(authService.loginPatientService(user), HttpStatus.OK);
	    }
	  
	  @GetMapping("/patients")
	    @CrossOrigin
	    public ResponseEntity<List<Patient>> getPatients(){
	        return new ResponseEntity<List<Patient>>(authService.getPatients(),HttpStatus.OK);
	  	}
	  
	  @GetMapping("/doctors")
	    @CrossOrigin
	    public ResponseEntity<List<Doctor>> getDoctors(){
	        return new ResponseEntity<List<Doctor>>(authService.getDoctors(),HttpStatus.OK);
	  	}
	  
	  @PostMapping("/loginAdmin")
	  @CrossOrigin
	  public ResponseEntity<Admin> loginAdmin(@RequestBody User user) {
		  return new ResponseEntity<Admin>(authService.loginAdminService(user), HttpStatus.OK);
	  }
	  
	  @PostMapping("/registerAdmin")
	    @CrossOrigin
	    public ResponseEntity<Admin> registerAdmin(@RequestBody Admin admin){
		  return new ResponseEntity<Admin>(authService.registerAdminService(admin), HttpStatus.CREATED);
	    }
	  
	  @PostMapping("/doctors/{doctorId}/{status}/{email}")
	  @CrossOrigin
	    public ResponseEntity<Integer> updateDoctor(@PathVariable int doctorId, @PathVariable String status, @PathVariable String email) {
	        SimpleMailMessage msg = new SimpleMailMessage();
	        msg.setTo(email);

	        msg.setSubject("Revature Medical clinic Account Update");
	        msg.setText("Your account is "+ status + " by ADMIN");

	        javaMailSender.send(msg);
	        return new ResponseEntity<Integer>(authService.updateDoctorService(doctorId, status), HttpStatus.OK);
	    }
	  
	  

}
