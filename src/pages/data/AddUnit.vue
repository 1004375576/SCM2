<template>
	<div class="content-wrapper" >
	<section class="content-header">
			<ol class="breadcrumb" style="display: block; float: none;">
				    <a href="/"><i class="fa fa-dashboard"></i></a>
				     <li><a href="javascript:void(0);">数据</a></li>
				     <li class="active">添加单位</li>
            </ol>
            <h1 class="pull-right">
                  <router-link to="/CommodityUnit"  class="btn btn-primary btn-sm" icon="el-icon-back">返回单位列表</router-link>
            </h1>
		</section>
	<div class="content">
		<div class="box box-primary">
			<div class="box-header with-border">
                  <h3 class="box-title">添加单位</h3>
            </div>
            <div class="box-body">
            	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" size="small" class="demo-ruleForm demo-dynamic">
		<el-row :gutter="10">
			<el-col  :xs="24" :sm="18" :md="8" :lg="8" :xl="8">
				  	 <el-form-item label="单位" prop="unitname">
				       <el-input v-model="ruleForm.unitname"></el-input>
				     </el-form-item></el-col>

				</el-row>

			  <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm')">保存单位</el-button>

			  </el-form-item>
			</el-form>
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
          unitname: ''
        },
        rules: {
          unitname: [
            { required: true, message: '请输入单位', trigger: 'blur' }
          ]

        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	 this.$http({
			            method:'post',
			            url:'/api/GoodsUnit/InsertGoodsUnit',
//			                  contentType: "application/json",
                 dataType: "json",
					       data:this.ruleForm
			            }).then((response) =>{          //这里使用了ES6的语法
			              if(response.data.code == 1){
		            		 alert(response.data.message);
			            	}
			            	if(response.data.code == 0){
			            		alert(response.data.message);
			            		this.$router.replace({ path: '/CommodityUnit'})
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
      }

    }
  }
</script>
<style  scoped>
   .el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label {
    line-height: 28px;}
.el-input__inner{border-radius:0 ;}
</style>
