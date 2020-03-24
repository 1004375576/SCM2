<template>
	<div class="cclogin" style="position: fixed;">
     <el-row :gutter="10">
      <el-col :span="22" :offset="1"><h3 style="color:#fff;">维特斯菲尔供应链</h3></el-col>
     </el-row>
     <el-row :gutter="10" style="margin-bottom:5px ;">
        <el-col :xs="24" :sm="10" :md="12" :lg="10" :xl="10" :offset="2"  class="el-top hidden-xs">
            <img src="../../build/leftlogin.png" style="max-width:100% ;" >
        </el-col>
        <el-col :xs="24" :sm="12" :md="10" :lg="10" :xl="10" :offset="2" >
          <el-col class="login-div" :xs="20" :sm="18" :md="18" :lg="15" :xl="14"  >
            <el-tabs type="border-card" style="margin:15px 15px 10px 15px;">
              <el-tab-pane label="发货方登陆">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
                      <el-form :model="ruleForm" :rules="rules"  ref="ruleForm"  class="demo-ruleForm">
                      <el-form-item  prop="name">
                          <el-input type="text" v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
                      </el-form-item>
                          <el-form-item  prop="password">
                        <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" ></el-input>
                      </el-form-item>
                      <el-form-item>
                          <el-button type="primary" style="display: block;width:100% ; font-size:16px ;" @click="submitForm('ruleForm')">登 陆</el-button>
                      </el-form-item>
                      </el-form>
                </el-col>
              </el-tab-pane>
              <el-tab-pane label="货主登陆">
                 <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
                <el-form :model="ruleFormh" :rules="rules"  ref="ruleFormh"  class="demo-ruleForm">
                <el-form-item  prop="names">
                    <el-input type="text" v-model="ruleFormh.names" placeholder="请输入手机号"></el-input>
                </el-form-item>
                    <el-form-item  prop="password">
                  <el-input type="password" v-model="ruleFormh.password" placeholder="请输入密码" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="display: block;width:100% ; font-size:16px ;" @click="submitFormh('ruleFormh')">登 陆</el-button>
                </el-form-item>
                </el-form>
               </el-col>
              </el-tab-pane>

            </el-tabs>

          </el-col>
        </el-col>
	      </el-row>
		 <el-footer>
		 	<P style="text-align: center;color:#fff;font-size:12px ;">Copyright ©2019 斯菲尔（上海）智能科技股份有限公司&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  沪ICP备<a  style="font-size:14px;color:#fff;" href="http://www.beian.miit.gov.cn" target="_blank">10028763号-3</a>

		 	</P>
	    </el-footer>
	</div>
</template>

<script>

export default {
	name: 'rigist_',
    data() {
    	return {
	        ruleForm: {
	           name: '',
	           password:''
	        },
          ruleFormh: {
             names: '',
             password:''
          },
         rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          names: [
            {required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18个字符', trigger: 'blur' }
          ]
         }

    	 }
    },
      methods: {
      submitForm(formName) {
      	console.log(this.ruleForm);
   	    let loginName = this.ruleForm.name;
    	  let loginPwd = this.ruleForm.password;
    	  let _this = this
   	    var params = {"loginName" : loginName,"loginPwd":loginPwd};
         this.$http({
                 method:'post',
                 url:'/api/Login',
                 dataType:"json",
				         headers:{'X-Security':'ceshi'},
				         data:params
            }).then((response) =>{          //这里使用了ES6的语法
                console.log(response)
                //请求成功返回的数据
                if(response.data.code == 1){
		            		//alert(response.data.message);
                    this.$message({
                        message: '登录失败,'+response.data.message,
                        type: 'error'
                    });
		            	}
		            	if(response.data.code!= 1){
                    // 提示成功信息
		            		_this.$router.replace({ path: '/index'})
                    var cc=localStorage.setItem("loginName", response.data.data.login);
                    console.log(cc)
                    // this.$store.commit('loginName',response.data.data.loginName);
		            	}
            }).catch((error) =>{

                console.log(error)       //请求失败返回的数据
            })
        },
        submitFormh(formName) {//货主登陆

             //this.$router.replace('/https://github.com/')
        	console.log(this.ruleFormh);
          let loginName = this.ruleFormh.names;
          let loginPwd = this.ruleFormh.password;
          let username;
          let _this = this
          var params = {"loginName" : loginName,"loginPwd":loginPwd};
           this.$http({
                   method:'post',
                   // url:'/Login',
                   url:'/api/SCM/Login',
                   dataType:"json",
        	         headers:{'X-Security':'ceshi'},
        	         data:params
              }).then((response) =>{          //这里使用了ES6的语法
                  console.log(response)
                  //请求成功返回的数据
                  if(response.data.code == 1){
                  		this.$message({
                  		    message: '登录失败,'+response.data.message,
                  		    type: 'error'
                  		});
                  	}
                  	if(response.data.code!= 1){
                  		//alert("登陆成功");
                      var cc=localStorage.setItem("loginName", response.data.data.login);
                      console.log(cc)
                      var dd=localStorage.setItem("username", response.data.data.username);
                  		_this.$router.replace({ path: '/orderList'})
                  	}
              }).catch((error) =>{
                  console.log(error)       //请求失败返回的数据
              })


         },
      }
      }

</script>

<style scoped>
body{margin:0 ; padding:0 ; overflow: hidden;}
.cclogin{ height:100% ;overflow: hidden; }
.wrapper .cclogin{ width:100% ;overflow: hidden; background:url(../../build/bgline_02.png) repeat repeat center ;}
.cclogin{
  padding-top:0px ;
}
.cclogin .el-top{
  margin-top:40px ;
}
.cclogin .login-div{
  margin-top:140px ;
  background:url(../../build/black-30.png) repeat repeat ;
}
.cclogin>>> .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    color: #fff;
    background-color: #409EFF;
    border-right-color: #409EFF;
    border-left-color: #409EFF;
}
.cclogin>>> .el-tabs--border-card>.el-tabs__header .el-tabs__item{ text-align: center;}

.cclogin>>> .el-tabs__nav{width:100%;}
.cclogin>>> .el-tabs__nav .el-tabs__item{width:50%;}
@media ((min-width: 992px and (max-width: 1024px)){

	.cclogin>>> .login-div{margin-top:50px ;}
}
@media (max-width: 767px){

	.cclogin>>> .login-div{margin-top:20px ;}
}

</style>
