/**
 * @program: project2
 * @description: entity for response table
 * @author: Luke
 * @create: 2021-01-06 14:48
 **/


package com.revature.pojo;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "responsetable")
public class ResponseTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="responseid" )
    private int responseId;

    @Column(name = "prescription")
    private String prescription;

    @Column(name = "detail")
    private String detail;

    @Column(name = "timestamp")
    private Date timeStamp;

    @Column(name = "hasappointment")
    private boolean hasAppointment;

    @OneToOne
    @JoinColumn(name="requesttableid")
    private RequestTable requestTableId;
}


