<template>
  <div class="content-wrapper">
    <section class="content-header">
      <ol class="breadcrumb">
        <a href="/"><i class="fa fa-dashboard"></i></a>
        <li><a href="javascript:void(0);">库存管理</a></li>
        <li class="active">出入库明细</li>
      </ol>
    <!--  <h1 class="pull-right">
        <router-link to="/AddWarehousing" class="btn btn-primary btn-sm" icon="el-icon-plus">新增</router-link>
      </h1> -->
    </section>
    <div style="clear: both;"></div>
     <div style="width:99% ; margin:0 auto ;">
     	<el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline pa-form" size="small">
        <el-form-item label="商品编码">
        	<el-input v-model="formInline.goodid" placeholder="输入商品编码"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
        	<el-input v-model="formInline.goodsName" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品规格">
        	<el-input v-model="formInline.name" placeholder="输入商品规格"></el-input>
        </el-form-item>
        <el-form-item label="入库日期选择">
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
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="stocknumberid"  label="单号" width="120">
      </el-table-column>
      <el-table-column prop="goods_id"  label="商品编号">
      </el-table-column>
      <el-table-column  label="商品名称"  prop="goods_name" width="150">
      </el-table-column>
      <el-table-column prop="stockname" label="商品规格">
        <template slot-scope="scope">
        	<span>{{ scope.row.stockvalue }}</span>
        </template>
      </el-table-column>

      <el-table-column  label="入库数量">
        <template slot-scope="scope">
          <span style="color:#00CA6D ;">+{{scope.row.stock}}</span>
        </template>
      </el-table-column>
     <el-table-column prop="unit" label="单位">
     </el-table-column>
     <el-table-column prop="gstock" label="库存">
     </el-table-column>
     <el-table-column prop="stocktime" label="入库日期">
     </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <router-link :to="`/InventoryDetails?stocknumberid=${scope.row.stocknumberid}&goods_name=${scope.row.goods_name}`" class="btn btn-primary btn-sm" icon="el-icon-edit">查看</router-link>
        </template>
      </el-table-column>
    </el-table>
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
      return {
        pagesize: 20,
        total: 0,
        currentPage: 1,
        paginationShow: true,
        tableData: [],
        formInline:{
         value:'',
         goodid:'',
         name:'',
         goodsName:''

        }
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        console.log(this.formInline.value);
        let _this = this;
        this.$http({
          method: 'get',
          url: '/api/GoodsStockDetail/StockList',
          params: {
            pageindex: _this.currentPage,
            pagesize: 20,
            goodid:_this.formInline.goodid,
            name:_this.formInline.name,
            goodsName:_this.formInline.goodsName,
            startTime:_this.formInline.value[0],
            endTime:_this.formInline.value[1]
          }
        }).then((response) => { //这里使用了ES6的语法
          console.log(response)
          if(response.data.data.pagecount==0){
              _this.paginationShow=false;
              _this.tableData='';
          }else{
         _this.tableData = response.data.data.goodsStockList;
         _this.total = response.data.data.pagecount;
          console.log(this.total);
           _this.pagesize = response.data.data.pagesize;}
          //请求成功返回的数据
        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })
      },
      Search(){
       this.getData();
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
