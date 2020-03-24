<template>
	<div class="content-wrapper">
	   <section class="content-header" >
			<ol class="breadcrumb">
				<a href="/"><i class="fa fa-dashboard"></i></a>
				<li class="active">采购订单</li>
            </ol>
         <!--   <h1 class="pull-right">
			    <router-link to="/AddOrder"  class="btn btn-primary btn-sm" icon="el-icon-plus">添加销售订单</router-link>
            </h1> -->
		</section>
		<div style="clear: both;"></div>
		<div style="width:99% ; margin:0 auto ;">
	    <el-form :inline="true" :model="formInline" class="demo-form-inline pa-form" size="small">
		  <el-form-item >
		    <el-input v-model="formInline.OrderId"  placeholder="请输入订单号"></el-input>
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

		  <el-form-item>
		    <el-button type="primary" @click="Search()">查询</el-button>
		  </el-form-item>
		</el-form>
		</div>
		  <el-table
		    :data="tableData"
		    style="width: 100%"   >

		    <el-table-column
		      label="订单号" width="150">
		     <template slot-scope="scope">
		     	<router-link :to="`/orderDetail?OrderId=${scope.row.orderid}`" >{{ scope.row.orderid}}</router-link>

		      </template>
		    </el-table-column>
        <el-table-column label="货物" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.goods_name}}</span>
          </template>
        </el-table-column>
		     <el-table-column
		       label="联系人">
		     <template slot-scope="scope">

		        <span>{{ scope.row.recipientname }}</span>
		      </template>
		    </el-table-column>
		     <el-table-column
		       label="联系电话">
		     <template slot-scope="scope">

		        <span>{{ scope.row.recipientmobile }}</span>
		      </template>
		    </el-table-column>

		      <el-table-column
		       label="订单金额"
		     width="120" >
		     <template slot-scope="scope">
		        <span>{{ scope.row.totalordermoney }} 元</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		       label="状态" width="80"
		      >
		     <template slot-scope="scope">
		        <span>{{ scope.row.orderstatus }}</span>
		      </template>
		    </el-table-column>
		     <el-table-column
		       label="创建时间" width="180"
		      >
		     <template slot-scope="scope">
		        <span>{{ scope.row.createtime }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column label="操作" width="200">
		      <template slot-scope="scope">
		          <router-link :to="`/orderDetail?OrderId=${scope.row.orderid}`"   class="btn btn-success" plain>详情</router-link>
		      </template>
		    </el-table-column>
		  </el-table>
		  <div>
		 <div class="block" align="center" style="margin-top:20px ; background:#fff ; padding-bottom:20px ;">
		    <el-pagination
		        @size-change="handleSizeChange"
		        @current-change="handleCurrentChange" v-if="paginationShow"
		        :current-page="currentPage"
		        :page-size="pagesize"
		        layout=" prev, pager, next, jumper"
		        :total="total">
		    </el-pagination>
		</div>
		</div>
		 </div>
		</template>

<script>
  export default {
    data() {
      return {
         paginationShow:true,
      	 pagesize:20,
        total:0,
        currentPage:1,
      	formInline:{
      		value: '',
      		value1: '',
      		OrderId:'',
			   OrderStatus:'',
		    statTime:'',
		    endTime:''
      	},
        tableData: [{
         }]
      }
    },
     created() {
         this.getData();
     },
    methods: {
    	getData(){
    		let _this =this;
    		 this.$http({
                method:'get',
                url:'/api/SCM/GetOrderList',
                params:
                {pageindex:_this.currentPage,
                 pagesize:20,
                 OrderId:_this.formInline.OrderId,
                 OrderStatus:_this.formInline.OrderStatus,
                 statTime:_this.formInline.value[0],
                 endTime:_this.formInline.value[1]
                }
            }).then((response) =>{          //这里使用了ES6的语法
               if(response.data.data.pagecount == 0){
                    _this.tableData="";
               _this.paginationShow = false;

                 	}else{
                 	_this.paginationShow = true;
                 		 console.log(response)
                      _this.tableData=response.data.data.CustomerOrderList;
                     _this.total = response.data.data.pagecount;
                     console.log(_this.total);
                    _this.currentPage = response.data.data.pageindex;
                 	}
                if(response.data.message =="401"){
                   _this.$router.replace({ path: '/'})
                }
                 //this.page-size = response.data.data.pagesize;
                //请求成功返回的数据
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据

            })
        },
         //查询
      Search() {
         this.getData();
      },
	// 初始页currentPage、初始每页数据数pagesize和数据data
     handleSizeChange: function (size) {
       this.pagesize = size;
       console.log(this.pagesize)  //每页下拉显示数据
     },
     handleCurrentChange: function(currentPage){
        console.log(currentPage)
       this.currentPage = currentPage;
       this.getData();
       // this.getData();
         //点击第几页
     }
    }
  }
</script>

<style scoped>
	.el-table thead{background-color: #d2d6de!important;}
	.el-table th{background-color: #d2d6de!important; color:#000000}
</style>
