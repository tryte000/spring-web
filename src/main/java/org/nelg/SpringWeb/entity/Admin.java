package org.nelg.SpringWeb.entity;

public class Admin {

    protected String username;

    protected String passwd;

    protected String truename;

    protected int roleId;

    protected int status;

    public String getUsername() {
        return username;
    }

    public Admin setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getPasswd() {
        return passwd;
    }

    public Admin setPasswd(String passwd) {
        this.passwd = passwd;
        return this;
    }

    public String getTruename() {
        return truename;
    }

    public Admin setTruename(String truename) {
        this.truename = truename;
        return this;
    }

    public int getRoleId() {
        return roleId;
    }

    public Admin setRoleId(int roleId) {
        this.roleId = roleId;
        return this;
    }

    public int getStatus() {
        return status;
    }

    public Admin setStatus(int status) {
        this.status = status;
        return this;
    }
}
