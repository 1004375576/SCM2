<template>
	<div class="content-wrapper">
		<section class="content-header">
			<ol class="breadcrumb">
				<a href="/home"><i class="fa fa-dashboard"></i></a>
				<li>
					<a href="javascript:;">系统设置</a>
				</li>
				<li class="active">功能管理</li>
			</ol>
			<h1 class="pull-right">
            	<el-button type="primary" size="small" @click="addFormVisible = true">增加</el-button>
            </h1>
		</section>
		<div style="clear: both;"></div>
<div style="width:99% ; margin:10px auto 5px;"></div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="index" width="100" label="序号">
			</el-table-column>
			<el-table-column prop="icon" label="功能图标">
				<template slot-scope="scope">
					<i :class="scope.row.icon"></i>
				</template>
			</el-table-column>

			<el-table-column prop="name" label="功能名称">

			</el-table-column>
			<el-table-column prop="url" label="功能地址" width="280">
			</el-table-column>
			<el-table-column label="操作" width="300">
				<template slot-scope="{row,$index}">
					<el-button size="mini" type="primary" icon="el-icon-edit" @click.native="handleEdit($index, row)">
						编辑</el-button>
					<el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(row)">
						删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="block" align="center" style="margin-top:20px ; background:#fff ; padding-bottom:20px ;">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" v-if="paginationShow" :page-size="pagesize" layout=" prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		<!--编辑弹窗-->
		<el-dialog title="编辑功能" :visible.sync="editFormVisible" class="editform" width="40%" customClass="customWidth">
			<el-form :model="editForm" label-width="80px" :rules="editForm" ref="editForm">
				<el-form-item label="功能名称" prop="name" :rules="[
		      { required: true, message: '功能名称不能为空'} ]">
					<el-input v-model="editForm.name">
					</el-input>
				</el-form-item>
				<el-form-item label="主菜单" prop="radio4">
					<el-radio-group v-model="editForm.radio4" @change="toggleCalss1()">
						<el-radio label="是"></el-radio>
						<el-radio label="否"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="父级" prop="parentName" v-if="flags">
					<el-select v-model="editForm.parentName" placeholder="请选择父级菜单" @change="selectGets">
						<el-option v-for="item in getInvestorsInfos" :key="item.id" :label="item.name" :value="item.id">
						</el-option>

					</el-select>
				</el-form-item>
        <el-form-item label="功能" prop="radio02" style="margin-bottom:0.625rem ;">
        	<el-radio-group v-model="editForm.radio02" @change="toggleCalss02()">
        		<el-radio label="是" value="0"></el-radio>
        		<el-radio label="否" value="1"></el-radio>
        	</el-radio-group>
        </el-form-item>
				<el-form-item label="功能地址" prop="url">
					<el-input v-model="editForm.url">
					</el-input>
				</el-form-item>
				<el-row :gutter="20">
					<el-col :span="4">
						<label>图标</label>
					</el-col>
					<el-col :span="18" class="iconc-small" prop="icon">
						<el-radio-group v-model="editForm.icon" size="mini">
							<el-radio-button label="iconfont icon-xiaoxi">
								<i class="iconfont icon-xiaoxi"></i>
							</el-radio-button>
							<el-radio-button label="iconfont icon-kehu2">
								<i class="iconfont icon-kehu2"></i>
							</el-radio-button>
							<el-radio-button label="iconfont icon-home">
								<i class="iconfont icon-home"></i>

							</el-radio-button>
							<el-radio-button label="iconfont icon-shezhi">
								<i class="iconfont icon-shezhi"></i>

							</el-radio-button>

							<el-radio-button label="iconfont icon-line-chart">
								<i class="iconfont icon-line-chart"></i>

							</el-radio-button>
							<el-radio-button label="iconfont icon-CombinedShape">
								<i class="iconfont icon-CombinedShape"></i>

							</el-radio-button>
							<el-radio-button label="iconfont icon-cheliang-copy">
								<i class="iconfont icon-cheliang-copy"></i>

							</el-radio-button>
							<el-radio-button label="iconfont icon-yunjia">
								<i class="iconfont icon-yunjia"></i>

							</el-radio-button>
							<el-radio-button label="iconfont icon-shuju">
								<i class="iconfont icon-shuju"></i>

							</el-radio-button>
							<el-radio-button label="iconfont icon-huobi">
								<i class="iconfont icon-huobi"></i>

							</el-radio-button>
							<el-radio-button label="iconfont icon-weizhi">
								<i class="iconfont icon-weizhi"></i>

							</el-radio-button>
							<el-radio-button label="iconfont icon-APPicon-kehu">
								<i class="iconfont icon-APPicon-kehu"></i>

							</el-radio-button>
							<el-radio-button label="iconfont icon-weizhi1">
								<i class="iconfont icon-weizhi1"></i>
							</el-radio-button>

							<el-radio-button label="iconfont icon-yichang">
								<i class="iconfont icon-yichang"></i>
							</el-radio-button>
							<el-radio-button label="iconfont icon-kehu">
								<i class="iconfont icon-kehu"></i>
							</el-radio-button>
							<el-radio-button label="iconfont icon-kehu">
								<i class="iconfont icon-kehu"></i>
							</el-radio-button>
							<el-radio-button label="iconfont icon-yunyingkanban">
								<i class="iconfont icon-yunyingkanban"></i>
							</el-radio-button>
							<el-radio-button label="iconfont  icon-cheliang-copy">
								<i class="iconfont  icon-cheliang-copy"></i>
							</el-radio-button>

						</el-radio-group>
					</el-col>
				</el-row>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="handleCancel('editForm')">取消</el-button>
				<el-button type="primary" @click.native="handleUpdate('editForm')">提交</el-button>
			</div>
		</el-dialog>
		<!--新增弹窗-->
		<el-dialog title="新增功能" :visible.sync="addFormVisible" class="add-form" width="40%" customClass="customWidth">
			<el-form :model="addForm" label-width="80px" :rules="addForm" ref="addForm">
				<el-form-item label="功能名称" prop="name" :rules="[
      { required: true, message: '功能名称不能为空'} ]">
					<el-input v-model="addForm.name">
					</el-input>
				</el-form-item>

				<el-form-item label="主菜单" prop="radio" style="margin-bottom:0.625rem ;">
					<el-radio-group v-model="addForm.radio" @change="toggleCalss()">
						<el-radio label="是"></el-radio>
						<el-radio label="否"></el-radio>
					</el-radio-group>
				</el-form-item>
        <el-form-item label="父级" prop="value" v-if="flag">
        	<el-select v-model="addForm.value" placeholder="请选择父级菜单" @change="selectGet">
        		<el-option v-for="item in getInvestorsInfo" :key="item.id" :label="item.name" :value="item.id">
        		</el-option>
        	</el-select>
        </el-form-item>
        <el-form-item label="功能" prop="radio01" style="margin-bottom:0.625rem ;">
        	<el-radio-group v-model="addForm.radio01" @change="toggleCalss01()">
        		<el-radio label="是" value="0"></el-radio>
        		<el-radio label="否" value="1"></el-radio>
        	</el-radio-group>
        </el-form-item>

				<el-form-item label="功能地址" prop="url">
					<el-input v-model="addForm.url">
					</el-input>
				</el-form-item>
				<el-row :gutter="20">
					<el-col :span="4">
						<label>图标</label>
					</el-col>
					<el-col :span="18" class="iconc-small" prop="radio2">
						<el-radio-group v-model="addForm.radio2" size="mini">
							<el-radio-button label="iconfont icon-xiaoxi">
								<i class="iconfont icon-xiaoxi"></i>
							</el-radio-button>
							<el-radio-button label="iconfont icon-kehu2">
								<i class="iconfont icon-kehu2"></i>
							</el-radio-button>
							<el-radio-button label="iconfont icon-home">
								<i class="iconfont icon-home"></i>

							</el-radio-button>
							<el-radio-button label="iconfont icon-shezhi">
								<i class="iconfont icon-shezhi"></i>

							</el-radio-button>

							<el-radio-button label="iconfont icon-line-chart">
								<i class="iconfont icon-line-chart"></i>

							</el-radio-button>
							<el-radio-button label="iconfont icon-CombinedShape">
								<i class="iconfont icon-CombinedShape"></i>

							</el-radio-button>
							<el-radio-button label="iconfont icon-cheliang-copy">
								<i class="iconfont icon-cheliang-copy"></i>

							</el-radio-button>
							<el-radio-button label="iconfont icon-yunjia">
								<i class="iconfont icon-yunjia"></i>

							</el-radio-button>
							<el-radio-button label="iconfont icon-shuju">
								<i class="iconfont icon-shuju"></i>

							</el-radio-button>
							<el-radio-button label="iconfont icon-huobi">
								<i class="iconfont icon-huobi"></i>

							</el-radio-button>
							<el-radio-button label="iconfont icon-weizhi">
								<i class="iconfont icon-weizhi"></i>

							</el-radio-button>
							<el-radio-button label="iconfont icon-APPicon-kehu">
								<i class="iconfont icon-APPicon-kehu"></i>

							</el-radio-button>
							<el-radio-button label="iconfont icon-weizhi1">
								<i class="iconfont icon-weizhi1"></i>
							</el-radio-button>

							<el-radio-button label="iconfont icon-yichang">
								<i class="iconfont icon-yichang"></i>
							</el-radio-button>
							<el-radio-button label="iconfont icon-kehu">
								<i class="iconfont icon-kehu"></i>
							</el-radio-button>
							<el-radio-button label="iconfont icon-kehu">
								<i class="iconfont icon-kehu"></i>
							</el-radio-button>
							<el-radio-button label="iconfont icon-yunyingkanban">
								<i class="iconfont icon-yunyingkanban"></i>
							</el-radio-button>
							<el-radio-button label="iconfont  icon-cheliang-copy">
								<i class="iconfont  icon-cheliang-copy"></i>
							</el-radio-button>

						</el-radio-group>
					</el-col>
				</el-row>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="handleCancels('addForm')">取消</el-button>
				<el-button type="primary" @click="submitForm('addForm')">提交</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				editFormVisible: false, //默认不显示编辑弹层
				addFormVisible: false, //默认不显示编辑弹层
				paginationShow: true,
				pagesize: 20,
				flags: false, //编辑
				flag: false, //新增
				total: 0,
				currentPage: 1,
				isparent: true,
				parentid: 0,
        //menuId:'',
				getInvestorsInfo: [],
				getInvestorsInfos: [],

				editForm: {
					name: '',
					icon: '',
					parentid: '',
					url: '',
					id: '',
					isparent: '',
					radio4: '',//是否父菜单
					value1: '',
          radio02: '',//是否功能
					parentName: ''
				},
				addForm: {
					username: '',
					mobiletel: '',
					pwd: '',
					parentid: '',
					realname: '',
					email: '',
					radio: '是',
          radio01: '否',
					value: '',
					radio2: '',
				},
				tableData: [{}]
			}
		},
		created() {
			this.getData();
			this.toggleCalss();
			this.toggleCalss1();
			this.selectGets()
		},
		methods: {
			//select触发的事件增加
			selectGet(vId) {
				let obj = {};
				obj = this.getInvestorsInfo.find((item) => { //这里的selectList就是上面遍历的数据源
					return item.id === vId; //筛选出匹配数据
				});
				console.log(obj);
				this.addForm.parentid = obj.id;

			},
			//select触发的事件编辑
			selectGets(vId) {
				let obj = {};
				obj = this.getInvestorsInfos.find((item) => { //这里的selectList就是上面遍历的数据源
					return item.id === vId; //筛选出匹配数据
				});
				this.editForm.parentid = obj.id;
				this.editForm.parentName = obj.name
				console.log(this.editForm.parentid);
				this.parentid = obj.id;
			},

			//父级增加菜单显示与隐藏
			toggleCalss() {
				this.$http({
					method: 'get',
					url: '/api/selectFirstMenu',
					params: {}
				}).then((response) => { //这里使用了ES6的语法
					console.log(response)
					this.getInvestorsInfo = response.data.data.menuList;
					console.log(this.getInvestorsInfo);
				}).catch((error) => {
					console.log(error) //请求失败返回的数据
				})
				if(this.addForm.radio == "否") {
					this.flag = true,
						this.isparent = false
				} else {
					this.flag = false,
						this.isparent = true,
						this.parentid = 0
				}
			},
			//编辑父级菜单显示与隐藏
			toggleCalss1() {
				if(this.editForm.radio4 == "否") {
					this.flags = true
				} else {
					this.flags = false
				}
			},
			submitForm(formName) { //增加功能提交
				let _this = this;
				let jsonP = {};
				if(this.addForm.radio == "否") {
					jsonP.isParent = false;
					jsonP.parentId = _this.addForm.value;
					jsonP.name = _this.addForm.name;
					jsonP.url = _this.addForm.url;
					jsonP.icon = _this.addForm.radio2;
          if( _this.addForm.radio01=="是"){
              jsonP.listOrder=0;
            }
            else{
                jsonP.listOrder=1;
            }

				} else {
					jsonP.isParent = true;
					jsonP.parentId = 0;
					jsonP.name = _this.addForm.name;
					jsonP.url = _this.addForm.url;
					jsonP.icon = _this.addForm.radio2;
          if( _this.addForm.radio01=="是"){
          jsonP.listOrder=0;
            }
            else{
                jsonP.listOrder=1;
            }
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$http({
							method: 'post',
							contentType: 'application/json; charset=UTF-8',
							url: '/api/addMenu',
							//data:fd
							data: jsonP
						}).then((response) => {
							//这里使用了ES6的语法
							console.log(response);
							if(response.data.code == 1) {
								alert(response.data.message);
							}
              if(response.data.code == 403) {
              	alert(response.data.message);
              }
							if(response.data.code == 0) {
								alert(response.data.message);
								this.addFormVisible = false;
								this.getData();
               _this.$refs[formName].resetFields();//清除表单数据
							}
							console.log(response.data.code)
							//请求成功返回的数据
							// alert("添加成功");
						}).catch((error) => {
							console.log(error) //请求失败返回的数据
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},

			//点击编辑
			handleEdit(index, row) {
				//console.log(row);
				let _this = this;
				_this.editFormVisible = true
       _this.editForm.id=row.id;
				//console.log(row.id);
				this.$http({
					method: 'get',
					contentType: 'application/json; charset=UTF-8',
					url: '/api/selectByIdMenu',
					params: {
						menuId: row.id
					}
				}).then((response) => { //这里使用了ES6的语法
					console.log(response)
					_this.editForm.name = response.data.data.menu.name,
					_this.editForm.icon = response.data.data.menu.icon,
					_this.editForm.parentid = response.data.data.menu.parentid,
					_this.editForm.url = response.data.data.menu.url,
					_this.editForm.isparent = response.data.data.menu.isparent;
             console.log(response.data.data.menu.listorder);
             this.$http({
             	method: 'get',
             	url: '/api/selectFirstMenu',
             	params: {}
             }).then((response) => { //这里使用了ES6的语法
             	console.log(response)
             	_this.getInvestorsInfos = response.data.data.menuList;
              _this.getInvestorsInfos.forEach(function(c) {
                       console.log(c);
                        console.log("cccc");
              						console.log(c.parentid);
              						if(_this.editForm.parentid == c.id) {
              							_this.editForm.parentName = c.name;
                            console.log("kk");
                            console.log(_this.editForm.parentName);
              						}
              					})
             }).catch((error) => {
             	console.log(error) //请求失败返回的数据
             })
            if(response.data.data.menu.listorder==0){

              _this.editForm.radio02="是";
              }
            	else{
                 _this.editForm.radio02="否";
              }
					console.log(_this.editForm.icon);
					if(response.data.data.menu.isparent == true) {
						_this.editForm.radio4 = "是"
						this.flags = false
					} else {
						_this.editForm.radio4 = "否"
						this.flags = true
					}
				}).catch((error) => {
					console.log(error) //请求失败返回的数据
				})

				if(row.isparent == false) {
					_this.editForm.radio4 = "否",
						_this.flags = true
				} else {
					this.editForm.radio4 = "是",
						this.flags = false
				}
			},
			//点击取消
			handleCancel(formName) {
				this.editFormVisible = false;
			},
			//点击增加弹窗取消
			handleCancels(formName) {
				this.addFormVisible = false;
			},
			//编辑更新
			handleUpdate(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
            let _this = this;
            let jsonP = {};
            //jsonP.parentId = 0;
            if( _this.editForm.radio4=='是'){
                 jsonP.isparent=true,
                 jsonP.parentId =0;
              }
            	else{
                  jsonP.isparent=false;
                   jsonP.parentId =_this.editForm.parentid;//是否为父菜单
              }
            jsonP.menuId=_this.editForm.id;
             console.log(jsonP.menuId)
            // jsonP.isparent=_this.editForm.isparent,
            jsonP.name = _this.editForm.name;
            jsonP.url = _this.editForm.url;
            jsonP.radio4 = _this.editForm.radio4;//是否为主菜单

            jsonP.listorder = _this.editForm.radio2;//是否为图标
            jsonP.icon = _this.editForm.icon;//是否为功能
            this.$http({
            	method: 'post',
            	contentType: 'application/json; charset=UTF-8',
            	url: '/api/addMenu',
            	//data:fd
            	data: jsonP
            }).then((response) => {
            	//这里使用了ES6的语法
            	console.log(response);
            	if(response.data.code == 1) {
            		alert(response.data.message);
            	}
              if(response.data.code == 403) {
              	alert(response.data.message);
              }
            	if(response.data.code == 0) {
            		alert(response.data.message);
            		_this.editFormVisible = false;
            		_this.getData();
               _this.$refs[formName].resetFields();//清除表单数据
            	}
            	console.log(response.data.code)
            	//请求成功返回的数据
            	// alert("添加成功");
            }).catch((error) => {
            	console.log(error) //请求失败返回的数据
            })

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
					url: '/api/selectAllMenu',
					params: {
						pageindex: _this.currentPage,
						pagesize: 20
					}
				}).then((response) => { //这里使用了ES6的语法
					console.log(response)
					_this.tableData = response.data.data.menuList;
					_this.total = response.data.data.pageCount;
					console.log(_this.total);
					_this.currentPage = response.data.data.pageIndex;
					//请求成功返回的数据
				}).catch((error) => {
					console.log(error) //请求失败返回的数据
				})
			},

			//表格删除
			handleDelete(row) {
				let _this = this;
				console.log(row);
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          		 this.$http({
              method: 'get',
              url: '/api/deleteByIdMenu',
              params: {
              	menuId: row.id
              }
                  }).then((response) =>{          //这里使用了ES6的语法
                      console.log(response)
                      if(response.data.code == 1){
                      	alert(response.data.message);
                       }

                   if(response.data.code == 0){
                     this.$message({
                       type: 'success',
                       message: response.data.message
                     });
                     _this.getData();
                     _this.tableData.splice(row, 1)
                    }

                  }).catch((error) =>{
                      console.log(error)       //请求失败返回的数据
                      if(error.response.data.message == '403'){//没有权限
                        alert("没有权限");
                      }
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
 @media (min-width: 768px) and (max-width: 991.98px) {
    .customWidth {
      width:90%!important;
    }
  }

  @media (min-width: 576px)and (max-width: 768px) {
    .customWidth {
      width: 100%!important;
    }
  }

  @media (min-width: 320px)and (max-width: 575px) {
    .customWidth {
      width: 100%!important;
    }
  }
</style>
