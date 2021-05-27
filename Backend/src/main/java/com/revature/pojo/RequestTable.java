/**
 * @program: project2
 * @description: entity for request
 * @author: Luke
 * @create: 2021-01-06 14:45
 **/


package com.revature.pojo;

import javax.naming.Name;
import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "requesttable")
public class RequestTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "requestid")
    private int requestId;

    @Column(name = "problem")
    private String problem;

    @Column(name = "timestamp")
    private Date timeStamp;
    
    @Column(name = "timeresponded")
    private Date timeresponded;

    @Column(name ="isresponsed" )
    private boolean isresponsed;
    
    @Column(name = "hasappointment")
    private boolean hasappointment;
    
    @Column(name ="prescription" )
    private String prescription;
    
    @Column(name ="doctorresponse" )
    private String doctorresponse;

    @ManyToOne
    @JoinColumn(name = "patientid")
    private Patient patientId;

    @ManyToOne
    @JoinColumn(name ="doctorid")
    private Doctor doctorid;

    @Override
    public String toString() {
        return "RequestTable{" +
                "requestId=" + requestId +
                ", problem='" + problem + '\'' +
                ", timeStamp=" + timeStamp +
                ", isResponsed=" + isresponsed +
                ", patientId=" + patientId +
                ", doctorId=" + doctorid +
                ", prescription=" + prescription +
                 ", doctorresponse=" + doctorresponse +
                 ", hasappointment=" + hasappointment +
                 ", timeresponded=" + timeresponded +
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
        return requestId;
    }

    public void setRequestId(int requestId) {
        this.requestId = requestId;
    }

    public String getProblem() {
        return problem;
    }

    public void setProblem(String problem) {
        this.problem = problem;
    }

    public Date getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Date timeStamp) {
        this.timeStamp = timeStamp;
    }

    public boolean isResponsed() {
        return isresponsed;
    }

    public Date getTimeresponded() {
		return timeresponded;
	}

	public void setTimeresponded(Date timeresponded) {
		this.timeresponded = timeresponded;
	}

	public void setResponsed(boolean responsed) {
    	isresponsed = responsed;
    }

    public Patient getPatientId() {
        return patientId;
    }

    public void setPatientId(Patient patientId) {
        this.patientId = patientId;
    }

    public Doctor getDoctorId() {
        return doctorid;
    }

    public void setDoctorId(Doctor doctorId) {
        this.doctorid = doctorId;
    }
    
    public boolean isHasappointment() {
		return hasappointment;
	}

	public void setHasappointment(boolean hasappointment) {
		this.hasappointment = hasappointment;
	}
}


