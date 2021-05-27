/**
 * @program: project2
 * @description: class for message
 * @author: Luke
 * @create: 2021-01-06 14:24
 **/


package com.revature.pojo;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "message")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "messageid")
    private int messageId;

    @Column(name = "message")
    private String message;

    @Column(name = "timestamp")
    private Date timeStamp;

    @Column(name = "doctype")
    private String docType;

    @Column(name = "fromusername")
    private String fromusername;

    @ManyToOne
    @JoinColumn(name = "forumid")
    private Forum forumId;

    @OneToOne
    @JoinColumn(name="patientid")
    private Patient patientId;

    @OneToOne
    @JoinColumn(name="doctorid")
    private Doctor doctorId;

    public int getMessageId() {
        return messageId;
    }

    public void setMessageId(int messageId) {
        this.messageId = messageId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Date timeStamp) {
        this.timeStamp = timeStamp;
    }

    public String getDocType() {
        return docType;
    }

    public void setDocType(String docType) {
        this.docType = docType;
    }

    public Forum getForumId() {
        return forumId;
    }

    public void setForumId(Forum forumId) {
        this.forumId = forumId;
    }

    public Patient getPatientId() {
        return patientId;
    }

    public void setPatientId(Patient patientId) {
        this.patientId = patientId;
    }

    public Doctor getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Doctor doctorId) {
        this.doctorId = doctorId;
    }

    public String getFromusername() {
        return fromusername;
    }

    public void setFromusername(String fromusername) {
        this.fromusername = fromusername;
    }

    @Override
    public String toString() {
        return "Message{" +
                "messageId=" + messageId +
                ", message='" + message + '\'' +
                ", timeStamp=" + timeStamp +
                ", docType='" + docType + '\'' +
                ", fromusername='" + fromusername + '\'' +
                ", forumId=" + forumId +
                ", patientId=" + patientId +
                ", doctorId=" + doctorId +
                '}';
    }
}


