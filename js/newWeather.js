/**
 * Created by 路通 on 2017/7/28.
 */
$(function(){

    /**
     *
     * 气象页面影响因素的图表配置
     *
     * ***/

    var seriesData = [{
        name: '10%临界指标',
        dataLJ10: [0.7, 0.9,1.3]
    }, {
        name: '15%临界指标',
        dataLJ15: [0.3, 0.4,0.5]
    }, {
        name: '20%临界指标',
        dataLJ20: [0.4, 0.7,0.9]
    }]
    //取出数据中的name作为legend的数据
    var legendData = [];
    seriesData.forEach(function(v,i){
        legendData.push(v.name)
    })
    //x轴里的数据
    var	Xdate = ['花期和幼果期', '果实膨大期','果实成熟期'];
    setFactor(seriesData,'低温冻害');
    function setFactor(data,textTitle) {
        var influencingFactor = echarts.init(document.getElementById('affectingFactors'));
        var echartOpt = {
            fz: '15',
            color: '#fff'
        };
        var influencingFactorOption = {
            color: ['#FFFF99', '#eb7d22', '#d73f45'],
            grid: {
                bottom: '90',
                right:60,
                left:60
            },
            title: {
                text: textTitle,
                padding:[10,0,0,0],
                left: 'center',
                textStyle: {
                    color: '#fff',
                    fontSize: '20',
                    fontStyle:'normal'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    shadowStyle: {
                        color: 'rgba(0,46, 115, 0.3)'
                    }
                },
                formatter: function(params) {
                    //console.log(params)
                    var str = '';
                    params.forEach(function(v, i) {
                        if(v.value != '-'){
                            str += v.seriesName + ": " + v.value +  "<br>";
                        }
                    });
                    return str

                },
                textStyle: {
                    align: 'left',
                    //color: '#5cc1ff',
                    color: '#fff',
                    fontSize: '16'
                },
                backgroundColor: 'rgba(15, 52, 135, 0.5)',
                borderWidth: '1',
                borderColor: '#5cc1ff',
                extraCssText: 'box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);'
            },
            legend: {
                data: ['10%临界指标', '15%临界指标', '20%临界指标'],
                right: '60',
                top: '5',
                textStyle: {
                    color: echartOpt.color,
                    fontSize: echartOpt.fz
                },
                itemGap: 20,
                itemHeight: 15,
                itemWidth: 25
            },
            calculable: true,
            yAxis: {
                axisLine: {
                    show:true,
                    lineStyle: {
                        color: echartOpt.color
                    }
                },
                axisLabel: {
                    lineStyle: {
                        color: echartOpt.color
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#2f46a1']
                    }
                },
            },
            xAxis: [{
                show: true,
                axisLine: {
                    lineStyle: {
                        color: echartOpt.color
                    }
                },
                axisTick: {
                    show: false,
                    length: 100,
                    interval: 0,
                    alignWithLabel: true
                },
                axisLabel: {
                    show:false
                },
                data: ['-', '-', '-']
            }, {
                name: '',
                //nameLocation: 'start',
                nameTextStyle: {
                    fontWeight: 'bold'
                },
                position: 'bottom',
                offset: 60,
                axisLine: {
                    onZero: false,
                    show: false,
                    lineStyle: {
                        color: echartOpt.color
                    }
                },
                axisTick: {
                    show: false,
                    length: 50,
                    inside: true,
                    interval: 0,
                    alignWithLabel: true
                },
                axisLabel: {
                    interval: 0,
                    inside: true,
                    rotate: '0',
                    textStyle: {
                        fontSize: echartOpt.fz,
                        color: echartOpt.color
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#2f46a1']
                    }
                },
                data: ['4-5月', '6-8月', '9-10月']
            }, {
                name: '',
                show:true,
                //nameLocation: 'start',
                nameTextStyle: {
                    fontWeight: 'bold'
                },
                axisLine: {
                    show:true,
                    onZero: false,
                    lineStyle: {
                        color: echartOpt.color
                    }
                },
                position: 'bottom',
                offset: 90,
                axisTick: {
                    length: 100,
                    inside: false,
                    lineStyle: {color: '#ccc'}
                },
                axisLabel: {
                    interval: 0,
                    inside: true,
                    rotate: '0',
                    textStyle: {
                        fontSize: echartOpt.fz,
                        color: echartOpt.color
                    }
                },
                data: ['花期幼果期', '果实膨大期', '果实成熟期']
            }],
            series: [{
                name: '10%临界指标',
                type: 'bar',
                data: data[0].dataLJ10,
                barMaxWidth: 20,
                itemStyle: {
                    normal: {
                        barBorderRadius: 10,
                        borderColor: '#f9852d',
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 1,
                            color: 'rgba(249,133,45, 0.8)'
                        }, {
                            offset: 0,
                            color: 'rgba(249,133,45, 0.4)'
                        }])
                    },
                    emphasis: {
                        opacity: 1
                    }
                },
                label: {
                    normal: {
                        show: false,
                        position: 'bottom',
                        textStyle: {color: '#000'},
                        formatter: '10%临界指标',
                    }
                }
            }, {
                name: '15%临界指标',
                type: 'bar',
                data: data[1].dataLJ15,
                barMaxWidth: 20,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [{
                                offset: 0,
                                color: '#00b8fe'
                            }, {
                                offset: 1,
                                color: '#1846a3'
                            }]
                        ),
                        opacity: 0.6,
                        barBorderRadius: 30,
                        barBorderColor: '#00b6fc'
                    },
                    emphasis: {
                        opacity: 1
                    }
                },
                label: {
                    normal: {
                        show: false,
                        position: 'bottom',
                        textStyle: {color: '#000'},
                        formatter: '15%临界指标',
                    }
                }
            }, {
                name: '20%临界指标',
                type: 'bar',
                barMaxWidth: 20,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [{
                                offset: 0,
                                color: '#d0bf44'
                            }, {
                                offset: 1,
                                color: '#d0bc44'
                            }]
                        ),
                        opacity: 0.6,
                        barBorderRadius: 30,
                        barBorderColor: '#fbde30'
                    },
                    emphasis: {
                        opacity: 1
                    }
                },
                data: data[2].dataLJ20,
                label: {
                    normal: {
                        show: false,
                        position: 'bottom',
                        textStyle: {color: '#000'},
                        formatter: '20%临界指标',
                    }
                }
            },
                {
                    type: 'bar',
                    data: ['-', '-', '-'],
                    xAxisIndex: 1
                }, {
                    type: 'bar',
                    data: ['-', '-', '-'],
                    xAxisIndex: 2
                }]
        };
        influencingFactor.setOption(influencingFactorOption);
    }


    $(".affectingFactors .weather-factor").on('click', "li", function(e) {
        e.stopPropagation();
        var area = $(".affectingFactors .show-area .active").text();
        var factors = $(this).text();

        setFactor(seriesData,factors);

        if(factors=="低温冻害"){
            setFactor(seriesData,factors);
            $(".affectingFactors .yName").text("该时期日均温度最低的前5%的平均值");
        }

        if(factors=="干旱灾害"){
            setFactor(seriesData,factors);
            $(".affectingFactors .yName").text("无降水量日数 /降水量");
        }

        if(factors=="连阴雨灾害"){
            setFactor(seriesData,factors);
            $(".affectingFactors .yName").text("连续降雨（>0.1mm）三天及以上天数/无降雨天数");
        }

    });



    /***
     * *
     * 单产影响因素分析部分的图表配置
     * *
     * */

    var colors = [ "#2E7FD6",'#2C69C2', '#2448A2','#3ED1A2'];
    var xdata = ['低温','干旱','连阴雨','低温','干旱','连阴雨','低温','干旱','连阴雨'];
    var data =[{
        name: '气象灾害',
        dataQXZH: [1.2,'-', 1.5, 0.9, 1.3, 0.8, '-', 0.2, '-']
    }]
    singleFactor(data);
    /*var data = [Math.random() * 300];
     for (var i = 0; i < 30; i++) {
     data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
     }*/
    function singleFactor(data) {
        var singleFactor = echarts.init(document.getElementById('weather-dc'));
        var echartOpt = {
            fz: '15',
            color: '#fff'
        };
        singleFactorOption = {
            color: colors,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none',
                    shadowStyle: {
                        color: 'rgba(0,46, 115, 0.3)'
                    }
                },
                formatter: function (params) {
                    var str = '';
                    params.forEach(function (v, i) {
                        if (v.value != 'undefined' && v.value != '-') {
                            str += v.seriesName + ": " + v.value + "<br>";
                        }
                    });
                    return str
                },
                textStyle: {
                    align: 'left',
                    //color: '#5cc1ff',
                    color: '#fff',
                    fontSize: '16'
                },
                backgroundColor: 'rgba(15, 52, 135, 0.5)',
                borderWidth: '1',
                borderColor: '#5cc1ff',
                extraCssText: 'box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);'
            },
            legend: {
                data: ['气象灾害'],
                right: '60',
                top: '5',
                textStyle: {
                    color: echartOpt.color,
                    fontSize: echartOpt.fz
                },
                itemGap: 20,
                itemHeight: 15,
                itemWidth: 25
            },
            //calculable: true,
            grid: {
                top: 80,
                left:60,
                right:60
            },
            xAxis: [
                {
                    boundaryGap: true,
                    splitLine: {
                        show: false,
                    },
                    type: 'category',
                    axisLine: {
                        lineStyle: {
                            fontSize: echartOpt.fz,
                            color: echartOpt.color
                        }
                    },
                    axisLabel: {
                        lineStyle: {
                            fontSize: echartOpt.fz,
                            color: echartOpt.color
                        }
                    },
                    boundaryGap: true,
                    data: ['低温','干旱','连阴雨','低温','干旱','连阴雨','低温','干旱','连阴雨']
                },{
                    data: ['低温','干旱','连阴雨','低温','干旱','连阴雨','低温','干旱','连阴雨','模拟的'],
                    boundaryGap:false,
                    show:false
                }

            ],
            yAxis: [
                {
                    type: 'value',
                    name: '指数',
                    splitLine: {
                        show: false,
                    },
                    axisLine: {
                        onZero: true,
                        lineStyle: {
                            fontSize: echartOpt.fz,
                            color: echartOpt.color
                        }
                    },
                    axisLabel: {
                        lineStyle: {
                            fontSize: echartOpt.fz,
                            color: echartOpt.color
                        }
                    },
                }
            ],
            series: [
                {
                    name: '气象灾害',
                    type: 'bar',
                    symbol: 'none',
                    barMaxWidth: 20,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#d0bf44'
                                }, {
                                    offset: 1,
                                    color: '#d0bc44'
                                }]
                            ),
                            opacity: 0.6,
                            barBorderRadius: 30,
                            barBorderColor: '#fbde30'
                        },
                        emphasis: {
                            opacity: 1
                        }
                    },
                    data: data[0].dataQXZH
                },{
                    xAxisIndex: 1,
                    name: '',
                    type: 'bar',
                    data: [],
                    markArea: {
                        silent: true,
                        data: [[{
                            name: '开花期幼果期  4-5月',
                            label:{
                                normal:{
                                    textStyle: {
                                        fontSize: echartOpt.fz,
                                        color: echartOpt.color
                                    }
                                }
                            },
                            coord: [0],
                            itemStyle: {
                                normal: {
                                    color: colors[0]
                                }
                            }
                        }, {
                            coord: [3]
                        }],[{
                            name: '果实膨胀期 6-8月',
                            label:{
                                normal:{
                                    textStyle: {
                                        fontSize: echartOpt.fz,
                                        color: echartOpt.color
                                    }
                                }
                            },
                            coord: [3],
                            itemStyle: {
                                normal: {
                                    color: colors[1],
                                    opcity:'0.3'
                                }
                            }
                        },{
                            coord: [6]
                        }],[{
                            name: '果实成熟期 9-10月',
                            label:{
                                normal:{
                                    textStyle: {
                                        fontSize: echartOpt.fz,
                                        color: echartOpt.color
                                    }
                                }
                            },
                            coord: [6],
                            itemStyle: {
                                normal: {
                                    color: colors[2]
                                }
                            }
                        },{
                            coord: [9]
                        }]
                        ]
                    },
                }
            ]
        };
        singleFactor.setOption(singleFactorOption);
    }


})
