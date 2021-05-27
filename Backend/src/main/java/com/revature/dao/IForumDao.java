package com.revature.dao;

import com.revature.pojo.Forum;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IForumDao extends JpaRepository<Forum,Integer> {
}
