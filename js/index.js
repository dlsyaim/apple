$(function () {
    // index.js 页面内部的 部分全局变量
    var MUTI = {
        mapDir: '../'
    };



    // =================================================================
    // 历史演变
    var history = charts.init( {id: 955, container: "history", option: {
        series: [
            {
                name: '全国产量',
                data: [randomData(),randomData(),randomData(),randomData(),randomData(),randomData()]
            },
            {
                name: '陕西产量',
                data: [randomData(),randomData(),randomData(),randomData(),randomData(),randomData()]
            },
            {
                name: '山东产量',
                data: [randomData(),randomData(),randomData(),randomData(),randomData(),randomData()]
            },
            {
                name:'全国产量变化率',
                data:[randomData2(),randomData2(),randomData2(),randomData2(),randomData2(),randomData2()]
            },
            {
                name:'陕西产量变化率',
                data:[randomData2(),randomData2(),randomData2(),randomData2(),randomData2(),randomData2()]
            },
            {
                name:'山东产量变化率',
                data:[randomData2(),randomData2(),randomData2(),randomData2(),randomData2(),randomData2()]
            }
        ]
    } });

    // 生产占比 左右两个
    var occupy1 = charts.init( {id: 953, container: "occupy1", option: {
        series : [
            {
                name:'苹果园',
                data:[120, 132, 101, 134, 90, 230, 210],

            },
            {
                name:'果园',
                data:[220, 182, 191, 234, 290, 330, 310]
            }
        ]
    } });
    var occupy2 = charts.init( {id: 954, container: "occupy2", option: {
        legend: {
                data:['苹果园','其它'],
        },
        series : [
            {
                data:[
                    {
                        value:5,
                        name:'苹果园',
                    },
                    {
                        value:10,
                        name:'其它',
                    }
                ]
            }
        ]
    } });

    /**
     * **************无关后台数据交互*************，只是前端页面中 图例事件 点击演示效果
     * 图例触发事件 左侧点击 某一图例，右侧echarts图表的相应图例亦呈现相应选中不选中状态
     */
    occupy1.on('legendselectchanged', function (params) {
        var name = params.name;
        console.log(name);
        occupy2.dispatchAction({
            type: 'legendToggleSelect',
            name: name
        });
    });

    /**
     * ************有关后台数据交互**********************
     * 点击左侧 echarts 图表不同年份时，右侧echarts 图表 灌入不同数据
     */
    occupy1.on("click", function (params) {
        var name = params.name;
        var time = params.value;
        console.log(time);
        occupy2.setOption({
            legend: {
                    data:['苹果园','果园'],
            },
            series : [
                {
                    data:[
                        {
                            value:30,
                            name:'苹果园',
                        },
                        {
                            value:10,
                            name:'果园',
                        }
                    ]
                }
            ]
        });
    });

    // 品种结构 左右两个
    var varietyStructure1 = charts.init( {id: 953, container: "variety-structure1", option: {
            tooltip : {
                    trigger: 'axis',
                     formatter: "",
            },
            legend: {
                    data:['富士苹果','国光苹果','元帅苹果'],
                    right:30
            },
            series : [
                {
                    name:'富士苹果',
                    data:[120, 132, 101, 134, 90, 230, 210],
                },
                {
                    name:'国光苹果',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'元帅苹果',
                    data:[220, 182, 191, 234, 290, 330, 310]
                }
            ]
    } });
    var varietyStructure2 = charts.init( {id: 957, container: "variety-structure2", option: {
        series : [
            {
                name:' ',
                data:[
                    {
                        value:10,
                        name:'元帅苹果',
                    },
                    {
                        value:5,
                        name:'国光苹果',
                    },
                    {
                        value:15,
                        name:'富士苹果',
                    }
                ]
            }
        ]
    } });


    /**
     * **************无关后台数据交互*************，只是前端页面中 图例事件 点击演示效果
     * 图例触发事件 左侧点击 某一图例，右侧echarts图表的相应图例亦呈现相应选中不选中状态
     */
    varietyStructure1.on('legendselectchanged', function (params) {
        var name = params.name;
        varietyStructure2.dispatchAction({
            type: 'legendToggleSelect',
            name: name
            // selected: Object
        });
    });

    /**
     * ************有关后台数据交互**********************
     * 点击左侧 echarts 图表不同年份时，右侧echarts 图表 灌入不同数据
     */
    varietyStructure1.on("click", function (params) {
        var name = params.name;
        var time = params.value;
        console.log(time);
        varietyStructure2.setOption({
            series : [
                {
                    name:' ',
                    data:[
                        {
                            value:30,
                            name:'元帅苹果',
                        },
                        {
                            value:5,
                            name:'国光苹果',
                        },
                        {
                            value:15,
                            name:'富士苹果',
                        }
                    ]
                }
            ]
        });
    });


    // 树龄结构 左右两个
    var data1 = [0.25,0.3,0.1,0.25,0.25,0.25];
    var data2 = [0.25,0.3,0.3,0.25,0.25,0.25];
    var data3 = [0.25,0.2,0.4,0.25,0.25,0.25];
    var data4 = [0.25,0.2,0.2,0.25,0.25,0.25];
    var treeStructure1 = charts.init( {id: 958, container: "tree-structure1", option: {
        series: [
            {
                name: '0-5年',
                data: data1.map(function(v){
                    return v*100
                })
            },
            {
                name: '5-10年',
                data: data2.map(function(v){
                    return v*100
                })
            },
            {
                name: '10-25年',
                data:data3.map(function(v){
                    return v*100
                })
            },
             {
                name: '25年以上',
                data: data4.map(function(v){
                    return v*100
                })
             }
        ]
    } });
    var treeStructure2 = charts.init( {id: 959, container: "tree-structure2", option: {
         series : [
            {
                name:'',
                data:[
                    {
                        value:randomData(),
                        name:'0-5年',
                    },
                    {
                        value:randomData(),
                        name:'5-10年',
                    },
                    {
                        value:randomData(),
                        name:'10-25年',
                    },
                    {
                        value:randomData(),
                        name:'25年以上',
                    }
                ]
            }
        ]
    } });

    /**
     * **************无关后台数据交互*************，只是前端页面中 图例事件 点击演示效果
     * 图例触发事件 左侧点击 某一图例，右侧echarts图表的相应图例亦呈现相应选中不选中状态
     */
    treeStructure1.on('legendselectchanged', function (params) {
        var name = params.name;
        console.log(name);
        treeStructure2.dispatchAction({
            type: 'legendToggleSelect',
            name: name
        });
    });

    /**
     * ************有关后台数据交互**********************
     * 点击左侧 echarts 图表不同年份时，右侧echarts 图表 灌入不同数据
     */
    treeStructure1.on("click", function (params) {
        var name = params.name;
        var time = params.value;
        console.log(time);
        treeStructure2.setOption({
             series : [
                {
                    name:'',
                    data:[
                        {
                            value:randomData(),
                            name:'0-5年',
                        },
                        {
                            value:randomData(),
                            name:'5-10年',
                        },
                        {
                            value:randomData(),
                            name:'10-25年',
                        },
                        {
                            value:randomData(),
                            name:'25年以上',
                        }
                    ]
                }
            ]
        });
    });


    // 25年以上老龄苹果园分布 －左侧
    var mapDom2 = $("#beyondtf .map")[0];
    var exitDom2 = $("#beyondtf .topName")[0];

    var beyondtfData = [
         {
             "name": "新疆",
             "value": 5200,
             "valueArea": 12023,
             "geoCoord":[87.31,44.05],
         },
         {
             "name": "北京",
             "value": 500,
             "valueArea": 25223,
             "geoCoord":[116.46,39.92],
         },
         {
             "name": "山东",
             "value": 42168,
             "valueArea": 27823,
             "geoCoord":[117.67,36.19],
        }
    ];

    var beyondtf = new JusfounD3Charts.mapSelect();
    beyondtf.init(mapDom2 ,exitDom2);
        beyondtf.setMap({
            // cityData:cityMap,   //地图对应名称
            symbol:oSymbol,    //地图气泡图标
            labelShow:1,      //0:全选，1:valueArea，2:value
            isDown:true,     //是否下钻
            upColor:"#004fff",     //左侧颜色控制
            downColor:"#cff4fb",   //左侧颜色控制
            mapItemStyle:{       //地图样式
                normal: {
                    borderColor: '#1F42AB',
                    borderWidth:1.2,
                    areaColor:  new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: '#3A6BD9'
                    }, {
                        offset: 1,
                        color: '#2C80E7'
                    }]),
                    shadowColor: '#266DD5',
                    shadowOffsetY:4,
                    shadowOffsetX:4,
                    shadowBlur: 5
                },
                emphasis:{
                    areaColor: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: '#FFFB00'
                    }, {
                        offset: 1,
                        color: '#C4BE89'
                    }]),
                }
            },
            jsonUrl:"../Lib/data/json/", //json 路径
            defaultMap:"china",  //  world/china  世界地图暂时不支持下钻
            fn:function(d){
                //d.componentType == markPoint  指产量
                //d.componentType == series 指面积
                return "<span style='color:#ff0000'>"+d.componentType+"</span></br>"+d.name +"："+ d.value
            },
            drillCallBack: beyondCb
        });

    function beyondCb(event) {
        /*调用接口得到数据*/
//        console.log(event);
        if (event.name == "china" || event.name == "中国") {
            beyondtf.setData(beyondtfData);
        } else if (event.name == "山东") {
            beyondtf.setData(data0);
        }
    }

    // 25年以上老龄苹果园分布——时间轴 －左侧
    var beyondtfTimeData = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'];

    var beyondtfBar = new scrollBar({
        dom: document.getElementById('beyondtf-time'),
        height: 12,
        width: 500,
        position: 'bottom',
        backgroundImage: MUTI.mapDir + 'images/scale-bg.png',
        slideStart: 'left',
        slideBgImage: MUTI.mapDir + 'images/scroll-icon.png',
        data: beyondtfTimeData,
        tooltipWidth: 48,
        tooltipHeight: 20,
        tooltipImage: MUTI.mapDir + 'images/tooltip.png'
    });
    beyondtfBar.scrollChange(function (e) {
        console.log(e);
    });

    // 25年以上老龄苹果园分布 － 右侧
    // 排名占比
    $(".charts-tab .tab-nav li").on("click", function () {
        var index = $(this).index();
        if (index == '0') {
            // 排名占比
            charts.init( {id: 956, container: "rank", option: {
                series : [
                   {
                       data:[
                           {
                               value:'10',
                               name: '山西'
                           },
                           {
                               value:'20',
                               name: '辽宁'
                           },
                           {
                               value:'30',
                               name: '河南'
                           },
                           {
                               value:'40',
                               name: '河北'
                           },
                           {
                               value:'50',
                               name: '山东'
                           },
                           {
                               value:'60',
                               name: '甘肃'
                           },
                           {
                               value:'70',
                               name: '陕西'
                           }
                       ]
                   }
                ]
            } });
        } else {
            charts.init( {id: 963, container: "proportion", option: {
                series : [
                    {
                        data:[
                            {
                                value:10,
                                name:'元帅苹果',
                            },
                            {
                                value:5,
                            },
                            {
                                value:15,
                                name:'富士苹果',
                            },
                            {
                                value:12,
                                name:'富士苹果',
                            },
                            {
                                value:32,
                                name:'富士苹果',
                            },
                            {
                                value:42,
                                name:'富士苹果',
                            },
                            {
                                value:12,
                                name:'富士苹果',
                            }
                        ]
                    }
                ]
            } });
        }
    });
    $(".charts-tab .tab-nav li:first-child").trigger("click");


    // 果农年龄结构
    window.farmersageStructure1 = charts.init( {id: 961, container: "farmersage-structure1", option: {
        series : [
            {
                name:'男性',
                stack: '总量',
                data:[-200, -170, -240, -244, -200, -220, -210,-200, -170, -240, -244, -200, -220, -210]
            },
            {
                name:'女性',
                type:'bar',
                stack: '总量',
                data:[210, 170, 240, 144, 100, 220, 210,200, 270, 240, 244, 200, 220,220]
            }
        ]
    } });
    window.farmersageStructure2 = charts.init( {id: 962, container: "farmersage-structure2", option: {
        series: [
            {
                name: '男性',
                data: [320, 302,400,220]
            },
            {
                name: '女性',
                data: [120, 132,150,60]
            }
        ]
    } });

    /**
     * **************无关后台数据交互*************，只是前端页面中 图例事件 点击演示效果
     * 图例触发事件 左侧点击 某一图例，右侧echarts图表的相应图例亦呈现相应选中不选中状态
     */
    farmersageStructure1.on('legendselectchanged', function (params) {
        var name = params.name;
        farmersageStructure2.dispatchAction({
            type: 'legendToggleSelect',
            name: name
            // selected: Object
        });
    });

    // 果农老龄化预测
    window.farmersageForecast1 = charts.init( {id: 961, container: "farmersage-forecast1", option: {
        series : [
            {
                name:'男性',
                stack: '总量',
                data:[-200, -170, -240, -244, -200, -220, -210,-200, -170, -240, -244, -200, -220, -210]
            },
            {
                name:'女性',
                stack: '总量',
                data:[210, 170, 240, 144, 100, 220, 210,200, 270, 240, 244, 200, 220,220]
            }
        ]
    } });
    window.farmersageForecast2 = charts.init( {id: 959, container: "farmersage-forecast2", option: {
        series : [
            {
                data:[
                    {
                        value:randomData(),
                        name:'40岁以下',
                    },
                    {
                        value:randomData(),
                        name:'40－50岁',
                    },
                    {
                        value:randomData(),
                        name:'50－60岁',
                    },
                    {
                        value:randomData(),
                        name:'50岁以上',
                    }
                ]
            }
        ]
    } });

});

/**
 * 果农年龄结构
 * ****************有关后台数据交互**************
 * 选择不同时间时 左右两个echarts 图表 同时 灌入新的数据
 */
function timepick(d){
    var year = d.cal.getNewDateStr();
    farmersageStructure1.setOption({
        series : [
            {
                name:'男性',
                stack: '总量',
                data:[-200, -170, -240, -244, -200, -220, -20,-200, -170, -240, -244, -200, -220, -20]
            },
            {
                name:'女性',
                type:'bar',
                stack: '总量',
                data:[20, 170, 240, 144, 100, 220, 210,200, 270, 240, 244, 200, 220,220]
            }
        ]
    });
    farmersageStructure2.setOption({});
}

/**
/**
 * 果农老龄化预测
 * ****************有关后台数据交互**************
 * 选择不同时间时 左右两个echarts 图表 同时 灌入新的数据
 */
function forcast(d){
    var year = d.cal.getNewDateStr();
    farmersageForecast1.setOption({
        series : [
            {
                name:'男性',
                stack: '总量',
                data:[-200, -170, -240, -244, -200, -220, -20,-200, -170, -240, -244, -200, -220, -20]
            },
            {
                name:'女性',
                type:'bar',
                stack: '总量',
                data:[20, 170, 240, 144, 100, 220, 210,200, 270, 240, 244, 200, 220,220]
            }
        ]
    });
    farmersageForecast2.setOption({
        // something else
    });
}
