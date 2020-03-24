<template>
	<div class="content-wrapper" >
	<section class="content-header">
			<ol class="breadcrumb" style="display: block; float: none;">
				    <a href="/"><i class="fa fa-dashboard"></i></a>
				     <li><a href="javascript:void(0);">数据</a></li>
				     <li class="active">编辑单位</li>
            </ol>
            <h1 class="pull-right">
                  <router-link to="/CommodityUnit"  class="btn btn-primary btn-sm" icon="el-icon-back">返回单位列表</router-link>	
            </h1>
		</section>
	<div class="content">
		<div class="box box-primary">
			<div class="box-header with-border">
                  <h3 class="box-title">编辑单位</h3>
            </div>
            <div class="box-body">
            	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" size="small" class="demo-ruleForm demo-dynamic">
				<el-row :gutter="20">
				  <el-col :span="8" > 
				  	 <el-form-item label="单位" prop="name">
				       <el-input v-model="ruleForm.name"></el-input>
				     </el-form-item></el-col>
					  
				</el-row>
	            <el-row :gutter="20">
				  <el-col :span="8" > 
				  	 <el-form-item label="排序" prop="name">
				       <el-input v-model="ruleForm.name"></el-input>
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
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
   .el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label {
    line-height: 28px;}
.el-input__inner{border-radius:0 ;}
</style>
