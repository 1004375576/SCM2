<template>
	<div class="content-wrapper" >
	<section class="content-header">
			<ol class="breadcrumb" style="display: block; float: none;">
				<a href="/"><i class="fa fa-dashboard"></i></a>
				<li class="active">修改密码</li>
        </ol>
		</section>
	<div class="content">
		<div class="box box-primary">
        <div class="box-header with-border">
           <h3 class="box-title">修改密码</h3>
        </div>
        <div class="box-body">
           <el-row :gutter="10">
             <el-col :xs="22" :sm="22" :md="10" :lg="8" :xl="16">
               <h4 style="padding-left:28px ;">当前用户：<span style="color:#55ACEE;font-size:16px ;">{{userName}}</span></h4>
               <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                 <el-form-item label="当前密码" prop="Currentpassword" show-password>
                   <el-input  v-model="ruleForm.Currentpassword" ref='id' ></el-input>
                 </el-form-item>

                 <el-form-item label="密码" prop="pass" show-password>
                   <el-input  v-model="ruleForm.pass" ></el-input>
                 </el-form-item>
                 <el-form-item label="确认密码" prop="checkPass" show-password >
                   <el-input  v-model="ruleForm.checkPass" ></el-input>
                 </el-form-item>
                 <el-form-item>
                   <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                   <el-button @click="resetForm('ruleForm')">重置</el-button>
                 </el-form-item>
               </el-form>
             </el-col>
           </el-row>

        </div>
	   </div>
   </div>
	</div>
</template>
<script>
  //import md5 from 'js-md5';
	export default {
    data() {
      var validatePass = (rule, value, callback) => {
             if (value === '') {
               callback(new Error('请输入密码'));
             } else {
               if (this.ruleForm.checkPass !== '') {
                 this.$refs.ruleForm.validateField('checkPass');
               }
               callback();
             }
           };
           var validatePass2 = (rule, value, callback) => {
             if (value === '') {
               callback(new Error('请再次输入密码'));
             } else if (value !== this.ruleForm.pass) {
               callback(new Error('两次输入密码不一致!'));
             } else {
               callback();
             }
           };
      return {
       Currentpasswordc:'',
       Currentpassword:'',
       newId: '',
       userName:'',
       userId:'',
        ruleForm: {
          Currentpassword:'',
          pass: '',
          checkPass: '',
        },

        rules: {
          Currentpassword: [
            {required: true, message: '请输入当前密码', trigger: 'blur' }
          ],
          pass: [
            {required: true, message: '请输入密码', trigger: 'blur' }
          ],
           checkPass: [
            {required: true, message: '请输入重复密码', trigger: 'blur' }
          ],
         pass: [
            { validator: validatePass, trigger: 'blur' }
           ],
           checkPass: [
           { validator: validatePass2, trigger: 'blur' }
          ]

        }
      };
    },
    mounted () {
           this.$refs.id.focus();
        },
    created() {
       this.getuserInfo();
		},
		methods:{
       submitForm(formName) {
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  let _this =this;
                   _this.Currentpassword=this.$md5(_this.userName+_this.ruleForm.Currentpassword);
                   console.log(_this.Currentpassword);
                  this.$http({
                       method:'get',
                       url:'/api/selectByIdAllSelUser',
                       params:{}
                      }).then((response) =>{          //这里使用了ES6的语法
                          console.log(response.data.data.selUser)
                          _this.Currentpasswordc=response.data.data.selUser.pwd;
                          if(_this.Currentpassword!= _this.Currentpasswordc){
                                   alert("输入的当前密码不对，请重新输入");
                                   return false;
                                }else{
                                let jsonP={};
                                jsonP.userName=_this.userName;
                                jsonP.selUserId=_this.userId;
                                jsonP.pwd=_this.ruleForm.pass;
                                this.$http({
                                     method:'post',
                                     url:'/api/updatePassWordSelUser',
                                     data:jsonP
                                    }).then((response) =>{          //这里使用了ES6的语法
                                        if(response.data.code!=1){
                                          alert(response.data.message);
                                          _this.$router.replace({ path: '/'})
                                        }
                                        else{
                                           alert(response.data.message);
                                        }

                                    }).catch((error) =>{
                                        console.log(error)       //请求失败返回的数据
                                     })
                          }
                      }).catch((error) =>{
                          console.log(error)       //请求失败返回的数据
                      })
                } else {
                  console.log('error submit!!');
                  return false;
                }
              });
            },
            resetForm(formName) {
                    this.$refs[formName].resetFields();
                  },
       getuserInfo(){
				let _this =this;
    		this.$http({
             method:'get',
             url:'/api/selectByIdAllSelUser',
				     params:{}
            }).then((response) =>{          //这里使用了ES6的语法
                console.log(response.data.data.selUser)
                _this.userName=response.data.data.selUser.userName;
                _this.userId=response.data.data.selUser.selUserId;

            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
            })
        }
		}
	}

</script>
<style>
.user-footer .pull-right a.router-link-active{color:#0060BF;}

</style>
