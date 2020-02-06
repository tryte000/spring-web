package org.nelg.SpringWeb.controller;

import org.nelg.SpringWeb.util.Captcha;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Random;

@Controller
public class LoginController {


    @RequestMapping(path = "/login")
    public String index() {

        return "login/index";
    }

    @RequestMapping(path = "login/getCode")
    public void getCode(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws IOException {
        int width = 63;
        int height = 37;

        Random random = new Random();

        // 设置response头信息
        // 禁止缓存
        response.setHeader("Pragma", "No-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);

        String code = Captcha.createCode(4);

        session.setAttribute("captcha", code);

        // 创建验证码图片
        BufferedImage image = Captcha.createCaptcha(code, width, height);

        ImageIO.write(image, "JPEG", response.getOutputStream());

        response.getOutputStream().flush();
    }
}
