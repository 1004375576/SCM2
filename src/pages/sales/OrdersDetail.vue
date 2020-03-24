<template>
  <div class="content-wrapper">
    <section class="content-header">
      <ol class="breadcrumb" style="display: block; float: none;">
        <a href="/"><i class="fa fa-dashboard"></i></a>
        <li><a href="javascript:void(0);">销售</a></li>
        <li><a href="javascript:void(0);">销售订单</a></li>
        <li class="active">订单详情</li>
      </ol>
      <h1 class="pull-right">
        <router-link to="/SalesOrders" class="btn btn-primary btn-sm" icon="el-icon-back">返回订单列表</router-link>
      </h1>
    </section>
    <div class="content">
      <div class="box box-primary">
        	<div class="box-header with-border">
          <h3 class="box-title"  style="margin-right:1.825rem ;color:#3c8dbc; padding:0px 5px 5px 5px; border-bottom:2px solid #3c8dbc ; ">订单详情</h3>
          <h3 class="box-title" @click="fhbtn" style="cursor:pointer ;">发货记录</h3>
      </div>

        <div class="box-body">

              <div style="margin-bottom:15px ;">订单号：<span style="color:#AA0000">{{OrderId}}</span>
                订单状态：{{orderstatus}}
                <el-button type="success" size="small" @click="openst" v-if="flag">审核</el-button>
                <el-button type="success" size="small" @click="fhbtn" v-if="flagf">发货</el-button>
                <el-button type="success" size="small" @click="fhbqr" v-if="fhtg">通过</el-button>
                <el-button type="primary" size="small" @click="yiwanc" v-if="flagwc">结算</el-button>
              </div>
              <div style="margin-bottom:10px ;">
                <el-row :gutter="20">
                  <el-col :span="24">
                      <label style="width:80px">收货信息 </label>
                      &nbsp;客户名称：{{companyname}} &nbsp; &nbsp;
                      收货人：{{recipientname}} &nbsp; &nbsp;联系电话：{{recipientmobile}} &nbsp; &nbsp;
                      收货地址：{{dprovince}}{{dcity}}{{dcaton}}{{daddress}}
                  </el-col>
                </el-row>
              </div>
              <el-form :model="ruleForm" ref="ruleForm" label-width="80px" size="small" class="demo-ruleForm demo-dynamic">
                <el-row :gutter="20">
                  <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="id" label="ID">
                    </el-table-column>
                    <el-table-column prop="goods_Name" label="商品名称">
                    </el-table-column>
                    <el-table-column label="商品规格">
                      <template slot-scope="scope">
                        <div>{{scope.row.sku_value}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="number" label="购买数量">
                       <template slot-scope="scope">
                         <div>{{scope.row.number | rounding }}{{scope.row.unit}}</div>
                       </template>
                    </el-table-column>
                    <el-table-column prop="numbers" label="已发货数">
                       <template slot-scope="scope">
                         <div>{{scope.row.numbers | rounding }}{{scope.row.unit}}</div>
                       </template>
                    </el-table-column>
                    <el-table-column prop="ynumber" label="剩余发货数">
                      <template slot-scope="scope">
                        <div>{{scope.row.ynumber | rounding }}{{scope.row.unit}}</div>
                      </template>

                    </el-table-column>
                    <el-table-column label="单价">
                      <template slot-scope="scope">
                        <div>{{scope.row.unitcost}} 元</div>
                      </template>
                    </el-table-column>
                    <el-table-column  label="小计">
                      <template slot-scope="scope">
                        <div>{{scope.row.number*scope.row.unitcost|rounding}}</div>
                      </template>
                    </el-table-column>
                  </el-table>

                </el-row>
                <el-row :gutter="20" style="margin-top:15px ;">
                  <el-col :span="24" small>
                    <span class="pull-right" v-if="showcf">应付金额：<em style="color:#0060BF;font-style: normal;">{{totalPrice |rounding }}</em>元</span>
                  </el-col>
                </el-row>
                </el-form-item>
                <el-row :gutter="20">
                  <el-col :span="8" small>
                    <el-form-item label="交货日期" size="samll">

                      {{readytime}}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8" small>
                    <el-form-item label="电子合同" size="samll">
                      <a href="" target="_blank"  id="imgValidateCode"> 查看合同</a>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="16">

                    <el-form-item label="备注说明">
                      {{remark}}
                    </el-form-item>

                  </el-col>
                </el-row>
              </el-form>
              <div style="margin-bottom:20px ;">
                <el-card class="box-card" style="padding-bottom:30px ;">
                  <div v-for="item in itemss" style="float:left;width:200px; text-align: center;">
                    <div v-if="item.auditStatus==0" style="background:#cccccc ; border-radius:50%; width:60px; height:60px ; line-height:60px ; margin:0 auto ;">
                      <P style="color:#fff;font-size:16px ;">{{item.flowNodeindex}}</P>
                    </div>
                    <div v-else-if="item.auditStatus==2" style="background:red ; border-radius:50%; width:60px; height:60px ; line-height:60px ; margin:0 auto ;">
                      <P style="color:#fff;font-size:16px ;">{{item.flowNodeindex}}</P>
                    </div>
                    <div v-else style="background:#4CA844 ; border-radius:50%; width:60px; height:60px ; line-height:60px ; margin:0 auto ;">
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

            <!--审核确认-->
            <el-dialog title="确认" :visible.sync="DialogVisibleqd" width="35%" center>
              <el-row :gutter="20">
                <el-col :span="20">
                  是否对订货单{{OrderId}}进行确认操作
                </el-col>
              </el-row>
              <span slot="footer" class="dialog-footer">
                <el-button @click="DialogVisibleqd = false">取消</el-button>
                <el-button type="primary" @click="qudshenhe()">确 定</el-button>
              </span>
            </el-dialog>
            <el-dialog title="审核确认" :visible.sync="DialogVisible" width="35%" center>
              <el-row :gutter="20">
                <el-col :span="20">
                  是否确定订货单{{OrderId}}通过订单审核？
                </el-col>
                <el-col :span="20">
                  <el-form :model="ruleForm">
                    <el-form-item label="备注" prop="Audit_Info">
                      <el-input v-model="ruleForm.Audit_Info" placeholder="请输入原因"></el-input>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
              <span slot="footer" class="dialog-footer">
                <el-button @click="shenhejj()">拒绝</el-button>
                <el-button type="primary" @click="shenhecomfirm()">确 定</el-button>
              </span>
            </el-dialog>


        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        //发货记录
        ruleForms: {
          Audit_Info: ''
        },
        tableDatachu: [{}],
        showcf0: true,
        GetDispatchOrderIdList:'',
        Exitwindow:false,
        flagfnew:false,
        flagwc:false,
        fhdzt:'',
        //订单id
        OrderId: this.$route.query.OrderId,
        totalPrice: '',
        DialogVisible: false,
        DialogVisibleqd: false,
        activeName: 'first',
        showcf: true,
        flagqr: false,
        fhtg: false,//通过按钮
        flagf: false,
        flag: false,
        auditStatus: '',
        orderstatus: '',
        companyname: '',
        name: '',
        dprovince: '',
        dcaton: '',
        dcity: '',
        daddress: '',
        dcity: '',
        recipientmobile: '',
        recipientname: '',
        orderpdf:'',
        readytime: '',
        itemss: '', //步骤数据
        remark: '',
        tableData: [{}],
        ruleForm: {
          Audit_Info: ''
        },
      };
    },
    created() {
      this.getData();//获取订单详情数据
      // this.getDataFh();
       this.orderLiuc();//检查流程
      // this.checkLiuc();
      // this.checkLiucfhd();
     this.buzhouData();//步骤
      // this.fahuoData();

    },

    filters: {
      rounding (value) {
        value=Number(value);
        return value.toFixed(2)
      }
    },
    methods: {

       handleClick(tab, event) {
           console.log(tab, event);
       },
       chukucomfirm(){
       	let _this = this;
       	let jsonP = {};
       	jsonP.orderid = _this.OrderId;
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
       				 //alert(response.data.message);
       					}
       			if(response.data.code != 1) {
               alert(response.data.message);
       				_this.Exitwindow=false;
       			  // _this.fahuoData();
             _this.getDataFh();
       				//_this.$router.replace({ path: '/SalesInvoice'})

       			}

       		}).catch((error) => {
       			console.log(error) //请求失败返回的数据
       		})

       },
      yiwanc(){
            this.$confirm('是否确认完成?', '提示', {
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
                      // _this.flagwc=false;
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
           //订单流程检测
          orderLiuc(){//检查流程是否开启
              let _this = this;
              	 this.$http({
              	  method: 'get',
              	  url: '/api/GetIsBuzAudit',
              	   params: {
              	  	 buzId:_this.OrderId
              	  }
              	}).then((response) => { //这里使用了ES6的语法
              		 console.log(response.data.code)
                   if(response.data.code == 1) {
              			 //alert(response.data.message);
                     if(this.orderstatus=="待审核"){
                           _this.fhtg=true;
                     }

              		  }
              		if(response.data.code == 0) {
                      _this.flag=true;

                  }

              	}).catch((error) => {
              		console.log(error) //请求失败返回的数据
              	})
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
                 _this.flagfnew=true;
                }

               //alert(response.data.message);
         		  _this.DialogVisible=false;
         		  _this.getData();
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
      //发货数据
      getDataFh(){//数据展示
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
      	   _this.tableDatachu=response.data.data.CustomerInfo.customerOrderGoods;
           if(response.data.data.CustomerInfo.zongNumber=="0"){
             _this.flagfnew=false;

           }
           // if(response.data.data.CustomerInfo.orderstatus=="发货中"){
           //    _this.flagfnew=true;
           //   // _this.flagwc=true;

           // }

           if(response.data.data.CustomerInfo.orderstatus=="已完成"){

             _this.flagfnew=false;
             _this.flagwc=false;
           }
      	    newsAarys.customerOrderGoods = _this.tableDatachu;
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
      		_this.tableDatachu.forEach((item, index) => {
      			totalPrice += item.price * item.number
      		})
      		 _this.totalPrice = totalPrice;
           _this.buzIdfh=response.data.data.CustomerInfo.orderstatus;
           _this.fhdzt=response.data.data.CustomerInfo.orderstatus;
      	   _this.name=response.data.data.CustomerInfo.customer.companyname;
      	   _this.userid=response.data.data.CustomerInfo.customerid;
      	   _this.dprovince=response.data.data.CustomerInfo.dprovince;
      	   _this.dcaton=response.data.data.CustomerInfo.dcaton;
      	   _this.dcity=response.data.data.CustomerInfo.dcity;
      	   _this.daddress=response.data.data.CustomerInfo.daddress;
      	   _this.dcity=response.data.data.CustomerInfo.dcity;
      	   _this.recipientmobile=response.data.data.CustomerInfo.recipientmobile;
      	   _this.recipientname=response.data.data.CustomerInfo.recipientname;
           // _this.orderpdf=response.data.data.CustomerInfo.orderpdfshow;

      		//请求成功返回的数据
      	}).catch((error) => {
      		console.log(error) //请求失败返回的数据
      	})
      },
      openchuku(){
       	this.Exitwindow=true;
      },
      fhbtn() {
        this.$router.push({
          path: '/invoiceDetail',
          //path: '/OrdersDetail',
          query: {
            OrderId: this.OrderId
          }
        });
      },
      buzhouData() {
        let _this = this;
        this.$http({
          method: 'get',
          url: '/api/GetBuzAuditLine',
          params: {
            buzId: _this.OrderId
          }
        }).then((response) => { //这里使用了ES6的语法
          console.log(response.data.code)
          if (response.data.code == 1) {
            //alert(response.data.message);

          }
          if (response.data.code != 1) {
            if (response.data.GetBuzAuditLineList === null) {
              return false;
            }
            if (response.data.GetBuzAuditLineList != "null") {
              _this.itemss = response.data.data.GetBuzAuditLineList;
              _auditStatus = response.data.data.GetBuzAuditLineList.auditStatus[0];
              console.log(_this.itemss);
            }


            //_this.getData();
          }

        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })
      },
      cc() {
        location.reload();

      },
      openst() { //审核弹窗
        this.DialogVisible = true;
      },
      fhbqr() { //无需审核直接操作
        this.DialogVisibleqd = true;
      },
      yiwanc() {
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

      qudshenhe() {
        this.$http({
          method: 'get',
          url: '/api/CustomerOrder/UpdateCustomerOrderStatus',
          params: {
            OrderId: this.OrderId,
            OrderStatus: 'Confirmed'
          }
        }).then((response) => {
          console.log(response);
          alert(response.data.message);
         this.DialogVisibleqd = false;
          this.getData();

          // row.flagshow = false;
          //请求成功返回的数据
        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })
      },
      checkLiuc() { //检查流程是否开启
        let _this = this;
        this.$http({
          method: 'get',
          url: '/api/GetIsBuzAudit',
          params: {
            buzId: _this.OrderId
          }
        }).then((response) => { //这里使用了ES6的语法
          console.log(response.data.code)
          if (response.data.code == 1) {
            //alert(response.data.message);
            if (_this.orderstatus == "待审核") {
              _this.fhtg = true;
            }
          }
          if (response.data.code != 1) {
            if (_this.orderstatus == "待审核") {
              _this.fhtg = false;
              _this.flag = true;
            }
            //alert(response.data.message);
            _this.DialogVisible = false;
            _this.getData();
          }

        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })
      },
      shenhejj() {
        let _this = this;
        this.$http({
          method: 'get',
          url: '/api/IsBuzAudit',
          dataType: "json",
          params: {
            buzId: _this.OrderId,
            auditStatus: false,
            Audit_Info: _this.ruleForm.Audit_Info
          }
        }).then((response) => { //这里使用了ES6的语法
          console.log(response)
          if (response.data.code == 1) {
            alert(response.data.message);
          }
          if (response.data.code != 1) {
            alert(response.data.message);
            _this.DialogVisible = false;
            _this.getData();
            location.reload();
            // this.cc();

          }

        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })
      },
      shenhecomfirm() { //审核提交
        let _this = this;
        this.$http({
          method: 'get',
          url: '/api/IsBuzAudit',
          dataType: "json",
          params: {
            buzId: _this.OrderId,
            auditStatus: true,
            Audit_Info: _this.ruleForm.Audit_Info
          }
        }).then((response) => { //这里使用了ES6的语法
          console.log(response)
          if (response.data.code == 1) {
            alert(response.data.message);
          }
          if (response.data.code != 1) {
            alert(response.data.message);
            _this.DialogVisible = false;
            // this.$refs[ruleForm].resetFields();
            _this.getData();
            location.reload();
            // this.cc();
          }

        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })
      },
      getData() {
        this.$http({
          method: 'get',
          url: '/api/CustomerOrder/GetCustomerOrderInfo',
          dataType: "json",
          params: {
            OrderId: this.OrderId
          }
        }).then((response) => { //这里使用了ES6的语法
          console.log(response)
          let _this = this
          let newsAarys = {};
          if (response.data.data.CustomerInfo.orderstatus == '已创建') {
             _this.fhtg = false;
          }
          if (response.data.data.CustomerInfo.orderstatus == "发货中") {
             _this.fhtg = false;
             _this.flagf = true;
             _this.flagwc = true;
          }
          if (response.data.data.CustomerInfo.orderstatus == "已完成") {
           _this.fhtg = false;
          }
          if (response.data.data.CustomerInfo.orderstatus == "已取消") {
           _this.fhtg = false;
          }
          this.orderstatus = response.data.data.CustomerInfo.orderstatus;
          this.tableData = response.data.data.CustomerInfo.customerOrderGoods;
          newsAarys.customerOrderGoods = _this.tableData;
          newsAarys.customerOrderGoods.forEach(element => {
            console.log(element);
            _this.$set(element, 'sku_id', element.skuid)
            _this.$set(element, 'price', element.unitcost)
          })
          _this.companyname = response.data.data.CustomerInfo.customer.companyname;
          _this.totalPrice = response.data.data.CustomerInfo.totalordermoney;
          _this.name = response.data.data.CustomerInfo.name;
          _this.userid = response.data.data.CustomerInfo.customerid;
          _this.dprovince = response.data.data.CustomerInfo.dprovince;
          _this.dcaton = response.data.data.CustomerInfo.dcaton;
          _this.dcity = response.data.data.CustomerInfo.dcity;
          _this.daddress = response.data.data.CustomerInfo.daddress;
          _this.dcity = response.data.data.CustomerInfo.dcity;
          _this.recipientmobile = response.data.data.CustomerInfo.recipientmobile;
          _this.recipientname = response.data.data.CustomerInfo.recipientname;
          _this.readytime = response.data.data.CustomerInfo.readytime;
          _this.remark = response.data.data.CustomerInfo.remark;
          if(response.data.data.CustomerInfo.orderpdf==null){
                $("#imgValidateCode").hide();
            }
            else{
              let ahref=$("#imgValidateCode").attr('href');
              $('#imgValidateCode').attr("href", response.data.data.CustomerInfo.orderpdfshow);
             }



          //请求成功返回的数据
        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })
      }
    }

  }
</script>

<style scoped="scoped">
  .el-form-item--small .el-form-item__content,
  .el-form-item--small .el-form-item__label {
    line-height: 28px;
  }
.el-tabs__header{height:3px!important ;}
  .el-input__inner {
    border-radius: 0;
  }

  .el-dialog__body {
    padding: 10px 20px;
  }

  input[type=file] {
    display: none;
  }

  .el-upload__tip {
    font-size: 12px;
    color: #606266;
    margin-top: 7px;
    display: inline-block;
    margin-left: 15px;
  }
  .el-form-item__content{ margin-left:0px!important ;}
</style>
