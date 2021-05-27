package com.revature.pojo;

public class Request {
	
	private int doctorId;
	private int patientId;
	private String problem;
	
	public int getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}
	public int getPatientId() {
		return patientId;
	}
	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}
	public String getProblem() {
		return problem;
	}
	public void setProblem(String problem) {
		this.problem = problem;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + doctorId;
		result = prime * result + patientId;
		result = prime * result + ((problem == null) ? 0 : problem.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Request other = (Request) obj;
		if (doctorId != other.doctorId)
			return false;
		if (patientId != other.patientId)
			return false;
		if (problem == null) {
			if (other.problem != null)
				return false;
		} else if (!problem.equals(other.problem))
			return false;
		return true;
	}
	public Request(int doctorId, int patientId, String problem) {
		super();
		this.doctorId = doctorId;
		this.patientId = patientId;
		this.problem = problem;
	}
	
	
	
	
}
