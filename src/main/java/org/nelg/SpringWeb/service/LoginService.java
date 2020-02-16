package org.nelg.SpringWeb.service;

import org.nelg.SpringWeb.dao.AdminDao;
import org.nelg.SpringWeb.entity.Admin;
import org.nelg.SpringWeb.form.LoginForm;
import org.nelg.SpringWeb.util.Debug;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("loginService")
public class LoginService {

    @Autowired
    private AdminDao adminDao;

    public boolean login(LoginForm loginForm) {

        Admin admin = this.adminDao.findByUsername(loginForm.getUsername());
        Debug.printObject(admin);

        return true;
    }
}
