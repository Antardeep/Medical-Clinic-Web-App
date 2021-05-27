package com.revature.service.impl;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.dao.IRequestDao;
import com.revature.pojo.Doctor;
import com.revature.pojo.Patient;
import com.revature.pojo.Request;
import com.revature.pojo.RequestTable;
import com.revature.service.IPatientService;

import net.bytebuddy.asm.Advice.Local;

@Service
public class PatientService implements IPatientService{

	
	private IRequestDao irdao;
	
	@Autowired
	public PatientService(IRequestDao irdao) {
		this.irdao = irdao;
	}

	
	@Override
	public List<RequestTable> getRequestsByPatientId(int patientid) {
		
		return irdao.getRequestsByPatientId(patientid);
	}


	@Override
	public RequestTable savePatientRequest(Request req) {
		
		RequestTable rt = new RequestTable();
		Doctor d = new Doctor();
		Patient p = new Patient();
		p.setPatientId(req.getPatientId());
		d.setDoctorId(req.getDoctorId());
		rt.setDoctorId(d);
		rt.setProblem(req.getProblem());
		LocalDateTime ld = LocalDateTime.now();
		Timestamp today = Timestamp.valueOf(ld);
		rt.setTimeStamp(today);
		rt.setResponsed(false);
		rt.setPatientId(p);
		rt.setHasappointment(false);
		
		return irdao.save(rt);
	}

}
