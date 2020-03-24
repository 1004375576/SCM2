<template>
  <div class="content-wrapper">
    <section class="content-header">
      <ol class="breadcrumb" style="display: block; float: none;">
        <a href="/"><i class="fa fa-dashboard"></i></a>
        <li>客户</li>
        <li>客户列表</li>
        <li class="active">客户详情</li>
      </ol>
      <h1 class="pull-right">
        <router-link to="/CustomerList" class="btn btn-primary btn-sm" icon="el-icon-back">返回客户列表</router-link>
      </h1>
    </section>
    <div class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">客户详情  <el-button type="danger" style="margin-left:2.5rem;" @click="resetPassword" size="small" round>重置密码</el-button></h3>
        </div>
        <div class="box-body">
          <el-tabs type="border-card">
            <el-tab-pane label="客户详情">

              <h4 id="dui-qi-fang-shi" style="color:#03B8CC ; font-size:15px ;border-bottom:1px solid #03B8CC; padding-bottom:10px ; margin-bottom:8px ;">公司信息</h4>
             <el-row :gutter="10">
               <el-col :xs="22" :sm="16" :md="8">
                  <div><label style="width:80px">公司名称：</label>
                    <span class="companyname">上海</span>
                  </div>
                </el-col>

               <el-col :xs="22" :sm="16" :md="8">
                  <div><label style="width:80px">详细地址：</label>
                    <span class="companyaddress"></span>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="10">
               <el-col :xs="22" :sm="16" :md="8">
                  <div><label style="width:80px">法人：</label>
                    <span class="legalperson"></span>
                  </div>
                </el-col>
               <el-col :xs="22" :sm="16" :md="8">
                  <div><label style="width:80px">身份证：</label>
                    <span class="idcard"></span>
                  </div>
                </el-col>

               <el-col :xs="22" :sm="16" :md="8">
                  <div class="demo-image__preview"> <label style="width:80px;vertical-align:top;">营业执照：</label>
                    <img style="padding: 6px;width: 98px;height: 98px;" id="imgValidateCode" alt="营业执照">

                  </div>
                </el-col>


              </el-row>
              <h4 id="dui-qi-fang-shi" style="color:#03B8CC ; font-size:15px ;border-bottom:1px solid #03B8CC; padding-bottom:10px ; margin-bottom:8px ;">个人信息</h4>
              <el-row :gutter="10">
                <el-col :xs="22" :sm="16" :md="8">
                  <label style="width:80px">联系人：</label>
                  <span class="name"></span>
                </el-col>
                <el-col :xs="22" :sm="16" :md="8">
                  <label style="width:80px">手机：</label>
                  <span class="mobiletel"></span>
                </el-col>
              </el-row>


              <h4 id="dui-qi-fang-shi" style="color:#03B8CC ; font-size:15px ;border-bottom:1px solid #03B8CC; padding-bottom:10px ; margin-bottom:8px ;">
                账号信息 </h4>
              <el-row :gutter="10">
               <el-col :xs="22" :sm="16" :md="8"><label style="width:80px">账号：</label>
                  <span class="mobiletel"></span>
                </el-col>
               <!-- <el-col :span="8"><label style="width:80px">密码：</label>
                  <span class="password"></span>
                </el-col> -->
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="常用地址">
              <h4 id="dui-qi-fang-shi" style="color:#03B8CC ; overflow: hidden; font-size:15px ;border-bottom:1px solid #03B8CC; padding-bottom:10px ; margin-bottom:8px ;">
                <span class="pull-left">收货地址</span>
                <el-button type="warning" size="mini" class="pull-right" @click="centerDialog1Visible = true">增加收货地址</el-button>
              </h4>
              <!--增加收货货地址-->
              <el-dialog title="增加收货地址" :visible.sync="centerDialog1Visible" customClass="customWidth">
                <div>
                 <el-row :gutter="10">
                   <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" size="small">
                        <el-form-item label="联系人" prop="name">
                          <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="mobiletel">
                          <el-input v-model="ruleForm.mobiletel"></el-input>
                        </el-form-item>

                        <el-form-item label="省市区" prop="value">
                          <el-cascader v-model="ruleForm.value" ref="myCascader" :props="optionProps" :options="shengdata">
                          </el-cascader>
                        </el-form-item>
                        <el-form-item label="地址" prop="address">
                          <el-input v-model="ruleForm.address" placeholder="请输入详细地址"></el-input>
                        </el-form-item>
                      </el-form>
                    </el-col>
                  </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="centerDialog1Visible = false">取 消</el-button>
                  <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                </span>
              </el-dialog>
              <el-row :gutter="20">
                <el-table :data="shtableData" style="width: 100%">
                  <el-table-column prop="id" label="ID" width="120" style="display:none ;">
                  </el-table-column>
                  <el-table-column label="地址" width="350">
                    <template slot-scope="scope">
                      <span>{{scope.row.province}}</span>
                      <span>{{scope.row.province}}</span>
                      <span>{{scope.row.province}}</span>
                      <span>{{scope.row.address}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" width="130">
                  </el-table-column>
                  <el-table-column prop="mobiletel" label="手机" width="120">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button size="mini" type="danger" class="moren">
                        默认
                      </el-button>
                      <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block" align="center" style="margin-top:20px ; background:#fff ; padding-bottom:20px ;">
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-size="pagesize" layout=" prev, pager, next, jumper" :total="total">
                  </el-pagination>
                </div>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="发票管理">
              <h4 style="position: relative;width:100%; height:30px ;">
                <el-button type="warning" size="mini" @click="centerfpDialog1Visible = true" style="position: absolute;right:10px ;top:0;">增加发票</el-button>
              </h4>
              <!--增加发票-->
              <el-dialog title="增加发票" :visible.sync="centerfpDialog1Visible" :width="dialogWidth" customClass="customWidth" class="fpwidth dialog-width">
                <div>
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <el-form :model="ruleFormfp" :rules="rules" ref="ruleFormfp" label-width="70px" size="small">
                        <el-form-item label="抬头" prop="invoicetitle">
                          <el-input v-model="ruleFormfp.invoicetitle" placeholder="请输入发票抬头"></el-input>
                        </el-form-item>
                        <el-form-item label="税号" prop="taxnumber">
                          <el-input v-model="ruleFormfp.taxnumber" placeholder="请输入税号"></el-input>
                        </el-form-item>
                        <el-form-item label="手机" prop="mobile">
                          <el-input v-model="ruleFormfp.mobile" placeholder="请输入手机号码"></el-input>
                        </el-form-item>
                        <el-form-item label="开户行" prop="openbank">
                          <el-input v-model="ruleFormfp.openbank" placeholder="请输入开户行"></el-input>
                        </el-form-item>
                        <el-form-item label="账号" prop="accountnumber">
                          <el-input v-model="ruleFormfp.accountnumber" placeholder="请输入账号"></el-input>
                        </el-form-item>
                        <el-form-item label="地址" prop="companyaddress">
                          <el-input v-model="ruleFormfp.companyaddress" placeholder="请输入公司地址"></el-input>
                        </el-form-item>

                      </el-form>
                    </el-col>
                  </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="centerfpDialog1Visible = false">取 消</el-button>
                  <el-button type="primary" @click="submitfpForm('ruleFormfp')">确 定</el-button>
                </span>
              </el-dialog>
              <el-table :data="fptableData" style="width: 100%">
                <el-table-column type="index" label="序号" width="80">
                </el-table-column>
                <el-table-column prop="invoicetitle" label="抬头" width="150">
                </el-table-column>
                <el-table-column prop="taxnumber" label="税号" width="120">
                </el-table-column>
                <el-table-column prop="openbank" label="开户行" width="150">
                </el-table-column>
                <el-table-column prop="accountnumber" label="账号" width="150">
                </el-table-column>
                <el-table-column prop="companyaddress" label="公司地址" width="200">
                </el-table-column>
                <el-table-column prop="mobile" label="手机">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDeletecfc(scope.row)">删除</el-button>
                  </template>
                </el-table-column>

              </el-table>
            </el-tab-pane>
            <!-- <el-tab-pane label="合同管理">合同管理</el-tab-pane>-->
          </el-tabs>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    data() {

      return {
         dialogWidth: 0,
        pagesize: 20,
        total: 0,
        currentPage: 1,
        centerfpDialog1Visible: false, //增加发票弹窗
        fptableData: [],
        ruleForm: {
          name: '',
          mobiletel: '',
          address: '',
          value: '',
        },
        id: this.$route.query.userid,
        thtableData: [],
        shtableData: [],
        centerDialogVisible: false,
        centerDialog1Visible: false,
        shengdata: [],
        value: '',
        ruleFormfp: {
          invoicetitle: '',
          taxnumber: '',
          openbank: '',
          accountnumber: '',
          companyaddress: '',
          mobile: ''
        },
        optionProps: {
          value: 'code',
          label: 'name',
          children: 'List'
        },
        rules: {
          name: [{
            required: true,
            message: '请输入联系人',
            trigger: 'blur'
          }],
          mobiletel: [{
              required: true,
              message: '请输入联系人手机号',
              trigger: 'blur'
            },
            {
              pattern: /^1[345789]\d{9}$/,
              message: '输入11位数字的手机号码'
            }
          ],
          value: [{
            required: true,
            message: '请选择省市区',
            trigger: 'change'
          }],
          address: [{
            required: true,
            message: '请输入详细地址',
            trigger: 'blur'
          }],
          invoicetitle: [{
            required: true,
            message: '请输入发票抬头',
            trigger: 'blur'
          }],
          mobile: [{
              required: true,
              message: '请输入手机号',
              trigger: 'blur'
            },
            {
              pattern: /^1[345789]\d{9}$/,
              message: '输入11位数字的手机号码'
            }
          ],
          taxnumber: [{
            required: true,
            message: '请输入税号',
            trigger: 'change'
          }],
          openbank: [{
            required: true,
            message: '请输入开户行',
            trigger: 'blur'
          }],
          accountnumber: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }],
          companyaddress: [{
            required: true,
            message: '请输入公司地址',
            trigger: 'blur'
          }]


        }

      };
    },
    created() {
      this.showData();
      // this.addressList();
      this.addressList0();
      this.ssqData();
      this.invoicesData();
      this.setDialogWidth()
    },
    methods: {
      resetPassword() {
          this.$http({
            method: 'get',
            url: '/api/Customer/resetPassWordCustomer',
            dataType: "json",
            params: {
              customerid: this.id,
            }
          }).then((response) => { //这里使用了ES6的语法
             this.$confirm('确定重置密码?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      if(response.data.code == 1){
                      this.$message({
                        type: 'success',
                        message: response.data.message
                      });
                      }
                      if(response.data.code == 0){
                      	this.$message({
                      	  type: 'success',
                      	  message: response.data.message
                      	});
                      }

                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消重置密码'
                      });
                    });

          }).catch((error) => {
            console.log(error) //请求失败返回的数据
          })
      },
      setDialogWidth() {
        console.log(document.body.clientWidth)
        var val = document.body.clientWidth
        const def = 800 // 默认宽度
        if (val < def) {
          this.dialogWidth = '100%'
        } else {
          this.dialogWidth = def + 'px'
        }
      },

      submitfpForm(formName) { //增加发票
        let _this = this;
        let jsonP = {};
        jsonP.customerid = _this.id;
        jsonP.isdefault = "true";
        jsonP.invoicetitle = _this.ruleFormfp.invoicetitle;
        jsonP.taxnumber = _this.ruleFormfp.taxnumber;
        jsonP.openbank = _this.ruleFormfp.openbank;
        jsonP.accountnumber = _this.ruleFormfp.accountnumber;
        jsonP.companyaddress = _this.ruleFormfp.companyaddress;
        jsonP.mobile = _this.ruleFormfp.mobile;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http({
              method: 'post',
              contentType: 'application/json; charset=UTF-8',
              url: '/api/CustomerInvoice/InsertCustomerInvoice',
              //data:fd
              data: jsonP
            }).then((response) => {
              //这里使用了ES6的语法
              console.log(response);
              if (response.data.code == 1) {
                alert(response.data.message);

              }
              if (response.data.code == 0) {
                alert(response.data.message);
                _this.invoicesData()
                _this.centerfpDialog1Visible = false;
                _this.$refs[formName].resetFields();
                //_this.$router.replace({ path: '/CustomerList'})
              }
              console.log(response.data.code)
              //请求成功返回的数据
              // alert("添加成功");
            }).catch((error) => {
              console.log(error) //请求失败返回的数据
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      //删除发票
      handleDeletecfc(row) {
        this.$confirm('确认删除?', '提示', {
                 confirmButtonText: '确定',
                 cancelButtonText: '取消',
                 type: 'warning'
               }).then(() => {
                this.$http({
                  method: 'get',
                  url: '/api/CustomerInvoice/DeleteCustomerInvoice',
                  dataType: "json",
                  params: {
                    id: row.id
                  }
                 }).then((response) => { //这里使用了ES6的语法
                   console.log(response)
                   if (response.data.code == 1) {
                    this.$message({
                      type: 'info',
                      message: response.data.message
                    });
                   }

                   if (response.data.code == 0) {
                     this.$message({
                       type: 'info',
                       message: response.data.message
                     });
                      this.invoicesData();
                      this.fptableData.splice(row, 1);
                   }

                 }).catch((error) => {
                   console.log(error) //请求失败返回的数据
                   if (error.response.data.message == 403) {
                    alert("没有权限");
                   }
                 })
               }).catch(() => {
                 this.$message({
                   type: 'info',
                   message: '已取消删除'
                 });
            });
      },
      //收货地址列表
      addressList0() {
        this.$http({
          method: 'get',
          url: '/api/CustomerAddress/GetCustomerAddressList',
          dataType: "json",
          params: {
            name: "",
            mobiletel: "",
            pageindex: 1,
            pagesize: 20,
            AddressType: 1,
            customerid: this.id,
          }
        }).then((response) => { //这里使用了ES6的语法
          console.log(response)
          if (response.data.data.CustomerAddressList.length == 0) {

            this.shtableData = "暂无数据";
          }
          if (response.data.data.CustomerAddressList.IsDefault == true) {

            $(".moren").show();
          }
          console.log(response.data.data.CustomerAddressList);
          this.shtableData = response.data.data.CustomerAddressList;

        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })

      },
      //省市区数据
      ssqData() {
        let _this = this
        this.$http({
          method: 'get',
          url: '/api/AreaSelection/GetAreaList',
          dataType: "json",
          data: {}
        }).then((response) => { //这里使用了ES6的语法
          //console.log(response);
          // console.log(response.data.data.list)

          _this.shengdata = response.data.data.list;
          //			                      console.log(_this.shengdata);

        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })


      },
      //发票数据
      invoicesData() {
        let _this = this
        this.$http({
          method: 'get',
          url: '/api/CustomerInvoice/CustomerInvoiceList',
          dataType: "json",
          params: {
            customerId: _this.id
          }
        }).then((response) => { //这里使用了ES6的语法
          //console.log(response);
          console.log(response.data.data.CustomerInvoiceList)
          _this.fptableData = response.data.data.CustomerInvoiceList;
          //			                      console.log(_this.shengdata);
        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })


      },
      submitForm(formName) {//增加收货地址
        let _this = this;
        let jsonP = {};
        jsonP.name = _this.ruleForm.name;
        jsonP.province = _this.ruleForm.value[0];
        jsonP.city = _this.ruleForm.value[1];
        jsonP.caton = _this.ruleForm.value[2];
        jsonP.mobiletel = _this.ruleForm.mobiletel
        jsonP.address = _this.ruleForm.address;
        jsonP.addresstype = 1;
        jsonP.customerid = _this.$route.query.userid;
        //var params = {"name" : name,"idcard" : idcard,"CompanyName" : CompanyName,"legalperson":legalperson,"password":password,"mobiletel":mobiletel,"companyaddress":companyaddress};
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http({
              method: 'post',
              contentType: 'application/json; charset=UTF-8',
              url: '/api/CustomerAddress/InsertCustomerAddress',
              //data:fd
              data: jsonP
            }).then((response) => {
              //这里使用了ES6的语法
              console.log(response);
              if (response.data.code == 1) {
                 alert(response.data.message);
              }
              if (response.data.code != 1) {
                alert(response.data.message);
                _this.centerDialog1Visible = false;
                _this.addressList0();
                _this.$refs[formName].resetFields();
                //_this.$router.replace({ path: '/CustomerList'})
              }
              console.log(response.data.code)
              //请求成功返回的数据
            }).catch((error) => {
              console.log(error) //请求失败返回的数据
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //表格删除
      handleDelete(row) {
        let _this = this;
         console.log(row);
        this.$confirm('确认删除?', '提示', {
                 confirmButtonText: '确定',
                 cancelButtonText: '取消',
                 type: 'warning'
               }).then(() => {
                 this.$http({
                   method: 'get',
                   url: '/api/CustomerAddress/DeleteCustomerAddress',
                   params: {
                     id: row.id
                   }
                 }).then((response) => { //这里使用了ES6的语法
                   console.log(response)
                   if (response.data.code == 1) {
                    this.$message({
                      type: 'info',
                      message: response.data.message
                    });
                   }
                   if (response.data.code == 403) {
                    this.$message({
                      type: 'info',
                      message: response.data.message
                    });
                   }
                   if (response.data.code == 0) {
                     this.$message({
                       type: 'info',
                       message: response.data.message
                     });
                     this.addressList0();
                     this.shtableData.splice(row, 1);
                   }

                 }).catch((error) => {
                   console.log(error) //请求失败返回的数据
                 })
               }).catch(() => {
                 this.$message({
                   type: 'info',
                   message: '已取消删除'
                 });
            });
      },
      //
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function(size) {
        this.pagesize = size;
        console.log(this.pagesize) //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage;
        this.addressList0();
        console.log(this.currentPage) //点击第几页
      },
      showData() {
        let _this = this
        this.$http({
          method: 'get',
          url: '/api/Customer/GetCustomerInfo',
          //			                  contentType: "application/json",
          dataType: "json",
          params: {
            id: this.id
          }
        }).then((response) => { //这里使用了ES6的语法
          // console.log(response)
          console.log(response.data.data.CustomerInfo);

          $(".companyname").text(response.data.data.CustomerInfo.companyname);
          $(".companyaddress").text(response.data.data.CustomerInfo.companyaddress);
          $(".legalperson").text(response.data.data.CustomerInfo.legalperson);
          $(".idcard").text(response.data.data.CustomerInfo.idcard);
          $(".name").text(response.data.data.CustomerInfo.name);
          $(".mobiletel").text(response.data.data.CustomerInfo.mobiletel);
          $(".password").text(response.data.data.CustomerInfo.password);
          $('#imgValidateCode').attr("src", response.data.data.CustomerInfo.bizlicneseurlshow);
          // $('#imgValidateCode').attr("src", 'http://image.babatruck.com/avatar/11805_2019110416164411.png');
          console.log(response.data.data.CustomerInfo.bizlicneseurlshow);
          //console.log(this.tableData);
          // _this.$router.replace({ path: '/CommodityAttributes'})
          //请求成功返回的数据
        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })


      }
    }
  }
</script>
<style>
  .el-row {
    margin-bottom: 12px;
    display: block;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .moren {
    display: none;
  }

  .el-dialog--center .el-dialog__body {
    padding: 10px 20px;
  }
 .customWidth{width:40% ;}
 @media (min-width: 768px) and (max-width: 991.98px) { .customWidth{width:60% ;}}
 @media (min-width: 576px)and (max-width: 768px){ .customWidth{width:80% ;} }
@media (min-width: 320px)and (max-width: 575px){ .customWidth{width:100% ;} }
  .el-dialog__body {
    padding: 10px 20px !important;
  }
</style>
