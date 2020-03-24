<template>
  <div class="content-wrapper">
    <section class="content-header">
      <ol class="breadcrumb" style="display: block; float: none;">
        <a href="/"><i class="fa fa-dashboard"></i></a>
        <li>
          <a href="javascript:void(0);">销售</a>
        </li>
        <li>
          <a href="/TransportBillList">运输单</a>
        </li>
        <li class="active">运输单详情</li>
      </ol>
      <h1 class="pull-right">
        <router-link to="/TransportBillList" class="btn btn-primary btn-sm" icon="el-icon-back">返回运输单列表</router-link>
      </h1>
    </section>
    <div class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">运输单详情 </h3>
        </div>
        <div class="box-body">
          <div style="margin-bottom:15px ;">
            运输单号：<span style="color:#AA0000;padding-left:10px ;">{{OrderId}}</span>
          </div>
          <el-row :gutter="10">
            <el-steps :active="orderStatus" align-center>
              <el-step :title="item.title" :description="item.description" v-bind:key="item.id" v-for="item in itemss"></el-step>
            </el-steps>

          </el-row>
          <div style="padding-left:10px ; margin-top:10px ;">
            订单号：<span style="color:#AA0000;padding-left:10px ;">{{orderid}}</span>&nbsp;&nbsp;&nbsp;
            发货单号：<span style="color:#AA0000;padding-left:10px ;">{{dispatchorderid}}</span></div>
          <el-card class="box-card" style="margin-top:20px ;">
            <div slot="header" class="clearfix">
              <span><i class="el-icon-s-goods" style="font-size:24px ;"></i>货物信息</span>
            </div>
            <div>
              <el-row :gutter="10">
                <el-table :data="GoodstableData" style="width: 100%">
                  <el-table-column type="index" label="序号" width="60">
                  </el-table-column>
                  <el-table-column prop="goods_name" label="商品名称">
                  </el-table-column>
                  <el-table-column label="数量" >
                    <template slot-scope="scope">
                      <span>{{scope.row.number}}{{scope.row.unit}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="unitcost" label="单价">
                  </el-table-column>
                </el-table>
              </el-row>
            </div>
          </el-card>
          <el-card class="box-card" style="margin-top:20px ;">
            <div slot="header" class="clearfix">
              <span><i class="el-icon-s-data" style="font-size:24px ;"></i>磅单信息</span>
            </div>
            <div>
              <el-row :gutter="10" style="margin-bottom:10px ;">
                <el-col :xs="22" :sm="12" :md="8" >皮重：{{tareweight}}</el-col>
                <el-col :xs="22" :sm="12" :md="8">毛重：{{grossweight}}</el-col>
                <el-col :xs="22" :sm="12" :md="8">净重：{{netweight}}</el-col>
              </el-row>

            </div>
          </el-card>
          <el-card class="box-card" style="margin-top:20px ;">
            <div slot="header" class="clearfix">
              <span><i class="el-icon-notebook-1" style="font-size:24px ;"></i>承运人信息</span>
            </div>
            <div>
              <el-row :gutter="10" style="margin-bottom:10px ;">
                <el-col :xs="22" :sm="12" :md="8">承运人名称：{{vendorname}}</el-col>
                <el-col :xs="22" :sm="12" :md="8">承运公司：{{vendorcompany}}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :xs="22" :sm="12" :md="8">司机：{{drivername}}</el-col>
                <el-col :xs="22" :sm="12" :md="8">联系电话：{{drivermobile}}</el-col>
                <el-col :xs="22" :sm="12" :md="8">车牌：{{trucknumber}}</el-col>
              </el-row>
            </div>
          </el-card>




          <div style="margin-top:20px ;">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span><i class="el-icon-location-information" style="font-size:24px ;"></i>地址信息</span>
              </div>
              <div>
                <el-row :gutter="20" style="margin-bottom:10px ;">
                  <el-col :span="12">
                    <el-col :span="2"><i class="el-icon-position" style="font-size:24px ;color:red"></i></el-col>
                    <el-col :span="22">
                      <el-row :gutter="24" style="margin-bottom:10px ;">
                        <el-col :span="24" style="margin-bottom:8px ;">联系人：</el-col>
                        <el-col :span="24">提货地址：{{sprovince}}{{scity}}{{scaton}}{{saddress}}</el-col>
                      </el-row>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col :span="2"><i class="el-icon-location-information" style="font-size:24px ;color:#409eff"></i></el-col>
                    <el-col :span="22">
                      <el-row :gutter="24" style="margin-bottom:10px ;">
                        <el-col :span="24" style="margin-bottom:8px ;">联系人：{{recipientmobile}}&nbsp;&nbsp;{{recipientname}}</el-col>
                        <el-col :span="24">收货地址：{{dprovince}}{{dcity}}{{dcaton}}{{daddress}}</el-col>
                      </el-row>
                    </el-col>
                  </el-col>
                </el-row>

              </div>
            </el-card>



          </div>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        //承运人信息
        LogisticId: this.$route.query.LogisticId,
        orderid: '',
        drivermobile: "",
        drivername: "",
        trucknumber: "",
        vendorcompany: "",
        vendorname: "",
        //卸货地址信息
        dprovince: "",
        dcity: "",
        dcaton: "",
        daddress: "",
        orderId: "",
        tareweight: '',
        grossweight: '',
        netweight: '',

        //提货地址
        province: "",
        city: "",
        caton: "",
        address: "",
        sprovince: '',
        scity: '',
        scaton: '',
        saddress: '',
        recipientmobile: '',
        recipientname: '',
        //磅单信息
        dispatchorderid: "", //发货单号

        orderStatus: 1,
        //状态数据
        itemss: [{
            title: '已创建',
            description: ''
          }, {
            title: '已派车',
            description: ''
          },
          {
            title: '已到场',
            description: ''
          }, {
            title: '已出场',
            description: ''
          }, {
            title: '已送达',
            description: ''
          }, {
            title: '已签收',
            description: ''
          }
        ],
        DetailData: "", //
        //订单id
        OrderId: this.$route.query.logisticid,
        GoodstableData: [], //货物信息
        logisttableData: [], //承运人信息

      };
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        let _this = this;
        this.$http({
          method: 'get',
          url: '/api/LogisticOrderApi/GetLogisticOrderInfo',
          dataType: "json",
          params: {
            OrderId: _this.OrderId
          }
        }).then((response) => { //这里使用了ES6的语法
          console.log(response)
          _this.DetailData = response.data.data.LogisticOrderInfo;
           _this.orderid = response.data.data.LogisticOrderInfo.orderid;
          _this.dispatchorderid = response.data.data.LogisticOrderInfo.dispatchorderid;
          if(response.data.data.LogisticOrderInfo.dispatchOrderid==null){
            _this.dispatchOrderid='';
          }
          //承运商信息
          if (response.data.data.LogisticOrderInfo.vendorInfoDTO == null) {
            _this.drivermobile = "";
            _this.drivername = "";
            _this.trucknumber = "";
            _this.vendorcompany = "";
            _this.vendorname = "";
          } else {
            _this.drivermobile = response.data.data.LogisticOrderInfo.vendorInfoDTO.drivermobile;
            _this.drivername = response.data.data.LogisticOrderInfo.vendorInfoDTO.drivername;
            _this.trucknumber = response.data.data.LogisticOrderInfo.vendorInfoDTO.trucknumber;
            _this.vendorcompany = response.data.data.LogisticOrderInfo.vendorInfoDTO.vendorcompany;
            _this.vendorname = response.data.data.LogisticOrderInfo.vendorInfoDTO.vendorname;
          }

          //货物信息

          if (response.data.data.LogisticOrderInfo.logisticOrderGoods == null) {
            _this.GoodstableData = '';
          } else {
            _this.GoodstableData = response.data.data.LogisticOrderInfo.logisticOrderGoods;
          }

          //地址信息
          _this.dprovince = response.data.data.LogisticOrderInfo.dprovince;
          _this.dcity = response.data.data.LogisticOrderInfo.dcity;
          _this.dcaton = response.data.data.LogisticOrderInfo.dcaton;
          _this.daddress = response.data.data.LogisticOrderInfo.daddress;
          _this.sprovince = response.data.data.LogisticOrderInfo.sprovince;
          _this.scity = response.data.data.LogisticOrderInfo.scity;
          _this.scaton = response.data.data.LogisticOrderInfo.scaton;
          _this.saddress = response.data.data.LogisticOrderInfo.saddress;

          _this.recipientmobile = response.data.data.LogisticOrderInfo.recipientmobile;
          _this.recipientname = response.data.data.LogisticOrderInfo.recipientname;
          //磅单信息
          if (response.data.data.LogisticOrderInfo.logisticWeighthInfoDO == null) {
            _this.grossweight = "";
            _this.netweight = "";
            _this.tareweight = "";
          } else {
            _this.grossweight = response.data.data.LogisticOrderInfo.logisticWeighthInfoDO.grossweight;
            _this.netweight = response.data.data.LogisticOrderInfo.logisticWeighthInfoDO.netweight;
            _this.tareweight = response.data.data.LogisticOrderInfo.logisticWeighthInfoDO.tareweight;
          }
          //运输状态

          _this.items = response.data.data.LogisticOrderInfo.orderstatusLog;
          _this.items.forEach(function(c) {
            if (c.orderStatus == "已创建") {
              _this.orderStatus = 1;
              _this.itemss[0].description = c.createTime;
              console.log(c.createTime)
            } else if (c.orderStatus == "已派车") {
              _this.orderStatus = 2;

              _this.itemss[1].description = c.createTime;
              console.log(c.createTime)
            } else if (c.orderStatus == "已到场") {
              _this.orderStatus = 3;
              _this.itemss[2].description = c.createTime;
              console.log(c.createTime)
            } else if (c.orderStatus == "已出场") {
              _this.orderStatus = 4;
              _this.itemss[3].description = c.createTime;
              console.log(c.createTime)
            } else if (c.orderStatus == "已送达") {
              _this.orderStatus = 5;
              _this.itemss[4].description = c.createTime;
              console.log(c.createTime)
            } else if (c.orderStatus == "已签收") {
              _this.orderStatus = 6;
              _this.itemss[5].description = c.createTime;
              console.log(c.createTime)
            }
          })


          //请求成功返回的数据
        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })
      }
    }
  }
</script>

<style>
.el-card__header{background:#3c8dbc!important; padding:10px 20px!important ;color: #fff!important;}
</style>
