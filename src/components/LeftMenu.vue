<template>
  <div>
       <aside class="main-sidebar" >
				<section class="sidebar leftMain">
					<div class="user-panel">
						<div class="pull-left image">
							<img src="../assets/images/avatar.png" class="img-circle" alt="User Image">
						</div>
						<div class="pull-left info">

							<p v-if="userNames === '1'"> {{usernaes}}</p>
              <p v-else>{{userNamesn}}</p>
						</div>
					</div>
					<el-col  v-if="userNames === '1'">
				        <el-menu
				          default-active="2"
				          background-color="#222d32"
				          text-color="#b8c7ce"
				          class="el-menu-vertical-demo"
				          :unique-opened="true"
				          active-text-color="#fff" >
				          <!-- 如果有一级菜单 -->
				          <el-menu-item :index="''+index" v-for="(item, index) in navMenus" :key="index" v-if="item.menuList.length==0">
				            <router-link :to="{path:item.url}">
				             <i :class="item.icon"></i>
				            	<span>{{item.name}}</span>
				            </router-link>
				          </el-menu-item>
				          <el-submenu :index="''+index" v-for="(item, index) in navMenus" :key="index" v-if="item.menuList.length>0">
				            <template slot="title">
				              <i :class="item.icon"></i>
				              <span>{{item.name}}</span>
				            </template>
				            <el-menu-item-group v-for="(item1, index1) in item.menuList" :key="index1">
				              <el-menu-item :index="index+'-'+index1">
				              	<router-link :to="{path:item1.url}">
				              		{{item1.name}}
				              	</router-link>
				              </el-menu-item>
				            </el-menu-item-group>
				          </el-submenu>
				        </el-menu>
				      </el-col>
            <el-col v-else>
              <el-menu
                 default-active="1"
                 background-color="#222d32"
                 text-color="#b8c7ce"
                 class="el-menu-vertical-demo fg-css"
                 :unique-opened="true"
                 active-text-color="#fff" >
                    <el-menu-item index="1">
                      <i class="el-icon-menu"></i>
                      <span slot="title"><router-link to="/orderList"  >采购订单</router-link></span>
                    </el-menu-item>
                    <el-menu-item index="2">
                      <i class="el-icon-copy-document"></i>
                      <span slot="title"><router-link to="/GetDispatchList"  >发货单</router-link></span>
                    </el-menu-item>
                    <el-menu-item index="3">
                      <i class="el-icon-document-add"></i>
                      <span slot="title"><router-link to="/transport"  >运输单</router-link></span>
                    </el-menu-item>
                    <el-menu-item index="4">
                      <i class="el-icon-truck"></i>
                       <span slot="title"><router-link to="/myGarage"  >我的车场</router-link></span>
                    </el-menu-item>
                  </el-menu>
                </el-col>

				</section>
			</aside>
		</div>
</template>

<script>
export default{
	name: 'LeftMenu',
	 data() {
			return {
				navMenus:"",
				userName:'',
        show:true,
        userNames:localStorage.getItem("loginName"),
        userNamesn:localStorage.getItem("username"),
        usernaes:'',
		  }
	    },
	    created() {
        if(this.userNames =='1'){
          this.getDatadd();
        }
       },
		methods: {
			getDatadd(){
    		let _this =this;
         _this.userNames = localStorage.getItem("loginName");
          console.log(" -- -", _this.userNames);
          _this.userNamesn = localStorage.getItem("username");
            console.log(" -- -",  _this.userNamesn);
            // console.log(" -- -", _this.userNamesn);
             //var password= storage["password"];
            _this.usernaes=localStorage.getItem("_this.userName");
    		    this.$http({
                method:'get',
                url:'/api/selectMenuList',
                headers:{'requestmethod':'axios'},
				        params:{}
            }).then((response) =>{          //这里使用了ES6的语法
                console.log(response.data.data.menuList)
                _this.navMenus=response.data.data.menuList;
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据

            })
        }
		}

}
</script>

<style >
	.leftMain{height:100% ;}
	.el-menu{border-right:0;}
	.el-submenu .el-menu-item{min-width:100%;}
	.is-active .router-link-active{color:#fff !important;}
  .is-opened span{color:#fff !important;}
	.el-submenu .el-menu-item {
    height:32px;
    line-height: 32px;
    padding: 0 45px;
    min-width:100%!important;
}
.user-panel > .info {
    padding: 20px 5px 5px 15px;
    line-height: 1;
    position: absolute;
    left: 55px;
}
.el-submenu .el-menu-item, .el-submenu .el-submenu__title {

    position: relative;
    -webkit-box-sizing: border-box;
    white-space: nowrap;
    list-style: none;
}
..el-form-item {
    margin-bottom: 10px!important;
}
.el-menu .el-menu-item-group .el-menu-item-group__title{
	padding:0 ;
}
 .el-submenu .el-submenu__title{ height: 40px!important;
    line-height:40px!important;}
 .el-menu .el-menu-item{ height: 40px!important;line-height:40px!important;}
    @media (min-width: 576px)and (max-width: 768px){ .main-sidebar{
      padding-top:100px ;
          position: absolute;
    } }
    @media (min-width: 320px)and (max-width: 575px){.main-sidebar{
       padding-top:100px ;
           position: absolute;
    } }
.el-menu{border-right:0!important ;}
</style>
