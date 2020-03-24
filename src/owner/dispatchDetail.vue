<template>
	<div class="content-wrapper" >
	<section class="content-header">
			<ol class="breadcrumb" style="display: block; float: none;">
				    <a href="/"><i class="fa fa-dashboard"></i></a>
				     <li><a href="javascript:void(0);">发货单</a></li>

				     <li class="active">发货单详情</li>
            </ol>
            <h1 class="pull-right">
                  <router-link to="/orderList"  class="btn btn-primary btn-sm" icon="el-icon-back">返回采购订单</router-link>
            </h1>
		</section>
	<div class="content">
		<div class="box box-primary">
			<div class="box-header with-border">
          <h3 class="box-title" >发货单详情</h3>
      </div>
            <div class="box-body">
            	<div style="margin-bottom:15px ;">发货单号：<span style="color:#AA0000;margin-right:60px ;">{{dispatchOrderId}}</span>
                 订单号：<span style="color:#AA0000;margin-right:60px ;">{{orderid}}</span>
                 订单状态：<span style="color:#AA0000">{{orderstatus}}</span>
              </div>

            	<el-form :model="ruleForm"  ref="ruleForm" label-width="80px" size="small" class="demo-ruleForm demo-dynamic">

					<el-row :gutter="20">
						<el-col :span="24">
							 <el-form-item>
							 <label style="width:80px">收货信息 </label>
				        &nbsp;客户名称：{{name}}  &nbsp; &nbsp;
				        收货人：{{recipientname}}  &nbsp; &nbsp;联系电话：{{recipientmobile}} &nbsp; &nbsp;
				        收货地址：{{dprovince}}{{dcity}}{{dcaton}}{{daddress}}
				         </el-form-item>
				     </el-col>

					</el-row>
        <el-row :gutter="20" style="text-align:left ; padding:5px ; background-color: #d2d6de!important;">
          <el-col :span="3">ID</el-col>
          <el-col :span="3">商品名称</el-col>
          <el-col :span="7">商品规格</el-col>
          <el-col :span="3">订购数</el-col>
          <el-col :span="3">已发货数</el-col>
          <el-col :span="2">剩余发货数</el-col>
          <el-col :span="2">单价</el-col>
        </el-row>
        <el-row :gutter="20" style="margin:10px 0 ;text-align:left ;">
            <el-col :span="3">{{spxx.id}}</el-col>
            <el-col :span="3">{{spxx.goods_Name}}</el-col>
            <el-col :span="7">{{spxx.sku_value}}</el-col>
            <el-col :span="3">{{spxx.number|rounding}}{{spxx.unit}}</el-col>
            <el-col :span="3">{{spxx.numbers|rounding}}{{spxx.unit}}</el-col>
            <el-col :span="2">{{spxx.ynumber|rounding}}{{spxx.unit}}</el-col>
            <el-col :span="2">{{spxx.unitcost}}</el-col>
        </el-row>

					 <el-row :gutter="20" style="margin-top:15px ;">
					    <el-col :span="24" small >
					 	  <span class="pull-right">应付金额：<em style="color:#0060BF;font-style: normal;">{{totalPrice}}</em>元</span>
					 	</el-col>
					</el-row>
			     </el-form-item>
				 <el-row :gutter="20">
					<el-col :span="8" small >
					 <el-form-item label="交货日期"  size="samll">

					    {{readytime}}
					  </el-form-item>
					   </el-col>
					 </el-row>
					 <el-row :gutter="20">
					 	<el-col :span="16"  >

					      <el-form-item label="备注说明">
						    {{remark}}
						  </el-form-item>

						  </el-col>
					 </el-row>



			</el-form>
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
		dispatchOrderId: this.$route.query.dispatchorderid,
		totalPrice:'',
    orderid:'',
     DialogVisible:false,
     flag:false,
     orderstatus:'',
		name:'',
		dprovince:'',
		dcaton:'',
		dcity:'',
		daddress:'',
		dcity:'',
		recipientmobile:'',
		recipientname:'',
		readytime:'',
    spxx:'',
		remark:'',
        tableData:[{}],
        ruleForm:{
         Audit_Info:''
        },
      };
    },
    created() {
	  this.getData();

	},
  filters: {
    rounding (value) {
      return value.toFixed(2)
    }
  },
    methods: {

    	getData(){
				this.$http({
					method: 'get',
					url: '/api/SCM/GetDispatchInfo',
					dataType: "json",
					params: {
						dispatchOrderId: this.dispatchOrderId
					}
				}).then((response) => { //这里使用了ES6的语法
					console.log(response)
					  let _this = this
				      let newsAarys = {};
				   _this.spxx=response.data.data.DispatchOrderInfo.dispatchOrderGoods;


				    newsAarys.customerOrderGoods = _this.tableData;
					newsAarys.customerOrderGoods.forEach(element => {
						console.log(element);
						_this.$set(element, 'sku_id', element.skuid)
						_this.$set(element, 'price', element.unitcost)
					})
				    _this.totalPrice=response.data.data.DispatchOrderInfo.totalordermoney;
				   _this.name=response.data.data.DispatchOrderInfo.name;
            _this.orderid=response.data.data.DispatchOrderInfo.orderid;
              _this.orderstatus=response.data.data.DispatchOrderInfo.orderstatus;

				    this.userid=response.data.data.DispatchOrderInfo.customerid;
				    this.dprovince=response.data.data.DispatchOrderInfo.dprovince;
				    this.dcaton=response.data.data.DispatchOrderInfo.dcaton;
				    this.dcity=response.data.data.DispatchOrderInfo.dcity;
				    this.daddress=response.data.data.DispatchOrderInfo.daddress;
				    this.dcity=response.data.data.DispatchOrderInfo.dcity;
				    this.recipientmobile=response.data.data.DispatchOrderInfo.recipientmobile;
				    this.recipientname=response.data.data.DispatchOrderInfo.recipientname;
				    this.readytime=response.data.data.DispatchOrderInfo.readytime;
				    this.remark=response.data.data.DispatchOrderInfo.remark;
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
