<template>
	<div class="content-wrapper">
		<section class="content-header">
			<ol class="breadcrumb">
				<a href="/"><i class="fa fa-dashboard"></i></a>
				<li>
					<a href="javascript:;">数据</a>
				</li>
				<li class="active">商品列表</li>
			</ol>
			<h1 class="pull-right">
			    <router-link to="/AddSpgg"  class="btn btn-primary btn-sm" icon="el-icon-plus">添加商品信息</router-link>
            </h1>
		</section>
    <div style="clear: both;"></div>
     <div style="width:99% ; margin:10px auto 5px;">
			<el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline pa-form" size="small">
				<el-form-item label="商品名称">
					<el-input v-model="formInline.goods_name" placeholder="输入商品名称"></el-input>
				</el-form-item>
				<el-form-item label="商品编号">
					<el-input v-model="formInline.good_id" placeholder="输入商品编号"></el-input>
				</el-form-item>
				<el-form-item label="商品规格">
					<el-input v-model="formInline.sku_value" placeholder="输入商品规格"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="Search()">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-table style="width: 100%" :data="tableData" @Search="Search">

			<el-table-column label="商品编码" prop="goods_id">
			</el-table-column>
			<el-table-column label="商品名称" prop="goods_name">

			</el-table-column>

			<el-table-column label="商品规格" prop="sku_value">
             <template slot-scope="scope">
                 {{scope.row.sku_value}}
             </template>
			</el-table-column>


			<el-table-column label="库存" prop="stock">

			</el-table-column>
			<el-table-column label="单位" prop="unit">

			</el-table-column>

			<el-table-column label="价格" prop="price">

			</el-table-column>

			<el-table-column width="190" label="创建时间" prop="createtime">

			</el-table-column>

			<!--<el-table-column label="操作" width="200" >
      <template slot-scope="scope">
         <router-link :to="`/EditingGoods?goods_id=${scope.row.goods_id}&goods_name=${scope.row.goods_name}`"  class="btn btn-primary btn-sm" icon="el-icon-edit">编辑</router-link>
        <el-button
          size="mini"
          type="danger"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>-->
		</el-table>
		<div>
			<div class="block" align="center" style="margin-top:20px ; background:#fff ; padding-bottom:20px ;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" v-if="paginationShow" :page-size="pagesize" layout=" prev, pager, next, jumper" :total="total">
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
				tableData: [{}],
				pagesize: 20,
				total: 0,
				currentPage: 1,
				formInline: {
					good_id: '',
					goods_name: '',
					skuvalue: '',
					unit: ''
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
					url: '/api/GoodsSku/GetGoodsSkuList',
					params: {
						good_id: this.formInline.good_id,
						goods_name: this.formInline.goods_name,
						skuvalue: this.formInline.skuvalue,
						pageindex: _this.currentPage,
						pagesize: 20
					}
				}).then((response) => { //这里使用了ES6的语法
					if(response.data.data.pagecount == 0) {
						console.log(response.data.data.pagecount == 0);
						this.tableData = "";
						this.paginationShow = false;

					} else {
						this.paginationShow = true;
						console.log(response)
						this.tableData = response.data.data.goodsList;
						this.total = response.data.data.pagecount;
						console.log(this.total);
						this.currentPage = response.data.data.pageindex;
           this.pagesize = response.data.data.pagesize;
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
		background-color: #d2d6de!important;
	}

	.el-table th {
		background-color: #d2d6de!important;
		color: #000000
	}

	.el-input {
		width: auto
	}

	.demo-form-inline {
		margin-left: 10px;
	}
</style>
