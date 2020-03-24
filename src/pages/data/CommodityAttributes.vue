<template>
	<div class="content-wrapper" style="min-height:500px;">
		<section class="content-header">
			<ol class="breadcrumb">
				<a href="/"><i class="fa fa-dashboard"></i></a>
				<li>
					<a href="javascript:;">数据</a>
				</li>
				<li class="active">商品属性</li>
			</ol>
     
			<h1 class="pull-right">
			    <router-link to="/AddAttr"  class="btn btn-primary btn-sm" icon="el-icon-plus">添加商品属性</router-link>
            </h1>
		</section>
    <div style="clear: both;"></div>
     <div style="width:99% ; margin:10px auto 5px;"></div>
		<el-table style="width: 100%" :data="tableData">

			<el-table-column label="属性ID" prop="attr_id">
			</el-table-column>
			<el-table-column label="属性名称" prop="attr_name">
			</el-table-column>
			<el-table-column rowspan="4" label="商品属性">
				<template slot-scope="scope">

					<span v-for="(item,index) in scope.row.goods_attr_values">

   		{{item.attr_value_data}} <span v-if="index!==scope.row.goods_attr_values.length-1">,</span>

					</span>
				</template>
			</el-table-column>
			<el-table-column label="创建时间" prop="createtime">
			</el-table-column>

			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<router-link :to="`/EditeAttr?attr_id=${scope.row.attr_id}`" class="btn btn-primary btn-sm" icon="el-icon-edit">编辑</router-link>
					<el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div>
			<div class="block" align="center" style="margin-top:20px ; background:#fff ; padding-bottom:20px ;">
				<el-pagination @size-change="handleSizeChange"  v-if="paginationShow"  @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
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
				tableData: [],
				pagesize: 20,
				total: 0,
				currentPage: 1
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
					url: '/api/GoodsAttrValue/GetGoodsAttrList',
					params: {
						pageindex: _this.currentPage,
						pagesize: 20
					}
				}).then((response) => { //这里使用了ES6的语法
        if(response.data.data.pagecount==0){
           _this.paginationShow=false

        }
					console.log(response)
					_this.tableData = response.data.data.goodsAttrList;
					_this.total = response.data.data.pagecount;
					console.log(_this.total);
					_this.currentPage = response.data.data.pageindex;
					//请求成功返回的数据
				}).catch((error) => {
					console.log(error) //请求失败返回的数据
				})
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
                 	url: '/api/GoodsAttrValue/GoodsAttrDelete',
                 	params: {
                 		attrid: row.attr_id
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
                    message: '已取消删除'
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
			},
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
