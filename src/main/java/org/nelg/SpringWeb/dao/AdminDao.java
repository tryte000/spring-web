package org.nelg.SpringWeb.dao;

import org.nelg.SpringWeb.entity.Admin;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminDao {

    public Admin findByUsername(String username);
}
