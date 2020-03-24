<template>
	<div class="content-wrapper" >
	<section class="content-header">
			<ol class="breadcrumb" style="display: block; float: none;">
				    <a href="/"><i class="fa fa-dashboard"></i></a>
				     <li><a href="javascript:void(0);">发货</a></li>

				     <li class="active">发货记录</li>
            </ol>
            <h1 class="pull-right">
                  <router-link to="/orderList"  class="btn btn-primary btn-sm" icon="el-icon-back">返回发货单列表</router-link>
            </h1>
		</section>
	<div class="content">
		<div class="box box-primary">
			<div class="box-header with-border">
          <h3 class="box-title" @click="tiaozhuan"  style="cursor:pointer ;" >订单详情</h3>
          <h3 class="box-title" style="margin-left:1.825rem ;color:#3c8dbc; padding:0px 5px 5px 5px; border-bottom:2px solid #3c8dbc ; ">发货记录</h3>
      </div>
            <div class="box-body">
            	<div style="margin-bottom:15px ;">
                 订单号：<span style="color:#AA0000;margin-right:60px ;">{{OrderId}}</span>
                 订单状态：<span style="color:#AA0000">{{orderstatus}}</span>
              </div>
            	<el-form :model="ruleForm"  ref="ruleForm" label-width="80px" size="small" class="demo-ruleForm demo-dynamic">
					  <el-row :gutter="20">
						<el-col :span="24">
							 <el-form-item>
							 <label style="width:80px">收货信息 </label>
				        &nbsp;客户名称：{{companyname}}  &nbsp; &nbsp;
				        收货人：{{recipientname}}  &nbsp; &nbsp;联系电话：{{recipientmobile}} &nbsp; &nbsp;
				        收货地址：{{dprovince}}{{dcity}}{{dcaton}}{{daddress}}
				         </el-form-item>
				     </el-col>

					</el-row>
          </el-form>
          <div style="margin-bottom:15px ;">
          <el-table
            border  :data="fhtable"
            style="width: 100%">

            <el-table-column
              prop="goods_id" width="130"
              label="商品编码"
             >
            </el-table-column>
               <el-table-column
              prop="goods_Name"
              label="商品名称"
             >
            </el-table-column>
            <el-table-column
              label="商品规格"
             >
             <template slot-scope="scope">
                  {{scope.row.sku_value}}
               </template>
            </el-table-column>
          <el-table-column  label="本次订购数" >
             	<template slot-scope="scope">
                 {{scope.row.number | rounding }}{{scope.row.unit}}
             	</template>
             </el-table-column>
             <el-table-column label="已发货数">
                   <template slot-scope="scope">
                     {{scope.row.numbers| rounding }}  {{scope.row.unit}}
                   </template>
                 </el-table-column>
         <el-table-column  label="剩余发货数" >
            	<template slot-scope="scope">
                {{scope.row.ynumber|rounding}}{{scope.row.unit}}
            	</template>
            </el-table-column>



          </el-table>
          </div>
				<!--出库记录-->
             <div>
				    <el-card class="box-card"  style="margin-bottom:15px ;"  v-for="(item,index) in GetDispatchOrderIdList" v-bind:key="item.id">
				      <div slot="header" class="clearfix">
				        <span>发货记录</span>
				      </div>
              <el-row :gutter="20" style="text-align:left ; padding:5px 10px ; background-color: #d2d6de!important;">
                <el-col :span="4">商品名称</el-col>
                <el-col :span="5">商品编码</el-col>
                <el-col :span="7">商品规格</el-col>
                <el-col :span="2">本次发货数</el-col>
              </el-row>
              <el-row :gutter="20" style="text-align:left ; padding:5px 10px ;">
                <el-col :span="4"> {{item.dispatchOrderGoods.goods_id}}</el-col>
                <el-col :span="5">{{item.dispatchOrderGoods.goods_Name}}</el-col>
                <el-col :span="7">{{item.dispatchOrderGoods.sku_value}}</el-col>
                <el-col :span="2">{{item.dispatchOrderGoods.number}}{{item.dispatchOrderGoods.unit}}</el-col>
              </el-row>
				     
				     <div style="line-height:25px ; padding-top:20px ;">状态：{{item.orderstatus}}  {{item.createtime}}</div>
				       <div style="line-height:25px ;">出库信息：发货单号:{{item.dispatchorderid}}</div>
				      </el-row>

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
      	//订单id
		OrderId: this.$route.query.OrderId,
		totalPrice:'',
    orderid:'',
     DialogVisible:false,
     flag:false,
     orderstatus:'',
     dispatchorderid:'',
     GetDispatchOrderIdList:'',
		name:'',
    companyname:'',
		dprovince:'',
		dcaton:'',
		dcity:'',
		daddress:'',
		dcity:'',
		recipientmobile:'',
		recipientname:'',
		readytime:'',
    fhtable:'',
		remark:'',
        tableData:[{}],
        ruleForm:{
         Audit_Info:''
        },
      };
    },
    created() {
	  this.getData();
    this.getDorder();

	},
  filters: {
    rounding (value) {
      value=Number(value);
      return value.toFixed(2)
    }
  },
    methods: {
      tiaozhuan(){
        this.$router.push({
          path: '/orderDetail',
          //path: '/OrdersDetail',
          query: {
            OrderId: this.OrderId
          }
        });
      },

    	getData(){
        let _this=this;
				this.$http({
					method: 'get',
					url: '/api/SCM/GetDispatchOrderId',
					dataType: "json",
					params: {
						OrderId: _this.OrderId
					}
				}).then((response) => { //这里使用了ES6的语法
					_this.GetDispatchOrderIdList=response.data.data.GetDispatchOrderIdList;
          if(response.data.message =="401"){
             _this.$router.replace({ path: '/'})
          }
					//请求成功返回的数据
				}).catch((error) => {
					console.log(error) //请求失败返回的数据
				})
			},
      //订单信息
      getDorder(){
        let _this=this;
      	this.$http({
      		method: 'get',
      		url: '/api/SCM/GetOrderInfo',
      		dataType: "json",
      		params: {
      			OrderId: _this.OrderId
      		}
      	}).then((response) => { //这里使用了ES6的语法
      		console.log(response);
          _this.fhtable=response.data.data.CustomerInfo.customerOrderGoods;
          _this.orderid=response.data.data.CustomerInfo.orderid;
          _this.orderstatus=response.data.data.CustomerInfo.orderstatus;
          _this.dcaton=response.data.data.CustomerInfo.dcaton;
          _this.dcity=response.data.data.CustomerInfo.dcity;
          _this.dprovince=response.data.data.CustomerInfo.dprovince;
          _this.daddress=response.data.data.CustomerInfo.daddress;
          _this.companyname=response.data.data.CustomerInfo.customer.companyname;
          _this.recipientname=response.data.data.CustomerInfo.customer.name;
           _this.recipientname=response.data.data.CustomerInfo.customer.name;
           _this.recipientmobile=response.data.data.CustomerInfo.customer.mobiletel;
          if(response.data.message =="401"){
             _this.$router.replace({ path: '/'})
          }
      		//请求成功返回的数据
      	}).catch((error) => {
      		console.log(error) //请求失败返回的数据
      	})
      }
    }

  }
</script>

<style>
   .el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label {
    line-height: 28px;}
.el-input__inner{border-radius:0 ;}
.el-dialog__body{padding:10px 20px ;}
input[type=file]{display: none;}
.el-upload__tip {
    font-size: 12px;
    color: #606266;
    margin-top: 7px;
    display: inline-block;
    margin-left: 15px;
}
</style>
