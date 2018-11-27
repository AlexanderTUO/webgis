$(document).ready(function () {
    //初始化高德地图
    var viewGaode = new ol.View({
        projection: costumProjection,
        zoom: 0,
        center: [0, 0],
        resolutions: [65536, 32768, 16384, 8192, 4096, 2048]
    })

    //初始化osm地图
    var view = new ol.View({
        projection: ol.proj.get("EPSG:3857"),
        zoom: 0,
        center: [0, 0],
        resolutions: [65536, 32768, 16384, 8192, 4096, 2048]
    })

    var map = new ol.Map({
        target: 'map1',
        layer: null,
        // view: view //高德view
        view: view //osmView
    });
    // osm地图
    var OSM = new ol.layer.Tile({
        source: new ol.source.OSM()
    })

    // 高德地图
    var gaodeMapLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
        })
    });

    // 定义矢量地图
    var vectorLayer = new ol.layer.Vector({
        source:ol.source.Vector({
            url: "data / geojson / countries - 110m.json",
            format: new ol.format.GeoJSON()
        })
    })


    map.addLayer(OSM);
    map.addLayer(vectorLayer);
    // map.addLayer(gaodeMapLayer);


    var style = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#19ff0f',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,255,255,0.2)'
        }),
        image: new ol.style.Circle({
            radius: 15,
            fill: new ol.style.Fill({
                color: '#ff382d',
            })
        })
    })


    //地图转换
    var transformMap = null;

    // 定义摩尔维特坐标系
    (new ol.proj.proj4).defs('ESRI:53009', '+proj=moll +lon_0=0 +x_0=0 +y_0=0 +a=6371000 +b=6371000 +units=m +no_defs');

    var costumProjection = new ol.proj.Projection({
        code: 'ESRI:53009',
        extent:[-9009954.605703328,-9009954.605703328,9009954.605703328,9009954.605703328],
        worldExtent:[-179,-90,179,90]
    })

    document.getElementById("projection").onclick=function () {
        if (transformMap == null || transformMap == undefined) {
            transformMap = new ol.Map({
                layers: [vectorLayer],
                render: "convas",
                target: "map2",
                view: new ol.View({
                    projection: costumProjection,
                    zoom: 0,
                    center: [0, 0],
                    resolutions: [65536, 32768, 16384, 8192, 4096, 2048]
                })
            });

            var graticule = new ol.Graticule({
                map: transformMap
            })
        }
    }



})


