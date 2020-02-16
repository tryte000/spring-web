package org.nelg.SpringWeb.controller;

import org.nelg.SpringWeb.entity.Admin;
import org.nelg.SpringWeb.form.LoginForm;
import org.nelg.SpringWeb.service.LoginService;
import org.nelg.SpringWeb.util.Captcha;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Map;
import java.util.Random;

@Controller
@RequestMapping("/login")
public class LoginController {

    @Autowired
    protected LoginService loginService;

    @RequestMapping(path = "")
    public String index(LoginForm form) {

        if (form.isSubmit()) {
            this.loginService.login(form);
        }

        return "login/index";
    }

//    @RequestMapping(path = "")
//    public String index(@RequestParam Map<String, Object> param) {
//
//        for (Map.Entry<String, Object> entry : param.entrySet()) {
//            System.out.println(entry.getKey() + "=" + entry.getValue());
//        }
//
//        return "login/index";
//    }

    /**
     * 获取验证码
     *
     * @param response
     * @param session
     * @throws IOException
     */
    @RequestMapping(path = "/getCode")
    public void getCode(HttpServletResponse response, HttpSession session) throws IOException {
        // 设置response头信息
        // 禁止缓存
        response.setHeader("Pragma", "No-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);

        String code = Captcha.createCode(4);

        session.setAttribute("captcha", code);

        // 创建验证码图片
        int width = 63;
        int height = 37;
        BufferedImage image = Captcha.createCaptcha(code, width, height);

        ImageIO.write(image, "JPEG", response.getOutputStream());

        response.getOutputStream().flush();
    }
}
