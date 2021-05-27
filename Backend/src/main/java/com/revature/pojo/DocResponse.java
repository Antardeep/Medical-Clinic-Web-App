/**
 * @program: project2
 * @description: entity for request
 * @author: Luke
 * @create: 2021-01-06 14:45
 **/


package com.revature.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "requesttable")
public class DocResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "requestid")
    private int requestid;

    @Column(name = "problem")
    private String problem;
    
    @Column(name ="prescription" )
    private String prescription;
    
    @Column(name ="doctorresponse" )
    private String doctorresponse;

    @Column(name = "patientid")
    private int patientId;

    @Column(name ="doctorid")
    private int doctorid;
    
    @Column(name = "hasappointment")
    private boolean hasappointment;

    @Override
    public String toString() {
        return "RequestTable{" +
                "requestId=" + requestid +
                ", problem='" + problem + '\'' +
                ", patientId=" + patientId +
                ", doctorId=" + doctorid +
                ", prescription=" + prescription +
                 ", doctorresponse=" + doctorresponse +
                 ", hasappointment=" + hasappointment +
                '}';
    }

    public String getDoctorresponse() {
        return doctorresponse;
    }

    public void setDoctorresponse(String doctorresponse) {
        this.doctorresponse = doctorresponse;
    }
    
    public String getPrescription() {
        return prescription;
    }

    public void setPrescription(String prescription) {
        this.prescription = prescription;
    }
    
    public int getRequestId() {
        return requestid;
    }

    public void setRequestId(int requestId) {
        this.requestid = requestId;
    }

    public String getProblem() {
        return problem;
    }

    public void setProblem(String problem) {
        this.problem = problem;
    }


    public boolean isHasappointment() {
		return hasappointment;
	}

	public void setHasappointment(boolean hasappointment) {
		this.hasappointment = hasappointment;
	}

	public int getPatientId() {
        return patientId;
    }

    public void setPatientId(int patientId) {
        this.patientId = patientId;
    }

    public int getDoctorId() {
        return doctorid;
    }

    public void setDoctorId(int doctorId) {
        this.doctorid = doctorId;
    }
}


