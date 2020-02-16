package org.nelg.SpringWeb.form;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.nelg.SpringWeb.dao.AdminDao;
import org.nelg.SpringWeb.entity.Admin;
import org.nelg.SpringWeb.form.base.BaseForm;
import org.nelg.SpringWeb.service.LoginService;
import org.nelg.SpringWeb.util.Debug;
import org.springframework.beans.factory.annotation.Autowired;

public class LoginForm extends BaseForm {

    protected String username;

    protected String passwd;

    protected String code;

    public String getUsername() {
        return username;
    }

    public LoginForm setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getPasswd() {
        return passwd;
    }

    public LoginForm setPasswd(String passwd) {
        this.passwd = passwd;
        return this;
    }

    public String getCode() {
        return code;
    }

    public LoginForm setCode(String code) {
        this.code = code;
        return this;
    }
}
