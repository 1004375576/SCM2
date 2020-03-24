<template>
  <div class="content-wrapper">
    <section class="content-header">
      <ol class="breadcrumb">
        <a href="/"><i class="fa fa-dashboard"></i></a>
        <li class="active">派车</li>
      </ol>
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
    <!--订单信息-->
    <div><h5 style="padding-left:10px ;">订单信息   <span style="margin-left:50px ;color:#CC0000;">发货单号：{{dispatchorderid}}</span></h5></div>
    <el-row :gutter="20" style="text-align:left ; padding:5px 10px ; background-color: #d2d6de!important;">
      <el-col :span="4">商品名称</el-col>
      <el-col :span="6">商品规格</el-col>
      <el-col :span="5">采购数量</el-col>
      <el-col :span="2">已运输数</el-col>
      <el-col :span="2">剩余运输数</el-col>
    </el-row>
    <el-row :gutter="20" style="text-align:left ;padding:5px 10px; margin-bottom:30px ;">
      <el-col :span="4">{{cgxx.goods_Name}}</el-col>
      <el-col :span="6">{{cgxx.sku_value}}</el-col>
      <el-col :span="5">{{cgxx.number}}{{cgxx.unit}}</el-col>
      <el-col :span="2">{{cgxx.numbers}}{{cgxx.unit}}</el-col>
      <el-col :span="2">{{cgxx.ynumber|rounding}}{{cgxx.unit}}</el-col>
    </el-row>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @row-click="showRow"
      @current-change="handleCurrentChanges" highlight-current-row>
      <!-- <el-table-column
	           type="selection"
	           width="55">
	         </el-table-column> -->
      <el-table-column width="85" label="单选">
        <template slot-scope="scope" >
          <el-radio v-model="radio" :label="scope.$index">&nbsp;</el-radio>
        </template>
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
        <template slot-scope="scope">
          <el-input v-model="scope.row.loads" size="small" ></el-input>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-left:20px ; margin-top:20px ;">
      <el-button type="primary" size="small" @click="submitForm()">确定</el-button>
    </div>
    <div>
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
        ynumber:'',//剩余运输数
        multipleSelection: [], //多选
        dispatchorderid: this.$route.query.dispatchorderid, //
        orderid: this.$route.query.orderid, //
        pagesize: 20,
        total: 0,
        currentPage: 1,
        paginationShow: true,
        auditstatus: '',
        dialogVisible: false,
        tableDatao:[{}],
        tableData: [{}],
        cgxx:'',
        radio: '', // 如果使用单选框，定义一个model值
        currentSelectItem: null, //当前选中的值
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
      this.getDatao();
    },
    filters: {
      rounding (value) {
        value=Number(value);
        return value.toFixed(2)
      }
    },
    methods: {
      // toggleSelection(rows) {
      //        if (rows) {
      //          rows.forEach(row => {
      //            this.$refs.multipleTable.toggleRowSelection(row);
      //          });
      //        } else {
      //          this.$refs.multipleTable.clearSelection();
      //        }
      //      },
      //      handleSelectionChange(val) {
      //        this.multipleSelection = val;
      //        console.log(this.multipleSelection);
      //      },
       tableRowClassName({row, rowIndex}) {
              if (rowIndex === 1) {
                return 'warning-row';
              } else if (rowIndex === 3) {
                return 'success-row';
              }
              return '';
            },
      showRow(row) {
        //赋值给radio
        this.radio = this.tableData.indexOf(row);
      },
      getCurrentRow(val) {
        console.log(val);
      },
      handleCurrentChanges(currentRow, oldCurrentRow) {
        console.log("haohao");
        this.currentSelectItem = currentRow;
         console.log(this.currentSelectItem);
        this.getCurrentRow(this.tableData.indexOf(currentRow));
      }, //选中的当前数据
      //订单信息
      getDatao() {
        let _this = this;
        this.$http({
          method: 'get',
          url: '/api/SCM/GetDispatchInfo',
          params: {
            dispatchOrderId: _this.dispatchorderid
          }
        }).then((response) => { //这里使用了ES6的语法
          console.log(response)
         _this.cgxx=response.data.data.DispatchOrderInfo.dispatchOrderGoods;
         _this.ynumber=response.data.data.DispatchOrderInfo.dispatchOrderGoods.ynumber;
         console.log( _this.ynumber);
          if (response.data.message == "401") {
            _this.$router.replace({
              path: '/'
            })
          }
          //请求成功返回的数据
        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })
      },
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
          if (response.data.message == "401") {
            _this.$router.replace({
              path: '/'
            })
          }
          //请求成功返回的数据
        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })
      },
      Search() {
        this.getData();

      },
      submitForm() {
        let json = {};
        let _this = this;
        json.dispatchOrderid = _this.dispatchorderid;
        json.orderid = _this.orderid;
        json.vendorinfodtos=[];
        json.vendorinfodtos.push(_this.currentSelectItem);
         console.log("222");
        console.log(_this.currentSelectItem);
         // alert(_this.currentSelectItem.loads);
         // alert(json.vendorinfodtos[0].loads);

         if(_this.currentSelectItem == null ){
           alert("必须选择车辆");
           return false;
         }
         if(_this.ynumber==0){
            alert("剩余运输数等于0无法派车");
            return false;
           }
           if(json.vendorinfodtos!=""){
             if(_this.ynumber<32){
               json.vendorinfodtos[0].loads=_this.ynumber;
             }
            if(_this.ynumber>=32){
             json.vendorinfodtos[0].loads=_this.currentSelectItem.loads;

            }
           }

        this.$confirm('是否确定派车, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'post',
            url: '/api/SCM/InsertLogisticOrder',
            data: json
          }).then((response) => { //这里使用了ES6的语法
            console.log(response)
            this.$message({
              type: 'success',
              message: response.data.message
            });
            _this.$router.replace({
              path: '/transport'
            })
            if (response.data.message == "401") {
              this.reload;
              _this.$router.replace({
                path: '/'
              })
            }
            //请求成功返回的数据
          }).catch((error) => {
            console.log(error) //请求失败返回的数据
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
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

<style scoped>
  .el-table thead {
    background-color: #d2d6de !important;
  }

  .el-table th {
    background-color: #d2d6de !important;
    color: #000000
  }
  .el-radio__label{ padding-left:0 ;}
  .el-table .warning-row {
      background: oldlace;
    }

    .el-table .success-row {
      background: #f0f9eb;
    }
</style>
