<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h4>
        首页 <small>信息概览</small>
      </h4>
    </section>
    <section class="content" style="margin-top:10px ;">
      <h4 style="padding:0; margin:0 ; margin-bottom:20px ; ">平台今日统计</h4>
      <div class="row">
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-aqua"><i class="el-icon-s-fold"></i></span>

            <div class="info-box-content">
              <span class="info-box-text" style="line-height:40px ; font-size:14px ;">待发货单数</span>
              <span class="info-box-number">21</span>
              <span class="info-box-more"><small></small></span>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-red"><i class="el-icon-document-remove"></i></span>

            <div class="info-box-content">
              <span class="info-box-text" style="line-height:40px ; font-size:14px ;">待提货单数</span>
              <span class="info-box-number">￥&nbsp;3,939,028.96</span>
              <span class="info-box-more"><small></small></span>
            </div>
          </div>
        </div>
        <div class="clearfix visible-sm-block"></div>

        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-green"><i class="el-icon-truck"></i></span>
            <div class="info-box-content">
              <span class="info-box-text" style="line-height:40px ; font-size:14px ;">运输中</span>
              <span class="info-box-number">￥&nbsp;2,798,522.60</span>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-blue"><i class="el-icon-time"></i></span>

            <div class="info-box-content">
              <span class="info-box-text" style="line-height:40px ; font-size:14px ;">时间</span>
              <span class="info-box-number" id="now_time"></span>
            </div>
          </div>

        </div>
      </div>
      <h4 style="padding:0; margin:0 ; margin-bottom:20px ; ">平台今日累计</h4>
      <div class="row">
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-aqua"><i class="el-icon-document"></i></span>

            <div class="info-box-content">
              <span class="info-box-text" style="line-height:40px ; font-size:14px ;">订单总数</span>
              <span class="info-box-number">21</span>
              <span class="info-box-more"><small></small></span>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-red"><i class="el-icon-user"></i></span>

            <div class="info-box-content">
              <span class="info-box-text" style="line-height:40px ; font-size:14px ;">客户总数</span>
              <span class="info-box-number">￥&nbsp;3,939,028.96</span>
              <span class="info-box-more"><small></small></span>
            </div>
          </div>
        </div>
        <div class="clearfix visible-sm-block"></div>

        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-green"><i class="el-icon-money"></i></span>
            <div class="info-box-content">
              <span class="info-box-text" style="line-height:40px ; font-size:14px ;">订单总金额</span>
              <span class="info-box-number">￥&nbsp;2,798,522.60</span>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-blue"><i class="el-icon-s-promotion"></i></span>
            <div class="info-box-content">
              <span class="info-box-text" style="line-height:40px ; font-size:14px ;">累计发货数量</span>
              <span class="info-box-number"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-7 col-sm-12 col-xs-12">
          <div class="info-box" style="height:300px; ">
            <div id="myChart" style="height:300px ;" class="col-md-12 col-sm-12 col-xs-12"></div>
          </div>
        </div>
        <div class="col-md-5 col-sm-12 col-xs-12">
          <div class="info-box" style="height:300px; ">
            <div style="height:300px ;" class="col-md-12 col-sm-12 col-xs-12">
              <h4>客户 Top 10</h4>
              <ul style="list-style:none ; padding:0 ; margin:0 ;" class="liul">
                <li><span class="title col-md-8 col-sm-8 col-xs-8" style="color:#03B8CC;">客户名称</span> <span style="color:#03B8CC;">发货量</span></li>
                <li><span class="title col-md-8 col-sm-8 col-xs-8">上海xx</span> <span>144444</span> </li>
                <li><span class="title col-md-8 col-sm-8 col-xs-8">上海xx</span> <span>144444</span> </li>
                <li><span class="title col-md-8 col-sm-8 col-xs-8">上海xx</span> <span>144444</span> </li>
                <li><span class="title col-md-8 col-sm-8 col-xs-8">上海xx</span> <span>144444</span> </li>
                <li><span class="title col-md-8 col-sm-8 col-xs-8">上海xx</span> <span>144444</span> </li>
                <li><span class="title col-md-8 col-sm-8 col-xs-8">上海xx</span> <span>144444</span> </li>
                <li><span class="title col-md-8 col-sm-8 col-xs-8">上海xx</span> <span>144444</span> </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-7 col-sm-12 col-xs-12">
          <div class="info-box" style="height:300px; ">
            <div id="myChart0" style="height:300px ;" class="col-md-12 col-sm-12 col-xs-12"></div>
          </div>
        </div>
        <div class="col-md-5 col-sm-12 col-xs-12">
          <div class="info-box" style="height:300px; ">
            <div style="height:400px ;" class="col-md-12 col-sm-12 col-xs-12">
              <h4>商品分类</h4>
              <div id="echartss" style="height:240px ;" class="col-md-12 col-sm-12 col-xs-12"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        time:''

      }
    },

    mounted: function() {
      this.drawLine();
      this.drawLines();
      this.drawLine0();
      this.funTime()
    },
    beforeDestory: function() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    methods: {
      funTime(){
        var da = new Date();
        var year = da.getFullYear()+'/';
        var month = da.getMonth()+1+'/';
        var date = da.getDate()+'';
        //以上就完成了当前时间的格式设置，接下来就是给span标签赋值：
        $('#now_time').text([year,month,date].join(' '));
      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById("myChart"))
        // 绘制图表
        myChart.setOption({
          grid: {
              left: '1%',   //距离左边的距离
              right: '5%', //距离右边的距离
              top:'7.8%',
              bottom:'3%',
              containLabel: true
              },
              tooltip: {
                trigger: 'axis',
                backgroundColor:'rgba(0,0,0,0.75)',
                axisPointer: {
                  crossStyle: {
                    color: '#999'
                  },
                  label: {
                    backgroundColor: 'rgba(0,0,0,0.75)'
                  }
                },

              },
          title: {
            text: "销售额",
            textStyle: {
              fontStyle: 'normal', //标题字体
              fontSize: 14 //字体大小
            }
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [{
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }]
        });
      },
      drawLine0() {
        let myChart = this.$echarts.init(document.getElementById('echartss'))
        myChart.setOption({
          backgroundColor: '#fff',
          title: {
            text: '商品种类',
            show: false,
            left: 'center',
            top: 0,
            textStyle: {
              color: '#fff',
              fontStyle: 'normal', //标题字体
              fontSize: 14 //字体大小
            }
          },
          //弹窗，响应鼠标指向，显示具体细节
          tooltip: {
            trigger: 'item', //以具体项目触发弹窗
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          //图例，选择要显示的项目
          legend: {
            bottom: 10,
            x: 'center',
            textStyle: {
              color: '#000'
            },
            data: ['钢材', '衣服', '食品', '手机', '柜子'] //注意要和数据的name相对应
          },
          //视觉映射组件，将数据映射到视觉元素上
          visualMap: {
            show: false,
            min: 10,
            max: 650,
            dimension: 0,
            inRange: {
              color: ['black'],
              colorLightness: [0, 1],
              colorSaturation: [0, 1]
            }
          },
          //数据
          series: [{
            name: '商品数据',
            type: 'pie',
            label: {
              normal: {
                formatter: '{b}：{d}%'

              }
            },
            radius: ["40%", "60%"],
            center: ['50%', '40%'],
            data: [{
                value: 335,
                name: '钢材'
              },
              {
                value: 310,
                name: '衣服'
              },
              {
                value: 274,
                name: '食品'
              },
              {
                value: 235,
                name: '手机'
              },
              {
                value: 400,
                name: '柜子'
              }
            ].sort(function(a, b) {
              return a.value - b.value;
            }),
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }

          }]
        })
      },

      drawLines() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById("myChart0"))
        // 绘制图表
        myChart.setOption({
        grid: {
            left: '1%',   //距离左边的距离
            right: '5%', //距离右边的距离
            top:'7.8%',
            bottom:'3%',
            containLabel: true
            },
            tooltip: {
              trigger: 'axis',
              backgroundColor:'rgba(0,0,0,0.75)',
              axisPointer: {
                crossStyle: {
                  color: '#999'
                },
                label: {
                  backgroundColor: 'rgba(0,0,0,0.75)'
                }
              },

            },
          title: {
            text: "累计发货额",
            textStyle: {
              fontStyle: 'normal', //标题字体
              fontSize: 14 //字体大小
            }
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [{
            name: "销量",
            type: "line",
            data: [5, 20, 36, 10, 10, 20]
          }]
        });
      }
    }


  }
</script>

<style scoped>
  .liul li {
    line-height: 30px;
  }

  .liul li span.title {
    font-size: 14px;
  }
</style>
