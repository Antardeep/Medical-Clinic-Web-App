package com.revature.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.revature.pojo.DocResponse;
import com.revature.pojo.Patient;
import com.revature.pojo.RequestTable;
import com.revature.pojo.User;

public interface IDoctorService {
	
	public List<RequestTable> getRequestsByDoctorId(int doctorId);
	
	public List<RequestTable> getRequestByStatus(int doctorId, boolean status);
	
	void postDoctorResponse(DocResponse docResp);

	
}
