package org.nelg.SpringWeb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoginController {


    @RequestMapping(path = "/login")
    public String index() {

        return "login/index";
    }
}
