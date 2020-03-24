<template>
	<div class="content-wrapper" >
	<section class="content-header">
			<ol class="breadcrumb" style="display: block; float: none;">
				    <a href="/"><i class="fa fa-dashboard"></i></a>
				     <li><a href="javascript:;">销售</a></li>
				     <li><a href="javascript:;">发货单订单</a></li>
				     <li class="active">发货单详情</li>
            </ol>
            <h1 class="pull-right">
               <router-link to="/SalesInvoice"  class="btn btn-primary btn-sm" icon="el-icon-back">返回发货单列表</router-link>
            </h1>
		</section>
	<div class="content">
		<div class="box box-primary">
			<div class="box-header with-border">
                  <h3 class="box-title">发货单详情</h3>
            </div>
            <div class="box-body">
            	<div style="margin-bottom:15px ;">发货单号：<span style="color:#AA0000;margin-right:40px ;">{{dispatchorderid}}</span>

              状态：<span style="color:#AA0000;">{{orderstatus}}</span> <span style="color:#AA0000;margin-left:40px ;">订单号：{{orderid}}</span>
              <el-button type="primary" v-if="flagfc" size="small" @click="chukuzt()">通过</el-button>
              <el-button type="primary" v-if="flagsh" size="small" @click="fhwanc()">发货完成</el-button>
              <el-button type="success" size="small"  v-if="flag"  @click="openst()">审核</el-button>
             <!-- <el-button type="success" size="small" @click="fhbtn" v-if="flagf">发货</el-button> -->
              </div>
              <div style="margin-bottom:10px ;">
                 <el-row :gutter="20">
                     <el-col :span="24">
                        <label style="width:80px">收货信息 </label>
                         &nbsp;客户名称：{{name}}  &nbsp; &nbsp;
                         收货人：{{recipientname}}  &nbsp; &nbsp;联系电话：{{recipientmobile}} &nbsp; &nbsp;
                         收货地址：{{dprovince}}{{dcity}}{{dcaton}}{{daddress}}
                      </el-col>
                 </el-row>
              </div>
            	<el-form :model="ruleForm"   label-width="80px" size="small" class="demo-ruleForm demo-dynamic">
            	<el-col :span="20"><h4>发货信息</h4></el-col>
					   <div>
						<el-row :gutter="20">
							<el-col :span="20"><h4></h4></el-col>
						  <el-col :span="4"><el-button type="primary" v-if="flagf" size="small">发货</el-button></el-col>
						</el-row>
						</div>
            <el-row :gutter="20" style="text-align:left ; padding:5px 10px ; background-color: #d2d6de!important;">
              <el-col :span="4">ID</el-col>
              <el-col :span="6">商品名称</el-col>
              <el-col :span="7">商品规格</el-col>
              <el-col :span="2">发货数</el-col>
              <el-col :span="2">单位</el-col>
              <el-col :span="2">单价</el-col>
            </el-row>
           <el-row :gutter="20" style="text-align:left ; padding:5px 10px ;margin-bottom:10px ;">
             <el-col :span="4">{{cgdd.id}}</el-col>
             <el-col :span="6">{{cgdd.goods_Name}}</el-col>
             <el-col :span="7">{{cgdd.sku_value}}</el-col>
             <el-col :span="2">{{cgdd.number}}</el-col>
             <el-col :span="2">{{cgdd.unit}}</el-col>
             <el-col :span="2">{{cgdd.unitcost}}元</el-col>
           </el-row>

					<el-row :gutter="20" style="margin-top:15px ;">
					    <el-col :span="24" small >
					 	  <span class="pull-right">应付金额：<em style="color:#0060BF;font-style: normal;">{{totalordermoney}}</em>元</span>
					 	</el-col>
					</el-row>
			  </el-form-item>


			</el-form>
      <div style="padding-top:15px ;">交货时间:{{readytime}}</div>
      <div style="padding-top:10px ;">备注:{{remark}}</div>

					</div>
				</div>
	  </div>
    <div style="margin-bottom:20px ;">
      <el-card class="box-card"  style="padding-bottom:30px ;">
        <div  v-for="item in itemss" style="float:left;width:200px; text-align: center;">
           <div  v-if="item.auditStatus==0" style="background:#cccccc ; border-radius:50%; width:60px; height:60px ; line-height:60px ; margin:0 auto ;">
             <P style="color:#fff;font-size:16px ;">{{item.flowNodeindex}}</P>
           </div>
           <div  v-else-if="item.auditStatus==2" style="background:red ; border-radius:50%; width:60px; height:60px ; line-height:60px ; margin:0 auto ;">
             <P style="color:#fff;font-size:16px ;">{{item.flowNodeindex}}</P>
           </div>
            <div  v-else style="background:#4CA844 ; border-radius:50%; width:60px; height:60px ; line-height:60px ; margin:0 auto ;">
              <P style="color:#fff;font-size:16px ;">{{item.flowNodeindex}}</P>
            </div>
            <div class="wzsm" style="font-size:12px;">
                <p style="line-height:22px ;margin:0 ">{{item.nodename}}</p>
             <p style="line-height:22px ; margin:0 ;">{{item.auditUsername}}</p>
               <p style="line-height:22px ; margin:0 ;">{{item.auditDate}}</p>
               <p v-if="item.auditStatus==2">原因： {{item.auditInfo}}</p>
              <p style="line-height:22px ;margin:0 ">订单号:<span style="color:red">{{item.buzid}}</span></p>
            </div>
       </div>

      </el-card>
      </div>
      <!--审核弹出框-->

      <el-dialog
        title="审核确认"
        :visible.sync="shdialogVisible"
        width="35%"
        center>
      	  <el-row :gutter="20">
      		  <el-col :span="20">
      		  	 是否确定发货单{{dispatchorderid}}通过审核？
      		  </el-col>
           <el-col :span="20">
             <el-form :model="ruleForm">
                 <el-form-item label="备注"  prop="Audit_Info">
                   <el-input v-model="ruleForm.Audit_Info" placeholder="请输入原因"></el-input>
                 </el-form-item>

               </el-form>
            </el-col>
      	  </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="shenhejj()">拒绝</el-button>
          <el-button type="primary" @click="OrderStatussh()">确 定</el-button>
        </span>
      </el-dialog>
    <!--确认弹出框-->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="20%">
    	<span>确认，是否继续</span>
    	<span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="OrderStatusQque()">确 定</el-button>
      </span>
    </el-dialog>
    <!--收货完成-->
    <el-dialog title="提示" :visible.sync="dialogVisible0" width="20%">
    	<span>确认，是否继续</span>
    	<span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible0 = false">取 消</el-button>
        <el-button type="primary" @click="fhwanc()">确 定</el-button>
      </span>
    </el-dialog>
	</div>
</template>
<script>
  export default {
    data() {
      return {
      	//订单id
		dispatchorderid: this.$route.query.dispatchorderid,
    totalordermoney:'',
    orderid:'',
    flagf:false,
    flag:false,
    flagfc:false,
    flagsh:false,
    dialogVisible:false,
    shdialogVisible:false,
    auditStatus:'0',
    itemss:'',//步骤数据
		name:'',
		dprovince:'',
		dcaton:'',
		dcity:'',
    orderstatus:'',
    orderstatusc:'',//出库信息
    createtimec:'',//出库信息
    fhdh:'',
    fhtime:'',
    daddress:'',
		dcity:'',
    readytime:'',
    remark:'',
		recipientmobile:'',
		recipientname:'',
    GetDispatchOrderIdList:'',
    cgdd:'',
    fhjil:[],
    tableData:[],
    centerDialogVisible:false,
    DialogVisible:false,
    dialogVisible0:false,
        //单位
    uinit:'',
    numberss:'',
    ruleForm:{
       numberss:'',
    },
      };
    },
    created() {
    this.checkLiuc();
    this.buzhouData();
    this.getData();
	},

    methods: {
      buzhouData(){
        let _this = this;
        	 this.$http({
        	  method: 'get',
        	  url: '/api/GetBuzAuditLine',
        	     params: {
        	  	 buzId:_this.dispatchorderid
        	  }
        	}).then((response) => { //这里使用了ES6的语法
        		 console.log(response.data.code)
             if(response.data.code == 1) {
        			 //alert(response.data.message);
        		  }
        		if(response.data.code != 1) {
               if(response.data.GetBuzAuditLineList===null){
                  return false;
               }
                 if(response.data.GetBuzAuditLineList!="null"){
                   _this.itemss=response.data.data.GetBuzAuditLineList;
                   _auditStatus=response.data.data.GetBuzAuditLineList.auditStatus[0];
                   console.log(_this.itemss);
                   }


        		  //_this.getData();
        		}

        	}).catch((error) => {
        		console.log(error) //请求失败返回的数据
        	})
       },
      cc(){
       location.reload();

      },
      openst(){//审核弹窗
         this.shdialogVisible=true;
       },
       OrderStatussh(){
          let _this = this;
         this.$http({
         		method: 'get',
         		url: '/api/IsBuzAuditFHD',
         		params: {
         			buzId: this.dispatchorderid,
         			auditStatus:true,
         			Audit_Info:_this.ruleForm.Audit_Info
         		}
         	}).then((response) => {
         		console.log(response);
            if(response.data.code == 1) {
            	 alert(response.data.message);
              }
            if(response.data.code != 1) {
               alert(response.data.message);
                this.shdialogVisible = false;
              _this.getData();
               location.reload();
                // this.cc();

             }

         		//请求成功返回的数据
         	}).catch((error) => {
         		console.log(error) //请求失败返回的数据
         	})
         },
         shenhejj(){
            let _this = this;
         	 this.$http({
         	  method: 'get',
         	  url: '/api/IsBuzAuditFHD',
         	  dataType: "json",
         	     params: {
         	  	buzId:_this.OrderId,
              	auditStatus:false,
               Audit_Info:_this.ruleForm.Audit_Info
         	  }
         	}).then((response) => { //这里使用了ES6的语法
         		console.log(response)
              if(response.data.code == 1) {
         			 alert(response.data.message);
         		  }
         		if(response.data.code != 1) {
               alert(response.data.message);
         		   this.shdialogVisible = false;
         		  _this.getData();
               location.reload();
                // this.cc();

             }

         	}).catch((error) => {
         		console.log(error) //请求失败返回的数据
         	})
         },
     fhwactc(){
      this.dialogVisible0=true
     },
      fhwanc(){
      this.$confirm('是否确定完成?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
         method: 'get',
         url: '/api/DispatchOrder/UpdateDispatchOrderStatus',
         params: {
         	dispatchOrderId: this.dispatchorderid,
         	OrderStatus: 'Shipped'
         }
        }).then((response) => {
          console.log(response);
          this.$message({
            type: 'success',
            message: '确认成功!'
          });
          this.getData();
          _this.flagwc = false;
          // row.flagshow = false;
          //请求成功返回的数据
        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消确认'
        });
      });
        },
      //确认收货完成
      OrderStatusQque() {
      	this.$http({
      		method: 'get',
      		url: '/api/DispatchOrder/UpdateDispatchOrderStatus',
      		params: {
      			dispatchOrderId: this.dispatchorderid,
      			OrderStatus: 'Outbound'
      		}
      	}).then((response) => {
      		console.log(response);
      		//alert("确认成功");
      		this.dialogVisible = false;
      		this.getData();


      		//请求成功返回的数据
      	}).catch((error) => {
      		console.log(error) //请求失败返回的数据
      	})

      },
      checkLiuc(){//检查流程是否开启
         let _this = this;
         	 this.$http({
         	  method: 'get',
         	  url: '/api/GetIsBuzAuditFHD',
         	   params: {
         	  	 buzId:_this.dispatchorderid
         	  }
         	}).then((response) => { //这里使用了ES6的语法
         		 console.log(response.data.code)
              if(response.data.code == 1) {
         			 //alert(response.data.message);
               _this.flagfc=true;
         		  }
              if(response.data.code == 11) {
               //alert(response.data.message);
               _this.flag=false;
              }
         		if(response.data.code == 0) {
               //alert(response);
                this.flag=true;
               //alert(response.data.message);
         		  _this.DialogVisible=false;
         		  _this.getData();
         		}

         	}).catch((error) => {
         		console.log(error) //请求失败返回的数据
         	})
         },
         chukuzt(){
          this.dialogVisible=true
         },

    	getData(){//数据展示
    		 let _this = this;
				this.$http({
					method: 'get',
					url: '/api/DispatchOrder/GetDispatchOrderInfo',
					dataType: "json",
				 params: {dispatchOrderId:_this.dispatchorderid}
				}).then((response) => { //这里使用了ES6的语法

					console.log(response)
          _this.orderstatus=response.data.data.DispatchOrderInfo.orderstatus;
          if(_this.orderstatus=="发货完成"){
            this.flagf=false;
            this.flagfc=false;
            this.flagsh=false;
            this.flag=false;
            }
           if(_this.orderstatus=="已取消"){
            this.flag=false;
           }
            if(_this.orderstatus=="已出库"){
             this.flagfc=false;
             this.flagsh=true;
             this.flag=false;
           }
          _this.recipientname=response.data.data.DispatchOrderInfo.recipientname;
          _this.recipientmobile=response.data.data.DispatchOrderInfo.recipientmobile;
          _this.daddress=response.data.data.DispatchOrderInfo.daddress;
           _this.dprovince=response.data.data.DispatchOrderInfo.dprovince;
          _this.dcaton=response.data.data.DispatchOrderInfo.dcaton;
          _this.dcity=response.data.data.DispatchOrderInfo.dcity;
          _this.readytime=response.data.data.DispatchOrderInfo.readytime;
          _this.remark=response.data.data.DispatchOrderInfo.remark;
          _this.orderid=response.data.data.DispatchOrderInfo.orderid;

          _this.cgdd=response.data.data.DispatchOrderInfo.dispatchOrderGoods;
          _this.totalordermoney=response.data.data.DispatchOrderInfo.totalordermoney;
            let newsAarys = {};
				    newsAarys.customerOrderGoods = _this.tableData;
            let newData = [];
            let obj = {};
            newsAarys.customerOrderGoods.map(item => {
              obj = item;
              obj['newnumber'] = item['number'];
              delete obj['number'];
              newData.push(obj);
            })
				   newData.forEach((item, index) => {
						if(!item.ordernumber) {
							this.$set(item, 'number', 1);
						}
					})
          //console.log(newData);
					newsAarys.customerOrderGoods.forEach(element => {
						_this.uinit=element.unit;
						_this.$set(element, 'sku_id', element.skuid)
						_this.$set(element, 'price', element.unitcost)
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
