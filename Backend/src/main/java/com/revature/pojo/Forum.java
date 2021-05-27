/**
 * @program: project2
 * @description: entity for forum
 * @author: Luke
 * @create: 2021-01-06 14:21
 **/


package com.revature.pojo;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "forum")
public class Forum {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "forumid")
    private int forumId;

    @Column(name = "topic")
    private String topic;

    @Column(name = "role")
    private String role;

    @Column(name="username")
    private String username;

    @Column(name = "timestamp")
    private Date timeStamp;

    @Override
    public String toString() {
        return "Forum{" +
                "forumId=" + forumId +
                ", topic='" + topic + '\'' +
                ", role='" + role + '\'' +
                ", username='" + username + '\'' +
                ", timeStamp=" + timeStamp +
                '}';
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Date getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Date timeStamp) {
        this.timeStamp = timeStamp;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getForumId() {
        return forumId;
    }

    public void setForumId(int forumId) {
        this.forumId = forumId;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }
}


