<template>
	<div class="content-wrapper" >
	<section class="content-header">
			<ol class="breadcrumb" style="display: block; float: none;">
				    <a href="/"><i class="fa fa-dashboard"></i></a>
				     <li><a href="javascript:;">销售</a></li>
				     <li><a href="javascript:;">发货单订单</a></li>
				     <li class="active">发货</li>
            </ol>
            <h1 class="pull-right">
                  <router-link to="/SalesInvoice"  class="btn btn-primary btn-sm" icon="el-icon-back">返回发货单列表</router-link>
            </h1>
		</section>
	<div class="content">
		<div class="box box-primary">
			<div class="box-header with-border">
          <h3 class="box-title" @click="ordrsrc" >订单详情</h3>
          <h3 class="box-title"  style="margin-left:1.825rem ;color:#3c8dbc; padding:0px 5px 5px 5px; border-bottom:2px solid #3c8dbc ; ">发货详情</h3>
      </div>
            <div class="box-body">
            	<div style="margin-bottom:15px ;">订单号：<span style="color:#AA0000;margin-right:30px ;">{{OrderId}}</span>
                订单状态： {{orderstatus}}
                <el-button type="success" size="small" @click="yiwanc" v-if="flagwc">结算</el-button>
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
					<div>
						<el-row :gutter="20">
							<el-col :span="20"><h4>待出库商品清单</h4></el-col>

						     <el-col :span="4"><el-button type="primary"  size="small" v-if="flagf" @click="openchuku">发货</el-button></el-col>
						</el-row>
						</div>
				     <el-row :gutter="20">
									<el-table
					    :data="tableData"
					    border
					    style="width: 100%">
					    <el-table-column
					      prop="id"
					      label="ID" width="70"
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
					     <el-table-column
					      label="订购数量">
                <template slot-scope="scope">
                  {{scope.row.newnumber | rounding}} {{scope.row.unit}}
                	</template>
					    </el-table-column>
					     <el-table-column
					      label="单价">
                <template slot-scope="scope">
                  {{scope.row.unitcost}} 元
                	</template>
					    </el-table-column>
					    <el-table-column
					      label="已发货数">
              <template slot-scope="scope">
                {{scope.row.numbers | rounding}} {{scope.row.unit}}
              	</template>
					    </el-table-column>

              <el-table-column
                label="剩余发货数">
                <template slot-scope="scope">
                  {{scope.row.ynumber | rounding}} {{scope.row.unit}}
                	</template>
              </el-table-column>
					    <el-table-column prop="number" label="本次发货数" >
							<template slot-scope="scope">
								<el-row :gutter="20">
								 	<el-col :span="14">  <el-input-number :min="0" size="mini" @change="handleDataChange($event,scope.row)" v-model="scope.row.number"></el-input-number></el-col>
								 	<el-col :span="4">{{uinit}}</el-col>
								</el-row>
							</template>
						</el-table-column>

					  </el-table>

					  </el-row>

					<!-- <el-row :gutter="20" style="margin-top:15px ;">
					    <el-col :span="24" small >
					 	  <span class="pull-right" v-if="showcf">应付金额：<em style="color:#0060BF;font-style: normal;">{{totalPrice}}</em>元</span>
					 	</el-col>
					</el-row> -->
			  </el-form-item>


			</el-form>
					</div>
				</div>
        <!--出库记录-->

        <el-card class="box-card"  style="margin-bottom:5px ;"  v-for="(item,index) in GetDispatchOrderIdList" v-bind:key="item.id">
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
	  <!--出库确认-->
	  <el-dialog
  title="发货确认"
  :visible.sync="centerDialogVisible"
  width="20%"
  center>
	  <el-row :gutter="20">
		  <el-col :span="20">
		  	  <!-- 出库金额：{{totalPrice}} -->
		  </el-col>
	  </el-row>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="chukucomfirm()">确 定</el-button>
  </span>
</el-dialog>
 <!--审核确认-->
	  <el-dialog
  title="审核确认"
  :visible.sync="DialogVisible"
  width="20%"
  center>
	  <el-row :gutter="20">
		  <el-col :span="20">
		  	 是否确定订货单{{OrderId}}通过订单审核？
		  </el-col>
	  </el-row>
  <span slot="footer" class="dialog-footer">
    <el-button @click="DialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="shenhecomfirm()">确 定</el-button>
  </span>
</el-dialog>


	</div>
</template>
<script>
  export default {
    data() {
      return {
        //发货记录数据
      	//订单id

		OrderId: this.$route.query.OrderId,
    dispatchorderid:'',
		totalPrice:0,
    flagf:false,
		name:'',
    showcf:true,
		dprovince:'',
		dcaton:'',
		dcity:'',
    orderstatus:'',
    flagwc:false,
    orderstatusc:'',//出库信息
    createtimec:'',//出库信息
    fhdh:'',
     fhtime:'',
		daddress:'',
		dcity:'',
		recipientmobile:'',
		recipientname:'',
    GetDispatchOrderIdList:'',
        fhjil:[],
        tableData:[{


        }],
        centerDialogVisible:false,
        DialogVisible:false,
        //单位
        uinit:'',
        numberss:'',
        ruleForm:{
        	numberss:'',
        },
      };
    },
    created() {
	  this.getData();
    this.fahuoData();
    this.checkLiucfhd();
	},
  filters: {
    rounding (value) {
      value=Number(value);
      return value.toFixed(2)
    }
  },
	watch: {
			newTableData() {
				this.$nextTick(() => {
					this.sumMoney();

				})
			}
	},
    methods: {
      ordrsrc(){//跳转到订单详情页面
     this.$router.push({
       path: '/OrdersDetail',
       //path: '/OrdersDetail',
       query: {
         OrderId: this.OrderId
       }
     });

      },

      checkLiucfhd(){//检查发货单流程是否开启
         let _this = this;
         	 this.$http({
         	  method: 'get',
         	  url: '/api/GetIsBuzAuditFHD',
         	   params: {
         	  	 buzId:_this.OrderId
         	  }
         	}).then((response) => { //这里使用了ES6的语法
         		 console.log(response.data.code)
              if(response.data.code == 1) {
         			 //alert(response.data.message);
         		  }
              if(response.data.code == 11) {
               //alert(response.data.message);
              }
         		if(response.data.code != 1) {
              if(this.orderstatus=="发货中"){
                 _this.flagf=true;
                }

               //alert(response.data.message);
         		  _this.DialogVisible=false;
         		  _this.getData();
         		}

         	}).catch((error) => {
         		console.log(error) //请求失败返回的数据
         	})
         },
      checkLiuc(){//审核
         let _this = this;
         	 this.$http({
         	  method: 'get',
         	  url: '/api/IsBuzAuditFHD',
         	   params: {
         	  	 buzId:_this.OrderId
         	  }
         	}).then((response) => { //这里使用了ES6的语法
         		 console.log(response.data.code)
              if(response.data.code == 1) {
         			 //alert(response.data.message);
         		  }
         		if(response.data.code != 1) {
               _this.flagf=true;
               //alert(response.data.message);
         		  _this.DialogVisible=false;
         		  _this.getData();
         		}

         	}).catch((error) => {
         		console.log(error) //请求失败返回的数据
         	})
         },
         yiwanc(){
            this.$confirm('是否进行结算?', '提示', {
                     confirmButtonText: '确定',
                     cancelButtonText: '取消',
                     type: 'warning'
                   }).then(() => {
                     this.$http({
                     	method: 'get',
                     	url: '/api/CustomerOrder/UpdateCustomerOrderStatus',
                     	params: {
                     		OrderId: this.OrderId,
                     		OrderStatus: 'ShippingOut'
                     	}
                     }).then((response) => {
                     	console.log(response);
                     	this.$message({
                     	  type: 'success',
                     	  message: '确认成功!'
                     	});

                     	this.getData();
                      _this.flagwc=false;
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
      buzhouData(){
        let _this = this;
        	 this.$http({
        	  method: 'get',
        	  url: '/api/GetBuzAuditLine',
        	     params: {
        	  	 buzId:_this.OrderId
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
       fahuoData(){//发货记录
           let _this = this;
           	 this.$http({
           	  method: 'get',
           	  url: '/api/DispatchOrder/GetDispatchOrderId',
           	  dataType: "json",
           	     params: {
           	  	 OrderId:_this.OrderId
           	  }
           	}).then((response) => { //这里使用了ES6的语法
           		console.log(response)
                if(response.data.code == 1) {
           			// alert(response.data.message);
           		  }
           		if(response.data.code != 1) {
                console.log(response);
                 //alert(response.data.message);
                _this.GetDispatchOrderIdList=response.data.data.GetDispatchOrderIdList;
               _this.dispatchorderid=response.data.data.dispatchorderid;
           		  _this.DialogVisible=false;
           		 _this.getData();

           		}

           	}).catch((error) => {
           		console.log(error) //请求失败返回的数据
           	})
           },
    	    handleDataChange($event, row) {
				this.sumMoney();

			},
			sumMoney() {
				let totalPrice = 0;
				this.tableData.forEach((item, index) => {
					totalPrice += item.number
				})
				this.totalPrice = totalPrice;
			},
      openst(){//审核弹窗
         this.DialogVisible=true;
        },
		    chukucomfirm(){
		    	let _this = this;
					let jsonP = {};
					jsonP.orderid = _this.OrderId;
          console.log(_this.tableData[0].number);
          let cnumber=_this.tableData[0].number;

           if(_this.totalPrice==0){
             alert("发货数不能为0");

             return false;
           }
					jsonP.totalordermoney = _this.totalPrice;					                         //_this.numberss
				  jsonP.dispatchOrderGoods=_this.tableData;

          jsonP.dispatchOrderGoods.forEach(function (item, index) {
                console.log(item);
          });
					console.log(jsonP)
		    		 this.$http({
							method: 'post',
							url: '/api/DispatchOrder/InsertDispatchOrder',
						    data: jsonP
						}).then((response) => { //这里使用了ES6的语法
							console.log(response)
		           if(response.data.code == 1) {
								 alert(response.data.message);
									}
							if(response.data.code != 1) {

								_this.centerDialogVisible=false;
                _this.fahuoData();
                _this.getData();
								//_this.$router.replace({ path: '/SalesInvoice'})
							}

						}).catch((error) => {
							console.log(error) //请求失败返回的数据
              if (error.response.status == 401) {
                  alert("没有权限");
               }
						})

		    },
        shenhecomfirm(){//审核提交
            let _this = this;
		    		 this.$http({
						  method: 'get',
						  url: '/api/CustomerOrder/GetCustomerOrderInfo',
						  dataType: "json",
						     params: {
						  	 OrderId:_this.OrderId
						  }
						}).then((response) => { //这里使用了ES6的语法
							console.log(response)
		           if(response.data.code == 1) {
								 alert(response.data.message);
							  }
							if(response.data.code != 1) {
                alert(response.data.message);
							  _this.DialogVisible=false;
							 _this.getData();


							}

						}).catch((error) => {
							console.log(error) //请求失败返回的数据
						})



          },
        //审核、
        open() {
                this.$confirm('是否确定订货单通过订单审核?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {

                  // this.$message({
                  //   type: 'success',
                  //   message: '删除成功!'
                  // });
                  let _this = this;
                  	this.$http({
                  		method: 'get',
                  		url: '/api/GetIsBuzAudit',
                  		dataType: "json",
                  	     params: {
                  			 buzId:_this.OrderId
                  		}
                  	}).then((response) => { //这里使用了ES6的语法
                  		console.log(response)
                       this.$message({
                         type: 'success',
                         message: '审核成功!'
                       });


                  		//请求成功返回的数据
                  	}).catch((error) => {
                  		console.log(error) //请求失败返回的数据
                  	})

                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消审核'
                  });
                });
              },
    	    openchuku(){
    	    	this.centerDialogVisible=true;
    	   },
    	getData(){//数据展示
    		 let _this = this;
				this.$http({
					method: 'get',
					url: '/api/CustomerOrder/GetCustomerOrderInfo',
					dataType: "json",
				     params: {
						OrderId:_this.OrderId
					}
				}).then((response) => { //这里使用了ES6的语法
					console.log(response)
				   let newsAarys = {};
				   _this.tableData=response.data.data.CustomerInfo.customerOrderGoods;
           if(response.data.data.CustomerInfo.orderstatus=="发货中"){
             if(response.data.data.CustomerInfo.zongNumber== 0){
               _this.flagf=false;
               _this.showcf=false;
               _this.flagwc=true;
             }else{
                _this.flagf=true;
                _this.flagwc=true;
               }

           }
           if(response.data.data.CustomerInfo.orderstatus=="已完成"){
             _this.flagwc=false;
           }
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
							this.$set(item, 'number', 0);
						}

					})
          console.log('nndd');
           console.log(newData);
					newsAarys.customerOrderGoods.forEach(element => {

						_this.uinit=element.unit;
						_this.$set(element, 'sku_id', element.skuid)
						_this.$set(element, 'price', element.unitcost)
					})
          // console.log('nndd');
          // console.log(newsAarys.customerOrderGoods);

					let totalPrice = 0;
					_this.tableData.forEach((item, index) => {
						totalPrice += item.price * item.number
					})
					 _this.totalPrice = totalPrice;
           _this.orderstatus=response.data.data.CustomerInfo.orderstatus
				   _this.name=response.data.data.CustomerInfo.customer.companyname;
				   _this.userid=response.data.data.CustomerInfo.customerid;
				   _this.dprovince=response.data.data.CustomerInfo.dprovince;
				   _this.dcaton=response.data.data.CustomerInfo.dcaton;
				   _this.dcity=response.data.data.CustomerInfo.dcity;
				   _this.daddress=response.data.data.CustomerInfo.daddress;
				   _this.dcity=response.data.data.CustomerInfo.dcity;
				   _this.recipientmobile=response.data.data.CustomerInfo.recipientmobile;
				   _this.recipientname=response.data.data.CustomerInfo.recipientname;

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
