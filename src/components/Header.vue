<template>
        <div>
			<header class="main-header">
				<a href="/" class="logo">
					<span class="logo-mini"  v-if="userNames === '1'"><b>维特斯菲尔SCM</b></span>
					<span class="logo-lg"  v-if="userNames === '1'"><b style="font-size:18px ;">维特斯菲尔SCM</b></span>
          <span class="logo-mini" v-if="userNames === '2'"><b>SCM货主端</b></span>
          <span class="logo-lg" v-if="userNames === '2'"><b>SCM货主端</b></span>
				</a>
        <button class="navbar-toggle hidden-md-and-up " data-toggle="collapse" data-target=".navbar-collapse">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
           <span class="icon-bar"></span>
        </button>
				<nav class="navbar navbar-static-top">
           <a href="#" class="sidebar-toggle hidden-md hidden-lg" data-toggle="push-menu" role="button">
                     <span class="sr-only">Toggle navigation</span>
                 </a>
					<div class="navbar-custom-menu">
						<ul class="nav navbar-nav">

							<!--<li class="dropdown messages-menu">
								<a class="dropdown-toggle" data-toggle="dropdown">
									<i class="fa fa-envelope-o"></i>
								</a>
								<ul class="dropdown-menu">
									<li class="header">您有 0 条信息未读</li>
									<li>
										<ul class="menu">
										</ul>
									</li>
									<li class="footer">
										<a >全部消息</a>
									</li>
								</ul>
							</li>-->

							<!--<li class="dropdown notifications-menu">
								<a  class="dropdown-toggle" data-toggle="dropdown">
									<i class="fa fa-bell-o"></i>
									span class="label label-warning">10</span
								</a>
								<ul class="dropdown-menu">
									<li class="header">您有 0 条通知未读</li>
									<li>
										<ul class="menu">
											<li>
		                                    <a href="#">
		                                        <i class="fa fa-users text-aqua"></i> 5 new members joined today
		                                    </a>
		                                   </li
										</ul>
									</li>
								<li class="footer">
										<a >全部通知</a>
									</li>
								</ul>
							</li>-->
							<!--<li class="dropdown tasks-menu">
								<a class="dropdown-toggle" data-toggle="dropdown">
									<i class="fa fa-flag-o"></i>

								</a>
								<ul class="dropdown-menu">
									<li class="header">您有 0 个任务未处理</li>
									<li>
										<ul class="menu">

										</ul>
									</li>
									<li class="footer">
										<a >全部任务</a>
									</li>
								</ul>
							</li>-->

							<li class="dropdown user user-menu">
								<a  class="dropdown-toggle" data-toggle="dropdown">
									<img alt="" src="../assets/images/avatar.png" class="user-image">
									<span class="hidden-xs" v-if="userNames === '1'">{{userName}}</span>
                  <span class="hidden-xs" v-else>{{userNamesn}}</span>
								</a>
								<ul class="dropdown-menu">

									<!--<li class="user-header">
										<img src="../assets/images/avatar.png" class="img-circle" alt="User Image">
										<p>
											test - 测试组 <!--<small>2019-08-02</small>
										</p>
									</li>-->
                  <li class="user-footer" v-if="userNames==1">
                  	<div class="pull-right" >
                        <router-link :to="{path:'password'}" style="color:#0060BF" type="primary" icon="el-icon-edit">
                          修改密码
                        </router-link>
                  	</div>
                  </li>
                  <li class="user-footer" v-if="userNames==2">
                  	<div class="pull-right">
                        <router-link :to="{path:'Npassword'}" type="primary" icon="el-icon-edit">
                          修改密码
                        </router-link>
                  	</div>
                  </li>

									<li class="user-footer">
										<div class="pull-right">
                       <el-button size="small" v-if="userNames === '1'"> <i class="fa fa-sign-out" @click="loguot">退出</i></el-button>
                       <el-button size="small" v-if="userNames==2"> <i class="fa fa-sign-out" @click="loguoth">退出</i></el-button>
										</div>
									</li>
								</ul>
							</li>

						</ul>
					</div>
				</nav>
			</header>

		</div>
</template>

<script>
export default{
	name: 'LeftMenu',
	 data() {
			return {
				userName:'',
        userNamesn:localStorage.getItem("username"),
        userNames:localStorage.getItem("loginName"),
		  }
	    },
	    created() {
        if(this.userNames =='1'){
          this.getuserInfo();
        }
       },
		methods: {
			getuserInfo(){
				   let _this =this;
           _this.userNames = localStorage.getItem("loginName");
            console.log(" -- -", _this.userNames);
            _this.userNamesn = localStorage.getItem("username");
            console.log(" -- -",  _this.userNamesn);
    		    this.$http({
             method:'get',
             url:'/api/selectByIdAllSelUser',
              // headers:{'requestmethod':'axios'},
				     params:{}
            }).then((response) =>{//这里使用了ES6的语法
                console.log(response.data.data.selUser)
                _this.userName=response.data.data.selUser.userName;
                 var storage=window.localStorage;
                 storage.setItem("_this.userName",response.data.data.selUser.userName);
            }).catch((error) =>{
              console.log(error.response);
              if(error.response.data.message == '401'){//未登陆
                _this.$router.replace({ path: '/'})
              }
                   //请求失败返回的数据
            })
        },
        loguot(){
        	 let _this =this;
        	    this.$http({
               method:'get',
               url:'/api/logout',
        	     params:{}
              }).then((response) =>{          //这里使用了ES6的语法
                   console.log(response);

                   if(response.data.code==0){
                      _this.$router.replace({ path: '/'})
                   }
              }).catch((error) =>{
                  console.log(error)       //请求失败返回的数据
              })
          },
          loguoth(){
            let _this =this;
               this.$http({
                method:'get',
                url:'/api/SCM/logout',
                params:{}
               }).then((response) =>{          //这里使用了ES6的语法
                 console.log(response);
                  if(response.data.code==0){
                      _this.$router.replace({ path: '/'})
                  }
               }).catch((error) =>{
                   console.log(error)       //请求失败返回的数据
                    _this.$router.replace({ path: '/'})
               })
         }
		}

}
</script>


<style>
	.navbar-nav > .user-menu > .dropdown-menu {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    padding: 1px 0 0 0;
    border-top-width: 0;
    width:60px;
}
.user-footer .pull-right a.router-link-active{color:#0060BF;}
.dropdown-menu{
	width:60px;
}
</style>
