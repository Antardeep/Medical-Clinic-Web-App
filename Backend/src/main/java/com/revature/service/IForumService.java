package com.revature.service;

import com.revature.pojo.Forum;
import com.revature.pojo.Message;

import java.util.List;

public interface IForumService {

    List<Message> getMessages();

    Message saveMessage(Message message);

    List<Forum> getForums();

    Forum saveForum(Forum forum);

    Forum getForumById(int forumId);

    List<Message> getMessagesByForumId(int forumId);
}
