package org.nelg.SpringWeb.util;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class Debug {

    /**
     * 打印对象信息
     *
     * @param object
     */
    static public void printObject(Object object) {
        System.out.println(ToStringBuilder.reflectionToString(object));
    }
}
