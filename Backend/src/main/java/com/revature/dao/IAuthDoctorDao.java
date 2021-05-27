package com.revature.dao;


import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.revature.pojo.Doctor;

public interface IAuthDoctorDao extends JpaRepository<Doctor, Integer>{

	
	
	@Query(value = "select d from Doctor d where d.username=?1 and d.password=?2")
	Doctor findDoctorbyUsername(String username, String password);

	@Transactional
	@Modifying
	@Query("update Doctor d set d.status = ?2 where d.doctorId = ?1")
	int updateDoctorbyStatus(int doctorId, String status);
}
