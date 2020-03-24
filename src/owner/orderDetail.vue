<template>
	<div class="content-wrapper" >
	<section class="content-header">
			<ol class="breadcrumb" style="display: block; float: none;">
				    <a href="/"><i class="fa fa-dashboard"></i></a>
				     <li><a href="javascript:void(0);">采购订单</a></li>

				     <li class="active">采购订单详情</li>
            </ol>
            <h1 class="pull-right">
                  <router-link to="/orderList"  class="btn btn-primary btn-sm" icon="el-icon-back">返回采购订单</router-link>
            </h1>
		</section>
	<div class="content">
		<div class="box box-primary">
			<div class="box-header with-border">
          <h3 class="box-title"  style="margin-right:1.825rem ;color:#3c8dbc; padding:0px 5px 5px 5px; border-bottom:2px solid #3c8dbc ; ">订单详情</h3>
          <h3 class="box-title" @click="tiaozhuan"  style="cursor:pointer ;">发货记录</h3>
      </div>
            <div class="box-body">
            	<div style="margin-bottom:15px ;">订单号：<span style="color:#AA0000">{{OrderId}}</span>
                <el-button type="success" size="small" @click="openst" v-if="flag">审核</el-button>
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
				<el-row :gutter="20">
									<el-table
					    :data="tableData"
					    border

					    style="width: 100%">
					    <el-table-column
					      prop="id"
					      label="ID"
					     >
					    </el-table-column>
					       <el-table-column
					      prop="goods_Name"
					      label="商品名称"
					     >
					    </el-table-column>
              <el-table-column
                label="商品规格">
                <template slot-scope="scope">
                  {{scope.row.sku_value}}
                </template>
              </el-table-column>

					     <el-table-column

					      label="数量">
                <template slot-scope="scope">
                  {{scope.row.number}} {{scope.row.unit}}
                </template>

					    </el-table-column>

					     <el-table-column
					      label="单价">
                <template slot-scope="scope">
                  {{scope.row.unitcost}} 元
                </template>
					    </el-table-column>

					  </el-table>

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
		OrderId: this.$route.query.OrderId,
		totalPrice:'',
     DialogVisible:false,
     flag:false,
     auditStatus:'',
		name:'',
		dprovince:'',
		dcaton:'',
		dcity:'',
		daddress:'',
		dcity:'',
		recipientmobile:'',
		recipientname:'',
		readytime:'',

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
    methods: {
      tiaozhuan(){
        this.$router.push({
          path: '/deliveryRecord',
          //path: '/OrdersDetail',
          query: {
            OrderId: this.OrderId
          }
        });
      },
    	getData(){
				this.$http({
					method: 'get',
					url: '/api/SCM/GetOrderInfo',
					dataType: "json",
					params: {
						OrderId: this.OrderId
					}
				}).then((response) => { //这里使用了ES6的语法
					console.log(response)
					  let _this = this
				      let newsAarys = {};
				    this.tableData=response.data.data.CustomerInfo.customerOrderGoods;
				    newsAarys.customerOrderGoods = _this.tableData;
					newsAarys.customerOrderGoods.forEach(element => {
						console.log(element);
						_this.$set(element, 'sku_id', element.skuid)
						_this.$set(element, 'price', element.unitcost)
					})
				    this.totalPrice=response.data.data.CustomerInfo.totalordermoney;
				    this.name=response.data.data.CustomerInfo.name;
				    this.userid=response.data.data.CustomerInfo.customerid;
				    this.dprovince=response.data.data.CustomerInfo.dprovince;
				    this.dcaton=response.data.data.CustomerInfo.dcaton;
				    this.dcity=response.data.data.CustomerInfo.dcity;
				    this.daddress=response.data.data.CustomerInfo.daddress;
				    this.dcity=response.data.data.CustomerInfo.dcity;
				    this.recipientmobile=response.data.data.CustomerInfo.recipientmobile;
				    this.recipientname=response.data.data.CustomerInfo.recipientname;
				    this.readytime=response.data.data.CustomerInfo.readytime;
				    this.remark=response.data.data.CustomerInfo.remark;
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
