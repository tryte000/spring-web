package org.nelg.SpringWeb.entity;

public class Account {

    protected String username;

    protected int age;

    public Account() {
    }

    public Account(String username, int age) {
        this.username = username;
        this.age = age;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Account{" +
                "username='" + username + '\'' +
                ", age=" + age +
                '}';
    }
}
