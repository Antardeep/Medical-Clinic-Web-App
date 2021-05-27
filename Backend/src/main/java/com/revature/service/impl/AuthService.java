package com.revature.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.dao.IAuthAdminDao;
import com.revature.dao.IAuthDoctorDao;
import com.revature.dao.IAuthPatientDao;
import com.revature.pojo.Admin;
import com.revature.pojo.Doctor;
import com.revature.pojo.Patient;
import com.revature.pojo.User;
import com.revature.service.IAuthService;

@Service
public class AuthService implements IAuthService{
	
	@Autowired
	private IAuthDoctorDao authDoctorDao;
	
	@Autowired
	private IAuthPatientDao authPatientDao;
	
	@Autowired
	private IAuthAdminDao authAdminDao;

	@Override
	public Doctor registerDoctorService(Doctor doctor) {
		return authDoctorDao.save(doctor);
	}

	@Override
	public Patient registerPatientService(Patient patient) {
		return authPatientDao.save(patient);
	}

	@Override
	public Doctor loginDoctorService(User user) {
		String username = user.getUsername();
		String password = user.getPassword();
		return authDoctorDao.findDoctorbyUsername(username, password);
	}

	@Override
	public Patient loginPatientService(User user) {
		String username = user.getUsername();
		String password = user.getPassword();
		return authPatientDao.findPatientbyUsername(username, password);
	}

	@Override
	public List<Patient> getPatients() {
		return authPatientDao.findAll();
	}

	@Override
	public List<Doctor> getDoctors() {
		return authDoctorDao.findAll();
	}

	@Override
	public Admin loginAdminService(User user) {
		String username = user.getUsername();
		String password = user.getPassword();
		return authAdminDao.findAdminbyUsername(username, password);
	}

	@Override
	public Admin registerAdminService(Admin admin) {
		return authAdminDao.save(admin);
	}

	@Override
	public int updateDoctorService(int doctorId, String status) {
		return authDoctorDao.updateDoctorbyStatus(doctorId, status);
	}
	
	

}
