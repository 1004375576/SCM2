<template>
  <div class="content-wrapper">
    <section class="content-header">
      <ol class="breadcrumb">
        <a href="/"><i class="fa fa-dashboard"></i></a>
        <li><a href="javascript:void(0);">销售</a></li>
        <li class="active">销售订单</li>
      </ol>
      <h1 class="pull-right">
        <router-link to="/AddOrder" class="btn btn-primary btn-sm" icon="el-icon-plus">添加销售订单</router-link>
      </h1>
    </section>
    <div style="clear: both;"></div>
    <div style="width:99% ; margin:10px auto 5px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline pa-form" size="small">
        <el-form-item>
          <el-input v-model="formInline.OrderId" placeholder="请输入订单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.OrderStatus" placeholder="请选择订单状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="发货中" value="Confirmed"></el-option>
            <el-option label="待审核" value="Audits"></el-option>
            <el-option label="已创建" value="Created"></el-option>
            <el-option label="已完成" value="ShippingOut"></el-option>
            <el-option label="已取消" value="Cancel"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.Name" placeholder="联系人"></el-input>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker v-model="formInline.value" style="width: 200px;" type="daterange" start-placeholder="开始日期"
            end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.MobileTel" placeholder="联系电话"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Search()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="订单号" width="150">
        <template slot-scope="scope">
          <router-link :to="`/OrdersDetail?OrderId=${scope.row.orderid}`">{{ scope.row.orderid}}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="收货联系人">
        <template slot-scope="scope">
          <span>{{ scope.row.recipientname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="货物" width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.goods_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单金额" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.totalordermoney }}元</span>
        </template>
      </el-table-column>

      <el-table-column label="待发货数量" width="120">
      	<template slot-scope="scope">
      		<span>{{scope.row.ySumNumber|rounding }}{{scope.row.unit}}</span>
      	</template>
      </el-table-column>
      <el-table-column label="收款状态">
        <template slot-scope="scope">
          <span>{{ scope.row.paystatus}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.orderstatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.createtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <p v-if="scope.row.orderstatus=='发货出库' ">
            <el-button size="mini" type="success" @click="OrderStatus(scope.row)">发货完成</el-button>
          </p>
        </template>
        <template slot-scope="scope">
             <div style="margin-bottom:10px ;">
            <span v-if="scope.row.orderstatus=='已创建' ">
              <!-- <router-link :to="`/OrdersDetail?OrderId=${scope.row.orderid}`" type="danger" plain  class="btn btn-warning btn-sm" >审核</router-link> -->
               <div style="margin-bottom:5px ;"><router-link :to="`/EditOrder?OrderId=${scope.row.orderid}`" class="btn btn-primary btn-sm" icon="el-icon-edit">编辑</router-link>
                <el-button type="success" class="btn btn-success btn-sm" size="small" @click="publish(scope.row)">发布</el-button>
                </div>
                <div>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)">取消</el-button>
                <router-link :to="`/OrdersDetail?OrderId=${scope.row.orderid}`" class="btn btn-primary btn-sm" icon="el-icon-edit">详情</router-link>
                 </div>
            </span>
            <span v-if="scope.row.orderstatus=='待审核' ">
               <div style="margin-bottom:5px ;">
               <router-link :to="`/OrdersDetail?OrderId=${scope.row.orderid}`" class="btn btn-primary btn-sm" icon="el-icon-edit">审核</router-link>
               <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)">取消</el-button>
                 </div>
                  <div>
                     <router-link :to="`/OrdersDetail?OrderId=${scope.row.orderid}`" class="btn btn-primary btn-sm" icon="el-icon-edit">详情</router-link>
                 </div>
            </span>
            <span v-if="scope.row.orderstatus=='发货中' ">
               <div style="margin-bottom:5px ;">
                  <router-link :to="`/InvoiceDetail?OrderId=${scope.row.orderid}`" class="btn btn-primary btn-sm" icon="el-icon-edit">发货</router-link>
                  <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)">取消</el-button>
               </div>
               <div>
                  <el-button size="mini" type="success" @click="yiwanc(scope.row)">结算</el-button>
                  <router-link :to="`/OrdersDetail?OrderId=${scope.row.orderid}`" class="btn btn-primary btn-sm" icon="el-icon-edit">详情</router-link>
                </div>
            </span>
            <span v-if="scope.row.orderstatus=='已完成' ">
             <router-link :to="`/OrdersDetail?OrderId=${scope.row.orderid}`" class="btn btn-primary btn-sm" icon="el-icon-edit">详情</router-link>
            </span>
            <span v-if="scope.row.orderstatus=='已取消' ">
               <router-link :to="`/OrdersDetail?OrderId=${scope.row.orderid}`" class="btn btn-primary btn-sm" icon="el-icon-edit">详情</router-link>
            </span>

            </div>

        </template>
      </el-table-column>
    </el-table>
    <div>
      <div class="block" align="center" style="margin-top:20px ; background:#fff ; padding-bottom:20px ;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-if="paginationShow"
          :current-page="currentPage" :page-size="pagesize" layout=" prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        paginationShow: true,
        pagesize: 20,
        total: 0,
        currentPage: 1,
        statTime: '',
        endTime: '',
        formInline: {
          value: '',
          value1: '',
          OrderId: '',
          Name: '',
          MobileTel: '',
          OrderStatus: '',
          statTime: '',
          endTime: ''
        },
        tableData: [{}]
      }
    },
    created() {
      this.getData();
    },
    filters: {
      rounding (value) {
        value=Number(value);
        return value.toFixed(2)
      }
    },
    methods: {

      publish(row){
        this.$confirm('是否发布订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'get',
            url: '/api/CustomerOrder/UpdateCustomerOrderStatus',
            params: {
              OrderId: row.orderid,
              OrderStatus: 'Audits'
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
      yiwanc(row) {
        console.log(row.orderid);
        this.$confirm('是否确认进行结算?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'get',
            url: '/api/CustomerOrder/UpdateCustomerOrderStatus',
            params: {
              OrderId: row.orderid,
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
            message: '已取消'
          });
        });
      },
      getData() {
        let _this = this;
        this.$http({
          method: 'get',
          url: '/api/CustomerOrder/GetCustomerOrderList',
          params: {
            pageindex: _this.currentPage,
            pagesize:20,
            OrderId: _this.formInline.OrderId,
            Name: _this.formInline.Name,
            MobileTel: _this.formInline.MobileTel,
            OrderStatus: _this.formInline.OrderStatus,
            statTime: _this.formInline.value[0],
            endTime: _this.formInline.value[1]
          }
        }).then((response) => { //这里使用了ES6的语法
          if (response.data.data.pagecount == 0) {
            _this.tableData = "";
            _this.paginationShow = false;

          } else {
            _this.paginationShow = true;
            console.log(response)
            _this.tableData = response.data.data.CustomerOrderList;
            _this.total = response.data.data.pagecount;
            console.log(_this.total);
            _this.pagesize = response.data.data.pagesize;
            _this.pageindex=response.data.data.pageindex;
          }

          //请求成功返回的数据
        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })
      },
      //查询
      Search() {
        this.getData();
      },
      //表格删除
      handleDelete(row) {
        let _this = this;
        console.log(row);
         this.$confirm('确认取消?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$http({
                  method: 'get',
                  url: '/api/CustomerOrder/DeleteCustomerOrder',
                  params: {
                    OrderId: row.orderid
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
                      this.getData();
                      this.tableData.splice(row, 1);
                    }

                  }).catch((error) => {
                    console.log(error) //请求失败返回的数据
                    if(error.response.data.message == '403'){//没有权限
                      alert("没有权限");
                    }
                  })
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  });
                });
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
</style>
