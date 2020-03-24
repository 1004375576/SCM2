<template>

	<div class="content-wrapper">
	<section class="content-header">
			<ol class="breadcrumb">
				    <a href="/"><i class="fa fa-dashboard"></i></a>
				     <li><a href="javascript:void(0);">数据</a></li>
				     <li class="active" @click="getData">商品</li>
            </ol>
            <h1 class="pull-right">
			    <router-link to="/AddGoods"  class="btn btn-primary btn-sm" icon="el-icon-plus">添加商品</router-link>
            </h1>
		</section>
 <div style="clear: both;"></div>
     <div style="width:99% ; margin:10px auto 5px;"></div>
  <el-table

    style="width: 100%" :data="tableData">

    <el-table-column
      label="商品ID" prop="goods_id"
     >
    </el-table-column>
     <el-table-column
      label="商品名称" prop="goods_name"
     >
    </el-table-column>
    <el-table-column label="操作" width="200" >
      <template slot-scope="scope">
           <router-link :to="`/EditingGoods?goods_id=${scope.row.goods_id}&goods_name=${scope.row.goods_name}`"  class="btn btn-primary btn-sm" icon="el-icon-edit">编辑</router-link>
        <el-button
          size="mini"
          type="danger" v-if="!scope.row.editing"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div>
   <div class="block" align="center" style="margin-top:20px ; background:#fff ; padding-bottom:20px ;">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
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
        tableData: [],
        pagesize:20,
        total:0,
        currentPage:1
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
                url:'/api/Goods/GetGoodsList',
                headers:{'requestmethod':'axios'},
                params:
                {pageindex:_this.currentPage,
                 pagesize:20
                }
            }).then((response) =>{          //这里使用了ES6的语法
                console.log(response)
                this.tableData=response.data.data.goods;
                this.total = response.data.data.pagecount;
                console.log(this.total);
                 this.pagesize = response.data.data.pagesize;
                //请求成功返回的数据
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
            })
        },
		      //表格删除
		      handleDelete(row) {
		        let _this = this;
		        console.log(row.goods_id);
		         this.$confirm('确认删除?', '提示', {
		                  confirmButtonText: '确定',
		                  cancelButtonText: '取消',
		                  type: 'warning'
		                }).then(() => {
		                  this.$http({
		                    method: 'get',
		                    url: '/api/Goods/Delete',
                        headers:{'requestmethod':'axios'},
		                    params: {
		                      id:row.goods_id
		                    }
		                  }).then((response) => { //这里使用了ES6的语法
		                    console.log(response)
		                    if (response.data.code == 1) {
		                     this.$message({
		                       type: 'info',
		                       message: '删除失败'
		                     });
		                    }

		                    if (response.data.code == 0) {
		                      this.$message({
		                        type: 'info',
		                        message: response.data.message
		                      });
		                     _this.getData();
		                     _this.tableData.splice(row, 1);
		                    }

		                  }).catch((error) => {
		                    console.log(error) //请求失败返回的数据
                        if(error.response.data.message == '403'){//没有权限
                          alert("没有权限");
                        }
		                  })
		                }).catch(() => {
		                 _this.$message({
		                    type: 'info',
		                    message: '已取消删除'
		                  });
		                });
		      },
       // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                this.getData();
                console.log(this.currentPage)  //点击第几页
        },
    }
  }
</script>

<style scoped>
	.el-table thead{background-color: #d2d6de!important;}
	.el-table th{background-color: #d2d6de!important; color:#000000}

</style>
