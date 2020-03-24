<template>
	<div class="content-wrapper">
		<section class="content-header">
			<ol class="breadcrumb" style="display: block; float: none;">
				<a href="/"><i class="fa fa-dashboard"></i></a>
				<li>
					<a href="javascript:void(0);">库存管理</a>
				</li>
				<li>
					<a href="javascript:void(0);">商品入库</a>
				</li>
				<li class="active">新增商品入库</li>
			</ol>
			<h1 class="pull-right">
         <router-link to="/Warehousinglist"  class="btn btn-primary btn-sm" icon="el-icon-back">返回商品入库</router-link>
      </h1>
		</section>
		<div class="content">
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title">新增商品入库</h3>
				</div>
				<div class="box-body">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" size="small" class="demo-ruleForm demo-dynamic">
						<el-row :gutter="10">
						  <el-col :xs="18" :sm="12" :md="8" style="position: relative;">
								<el-form-item label="仓库" required>
									<el-input v-model="ruleForm.name" readonly="readonly" ></el-input>
								</el-form-item>
								<!-- <el-button type="text" style="position:absolute ;top: -5px;right: 20px;" @click="centerDialogVisible = true"><i class="el-icon-more"></i></el-button> -->
							</el-col>
							 <el-col :xs="18" :sm="12" :md="8" style="position: relative;">
              		<el-form-item label="入库日期"  size="samll" required>
              			<el-date-picker  v-model="ruleForm.stocktime" type="datetime" size="samll" placeholder="选择入库日期" value-format="yyyy-MM-dd HH:mm:ss">
              			</el-date-picker>
              		</el-form-item>
              </el-col>
						</el-row>
					<el-row :gutter="10">
							<el-table :data="tableNddata" border  style="width: 100%">
								<el-table-column label="ID" type="index">
								</el-table-column>
								<el-table-column width="130">
									<template slot-scope="scope">
										<el-button class="el-icon-plus" size="mini" @click="addRow">

										</el-button>
										<el-button class="el-icon-minus" size="mini" v-show="!(tableNddata.length == 1)" @click="deletRow(scope.$index)">

										</el-button>
									</template>

								</el-table-column >
							    <el-table-column width="190" prop="goods_name" label="商品名称">
									<template slot-scope="scope">
										<el-row :gutter="20">
											<el-col :span="18"><el-input type="text" style="border:0;" @focus="openCommodityList()" class="choosen" v-model="scope.row.goods_name" size="small" placeholder="请选择商品"></el-input></el-col>
											<el-col :span="5"><el-button type="button" @click="openCommodityList()" size="small"><i class="el-icon-more"></i></el-button></el-col>
                                        </el-row>
									</template>
								</el-table-column>
								<el-table-column prop="goods_id" label="商品编码" width="150">

								</el-table-column>
                <el-table-column prop="stockname" label="商品规格" >
                  <template slot-scope="scope">
                  	<span>{{ scope.row.sku_value }}</span>
                  </template>
                </el-table-column>
								<el-table-column prop="unit" label="单位" width="50">
								</el-table-column>
								<el-table-column prop="number" label="入库数量" sortable  width="180">
									<template slot-scope="scope">
										<div class="div_number">
											<el-input-number :min="1" size="mini" @change="handleDataChange($event,scope.row)" v-model="scope.row.number"></el-input-number>
										</div>
									</template>
								</el-table-column>
							</el-table>
						</el-row>
						</el-form-item>
						<el-row :gutter="10"  style="margin-top:20px ;">
							 <el-col :xs="22" :sm="18" :md="12">
								<el-form-item label="备注说明" prop="remarks">
									<el-input type="textarea" v-model="ruleForm.remarks"></el-input>

								</el-form-item>

							</el-col>
						</el-row>

						<el-form-item>
							<el-button type="success" @click="onSubmit()">保存</el-button>
							<el-button>取消</el-button>
						</el-form-item>

					</el-form>
				</div>
			</div>

		</div>



		<!--选择商品-->
		<el-dialog title="选择商品" :visible.sync="dialogTablesVisible" customClass="customWidth">
			<el-form :inline="true" :model="formInlines" ref="formInlines" size="small" class="demo-form-inline">
				<el-form-item>
					<el-input v-model="formInlines.goods_name" placeholder="请输入商品名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="formInlines.skuvalue" placeholder="请输入商品规格"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="searchGoodList()">查询</el-button>
				</el-form-item>

				<el-table ref="singleTable" :data="guigeNddata"  empty-text="暂无数据" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55" :selectable="checkSelectTable">
					</el-table-column>
					<el-table-column property="goods_name" label="商品名称" width="100"></el-table-column>
					<el-table-column property="unit" label="单位" width="60"></el-table-column>
					<el-table-column property="stock" label="库存" width="80"></el-table-column>
					<el-table-column property="number" label="数量" width="60">
					</el-table-column>
					<el-table-column property="price" label="单价" width="80"></el-table-column>
					<el-table-column property="sku_value" label="商品规格" ></el-table-column>
				</el-table>
				<el-pagination @size-change="handleSizeChangec"  v-if="paginationShow"
					@current-change="handleCurrentChangec" :current-page="currentPage1"
					:page-size="pagesize1"
					layout=" prev, pager, next, jumper" :total="total1" :current-page.sync="currentPage1">
				</el-pagination>


				<el-form-item style="margin-top:15px ;">
					<el-button type="primary" @click="save">保存</el-button>
					<el-button @click="dialogTablesVisible = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>

</template>
<script>
	export default {
		data() {
			return {
				paginationShow:true,

				id:"",//常用地址id
        currentRowc:'',
				//商品表格变量
				goods_name: '',
				price: '',
				sku_id: 1,
				stock: 1,
				unit: '',

				//总金额

				pagesize: 20,
				total: 0,
				currentPage: 1,
				//商品分页
				pagesize1:20,
				currentPage1: 1,
				total1: 0,

				value1: '',
				multipleSelection: [],
				//单选
				radio2: '',
				AddressTable: [{}],
				tableNddata: [{
					goods_name: '',
					sku_id: '',
          goods_id: '',
					stock: 1,
          sku_value:'',
          sku_code:'',
					unit: ''

				}],

				newTableData: [], // 记录选择是的数据
				formInlines: {
					goods_name: '',
					skuvalue: ''
				},
				guigeNddata: [{

				}],


				selected: {},
				tableData: [],

				dialogTablesVisible: false,

				ruleForm: {
					name: '默认仓库',
					stocktime: '',
          remarks:''
				},

				rules: {
					 stocktime: [
			            {required: true, message: '必须选择入库时间', trigger: 'blur' }
			          ]
				}
			};
		},
		created() {
			this.chooseGoodList();
		},

		methods: {
			openAddressData() {

				this.dialogForm23Visible = true;
				this.addressData();
				this.ssqData();
			},
			openCommodityList() {

				this.dialogTablesVisible = true;
				this.chooseGoodList();
			},
			//规格列表
			chooseGoodList() {
				let _this = this;
				this.$http({
					method: 'get',
					url: '/api/GoodsSku/GetGoodsSkuSelectList',
					params: {
						goodsName: this.formInlines.goods_name,
						goodid: this.formInlines.skuvalue,
            name:this.formInlines.name,
						pageindex: _this.currentPage1,
						pagesize: 20
					}
				}).then((response) => { //这里使用了ES6的语法
					console.log(response)
					if(response.data.data.pagecount==0){

					}else{
			       _this.guigeNddata = response.data.data.goodsList;
					   _this.guigeNddata.forEach((item, index) => {
						if(!item.number) {
							_this.$set(item, 'number', 1);
						}
					})
					_this.total1 = response.data.data.pagecount;
					console.log(_this.total1);
					_this.currentPage1 = response.data.data.pageindex;

					}

//					this.page-size = response.data.data.pagesize;
					//请求成功返回的数据
				}).catch((error) => {
					console.log(error) //请求失败返回的数据
				})

			},
			//规格查询
			searchGoodList() {
				this.currentPage1=1;
				let _this = this;
				this.$http({
					method: 'get',
					url: '/api/GoodsSku/GetGoodsSkuSelectList',
					params: {
						goods_name: this.formInlines.goods_name,
						skuvalue: this.formInlines.skuvalue,
						pageindex: _this.currentPage1,
						pagesize: 20
					}
				}).then((response) => { //这里使用了ES6的语法
					console.log(response)
					if(response.data.data.pagecount==0){
						this.guigeNddata="";
						this.paginationShow = false;
					}else{
					this.paginationShow = true;
				    this.guigeNddata = response.data.data.goodsList;
					this.guigeNddata.forEach((item, index) => {
						if(!item.number) {
							this.$set(item, 'number', 1);
						}
					})
                    // this.currentPage1=1;
					this.total1 = response.data.data.pagecount;
					console.log(this.total1);
					this.currentPage1 = response.data.data.pageindex;

					}

					//this.page-size = response.data.data.pagesize;
					//请求成功返回的数据
				}).catch((error) => {
					console.log(error) //请求失败返回的数据
				})

			},

			//表单提交
			onSubmit() {
				let _this = this
				let newsAary = {};
				// newsAary.goods_outStockList = _this.tableNddata;
          _this.tableNddata.forEach(element => {
           	//console.log(element);
            delete element.stock;
           })
           console.log("dd");
           console.log( _this.tableNddata);
           newsAary.goods_outStockList=_this.tableNddata;
           newsAary.goods_outStockList.forEach(element => {
        	//console.log(element);
        	_this.$set(element, 'stock', element.number)
          _this.$set(element, 'stockvalue', element.sku_value)
        })
       newsAary.goods_outStockList.forEach(element => {
        	//console.log(element);
        delete element.number;
        })

			  newsAary.remarks = _this.ruleForm.remarks;
        newsAary.stocktime = _this.ruleForm.stocktime;
         console.log("ddcc");
				console.log(newsAary);
        if(this.ruleForm.stocktime==""){
          alert("入库日期不能为空");
          return false;
          }
          if(newsAary.goods_outStockList.sku_id==""){
            alert("商品不能有空数据");
            return false;
           }
				this.$http({
					method: 'post',
					url: '/api/GoodsStockDetail/InsertStock',
					contentType: "application/json",
					dataType: "json",
					data:newsAary
				}).then((response) => { //这里使用了ES6的语法
        if(response.data.code == 1 ){
					console.log(response)
					alert(response.data.message);
         }

          if(response.data.code== 0){
            console.log(response)
            alert(response.data.message);
            _this.$router.replace({
            path: '/Warehousinglist'
            })
            }
					//请求成功返回的数据
				}).catch((error) => {
					console.log(error) //请求失败返回的数据
          if(error.response.data.message == '403'){//没有权限
            alert("没有权限");
          }
				})

			},




			addRow: function() {
				//console.log(this.ruleForm)
				let json = {};
				//json.id = '';
				json.goods_name = '';
				json.sku_id = '';
				json.number = '';
        json.sku_value = '';
        json.sku_code = '';
				json.unit = '';

				this.tableNddata.push(json);
				console.log(this.tableNddata);
				//this.ruleForm={};
			},
			deletRow(row, index) {
				this.tableNddata.splice(row, 1);
				if(row.sku_id != '') {
					this.newTableData.splice(row, 1);
				}
			},

			//商品选择分页
			handleSizeChangec: function(size) {
				this.pagesize1 = size;
				console.log(this.pagesize1) //每页下拉显示数据
			},
			handleCurrentChangec: function(currentPage) {
				this.currentPage1 = currentPage;
				this.chooseGoodList();
				console.log(this.currentPage1) //点击第几页
			},

			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			handleSelectionChange(val) {

				this.multipleSelection = val;
				//this.tableNddata.push(val);
			},
			save() {
				let _this = this,
					temp = {},
					result = [];
				console.log(_this.multipleSelection)
				this.newTableData = this.newTableData.concat(_this.multipleSelection); // 保存所有的选择数据
				// 去除重复的数据
				this.newTableData.map((item, index) => {
					if(!temp[item.sku_id]) {
						result.push(item);
						temp[item.sku_id] = true;
					}
				})
				this.tableNddata = result;
				console.log(this.tableNddata)
				this.dialogTablesVisible = false;
			},
			checkSelectTable(row, index) {
				let arr = this.newTableData,
					status = true;
				if(arr.length > 1) {
					status = arr.every((item, index, arry) => {
						return item.sku_id != row.sku_id;
					})
				}

				return status;

			}

		}

	}
</script>
<style>
	.el-form-item--small .el-form-item__content,
	.el-form-item--small .el-form-item__label {
		line-height: 28px;
	}

	.el-input__inner {
		border-radius: 0;
	}

	input[type=file] {
		display: none!important;
	}
	.el-radio {
    color: #606266;
    cursor: pointer;
    margin-right: 30px;
    color: white;
    }
	.el-upload__tip {
		font-size: 12px;
		color: #606266;
		margin-top: 7px;
		display: inline-block;
		margin-left: 15px;
	}

	.el-dialog__body {
		padding: 5px 10px!important;
	}

	.el-dialog__header {
		padding: 10px;
	}
	.el-radio {
    color: #fff;
    cursor: pointer;
    margin-right:10px;
}
.customWidth{width:60% ;}
 @media (min-width: 768px) and (max-width: 991.98px) { .customWidth{width:96%!important;}}
 @media (min-width: 576px)and (max-width: 768px){ .customWidth{width:98%!important;} }
@media (min-width: 320px)and (max-width: 575px){ .customWidth{width:98%!important ;} }
</style>
