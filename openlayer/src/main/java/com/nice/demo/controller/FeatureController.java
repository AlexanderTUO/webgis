package com.nice.demo.controller;

import com.nice.demo.bean.FeatureQuery;
import com.nice.demo.entity.FeatureEntity;
import com.nice.demo.service.FeatureService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @Author: tyk
 * @Date: 2018/11/22 09:20
 * @Description:矢量绘制与查询
 */
@Controller
@RequestMapping("/Feature/")
public class FeatureController {

    @Autowired
    public FeatureService featureService;

    @RequestMapping(value = {"save", "save"}, method = RequestMethod.POST)
    @ResponseBody
    public String saveFeature(@RequestBody FeatureQuery featureQuery) {
        FeatureEntity featureEntity = new FeatureEntity();
        BeanUtils.copyProperties(featureQuery,featureEntity);
        String attrData = featureQuery.getAttr();
        String attr[] = attrData.split(",");
        String name = attr[0];
        String city = attr[1];
        featureEntity.setName(name);
        featureEntity.setCity(city);

        featureService.saveFeature(featureEntity);
        return "success";
    }

    @RequestMapping(value = {"query", "query"}, method = RequestMethod.GET)
    @ResponseBody
    public List<FeatureEntity> queryFeatures() {
        List<FeatureEntity> list = featureService.list();
        return list;
    }

}
