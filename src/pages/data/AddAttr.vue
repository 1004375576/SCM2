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
				<li class="active">添加商品属性</li>
			</ol>
			<h1 class="pull-right">
          <router-link to="/CommodityAttributes"  class="btn btn-primary btn-sm" icon="el-icon-back">返回商品属性列表</router-link>
      </h1>
		</section>
		<div class="content">
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title">添加商品属性</h3>
				</div>
				<div class="box-body">

					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" size="small" class="demo-ruleForm demo-dynamic">
						<el-row :gutter="10">
							<el-col  :xs="24" :sm="18" :md="8" :lg="8" :xl="8">
								<el-form-item label="属性名称" prop="attrName" :rules="{
            	      required: true, message: '属性名称不能为空', trigger: 'blur'
            	    }">
									<el-input v-model="ruleForm.attrName"></el-input>
								</el-form-item>
							</el-col>

						</el-row>
            <el-row :gutter="10">

            	<el-col ::xs="24" :sm="18" :md="8" :lg="8" :xl="8"  class="wid-auto">
                  	<el-form-item
            	    v-for="(domain, index) in ruleForm.domains"
            	    :label="'属性值' + index"
            	    :key="domain.key"
            	    :prop="'domains.' + index + '.attrValueData'"
            	    :rules="{
            	      required: true, message: '属性值不能为空', trigger: 'blur'
            	    }"
            	  >
            	    <el-input v-model="domain.attrValueData"></el-input>
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
				ruleForm: {
					 attrName: '',
           domains: [{
                      attrValueData: ''
                    }],
				},
				rules: {
		          attrName: [
		            { required: true, message: '请输入属性名称', trigger: 'blur' }
		          ]
		        }
			};
		},
		 created() {
        
       },
		methods: {
			onSubmit(formName){
              this.$refs[formName].validate((valid) => {
                       if (valid) {
                         let _this = this

                          console.log(_this.tableData)
                          let newsAary={};
                          newsAary.goodsAttrValue=_this.ruleForm.domains;
                          newsAary.attrName = _this.ruleForm.attrName;
                          console.log(newsAary);
                            this.$http({
                                    method:'post',
                                    url:'/api/GoodsAttrValue/GoodsAttrValueInsert',
                                    dataType: "json",
                         	          data:newsAary
                               }).then((response) =>{ 
                                 if(response.data.code==0){
                                    alert(response.data.message)
                                    _this.$router.replace({ path: '/CommodityAttributes'})
                                 }
                                  
                                   //请求成功返回的数据
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
                var index = this.ruleForm.domains.indexOf(item)
                if (index !== -1) {
                  this.ruleForm.domains.splice(index, 1)
                }
              },
          addDomain() {
                this.ruleForm.domains.push({
                  attrValueData: ''
                });
                console.log(this.ruleForm.domains);
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
  .wid-auto .el-input{width:auto;}
</style>
