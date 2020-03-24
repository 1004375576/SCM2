<template>
  <div class="content-wrapper">
    <section class="content-header">
      <ol class="breadcrumb">
        <a href="/"><i class="fa fa-dashboard"></i></a>
        <li class="active">我的车场</li>
      </ol>
      <h1 class="pull-right">
        <el-button type="primary" size="small" @click="dialogVisible = true">添加熟车</el-button>
      </h1>
    </section>
    <div style="clear: both;"></div>
    <div style="width:99% ; margin:0 auto ;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline pa-form" size="small">
        <el-form-item>
          <el-input v-model="formInline.MobileTel" placeholder="请输入司机手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.MobileTel" placeholder="请输入司机姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.TruckNumber" placeholder="请输入车牌"></el-input>
        </el-form-item>
        <el-button type="primary" size="small" @click="Search()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="70">
      </el-table-column>
      <el-table-column prop="vendorcompany" label="承运公司" width="150">
      </el-table-column>
      <el-table-column prop="vendorname" label="承运人" width="120">
      </el-table-column>
      <el-table-column prop="trucknumber" label="车牌" width="180">
      </el-table-column>
      <el-table-column prop="drivername" label="司机姓名">
      </el-table-column>
      <el-table-column prop="drivermobile" label="司机电话">
      </el-table-column>
      <el-table-column prop="trucktype" label="车型">
      </el-table-column>
      <el-table-column prop="length" label="车长">
      </el-table-column>
      <el-table-column prop="loads" label="载重">
         
      </el-table-column>
      <el-table-column  label="认证状态">
        <template slot-scope="scope">
          <span v-if="scope.row.auditstatus==0" class="danger">未填写</span>
          <span v-if="scope.row.auditstatus== 1"  class="danger">审核通过</span>
          <span v-if="scope.row.auditstatus==2">审核未通过</span>
          <span v-if="scope.row.auditstatus==3">待审核</span>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog title="添加熟车" :visible.sync="dialogVisible" width="30%"  customClass="customWidth">
        <span>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="手机号" prop="mobie" required="required">
              <el-input type="text" v-model="ruleForm.mobie" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </span>
      </el-dialog>
      <div class="block" align="center" style="margin-top:20px ; background:#fff ; padding-bottom:20px ;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-size="pagesize" v-if="paginationShow" layout=" prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3|2|4|5|6|7|9|8|0|][0-9]\d{8}$/
          console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
      return {
        pagesize: 20,
        total: 0,
        currentPage: 1,
        paginationShow: true,
        auditstatus: '',
        dialogVisible: false,
        tableData: [{}],
        ruleForm: {
          mobie: ''
        },
        formInline: {
          MobileTel: '',
          DriverName: '',
          TruckNumber: ''
        },
        rules: {
          mobie: [{
            validator: checkPhone,
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        let _this = this;
        this.$http({
          method: 'get',
          url: '/api/SCM/GetCustomerTruckList',
          params: {
            pageindex: _this.currentPage,
            pagesize: 20,
            MobileTel: _this.formInline.MobileTel,
            DriverName: _this.formInline.DriverName,
            TruckNumber: _this.formInline.TruckNumber
          }
        }).then((response) => { //这里使用了ES6的语法
          console.log(response)
          if (response.data.data.pagecount == 0) {
            _this.paginationShow = false;
          } else {
            _this.tableData = response.data.data.CustomerTruckList;
            _this.total = response.data.data.pagecount;
            console.log(this.total);
            _this.currentPage = response.data.data.pageindex;
          }
          if(response.data.message =="401"){
             _this.$router.replace({ path: '/'})
          }
          //请求成功返回的数据
        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })
      },
      Search() {
        this.getData();

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let _this = this;
            this.$http({
              method: 'get',
              url: '/api/SCM/InsertCustomerTruck',
              params: {
                mobileTel: _this.ruleForm.mobie,
              }
            }).then((response) => { //这里使用了ES6的语法
              console.log(response)
              alert(response.data.message);
              _this.dialogVisible = false;
              _this.getData();
              _this.$refs[formName].resetFields();
              if(response.data.message =="401"){
                 _this.$router.replace({ path: '/'})
              }
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function(size) {
        this.pagesize = size;
        console.log(this.pagesize) //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage;
        this.getData();
        console.log(this.currentPage) //点击第几页
      }
    }
  }
</script>

<style>
  .el-table thead {
    background-color: #d2d6de !important;
  }

  .el-table th {
    background-color: #d2d6de !important;
    color: #000000
  }
  @media (min-width: 768px)and (max-width:1024px) {
    .customWidth {
      width: 50%!important;;
    }
  }
  @media (min-width: 576px)and (max-width: 767px) {
    .customWidth {
      width: 80%!important;;
    }
  }
  @media (min-width: 320px)and (max-width: 575px) {
    .customWidth {
      width: 90%!important;
    }
  }
</style>
