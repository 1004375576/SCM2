<template>
	<div class="content-wrapper">
		<section class="content-header">
			<ol class="breadcrumb">
				<a href="/"><i class="fa fa-dashboard"></i></a>
				<li>
					<a href="javascript:void(0);">销售</a>
				</li>
				<li class="active">销售发货单</li>
			</ol>
			<!--<h1 class="pull-right">
			    <router-link to="/AddOrder"  class="btn btn-primary btn-sm" icon="el-icon-plus">添加发货订单</router-link>
            </h1>-->
		</section>
		<div style="clear: both;"></div>
	<div style="width:99% ; margin:10px auto 5px;">
			<el-form :inline="true" :model="formInline" class="demo-form-inline pa-form" size="small">
				<el-form-item>
					<el-input v-model="formInline.dispatchorderid" placeholder="请输入发货单号"></el-input>
				</el-form-item>
        <el-form-item>
        	<el-select v-model="formInline.OrderStatus" placeholder="请选择订单状态">
        		<el-option label="全部" value=""></el-option>
            <el-option label="待审核" value="Audits"></el-option>
            <el-option label="已出库" value="Outbound"></el-option>
        		<el-option label="发货完成" value="Shipped"></el-option>
            <el-option label="已取消" value="Cancel"></el-option>
        	</el-select>
        </el-form-item>

				<el-form-item>
					<el-input v-model="formInline.Name" placeholder="联系人"></el-input>
				</el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
               v-model="formInline.value" style="width: 200px;"
               type="daterange"
               start-placeholder="开始日期"
               end-placeholder="结束日期"
               format="yyyy-MM-dd"
                     value-format="yyyy-MM-dd HH:mm:ss"
               :default-time="['00:00:00', '23:59:59']">
             </el-date-picker>
          </el-form-item>
			<!-- 	<el-form-item>
					<el-date-picker v-model="formInline.statTime" type="datetime" placeholder="开始日期" value-format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-date-picker v-model="formInline.endTime" type="datetime" placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>
				</el-form-item> -->
				<el-form-item>
					<el-input v-model="formInline.MobileTel" placeholder="联系电话"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="Search()">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-table :data="tableData" style="width: 100%">

			<el-table-column label="发货单号" width="120">
				<template slot-scope="scope">
          <span> <router-link :to="`/invoice?dispatchorderid=${scope.row.dispatchorderid}`"   icon="el-icon-edit">{{scope.row.dispatchorderid}}</router-link></span>
				</template>
			</el-table-column>
      <el-table-column label="订单号" width="120">
        <template slot-scope="scope">
          <span> <router-link :to="`/OrdersDetail?OrderId=${scope.row.orderid}`"   icon="el-icon-edit">{{scope.row.orderid}}</router-link></span>
        </template>

      </el-table-column>
			<el-table-column label="收货联系人" width="100">
				<template slot-scope="scope">
					<span>{{ scope.row.recipientname }}</span>
				</template>
			</el-table-column>

      <el-table-column label="联系电话" width="120">
      	<template slot-scope="scope">
      		<span>{{ scope.row.recipientmobile }}</span>
      	</template>
      </el-table-column>
      <el-table-column label="货物" width="180">
      	<template slot-scope="scope">
         	<div v-if="scope.row.dispatchOrderGoods !== null">

         <div>
           {{scope.row.dispatchOrderGoods.goods_Name}}<br/>
            {{scope.row.dispatchOrderGoods.sku_value}}
           <br/>
           {{scope.row.dispatchOrderGoods.number}}
           {{scope.row.dispatchOrderGoods.unit}}
         </div>

           </div>
         <div v-else>
         	<p>无数据</p>
         </div>

      	</template>
      </el-table-column>

      <el-table-column label="待运输数量">
      	<template slot-scope="scope">
      		<span>{{ scope.row.dysCount | rounding }}</span>
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


			<el-table-column label="操作" width="180">
				<template slot-scope="scope">
          <P style="margin-bottom:6px ;">
            <router-link :to="`/invoice?dispatchorderid=${scope.row.dispatchorderid}`" class="btn btn-primary btn-sm">详情</router-link>
          </P>
          <p v-if="scope.row.orderstatus=='已出库' ">
          <!-- 	<el-button size="mini" type="danger" icon="el-icon-delete" @click="OrderStatu(scope.row)">退货</el-button> -->
          	<el-button size="mini" type="success" @click="OrderStatusQque(scope.row)">发货完成</el-button>

          </p>
          <p v-if="scope.row.orderstatus=='待审核' ">
             <router-link :to="`/invoice?dispatchorderid=${scope.row.dispatchorderid}`" class="btn btn-warning btn-sm">审核</router-link>
          <!-- 	<el-button size="mini" type="danger" icon="el-icon-delete" @click="OrderStatu(scope.row)">退货</el-button> -->
          	<el-button size="mini" type="danger" @click="handleDelete(scope.row)">取消</el-button>
          </p>

				</template>
			</el-table-column>
		</el-table>
		<div>
			<div class="block" align="center" style="margin-top:20px ; background:#fff ; padding-bottom:20px ;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-if="paginationShow" :current-page="currentPage" :page-size="pagesize" layout=" prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>

		<!--确认弹出框-->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="20%">
			<span>确认，是否继续</span>
			<span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="OrderStatusQque()">确 定</el-button>
		  </span>
		</el-dialog>
		<!--退货弹出框-->
		<el-dialog title="提示" :visible.sync="dialogFVisible" width="20%">
			<span>确认退货，是否继续</span>
			<span slot="footer" class="dialog-footer">
		    <el-button @click="dialogFVisible = false">取 消</el-button>
		    <el-button type="primary" @click="OrderStatusth()">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogVisible: false,
				dialogFVisible: false,
				paginationShow: true,
				obj: {},
				pagesize: 20,
				total: 0,
				currentPage: 1,
				statTime: '',
				endTime: '',
				row: '',
				formInline: {
					value: '',
					value1: '',
					dispatchorderid: '',
					Name: '',
					MobileTel: '',
					PayStatus: '',
					statTime: '',
					endTime: '',
					OrderStatus:''
				},
				tableData: [{
					flagshow: true
				}]

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

			OrderStatus(row) {
				this.dialogVisible = true;
				this.row = row;
			},
			OrderStatu(row) {
				this.dialogFVisible = true;
				this.row = row;
			},

			//确认发货完成
			OrderStatusQque(row) {
        console.log(row);
        this.$confirm('是否确认?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$http({
                    method: 'get',
                    url: '/api/DispatchOrder/UpdateDispatchOrderStatus',
                    params: {
                    	dispatchOrderId: row.dispatchorderid,
                    	OrderStatus: 'Shipped'
                    }
                  }).then((response) => {
                  	console.log(response);
                    this.$message({
                      type: 'success',
                      message: response.data.message
                    });
                  	this.dialogVisible = false;
                  	this.getData();
                  	//row.flagshow = false;
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
					url: '/api/DispatchOrder/GetDispatchOrderList',
					params: {
						pageindex: _this.currentPage,
						pagesize: 15,
						dispatchOrderId: _this.formInline.dispatchorderid,
						Name:  _this.formInline.Name,
						MobileTel: _this.formInline.MobileTel,
						OrderStatus:_this.formInline.OrderStatus,
						statTime: _this.formInline.value[0],
						endTime: _this.formInline.value[1]
					}
				}).then((response) => { //这里使用了ES6的语法
					console.log(response)
          if(response.data.data.pagecount == 0){
               _this.tableData="";
          _this.paginationShow = false;

            	}else{
            	_this.paginationShow = true;
            		 console.log(response)
                 _this.tableData=response.data.data.CustomerOrderList;
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
                  url: '/api/DispatchOrder/DeleteDispatchOrder',
                  params: {
                    dispatchOrderId: row.dispatchorderid
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
		background-color: #d2d6de!important;
	}

	.el-table th {
		background-color: #d2d6de!important;
		color: #000000
	}
</style>
