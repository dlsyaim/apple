//jQuery.support.cors = true;
$(function () {
    /**
     * 公共函数
     * 获取单位
     * @param  {object} dom 作用范围
     * @return {string}     '种植面积', '产量'
     */
    function getDanwei(dom) {
        var danwei = '';
        $(dom + " .pub-radio li").each(function () {
            var flag = $(this).is(".active");
            if (flag) {
                danwei = $(this).text();
            }
        });
        return danwei;
    }

    /**  6月12号要求更换单产预测图表  **/
    var weatherData = {
        datas: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'],
        data1: [30, 10, '-', 20, 80, 10],
        data2: [10, 20, 30, 40, 50, 10, 20]
    }

    var weatherEffect = echarts.init(document.getElementById('weather-effect'));
    setDatas(weatherData);

    function setDatas(data) {
        option = {
            tooltip: {
                //trigger: 'item',
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    shadowStyle: {
                        color: 'rgba(0,46, 115, 0.3)'
                    }
                },
                textStyle: {
                    align: 'left',
                    //color: '#5cc1ff',
                    color: '#fff',
                    fontSize: '16'
                },
                formatter: function (params) {
                    var str = params[0].name + "<br>";
                    params.forEach(function (v, i) {
                        str += v.seriesName + ": " + v.value + "公斤/亩" + "<br>";
                    });
                    return str
                },
                backgroundColor: 'rgba(15, 52, 135, 0.5)',
                borderWidth: '1',
                borderColor: '#5cc1ff',
                extraCssText: 'box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);',
            },
            grid: {
                left: '50',
                right: '50',
                bottom: '30',
                containLabel: true
            },
            legend: {
                data: ['实际单产', '预测单产'],
                right: '60',
                top: '20',
                textStyle: {
                    color: echartOpt.color,
                    //fontSize: echartOpt.fz
                },
                itemGap: 20,
                itemHeight: 15,
                itemWidth: 25
            },
            color: ["#1abc9c", "#1abc9c", "#ffaa3d", "#0130fb", "#0130fb"],
            xAxis: {
                type: 'category',
                name: '年',
                nameTextStyle: {
                    fontSize: echartOpt.fz,
                    color: echartOpt.color
                },
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: '#8ac7ff'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: echartOpt.fz,
                        color: echartOpt.color
                    }
                },
                data: data.datas
            },
            yAxis: {
                type: 'value',
                name: '单产（公斤／亩）',
                nameTextStyle: {
                    fontSize: echartOpt.fz,
                    color: echartOpt.color
                },
                show: true,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#88c6ff'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: echartOpt.fz,
                        color: echartOpt.color
                    }
                },
                splitLine: {
                    show: true,
                    formatter: '{value}',
                    lineStyle: {
                        color: 'rgba(138, 199, 255, .2)'
                    }
                }
            },
            series: [{
                name: '实际单产',
                type: 'line',
                smooth: true,
                symbolSize: 15,
                itemStyle: {
                    normal: {
                        color: 'rgb(222,119,53)',
                        borderWidth: 2
                    },
                    emphasis: {
                        borderColor: '#fc7303'
                    }
                },
                data: data.data1

            },
                {
                    name: '预测单产',
                    type: 'line',
                    symbolSize: 15,
                    itemStyle: {
                        normal: {
                            color: 'rgb(94,247,82)',
                            borderWidth: 2
                        },
                        emphasis: {
                            borderColor: '#75f908'
                        }
                    },
                    smooth: true,
                    data: data.data2
                }
            ]
        };
        weatherEffect.setOption(option);
    }
});


/**
 * 气象监测预警页面的js
 * */

    //  模拟数据
var selectedArea = '';
var dataMap = null;
var dataMapSD = [
    {name: "莒县", coord: [118.851051, 35.586736], level: 0},
    {name: "庆云县", coord: [117.408957, 37.785016], level: 0},
    {name: "冠县", coord: [115.450462, 36.492479], level: 2},
    {name: "昌乐县", coord: [118.836966, 36.71465], level: 0},
    {name: "广饶县", coord: [118.411529, 37.060099], level: 1},
    {name: "郓城县", coord: [115.955377, 35.61073], level: 1},
    {name: "东阿县", coord: [116.249734, 36.340699], level: 2},
];
var dataMapSX = [
    {name: "凤县", coord: [106.518212, 33.915261], level: 1},
    {name: "靖边县", coord: [108.798901, 37.610759], level: 2},
    {name: "绥德县", coord: [110.264936, 37.515562], level: 0},
    {name: "白水县", coord: [109.593435, 35.190537], level: 1}
];

//封装数据的方法
function setMapData(dataMap, n) {
    map.show({
        mapType: n,
        data: dataMap
    });
    var select = {},
        selectDom = $('.visualMap li');
    selectDom.each(function (i, item) {
        select[i] = true;
        $(item).unbind().bind('click', function () {
            //点击图例切换active类名
            $(this).toggleClass('active');
            var _i = $(this).index(),
                selectData = [];
            select[_i] = !select[_i];
            for (var j = 0; j < dataMap.length; j++) {
                if (select[dataMap[j].level]) {
                    selectData.push(dataMap[j]);
                }
            }
            map.show({
                mapType: n,
                data: selectData
            });
        })
    });
}

//  实例
var map = new window.jusfounDisasterMap.DisasterMap();

/*
     * 初始化
     *   @param  dom 初始化所需dom元素
     *   @param  disaster 图标对应名称  和 icon 顺序保持一致
     *   @param  icon 图标  和 disaster 顺序保持一致
     *   @param  dataAreaColor 有数据地区颜色  和 disaster、icon 顺序保持一致
     *   @param  areaColor 地区默认颜色 默认为白色 '#fff'
     *   @param  iconSize 图标大小 默认是[20,20] 表示 宽和高
     *   @param  jsonUrl json文件以disasterMap.min.js为源的相对路径
     *   @param  tooltipCallBack 提示框的回调 可以定义提示框内容  默认显示内容和示例一样
     * */
map.init({
    dom: $('#crop-warming'),
    disaster: ['低温冻害', '干旱灾害', '连阴雨灾害'],
    icon: ['../images/0.png', '../images/1.png', '../images/2.png'],
    dataAreaColor: ['#fff', 'gold', '#1E4BAC'],
    borderColor: '#fff',
    areaColor: '#4674FE',
    iconSize: [20, 20],
    jsonUrl: '../Lib/data/json/',
    tooltipCallBack: function (d) {
        if (d.componentType == 'markPoint') {
            return '地区 : ' + d.data.name + '<br />灾害类型 : ' + d.data.message
        }
    }
});

/*
 * 渲染数据
 *   @param  mapType 渲染省份的名称 中文
 *   @param  data 数据
 *       格式为[
 *           {
 *              name : '名称', --- 地区名称
 *             level : '灾害标识',  --- 0 1 2
 *             coord : '[111,222]' --- 地区坐标
 *           }
 *       ]
 * */
//初始化显示的区域
setMapData(dataMapSX, '陕西');

//点击区域显示不同的区域灾害类型
$(".warming .show-area").on('click', "li", function () {
    var text = $(this).text();
    //切换区域时重置图例样式
    $('.visualMap li').removeClass('active');
    switch (text) {
        case '陕西':
            selectedArea = '陕西';
            dataMap = dataMapSX;
            break;
        case '山东':
            selectedArea = '山东';
            dataMap = dataMapSD;
            break;
        default:
    };
    $('.select-area').text(text);
    setMapData(dataMap, selectedArea);
});


//点击灾害类型调用的方法
$(".warming .weather-factor").on('click', "li", function () {
    var area = $(".warming .show-area .active").text();
    var factors = $(this).text();
    switch (area) {
        case '陕西':
            selectedArea = '陕西';
            dataMap = dataMapSX;
            break;
        case '山东':
            selectedArea = '山东';
            dataMap = dataMapSD;
            break;
        default:
    };

    setMapData(dataMap, selectedArea);
});

//resize 方法已存在


