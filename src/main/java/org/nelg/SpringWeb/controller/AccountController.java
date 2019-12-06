package org.nelg.SpringWeb.controller;

import org.nelg.SpringWeb.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AccountController {

    @Autowired
    private AccountService accountService;

    @RequestMapping(path = "/account/findAll")
    public String findAll() {
        this.accountService.findAll();
        return "success";
    }
}
