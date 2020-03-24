<template>
	<div class="content-wrapper slectcx">
		<section class="content-header">
			<ol class="breadcrumb">
				<a href="/"><i class="fa fa-dashboard"></i></a>
				<li>
					<a href="javascript:;">系统设置</a>
				</li>
				<li class="active">客户分组</li>
			</ol>
		</section>
		<div style="clear: both;"></div>
		<div class="slot-tree ss-terss" style="position: relative;">
			<!--  <el-button class="slot-t-top" type="primary" size="small" @click="handleAddTop">添加顶级节点</el-button>-->
			<el-tree ref="SlotMenuList" class="expand-tree ss-terssd"  empty-text="暂无数据" v-if="isLoadingTree" node-key="id"    highlight-current :data="setTree" :props="defaultProps" :expand-on-click-node="false">
				<span class="slot-t-node" slot-scope="{ node, data }">
        	     <!-- 未编辑状态 -->
        			<span :class="[data.id >= maxexpandId ? 'slot-t-node--label' : '']">{{ node.label }}</span>
				    <span class="slot-t-icons" style="display:inline-block; position: absolute;right:10px;">
	        		<!-- 新增按钮 -->
	        		<el-button icon="el-icon-plus" circle :size="iconSize"  type="success"  @click="openAdd(node, data)"></el-button>
	        		<!-- 编辑按钮 -->
	        		<el-button icon="el-icon-edit"  circle :size="iconSize" type="primary" @click="openEdit(node, data)"></el-button>
	        		<!--<el-button icon="el-icon-edit"  circle :size="iconSize" type="primary"  @click="NodeEdit(node, data)"></el-button>-->
	        		<!-- 删除按钮 -->
	        		<el-button icon="el-icon-delete" class="dis-none" circle :size="iconSize" v-if="leve!='1'" type="warning"  @click="deleGourps(node, data)"></el-button>

				    </span>
				</span>
			</el-tree>
			<!--编辑弹窗-->
			<el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" customClass="customWidth">
				<el-form :model="form"  :rules="form" :inline="true" ref="form">
					<el-form-item label="分组名称" prop="names" :rules="{
            	      required: true, message: '分组名称不能为空', trigger: 'blur'
            	    }">
						<el-input v-model="form.names" autocomplete="off"></el-input>
					</el-form-item>
					<div>
						<el-form-item label="上级区域" prop="name" :rules="{
            	      required: true, message: '上级区域不能为空', trigger: 'blur'
            	    }">
							<el-input v-model="form.name" autocomplete="off">
							</el-input>
							<el-tree ref="SlotMenuList" class="expand-tree" empty-text="暂无数据" v-if="isLoadingTree" @node-click="handleNodeClicks" node-key="id" highlight-current :data="setTree" :props="defaultProps" :expand-on-click-node="false">
							</el-tree>
						</el-form-item>
					</div>

				</el-form>
				<span slot="footer" class="dialog-footer">
				    <el-button @click="dialogVisible = false">取 消</el-button>
				    <el-button type="primary" @click="editeform('form')">确 定</el-button>
				  </span>
			</el-dialog>
			<!--新增弹窗-->
			<el-dialog title="增加" :visible.sync="dialogsVisible" width="30%" customClass="customWidth">
				<el-form :model="forms" :rules="forms" :inline="true" ref="forms"  >
					<el-form-item label="分组名称" prop="name"  :rules="{
            	      required: true, message: '分组名称不能为空', trigger: 'blur'
            	    }">
						<el-input v-model="forms.name" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
				    <el-button @click="dialogsVisible = false">取 消</el-button>
				    <el-button type="primary" @click="submitAdd('forms')">确 定</el-button>
				  </span>
			</el-dialog>

			<!--删除弹窗-->
			<el-dialog title="删除" :visible.sync="dialogsDeleVisible" width="30%" customClass="customWidth">
				<P>删除“临时”区域需将此区域下的客户转移到以下区域</P>
				<el-form :model="formfz" :inline="true" :rules="formfz" ref="formfz">
					<el-form-item label="客户移至" :rules="{
            	      required: true, message: '客户移至的区域不能为空', trigger: 'blur'
            	    }">
						<el-input v-model="formfz.name" autocomplete="off"></el-input>
						<el-tree ref="SlotMenuList" class="expand-tree" empty-text="暂无数据" v-if="isLoadingTree" @node-click="handleNodeClick" node-key="id" highlight-current :data="setTree" :props="defaultProps" :expand-on-click-node="false">

						</el-tree>

					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					    <el-button @click="dialogsDeleVisible = false">取 消</el-button>
					    <el-button type="primary" @click="submitdeldite('formfz')">确 定</el-button>
					  </span>
			</el-dialog>
			</span>

		</div>
	</div>
</template>

<script>
	import api from '@/assets/api'
	export default {
		name: 'slot-tree',
		data() {
			return {
				flagss:true,//判断是否为父级节点
				dialogVisible: false,
				parentid: '',
				newId: '',
				id: "",
				oldId: '',
				namess: '',
				dialogsVisible: false,
				dialogsDeleVisible: false, //删除弹窗
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
				form: {
					name: '',
					names: '',
					id: '',
					level: '',
					parentid: ''
				},
				formfz: {
					name: ''
				},
				forms: {
					name: ''
				},
        rules: {
        	name: [
        	    {required: true, message: '请输入分组名称', trigger: 'blur' }
        	 ]
        	},
				defaultExpandKeys: [], //默认展开节点列表
			}
		},
		created() {
			this.getTree();
		},
		methods: {
			openEdit(node, data) {
				console.log(node, data);
				if(data.level==1){
				    alert("第一级分组不能修改");
					return false;
				}
				this.dialogVisible = true;
				let _this = this
				let jsonPs = {};
				jsonPs.companyGroupId = data.id
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
						_this.form.names = response.data.data.companyGroup.name;
						_this.form.id = response.data.data.companyGroup.id;
						console.log(_this.form.id);
					}

				}).catch((error) => {
					console.log(error) //请求失败返回的数据
				})
				let jsonPss = {};
				jsonPss.companyGroupId = data.parentid
				this.$http({
					method: 'get',
					url: '/api/selectByIdCompanyGroup',
					dataType: "json",
					params: jsonPss
				}).then((response) => { //这里使用了ES6的语法
					console.log(response);
					if(response.data.code == 1) {
						alert(response.data.message)
					}
					if(response.data.code != 1) {
						_this.form.name = response.data.data.companyGroup.name;
						//_this.form.level=response.data.data.companyGroup.level;
						_this.form.parentid = response.data.data.companyGroup.id;

						console.log(_this.form.level);
					}

				}).catch((error) => {
					console.log(error) //请求失败返回的数据
				})

			},
			editeform(formName) {
        this.$refs[formName].validate((valid) => {
                  if (valid) {
                   let _this = this
                   let jsonPs = {};
                   jsonPs.name = _this.form.names;
                   jsonPs.groupType = "0";
                   jsonPs.parentId = _this.form.parentid;
                   jsonPs.companyGroupId = _this.form.id;
                   jsonPs.level = _this.form.level;
                   this.$http({
                   	method: 'post',
                   	url: '/api/addCompanyGroup',
                   	dataType: "json",
                   	data: jsonPs
                   }).then((response) => { //这里使用了ES6的语法
                   	console.log(response);
                   	if(response.data.code == 1) {
                   		alert(response.data.message)
                   	}
                    if(response.data.code == 403) {
                    	alert(response.data.message);
                    }
                   	if(response.data.code == 0) {
                   		alert(response.data.message)
                   		_this.dialogVisible = false;
                   		//this.getTree();
                   	}
                   	_this.getTree();
                   	if(!n.expanded) {
                   		n.expanded = true
                   	}
                   }).catch((error) => {
                   	console.log(error) //请求失败返回的数据
                   })
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
                });



			},
			handleNodeClick(data) {
				console.log(data);
				this.namess = data.name;
				this.newId = data.id;
				this.formfz.name = this.namess;
			},
			handleNodeClicks(data) {

				console.log(data);
				this.form.name = data.name;
				this.parentid = data.parentid;
				this.form.parentid = data.id;
				this.form.level = data.level + 1;
				console.log(this.form.level);
			},

			openAdd(node, data) { //打开新增弹窗
				//alert(data.level);
				//console.log(data.level=6);
				if(data.level >=5){
					console.log(data.level);
					alert("最多只能增加5级");
					return false;
				}else{
					//console.log(data.level);
				//console.log(node, data);
				this.dialogsVisible = true;
				this.parentid = data.parentid;
				this.id = data.id;
				}
			},
			//删除分组
			submitEdite(node, data) {
				console.log(node, data);
				this.dialogsDeleVisible = true;
				//this.parentid = data.parentid;
				//this.id=data.id;
			},
			submitdeldite(formName) {
          this.$refs[formName].validate((valid) => {
                  if (valid) {
                   let _this = this
                   this.$http({
                   	method: 'get',
                   	url: '/api/changeDeleteCompanyGroup',
                   	params: {
                   		oldId: _this.oldId,
                   		newId: _this.newId
                   	}
                   }).then((response) => { //这里使用了ES6的语法
                   	console.log(response)
                   	if(response.data.code == 1) {
                   		alert(response.data.message)
                   	}

                   	if(response.data.code == 0) {
                   		alert(response.data.message)
                   		_this.dialogsDeleVisible=false;
                   		_this.getTree();
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
			},
			//新增节点
			submitAdd(formName) {
         this.$refs[formName].validate((valid) => {
                  if (valid) {
                    let _this = this
                    let jsonPs = {};
                    jsonPs.name = _this.forms.name;
                    jsonPs.groupType = "0";
                    jsonPs.parentId = _this.id;
                                 this.$http({
                                 	method: 'post',
                                 	url: '/api/addCompanyGroup',
                                 	dataType: "json",
                                 	data: jsonPs
                                 }).then((response) => { //这里使用了ES6的语法
                                 	if(response.data.code == 1) {
                                 		alert(response.data.data.message);
                                 	}

                                 	if(response.data.code == 0) {
                                    alert(response.data.message)
                                 		console.log(response);
                                 		_this.dialogsVisible = false;
                                 		//同时展开节点
                                 		_this.getTree();
                                 		_this.$refs[formName].resetFields(); //清除表单数据
                                 		 //展开节点
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

			//删除分组
			deleGourps(node, data) {
				console.log(data);
				if(data.level==1){
				    alert("第一级分组不能删除");
					return false;
				}
				let _this = this
				this.$http({
					method: 'get',
					url: '/api/deleteCheckCompanyGroup',
					params: {
						salesId: data.id
					}
				}).then((response) => { //这里使用了ES6的语法
					console.log(response)
					if(response.data.code == 1) {
						alert(response.data.data.message);
					}
					if(response.data.code != 1) {
						if(response.data.data.flag == false) {
							this.$http({
								method: 'get',
								url: '/api/deleteByIdCompanyGroup',
								params: {
									companyGroupId: data.id
								}
							}).then((response) => { //这里使用了ES6的语法
								console.log(response)
								if(response.data.code == 1) {
									alert(response.data.message)
								}

								if(response.data.code == 0) {
									alert(response.data.message)
									this.getTree();
								}

							}).catch((error) => {
								console.log(error) //请求失败返回的数据
                if(error.response.data.message == '403'){//没有权限
                  alert("没有权限");
                }
							})

						} else {
							_this.submitEdite();
							_this.oldId = data.id;
						}

					}

				}).catch((error) => {
					console.log(error) //请求失败返回的数据
				})

			}

		}
	}
</script>

<style>
	.slot-tree .slot-t-node span {
		display: inline-block;
	}
	/*节点*/

	.slot-tree .slot-t-node--label {
		font-weight: 600;
	}
	/*输入框*/

	.slot-tree .slot-t-input .el-input__inner {
		height: 26px;
		line-height: 26px;
	}
	/*按钮列表*/

	.el-tree-node__children .el-tree-node {
		white-space: nowrap;
		outline: 0;
		padding: 3px 0px;
	}

	.slot-tree .slot-t-node .slot-t-icons {
		display: none;
		margin-left: 10px;
	}

	.slot-tree .slot-t-icons .el-button+.el-button {
		margin-left: 6px;
	}

	.slot-tree .el-tree-node__content:hover .slot-t-icons {
		display: inline-block;
	}

	.el-dialog__body {
		padding: 5px 10px!important;
	}

	.el-dialog__header {
		padding: 10px;
	}
  @media (min-width: 768px) and (max-width: 991.98px) {
     .customWidth {
       width:60%!important;
     }
   }

   @media (min-width: 576px)and (max-width: 768px) {
     .customWidth {
       width: 60%!important;
     }
   }

   @media (min-width: 320px)and (max-width: 575px) {
     .customWidth {
       width: 98%!important;
     }
   }
</style>
