<template>
	<div>
	<div class="content-wrapper">
		<section class="content-header">
			<ol class="breadcrumb" style="display: block; float: none;">
				<a href="/"><i class="fa fa-dashboard"></i></a>
				<li>
					<a href="javascript:void(0);">数据</a>
				</li>
				<li>
					<a href="javascript:void(0);">商品</a>
				</li>
				<li class="active">添加商品信息</li>
			</ol>
			<h1 class="pull-right">
          <router-link to="/CommoditySpecifications"  class="btn btn-primary btn-sm" icon="el-icon-back">返回商品管理列表</router-link>
      </h1>
		</section>
		<div class="content">
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title">添加商品信息</h3>
				</div>
				<div class="box-body">

					<el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="80px" size="small" class="demo-ruleForm demo-dynamic">
						<el-row :gutter="10">
              	<el-col :xs="22" :sm="8" :md="6">
              <el-form-item label="商品名称" prop="goods_name">

              	    <el-select v-model="ruleForm.goods_name" filterable placeholder="请选择">
              	    <el-option
              	      v-for="item in goodNameslist"
              		  :key="item.goods_id"
              		  :value="item.goods_id"
              		  :label="item.goods_name">
              	    </el-option>
              	  </el-select>


              	</el-form-item>
                </el-col>
							<el-col :xs="22" :sm="8" :md="6">
                <el-form-item label="价格" prop="price">
                	<el-input  v-model="ruleForm.price"></el-input>
                </el-form-item>


							</el-col>

             <el-col :xs="22" :sm="8" :md="6">
              	<el-form-item label="单位"  prop="unitname">
              	    <el-select v-model="ruleForm.unitname" filterable placeholder="请选择">
              	    <el-option
              	      v-for="item in datass"
              		  :key="item.id"
              		  :value="item.unitname"
              		  :label="item.unitname">
              	    </el-option>
              	  </el-select>


              	</el-form-item>
              </el-col>

						</el-row>
						  </el-form>

                           <h4>设置商品多规格</h4>
                            <el-form :model="ruleForms"  :rules="rules" ref="ruleForms" style="margin-left:40px ;" label-width="80px">
                            	<el-row :gutter="10">
                            		 <el-col :xs="22" :sm="18" :md="6">
                            	<el-form-item label="规格名称" prop="value">
		                          <el-cascader
								    v-model="value"
								    ref="myCascader"
                    @change="onProvincesChange"
								    :options="goodsAttrList"
								    >
								    </el-cascader>
							   </el-form-item>
							   </el-col>
								</el-row>

					             <div class="form-group">
					             	<el-button type="primary"  v-on:click="add()">增加</el-button>

					                 <input type="reset"  value="重置" class="btn btn-danger"/>
					             </div>
					        </el-form>
							<el-table :data="tableData" style="width: 100%" size="small">
								<el-table-column label="序号" width="120">
									<template slot-scope="scope">
										<span style="margin-left: 10px" >{{ scope.$index+1 }}</span>
									</template>
								</el-table-column>
								<el-table-column label="商品规格" >
									<template slot-scope="scope">
										<span>{{scope.row.sku_code}} : {{scope.row.sku_value}} </span>
									</template>
								</el-table-column>
                <el-table-column
                     label="操作"
                    >
                     <template slot-scope="scope">
                          <el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                     </template>
                   </el-table-column>
							</el-table>


					</el-form>
				   <div>
				   	<el-button type="primary" @click="onSubmit()">保存属性</el-button>
				   </div>
				</div>

			</div>

		</div>

	</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				value:'',
        value1: '',
        goodNameslist:'',
				//联动
				cascaderAddr:[],
				 ruleForm: {
					goods_name: '',
          unitname:'吨',
          price:'',
          value:'',
				},
				ruleForms:{
					value:'',
					// stock:0,
					sku_value: '',
		      sku_code: ''
				},
				//单位
				 datass:[],
				 selected: '',
				 //options:[],
				 goodsAttrList:[],
				 selectedOptions: [],
				optionProps: {
					value: 'attr_id',
					label: 'attr_name',
					children: 'goods_attr_values'
				},
				rules: {
		         goods_name: [
		            { required: true, message: '请输入商品名称', trigger: 'blur' }

		          ],
		          // stock: [
		          //   { required: true, message: '请输入库存', trigger: 'blur' }

		          // ],
		          price: [
		            { required: true, message: '请输入价格', trigger: 'blur' }

		          ],
		          unitname: [
		            { required: true, message: '单位必须选择', trigger: 'blur' }
		          ],
		          value: [
		            { required: true, message: '属性规格必须选择', trigger: 'blur' }
		          ]

		        },
				tableData:[],

			};
		},
		 created() {
		 	this.unitData();
		 	this.getData();
     this.goodnaslist();
     this.onProvincesChange();

       },

		methods: {
       goodnaslist(){
          let _this=this
          this.$http({
                  method:'get',
                  url:'/api/Goods/GetGoodsSelect',
                  dataType: "json",
                  params:{}
             }).then((response) =>{          //这里使用了ES6的语法
                 console.log(response)
                 console.log("ccc");
              _this.goodNameslist=response.data.data.goodsSelect;
             console.log(_this.goodNameslist)


                 //请求成功返回的数据
             }).catch((error) =>{
                 console.log(error)       //请求失败返回的数据
             })
       },
			 handleDelete(index, rows) {//删除改行
                rows.splice(index, 1);
             },

            add(){
            if(this.value==""){
							alert("规格不能为空")
							return false;
						}

		           var list = {
				           sku_code: this.ruleForms.value[0],
				           sku_value: this.ruleForms.value[1]
				          }
		          this.tableData.push(list)
                  console.log(this.tableData);
              },
            onProvincesChange() {
				     this.ruleForms.value=this.$refs.myCascader.getCheckedNodes()[0].pathLabels;
				     console.log(this.ruleForms.value);
				     },
              unitData(){
              	  this.$http({
			                 method:'get',
			                 url:'/api/GoodsUnit/GetGoodsUnitSelect',
			            }).then((response) =>{          //这里使用了ES6的语法
			                console.log(response)
			                this.datass=response.data.data.goodsUnit;

			            }).catch((error) =>{
			                console.log(error)       //请求失败返回的数据
			            })
              },
			  getData(){

			         let _this=this
			         this.$http({
			                 method:'get',
			                 url:'/api/GoodsAttrValue/GetGoodsAttrList',
                             dataType: "json",
                              //contentType: 'application/json; charset=UTF-8',
							         params:{pageindex:1,pagesize:200}
			            }).then((response) =>{          //这里使用了ES6的语法
			                console.log(response)
			             _this.goodsAttrList=response.data.data.goodsAttrList;

			               _this.goodsAttrList.forEach(element => {
			               	console.log(element);
				           _this.$set(element,'label',element.attr_name)
				           _this.$set(element,'value',element.attr_id)
				          _this.$set(element,'children',element.goods_attr_values)
				           element.children.forEach(jItem => {
				                _this.$set(jItem,'label',jItem.attr_value_data)
				                _this.$set(jItem,'value',jItem.attr_value_id)
				           });

				           console.log(_this.goodsAttrList);
				       });
			                //请求成功返回的数据
			            }).catch((error) =>{
			                console.log(error)       //请求失败返回的数据
			            })
			},
      //表格删除
      handleClick(index, row){
       this.tableData.splice(index,1);
      },
			onSubmit(){
          let _this = this
						if( _this.ruleForm.goods_name==""){
							alert("商品名称不能为空")
							return false;
						}
            if( _this.ruleForm.unitname==""){
            	alert("单位不能为空")
            	return false;
            }
            if( _this.ruleForm.price==""){
            	alert("商品价格不能为空")
            	return false;
            }
            if(_this.tableData==""){
              alert("商品规格不能为空，至少添加一条")
              return false;
            }
					   let newsAary={};
					   newsAary.goodsSkus=_this.tableData;
             newsAary.goods_id =_this.ruleForm.goods_name;
             newsAary.unit =_this.ruleForm.unitname;
             newsAary.price =_this.ruleForm.price;
					   console.log(newsAary);
			         this.$http({
			                 method:'post',
			                 url:'/api/GoodsSku/InsertSku',
                      dataType: "json",
							        data:newsAary
			            }).then((response) =>{
			            	 if(response.data.code == 1){
			                	alert(response.data.message);
			                }
                      if(response.data.code == 0){
                        alert(response.data.message);
                        _this.$router.replace({ path: '/CommoditySpecifications'})
                      }
			            	//这里使用了ES6的语法
			                console.log(response)
			                //请求成功返回的数据
			            }).catch((error) =>{
			                console.log(error)       //请求失败返回的数据
                      if(error.response.data.message == '403'){//没有权限
                        alert("没有权限");
                      }
			            })
			}
		}
	}
</script>
<style  scoped>
	.el-form-item--small .el-form-item__content,
	.el-form-item--small .el-form-item__label {
		line-height: 28px;
	}
	.el-input__inner {
		border-radius: 0;
	}
	.el-form-item__content {
		margin-left: 0!important;
	}
</style>
