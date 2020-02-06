package org.nelg.SpringWeb.util;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.Random;

public class Captcha {

    static public BufferedImage createCaptcha(String code, int width, int height) {
        Random random = new Random();

        // 创建图片类
        BufferedImage image = new BufferedImage(width, height, 1);
        // 获取画图工具
        Graphics graphics = image.getGraphics();
        graphics.setColor(Captcha.getRandColor(200, 250));
        graphics.setFont(new Font("Times New Roman", 0, 28));
        graphics.fillRect(0, 0, width, height);

        // 绘制干扰线
        for (int i = 0; i < 40; i++) {
            graphics.setColor(Captcha.getRandColor(130, 200));

            int x = random.nextInt(width);
            int y = random.nextInt(height);
            int x1 = random.nextInt(12);
            int y1 = random.nextInt(12);
            graphics.drawLine(x, y, x + x1, y + y1);
        }

        for (int i = 0; i < code.length(); i++) {
            graphics.setColor(new Color(20 + random.nextInt(110), 20 + random.nextInt(110), 20 + random.nextInt(110)));
            graphics.drawString(String.valueOf(code.charAt(i)), 13 * i + 6, 28);
        }

        graphics.dispose();

        return image;
    }

    static protected Color getRandColor(int fc, int bc) {
        Random random = new Random();
        if (fc > 255) {
            fc = 255;
        }
        if (bc > 255) {
            bc = 255;
        }

        int r = fc + random.nextInt(bc - fc);
        int g = fc + random.nextInt(bc - fc);
        int b = fc + random.nextInt(bc - fc);

        return new Color(r, g, b);
    }

    static public String createCode(int length) {
        Random random = new Random();
        String code = "";

        for (int i = 0; i < length; i++) {
            String rand = String.valueOf(random.nextInt(10));
            code += rand;
        }

        return code;
    }
}
