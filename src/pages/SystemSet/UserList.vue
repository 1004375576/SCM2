<template>
	<div class="content-wrapper">
		<section class="content-header">
			<ol class="breadcrumb">
				<a href="/"><i class="fa fa-dashboard"></i></a>
				<li>
					<a href="javascript:;">系统设置</a>
				</li>
				<li class="active">用户管理</li>
			</ol>
			<h1 class="pull-right">
          <el-button type="primary" size="small" @click="addFormVisible = true">添加用户</el-button>
      </h1>
		 </section>
		<div style="clear: both;"></div>
		<el-form :inline="true" :model="formInline" style="width:300px; margin:0 auto;"  class="demo-form-inline" size="small">
			<el-form-item label="" >
				<el-input v-model="formInline.userName" placeholder="请输入输入用户名" ></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" size="small" style="vertical-align: middle;" @click="Search()">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="index" label="序号" width="60">
			</el-table-column>

			<el-table-column prop="mobiletel" label="手机号" width="120">
			</el-table-column>

			<el-table-column prop="realname" label="真实姓名"width="120">
			</el-table-column>
			<el-table-column prop="username" label="用户名">
			</el-table-column>
		<!-- 	<el-table-column prop="groupid" label="分组" width="150">
			</el-table-column> -->
			<el-table-column prop="email" label="邮箱">
			</el-table-column>
			<el-table-column label="操作" width="300">
				<template slot-scope="{row,$index}">
					<el-button size="mini" type="primary" icon="el-icon-edit" @click.native="handleEdit($index, row)">
						编辑</el-button>
					<el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(row)">
						删除</el-button>
            <el-button size="mini" type="warning" @click="resetPassword(row)">
            重置密码</el-button>

				</template>
			</el-table-column>
		</el-table>
		<div>
			<div class="block" align="center" style="margin-top:20px ; background:#fff ; padding-bottom:20px ;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" v-if="paginationShow" :page-size="pagesize" layout=" prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<!--编辑弹窗-->
		<el-dialog title="编辑用户" :visible.sync="editFormVisible" class="editform" width="60%" customClass="customWidth">
			<el-form :model="editForm" label-width="80px" :rules="editForm" ref="editForm">
				<el-row :gutter="10">
					 <el-col :xs="22" :sm="12" :md="12">
						<el-form-item label="用户名" prop="username" :rules="[
      { required: true, message: '用户名不能为空'},
       { pattern: /^[0-9a-zA-Z]*$/, message: '不能输入汉字和符号' }
    ]">
							<el-input v-model="editForm.username" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
				 <el-col :xs="22" :sm="12" :md="12">
						<el-form-item label="手机号" prop="mobiletel" :rules="[
      { required: true, message: '手机号不能为空'},
       { pattern: /^1[345789]\d{9}$/, message: '输入11位数字的手机号码' }
    ]">
							<el-input v-model="editForm.mobiletel"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10">

				 <el-col :xs="22" :sm="12" :md="12">
						<el-form-item label="真实名" prop="realname" >
							<el-input v-model="editForm.realname"></el-input>
						</el-form-item>
					</el-col>
          <el-col :xs="22" :sm="12" :md="12">
          	<el-form-item label="邮箱" prop="email" >
          		<el-input v-model="editForm.email"></el-input>
          	</el-form-item>
          </el-col>
				</el-row>

				<el-row :gutter="10">

          <el-col :xs="22" :sm="12" :md="12" style="position: relative;">
					   <el-form-item label="选择分组" prop="name" :rules="[
      { required: true, message: '请选择分组'}
    ]">
						<el-input v-model="editForm.name" readonly="readonly"  placeholder="请选择分组" @focus="handlerPageNo" autocomplete="off"></el-input>
						<div style="position: absolute; top:40px; background:#fff ;z-index:999;width:100%;">
						   <el-tree ref="SlotMenuList" class="expand-tree" v-if="treefalse" style="border:1px solid #005983;" empty-text="暂无数据"  @node-click="handleNodeClicks" node-key="id" highlight-current :data="setTree" :props="defaultProps" :expand-on-click-node="false">
						   </el-tree>
                         </div>
					</el-form-item>
					</el-col>
				</el-row>
          <el-form-item label="权限" prop="checkLists" :rules="[
      { required: true, message: '必须选择权限'}
    ]">
              <el-checkbox-group v-model="editForm.checkLists"  @change="onRadioChange1">
               	<el-checkbox :label="item.id" :key="item.name" v-for="item in list">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="handleCancel('editForm')">取消</el-button>
				<el-button type="primary" @click.native="handleUpdate('editForm')">提交</el-button>
			</div>
		</el-dialog>

		<!--新增弹窗-->
		<el-dialog title="新增用户" :visible.sync="addFormVisible" class="add-form" width="60%" customClass="customWidth">
			<el-form :model="addForm" label-width="80px" :rules="addForm" ref="addForm">
				<el-row :gutter="10">
				  <el-col :xs="22" :sm="12" :md="12">
						<el-form-item label="用户名" prop="username" :rules="[
              { required: true, message: '用户名不能为空'},
              { pattern: /^[0-9a-zA-Z]*$/, message: '不能输入汉字和符号' }
            ]">
							<el-input v-model="addForm.username" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
				 <el-col :xs="22" :sm="12" :md="12">
						<el-form-item label="手机号" prop="mobiletel" :rules="[
      { required: true, message: '手机号不能为空'},
       { pattern: /^1[345789]\d{9}$/, message: '输入11位数字的手机号码' }
    ]">
							<el-input v-model="addForm.mobiletel"></el-input>
						</el-form-item>
					</el-col>

				</el-row>
				<el-row :gutter="10">
				 <el-col :xs="22" :sm="12" :md="12">
						<el-form-item label="密码" prop="pwd" :rules="[
      { required: true, message: '密码不能为空'},
      { min: 6, max: 18, message: '长度在 6 到 500个字符', trigger: 'blur' }
    ]">
							<el-input v-model="addForm.pwd"></el-input>
						</el-form-item>
					</el-col>
				 <el-col :xs="22" :sm="12" :md="12">
						<el-form-item label="真实名" prop="realname" >
							<el-input v-model="addForm.realname"></el-input>
						</el-form-item>
					</el-col>

				</el-row>
				<el-row :gutter="10">
				 <el-col :xs="22" :sm="12" :md="12">
						<el-form-item label="邮箱" prop="email" >
							<el-input v-model="addForm.email"></el-input>
						</el-form-item>
					</el-col>
				 <el-col :xs="22" :sm="12" :md="12" style="position: relative;">
					   <el-form-item label="选择分组" prop="name" :rules="[
      { required: true, message: '请选择分组'}
    ]">
						<el-input v-model="addForm.name" readonly="readonly"  placeholder="请选择分组" @focus="handlerPageNo" autocomplete="off"></el-input>
						<div style="position: absolute; top:42px; background:#fff ;z-index:999;width:100%;">
						   <el-tree ref="SlotMenuList" class="expand-tree" style="border:1px solid #005983;" v-if="treefalse" empty-text="暂无数据"  @node-click="handleNodeClicks" node-key="id" highlight-current :data="setTree" :props="defaultProps" :expand-on-click-node="false">
						   </el-tree>
                         </div>
					</el-form-item>
					</el-col>

				</el-row>

        <el-form-item label="权限" prop="checkList" :rules="[
          { required: true, message: '必须选择权限'}
        ]">
                  <el-checkbox-group v-model="addForm.checkList"  @change="onRadioChange">
                   	<el-checkbox :label="item.id" :key="item.name" v-for="item in list">{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="handleCancels('addForm')">取消</el-button>
				<el-button type="primary" @click="submitForm('addForm')">提交</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
import api from '@/assets/api'
	export default {
		name: 'slot-tree',
		data() {
			return {
				treefalse:false,
				editFormVisible: false, //默认不显示编辑弹层
				addFormVisible: false, //默认不显示编辑弹层
				paginationShow: true,
				pagesize: 20,
				total: 0,
				list: [], //角色数据
				currentPage: 1,
				checkList: [], //选中的数据
				checkLists: [],
        selUserIdc:'',
				formInline: {
					userName: ''
				},
				selUserId:"",
				editForm: {
					username: '',
					mobiletel: '',
					pwd: '',
					realname: '',
					email: '',
					name:'',
					id:'',
					roles: '',
					checkLists:[],
				},
                maxexpandId: api.maxexpandId, //新增节点开始id
				non_maxexpandId: 95, //新增节点开始id(不更改)
				isLoadingTree: true, //是否加载节点树
				setTree: "", //节点树数据
				iconSize: 'mini',
				leve: '', //层级
				defaultProps: {
					children: 'companyGroupList',
					label: 'name',
					parent: 'parentid', // 父级唯一标识
					value: 'id', // 唯一标识
				},
				rules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					mobiletel: [{
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
							pattern: /^1[345789]\d{9}$/,
							message: '输入11位数字的手机号码'
						}
					],
					pwd: [{
						required: true,
						message: '请输入密码',
						trigger: 'change'
					}],
					realname: [{
						required: true,
						message: '请输入真实名字',
						trigger: 'blur'
					}],
					email: [{
						required: true,
						message: '请输入邮箱地址',
						trigger: 'blur'
					}]

				},

				addForm: {
					username: '',
					mobiletel: '',
					pwd: '',
					realname: '',
					email: '',
					roles: '',
					name:'',
					id:'',
					checkList: [],
				},
				tableData: [{}]

			}
		},
		created() {
			this.getData();
			this.PermissionData();
			this.getTree();
		},
		methods: {
        resetPassword(row){//重置密码
        console.log(row);
          let _this = this
          let jsonP = {};
          jsonP.selUserId=row.id;
          jsonP.userName=row.username;
          	this.$http({
          		method: 'post',
          		url: '/api/resetPassWordSelUser',
          		data: jsonP
          	}).then((response) => { //这里使用了ES6的语法
          		console.log(response)
              if(response.data.code == 1) {
                  alert(response.data.message);
              }
              if(response.data.code != 1) {
                 this.$http({
                      method:'get',
                      url:'/selectByIdAllSelUser',
                      params:{}
                     }).then((response) =>{          //这里使用了ES6的语法
                         console.log(response.data.data.selUser)
                         _this.selUserIdc=response.data.data.selUser.selUserId;


                     }).catch((error) =>{
                         console.log(error)       //请求失败返回的数据
                     })
                 }
                 if( _this.selUserIdc==row.id){
                     this.$confirm('确定重置密码?', '提示', {
                              confirmButtonText: '确定',
                              cancelButtonText: '取消',
                              type: 'warning'
                            }).then(() => {
                              this.$message({
                                type: 'success',
                                message: response.data.message
                              });
                            }).catch(() => {
                              this.$message({
                                type: 'info',
                                message: '已取消重置密码'
                              });
                            });

                          _this.$router.replace({ path: '/login'})
                         }else{
                       this.$confirm('确定重置密码?', '提示', {
                             confirmButtonText: '确定',
                             cancelButtonText: '取消',
                             type: 'warning'
                           }).then(() => {
                             this.$message({
                               type: 'success',
                               message: response.data.message
                             });
                           }).catch(() => {
                             this.$message({
                               type: 'info',
                               message: '已取消重置密码'
                             });
                           });

                 }



          	}).catch((error) => {
          		console.log(error) //请求失败返回的数据
              if(error.response.data.message == '403'){//没有权限
                alert("没有权限");
              }
          	})
          },
			handlerPageNo(){//分组显示隐藏
				this.treefalse=true;

			},
			handleNodeClicks(data) {
				console.log(data);
				this.addForm.name = data.name;
				this.addForm.id = data.id;
				//this.form.level = data.level + 1;
				console.log(this.addForm.name);
				console.log(this.addForm.id);
				this.editForm.name = data.name;
				this.editForm.id = data.id;
				this.getTree();
				this.treefalse=false;
			},
       getTree() { //获取树的数据
				let _this = this
				this.$http({
					method: 'get',
					url: '/api/selectAllCompanyGroup',
					params: {}
				}).then((response) => { //这里使用了ES6的语法
					console.log(response)
					if(response.data.code == 1) {

					}
					if(response.data.code != 1) {

						_this.setTree = response.data.data.companyGroupList;
						if(response.data.data.companyGroupList.parentid==0){

							_this.flagss=false;

						};
						_this.setTree.forEach((item, index) => {
							if(!item.isEdit) {
								_this.$set(item, 'isEdit', false);
							}
						})
						console.log(_this.setTree);
					}

				}).catch((error) => {
					console.log(error) //请求失败返回的数据
				})
			},
			onRadioChange(item) {
				console.log("item", item);
				this.checkList = item;
				this.addForm.checkList = item;
			},
			onRadioChange1(item) {
				console.log("item", item);
			},

			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.list.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length;
			},
			PermissionData() { //获得权限数据
				let _this = this;
				this.$http({
					method: 'get',
					url: '/api/selectIsAllRole',
					params: {}
				}).then((response) => { //这里使用了ES6的语法
					console.log(response)
					this.list = response.data.data.roleList
					//请求成功返回的数据
				}).catch((error) => {
					console.log(error) //请求失败返回的数据
				})
			},

			submitForm(formName) { //新增用户
				let _this = this;
				let jsonP = {};
				jsonP.userName = _this.addForm.username;
				jsonP.mobileTel = _this.addForm.mobiletel;
				jsonP.pwd = _this.addForm.pwd;
				jsonP.realName = _this.addForm.realname;
				jsonP.email = _this.addForm.email;
				jsonP.roles = _this.addForm.checkList;
				jsonP.groupId = _this.addForm.id;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$http({
							method: 'post',
							contentType: 'application/json; charset=UTF-8',
							url: '/api/addSelUser',
							data: jsonP
						}).then((response) => {
							//这里使用了ES6的语法
							console.log(response);
							if(response.data.code == 1) {
								alert(response.data.message);
							}
							if(response.data.code != 1) {
								alert("用户增加成功");
								_this.addFormVisible = false;
								_this.getData();
								_this.$refs[formName].resetFields();

							}
							console.log(response.data.code)
							//请求成功返回的数据
							// alert("添加成功");
						}).catch((error) => {
							console.log(error) //请求失败返回的数据
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
			//点击编辑
			handleEdit(index, row) {
				console.log(row);
				this.selUserId=row.id
				this.editFormVisible = true
				let _this = this
				let jsonPs = {};
				jsonPs.companyGroupId = row.groupid
				this.$http({
					method: 'get',
					url: '/api/selectByIdCompanyGroup',
					dataType: "json",
					params: jsonPs
				}).then((response) => { //这里使用了ES6的语法
					console.log(response);
					if(response.data.code == 1) {
						alert(response.data.message)
					}
					if(response.data.code != 1) {
						console.log(response);
						_this.editForm.name = response.data.data.companyGroup.name;
						_this.editForm.id = response.data.data.companyGroup.id;
					}

				}).catch((error) => {
					console.log(error) //请求失败返回的数据
				})
				//let _this = this
				let jsonP = {};
				jsonP.selUserId = row.id;
				this.$http({
					method: 'get',
					url: '/api/selectByIdSelUser',
					dataType: "json",
					params: jsonP
				}).then((response) => { //这里使用了ES6的语法
					console.log(response);
					if(response.data.code == 1) {
						alert(response.data.message)
					}
					if(response.data.code != 1) {
						console.log(response);
						_this.editForm.username = response.data.data.selUser.userName;
						_this.editForm.realname = response.data.data.selUser.realName;
						_this.editForm.mobiletel = response.data.data.selUser.mobileTel;
						_this.editForm.email = response.data.data.selUser.email;
						_this.editForm.checkLists=response.data.data.selUser.roles;
						console.log(_this.editForm.checkLists);
						console.log(_this.editForm.id);
						console.log(_this.editForm.name);
					}

				}).catch((error) => {
					console.log(error) //请求失败返回的数据
          if(error.response.data.message == '403'){//没有权限
            alert("没有权限");
          }
				})
			},
			//点击取消
			handleCancel(formName) {
				this.editFormVisible = false;
			},
			//点击增加弹窗取消
			handleCancels(formName) {
				this.addFormVisible = false;
			},
			//编辑提交
			handleUpdate(formName) {

				this.$refs[formName].validate((valid) => {
					if(valid) {
				let _this = this;
				let jsonP = {};
				jsonP.userName = _this.editForm.username;
				jsonP.mobileTel = _this.editForm.mobiletel;
				jsonP.realName = _this.editForm.realname;
				jsonP.email = _this.editForm.email;
				jsonP.roles = _this.editForm.checkLists;
				jsonP.groupId = _this.editForm.id;
				jsonP.selUserId = _this.selUserId;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$http({
							method: 'post',
							contentType: 'application/json; charset=UTF-8',
							url: '/api/addSelUser',
							//data:fd
							data: jsonP
						}).then((response) => {
							//这里使用了ES6的语法
							console.log(response);
							if(response.data.code == 1) {
								alert(response.data.message);
							}
							if(response.data.code != 1) {
								alert(response.data.message);
								_this.editFormVisible = false;
								_this.getData();
                 location.reload();
								_this.$refs[formName].resetFields();

							}

						}).catch((error) => {
							console.log(error) //请求失败返回的数据
              if(error.response.data.message == '403'){//没有权限
                alert("没有权限");
              }
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
//						var postData = {
//							username: _this.editForm.name,
//							mobiletel: _this.editForm.mobiletel,
//							username: _this.editForm.pwd,
//							mobiletel: _this.editForm.mobiletel,
//							username: _this.editForm.realname
//						}
//						_this.tableData.push(postData);
//
//						//这里再向后台发个post请求重新渲染表格数据
//						_this.editFormVisible = false;




					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			getData() {

				let _this = this;
				this.$http({
					method: 'get',
					url: '/api/selectAllSelUser',
					params: {
						pageindex: _this.currentPage,
						pagesize: 20
					}
				}).then((response) => { //这里使用了ES6的语法
					console.log(response)
					this.tableData = response.data.data.selUserList;

					this.total = response.data.data.pageCount;
					console.log(this.total);
					this.currentPage = response.data.data.pageindex;
					//this.page-size = response.data.data.pagesize;
					//请求成功返回的数据
				}).catch((error) => {
					console.log(error) //请求失败返回的数据
				})
			},
			//查询
			Search() {
				let _this = this;
				_this.currentPage = 1;
				//将查询的value传回
				this.$http({
					method: 'get',
					url: '/api/selectAllByNameSelUser',
					params: {
						pageindex: _this.currentPage,
						pagesize: 20,
						userName: this.formInline.userName
					}
				}).then((response) => {
					if(response.data.data.pageCount == 0) {
						_this.tableData = "";
						_this.paginationShow = false;

					} else {
						_this.paginationShow = true;
						console.log(response)
						_this.tableData = response.data.data.selUserList;
						_this.total = response.data.data.pageCount;
						console.log(_this.total);
						_this.currentPage = response.data.data.pageindex;
					}

					//请求成功返回的数据
				}).catch((error) => {
					console.log(error) //请求失败返回的数据
				})

			},
			//表格删除
			handleDelete(row) {
				let _this = this;
        this.$confirm('确认删除?', '提示', {
                 confirmButtonText: '确定',
                 cancelButtonText: '取消',
                 type: 'warning'
               }).then(() => {
                 this.$http({
                  method: 'get',
                  url: '/api/deleteByIdSelUser',
                  params: {
                  	selUserId: row.id
                  }
                 }).then((response) => { //这里使用了ES6的语法
                   console.log(response)
                   if (response.data.code == 1) {
                    this.$message({
                      type: 'info',
                      message: response.data.message
                    });
                   }
                   if (response.data.code != 1) {
                     this.$message({
                       type: 'info',
                       message: response.data.message
                     });
                     this.getData();
                     this.tableData.splice(row, 1);
                   }

                 }).catch((error) => {
                   console.log(error) //请求失败返回的数据
                 })
               }).catch(() => {
                 this.$message({
                   type: 'info',
                   message: '已取消删除'
                 });
               });

			},
			// 初始页currentPage、初始每页数据数pagesize和数据data
			handleSizeChange: function(size) {
				this.pagesize = size;
				console.log(this.pagesize) //每页下拉显示数据
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
				this.getData();
				console.log(this.currentPage) //点击第几页
			}
		}
	}
</script>

<style>
	.el-table thead {
		background-color: #d2d6de!important;
	}

	.el-table th {
		background-color: #d2d6de!important;
		color: #000000
	}

	.el-form-item__content .el-checkbox {
		line-height: 25px;
		margin-right: 10px;
	}

	.el-form-item__content .el-checkbox.el-checkbox__label {
		padding-left: 0px;
	}

	.el-dialog .el-dialog__body {
		padding: 10px 10px;
		color: #606266;
		font-size: 14px;
		word-break: break-all;
	}

	.el-form-item {
		margin-bottom: 15px;
	}
  @media (min-width: 768px) and (max-width: 991.98px) {
     .customWidth {
       width:90%!important;
     }
   }

   @media (min-width: 576px)and (max-width: 768px) {
     .customWidth {
       width: 96%!important;
     }
   }

   @media (min-width: 320px)and (max-width: 575px) {
     .customWidth {
       width: 98%!important;
     }
   }
</style>
