package com.nice.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: tyk
 * @Date: 2018/11/26 11:14
 * @Description:
 */
@Controller
//@RequestMapping("/map/")
public class MapController {

    @RequestMapping("gaode")
    public String index() {
        return "feature";
    }

    @RequestMapping("template")
    public String template() {
        return "template";
    }
}
