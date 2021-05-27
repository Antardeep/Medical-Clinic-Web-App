/**
 * @program: project2
 * @description:
 * @author: Luke
 * @create: 2021-01-06 15:35
 **/


package com.revature.service.impl;

import com.revature.dao.IForumDao;
import com.revature.dao.IMessageDao;
import com.revature.pojo.Forum;
import com.revature.pojo.Message;
import com.revature.service.IForumService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ForumService implements IForumService {


    @Autowired
    private IForumDao forumDao;

    @Autowired
    private IMessageDao iMessageDao;

    @Override
    public List<Message> getMessages() {
        return iMessageDao.findAll();
    }

    @Override
    public Message saveMessage(Message message) {
        return iMessageDao.save(message);
    }

    @Override
    public List<Forum> getForums() {
        return forumDao.findAll();
    }

    @Override
    public Forum saveForum(Forum forum) {
        return forumDao.save(forum);
    }

    @Override
    public Forum getForumById(int forumId) {
        return forumDao.findById(forumId).get();
    }

    @Override
    public List<Message> getMessagesByForumId(int forumId) {

        return iMessageDao.getMessageByForumId(forumId);
    }
}


