package com.revature.dao;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.revature.pojo.RequestTable;

public interface IRequestDao extends JpaRepository<RequestTable, Integer>{
	
	@Query(value = "select r from RequestTable r left join Patient p on r.patientId = p.patientId  where p.patientId = ?1 order by requestid desc")
	public List<RequestTable> getRequestsByPatientId(int patient_id);
	
	@Query(value = "select r from RequestTable r left join Doctor d on r.doctorid = d.doctorId  where d.doctorId = ?1")
	public List<RequestTable> getRequestsByDoctorId(int doctorId);															
	
	@Query(value = "select r from RequestTable r left join Doctor d on r.doctorid = d.doctorId  where d.doctorId = ?1 and r.isresponsed = ?2 order by timecreated asc")
	public List<RequestTable> getRequestByStatus(int doctorId, boolean response);


	@Transactional
	@Modifying
	@Query("update RequestTable set  prescription=?1, doctorresponse=?2, hasappointment=?3, timeresponded=?4, "
			+  "isresponded=?5, isresponsed=?6 where requestid = ?7")
	public void save(String prescription, String docResponse, boolean appointment, 
			Date timeResponded, boolean isresponse, boolean responded, int reqid);
	
}
