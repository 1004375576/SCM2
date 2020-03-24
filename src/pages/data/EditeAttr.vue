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
				<li class="active">编辑商品属性</li>
			</ol>
			<h1 class="pull-right">
          <router-link to="/CommodityAttributes"  class="btn btn-primary btn-sm" icon="el-icon-back">返回编辑商品属性列表</router-link>
      </h1>
		</section>
		<div class="content">
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title">编辑商品属性</h3>
				</div>
				<div class="box-body">

					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" size="small" class="demo-ruleForm demo-dynamic">
					<el-row :gutter="10">
						<el-col  :xs="24" :sm="18" :md="8" :lg="8" :xl="8">
								<el-form-item label="属性名称" prop="attr_name" :rules="{
            	      required: true, message: '属性名称不能为空', trigger: 'blur'
            	    }">
									<el-input v-model="ruleForm.attr_name"></el-input>
								</el-form-item>
							</el-col>
						<el-col :span="8">
							<el-form-item  prop="attr_id">
								<el-input type="hidden" v-model="ruleForm.attr_id"></el-input>
							</el-form-item>
						</el-col>
						</el-row>
               <el-row :gutter="10">
               	<el-col  :xs="24" :sm="18" :md="8" :lg="8" :xl="8" class="wid-auto">
                       	<el-form-item
                 	    v-for="(domain, index) in ruleForm.domains"
                 	    :label="'属性值' + index"
                 	    :key="domain.attr_value_id"
                 	    :prop="'domains.' + index + '.attr_value_data'"
                 	    :rules="{
                 	      required: true, message: '属性值不能为空', trigger: 'blur'
                 	    }"
                 	  >
                 	    <el-input v-model="domain.attr_value_data"></el-input>
                        <el-button v-show="!(ruleForm.domains.length == 1)"  type="danger" icon="el-icon-delete" size="small" @click.prevent="removeDomain(domain)">删除</el-button>
                       </el-form-item>
                       </el-col>
                 </el-row>
                 <el-row :gutter="20" style="margin-bottom:0.625rem;"><el-col :span="8"><el-button @click="addDomain"  type="primary" class="el-icon-plus ">新增属性值</el-button></el-col> </el-row>
					</el-form>
				   <div>
				   	<el-button type="primary" @click="onSubmit('ruleForm')">保存属性</el-button>
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
				 attr_value_id:'',
         attr_value_data:'',
				 ruleForm: {
         attr_name: '',
         attr_id: this.$route.query.attr_id,
         domains: [{attr_value_data: ''}]},
				 rules: {
		          attrName: [
		            { required: true, message: '请输入属性名称', trigger: 'blur' }
		          ]
		        }
			};
		},
		 created() {
		 	 this.showData();
       this.goodsData();
      },
		methods: {
        goodsData(){
          let _this = this
              this.$http({
                   method:'get',
                   url:'/api/GoodsAttrValue/GoodsAttrInfo',
                   dataType: "json",
                   params:{attrid:this.$route.query.attr_id}
              }).then((response) =>{          //这里使用了ES6的语法
                  console.log(response)
                 //_this.tableData=response.data.data.goodsAttrValue;
                 _this.ruleForm.attr_name=response.data.data.goods_skuInfo.attr_name;

              }).catch((error) =>{
                  console.log(error)       //请求失败返回的数据
              })
        },
			  showData(){
             	let _this = this
			         this.$http({
			                 method:'get',
			                 url:'/api/GoodsAttrValue/GetGoodsAttrValue',
                       dataType: "json",
							         params:{attrid:this.$route.query.attr_id}
			            }).then((response) =>{          //这里使用了ES6的语法
			                console.log(response)
			               //_this.tableData=response.data.data.goodsAttrValue;
                     _this.ruleForm.domains=response.data.data.goodsAttrValue;
			               console.log(_this.ruleForm.domains);
			            }).catch((error) =>{
			                console.log(error)       //请求失败返回的数据
			            })
      },
			onSubmit(formName){
         this.$refs[formName].validate((valid) => {
            if (valid) {
                let _this = this
                	   let arr=_this.ruleForm.domains;
                	   console.log(arr);
                	   // 要传的json
                	   let allJson={},iArr=[];
                		for (var i=0;i<arr.length;i++){
                			let iJson={};
                			iJson.attrValueId=arr[i].attr_value_id;
                			iJson.attrValueData=arr[i].attr_value_data;
                			iArr.push(iJson);
                		}
                		allJson.goodsAttrValue=iArr;
                		allJson.attrName=this.ruleForm.attr_name;
                		allJson.attrid=this.ruleForm.attr_id
                		console.log(allJson)
                       this.$http({
                          method:'post',
                          url:'/api/GoodsAttrValue/GoodsAttrValueUpdate',
                          contentType: "application/json",
                			    data:allJson
                          }).then((response) =>{          //这里使用了ES6的语法
                              console.log(response)
                              if(response.data.code == 1){
                              	 alert(response.data.message);
                              }
                             
                              if(response.data.code == 0){
                              	alert(response.data.message);
                              	_this.$router.replace({ path: '/CommodityAttributes'})
                              }
                          }).catch((error) =>{
                              console.log(error)       //请求失败返回的数据
                              if(error.response.data.message == '403'){//没有权限
                                alert("没有权限");
                              }
                          })



            } else {
            console.log('error submit!!');
             return false;
           }
        });


			},
      removeDomain(item) {
        console.log(item);
             var index = this.ruleForm.domains.indexOf(item)
             if(item.attr_value_id==0){
                  this.ruleForm.domains.splice(index, 1)

             }
             else{
                let _this =this;
                this.$http({
                        method:'get',
                        url:'/api/GoodsAttrValue/GoodsAttrValueDelete',
                        params:{attrid:item.attr_value_id}
                    }).then((response) =>{          //这里使用了ES6的语法
                        console.log(response)
                        if(response.data.code == 1){
                        	alert(response.data.message);
                         }
                         if(response.data.code == 403){
                         	alert(response.data.message);
                          }
                       if(response.data.code == 0){
                            alert(response.data.message);
                           _this.ruleForm.domains.splice(index, 1)
                        }

                    }).catch((error) =>{
                        console.log(error)       //请求失败返回的数据
                    })
             }
             // if (index !== -1) {
             //   this.ruleForm.domains.splice(index, 1)
             // }
           },
       addDomain() {
             this.ruleForm.domains.push({
               attrValueData: '',
               attr_value_id:0

             });
            },
			resetForm(formName) {
				this.$refs[fo1rmName].resetFields();
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
.wid-auto .el-input{width:auto;}
	.el-form-item__content {
		margin-left: 0!important;

	}
</style>
