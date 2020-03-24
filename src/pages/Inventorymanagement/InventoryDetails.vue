<template>
	<div class="content-wrapper" >
	<section class="content-header">
			<ol class="breadcrumb" style="display: block; float: none;">
				    <a href="/"><i class="fa fa-dashboard"></i></a>
				     <li><a href="javascript:void(0);">库存管理</a></li>
				      <li><a href="javascript:void(0);">出入库列表</a></li>
				     <li class="active">明细</li>
            </ol>
            <h1 class="pull-right">
                  <router-link to="/Warehousinglist"  class="btn btn-primary btn-sm" icon="el-icon-back">返回出入库列表</router-link>
            </h1>
		</section>
	<div class="content">
		<div class="box box-primary">
			<div class="box-header with-border">
                  <h3 class="box-title">入库明细</h3>
            </div>
            <div class="box-body">
            	<div style="margin-bottom:15px ;">
              <span style="margin-right:40px ;">仓库：默认仓</span> 单号：<span style="color:#AA0000">{{stocknumberid}}</span>
             <span style="margin-left:40px ;"> 入库日期：{{stocktime}}</span>

              </div>

				<el-row :gutter="20">
									<el-table
					    :data="tableData"
					    border
					    style="width: 100%">
					    <el-table-column
					     type="index"
					      label="序号"
                width='100'
					     >
					    </el-table-column>
                 <el-table-column
                   prop="goods_id"
                   label="商品编码"
                  >
                 </el-table-column>
					       <el-table-column
					      prop="goods_name"
					      label="商品名称"
					     >
					    </el-table-column>
             <el-table-column
               prop="stockvalue"
               label="商品规格"
               >
             </el-table-column>
					     <el-table-column
					      prop="stock" sortable
					      label="入库数量">
					    </el-table-column>
					      <el-table-column
					        prop="unit"
					      label="单位">
					    </el-table-column>
					  </el-table>
					  </el-row>
					 <el-row :gutter="20">
             <div style="padding-left:20px ; margin-top:20px ;">
               备注说明:{{remarks}}
             </div>
					 </el-row>
					</div>
				</div>
	  </div>
	</div>
</template>
<script>
  export default {
    data() {
      return {
		stocknumberid: this.$route.query.stocknumberid,
    stocktime:'',
		remarks:'',
        tableData:[{}],
        ruleForm:{

        },
      };
    },
    created() {
	  this.getData();
	},
    methods: {
    	getData(){
				this.$http({
					method: 'get',
					url: '/api/GoodsStockDetail/GetStockInfo',
					dataType: "json",
				     params: {
						stockNumberId:this.stocknumberid
					}
				}).then((response) => { //这里使用了ES6的语法
					console.log(response)
					     let _this = this
				      let newsAarys = {};
				  _this.tableData=response.data.data.StockInfo.goods_stockDetails;
          _this.stocktime=response.data.data.StockInfo.stocktime;
          _this.remarks=response.data.data.StockInfo.remarks;
					//请求成功返回的数据
				}).catch((error) => {
					console.log(error) //请求失败返回的数据
				})
			}
    }

  }
</script>

<style>
   .el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label {
    line-height: 28px;}
.el-input__inner{border-radius:0 ;}
.el-dialog__body{padding:10px 20px ;}
input[type=file]{display: none;}
.el-upload__tip {
    font-size: 12px;
    color: #606266;
    margin-top: 7px;
    display: inline-block;
    margin-left: 15px;
}
</style>
