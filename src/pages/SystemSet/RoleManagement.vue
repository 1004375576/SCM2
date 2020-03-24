<template>
	<div class="content-wrapper">
	<section class="content-header">
			<ol class="breadcrumb">
				    <a href="/"><i class="fa fa-dashboard"></i></a>
				     <li><a href="javascript:;">系统设置</a></li>
				     <li class="active">角色管理</li>
            </ol>
            <h1 class="pull-right">
            	<el-button type="primary" size="small" @click="addFormVisible = true">添加角色</el-button>
            </h1>
		</section>
	      <div style="clear: both;"></div>
<div style="width:99% ; margin:10px auto 5px;"></div>
  <el-table
    :data="tableData"
    style="width: 100%"   >
     <el-table-column
       type="index" width="300"
         label="序号">
      </el-table-column>
       <el-table-column
        prop="name"
        label="角色名称">
      </el-table-column>
    <el-table-column label="操作" width="300">
     <template slot-scope="{row,$index}">
        <el-button
          size="mini"
          type="primary"
                 icon="el-icon-edit" @click.native="handleEdit($index, row)"
                 >
                  编辑</el-button>
             <el-button
          size="mini"
          type="danger"
                  icon="el-icon-delete"
                  @click="handleDelete(row)">
                  删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div>
 <div class="block" align="center" style="margin-top:20px ; background:#fff ; padding-bottom:20px ;">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
       v-if="paginationShow"
        :page-size="pagesize"
        layout=" prev, pager, next, jumper"
        :total="total">
    </el-pagination>
</div>
</div>
<!--新增弹窗-->
<el-dialog title="新增角色"
 :visible.sync="addFormVisible"
 class="add-form" width="80%" customClass="customWidth"
>
 <el-form :model="addForm" label-width="80px" :rules="addForm" ref="addForm">
   <el-form-item label="角色名称" prop="name" style="width:240px ;" size="small"  :rules="[
      { required: true, message: '角色名不能为空'}
    ]">
   <el-input v-model="addForm.name"  auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="权限" prop="menusIds" :rules="[
    { required: true, message: '必须选择权限'}
  ]">
       <div class="checkbox-table" v-for="(item, indexkey) in menu" :key="item.id">
        <template>
          <div>
          <el-checkbox class="check1" style="font-weight: 600;margin-bottom: 5px " v-model='addForm.menusIds' :label="item.id" @change='handleCheck(1,indexkey)'>
            {{item.name}}
          </el-checkbox>
          <div style="margin-left:15px ;">
            <div v-for="list in item.menuList" class="line-check" :key="list.id" style="display: inline-block;margin-bottom:5px; margin-right:3px ;" >
              <el-checkbox class="check2" @change='handleCheck(2,indexkey)' v-model="addForm.menusIds" :label="list.id">
                {{list.name}}
              </el-checkbox>
            </div>
          </div>
          </div>
        </template>
      </div>


     <!-- <el-checkbox-group v-model="addForm.menusIds"  >
          <el-checkbox :label="item.id" :key="item.name"   @change='handleCheck(2,index)' v-for="(item,index) in items.menuList">{{item.name}}</el-checkbox>
      </el-checkbox-group> -->

   </el-form-item>
 </el-form>
 <div slot="footer" class="dialog-footer">
  <el-button @click.native="handleCancels('addForm')">取消</el-button>
  <el-button type="primary"@click="submitForm('addForm')">提交</el-button>
 </div>
</el-dialog>

<el-dialog title="编辑角色"
 :visible.sync="editFormVisible"
 class="editform"  width="80%" customClass="customWidth"
>
 <el-form :model="editForm" label-width="80px" :rules="editForm" ref="editForm">
  <el-form-item label="用户名" prop="name" style="width:240px ;" size="small" :rules="[
      { required: true, message: '角色名不能为空'}
    ]">
   <el-input v-model="editForm.name"  auto-complete="off"></el-input>
  </el-form-item>
 <el-form-item label="权限" prop="menusIdsEdit" :rules="[
   { required: true, message: '必须选择权限'}
 ]">
      <div class="checkbox-table" v-for="(item, indexkey) in menuEdit" :key="item.id">
       <template>
         <div>
         <el-checkbox class="check1" style="font-weight: 600;margin-bottom: 5px " v-model='editForm.menusIdsEdit' :label="item.id" @change='handleCheckc(1,indexkey)'>
           {{item.name}}
         </el-checkbox>
           <div style="margin-left:15px ;">
           <div v-for="list in item.menuList" class="line-check" :key="list.id" style="display: inline-block;margin-bottom:5px; margin-right:3px ;" >
             <el-checkbox class="check2" @change='handleCheckc(2,indexkey)' v-model="editForm.menusIdsEdit" :label="list.id">
               {{list.name}}
             </el-checkbox>
           </div>
         </div>
         </div>
       </template>
     </div>
   </el-form-item>
 </el-form>
 <div slot="footer" class="dialog-footer">
  <el-button @click.native="handleCancel('editForm')">取消</el-button>
  <el-button type="primary" @click.native="handleUpdate('editForm')">提交</el-button>
 </div>
</el-dialog>
 </div>
</template>

<script>
  export default {
    data() {
      return {
        roleId:'',
        menuEdit:[], //所有的菜单数组，
        menusIdsEdit:[], //已选的菜单id数组
        menu:[], //所有的菜单数组，
        menusIds:[], //已选的菜单id数组
         // checkAlls:[],
         isIndeterminate: false,
      	 editFormVisible: false, //默认不显示编辑弹层
         addFormVisible: false, //默认不显示编辑弹层
      	 paginationShow:true,
      	 pagesize:20,
         total:0,
         currentPage:1,
         menuFistData:[],//所有的菜单数组
         menuFistDatas:"",
         // checkList: [],
         addForm: {
         	name:'',
           menusIds: []
         },
         editForm: {
         	name:'',
          menusIdsEdit: []
         },
		rules: {
			name: [
			    {required: true, message: '请输入角色名', trigger: 'blur' }
			 ]
			},
     tableData: [{}]
      }
    },
     created() {
         this.getData();
         this.Menudata();

     },
     methods: {
// 新增处理选择事件
      handleCheck(type, a = 0) { // 多选框
        let self = this;
        if (type == 2) { // 二级菜单点击
          let index = 0;
          self.menu[a].menuList.map(item => {
            if (self.addForm.menusIds.indexOf(item.id) > -1) {
              index += 1;
            }
          })
          if (index > 0) {
            if (self.addForm.menusIds.indexOf(self.menu[a].id) < 0) {
              self.addForm.menusIds.push(self.menu[a].id);
            }
          } else {
            if (self.addForm.menusIds.indexOf(self.menu[a].id) > 0) {
              self.addForm.menusIds.splice(self.addForm.menusIds.indexOf(self.menu[a].id), 1);
            }
          }
        } else {
          if (self.addForm.menusIds.indexOf(self.menu[a].id) > -1) {
            self.menu[a].menuList.map(item => {
              if (self.addForm.menusIds.findIndex((n) => n == item.id) < 0) {
                self.addForm.menusIds.push(item.id)
              }
            })
          } else {
            self.menu[a].menuList.map(item => {
              if (self.addForm.menusIds.findIndex((n) => n == item.id) > -1) {
                self.addForm.menusIds.splice(self.addForm.menusIds.findIndex((n) => n == item.id), 1);
              }
            })
          }
        }
       console.log(self.addForm.menusIds)
      },
      // 编辑处理选择事件
            handleCheckc(type, a = 0) { // 多选框
              let self = this;
              if (type == 2) { // 二级菜单点击
                let index = 0;
                self.menuEdit[a].menuList.map(item => {
                  if (self.editForm.menusIdsEdit.indexOf(item.id) > -1) {
                    index += 1;
                  }
                })
                if (index > 0) {
                  if (self.editForm.menusIdsEdit.indexOf(self.menuEdit[a].id) < 0) {
                    self.editForm.menusIdsEdit.push(self.menuEdit[a].id);
                  }
                } else {
                  if (self.editForm.menusIdsEdit.indexOf(self.menuEdit[a].id) > 0) {
                    self.editForm.menusIdsEdit.splice(self.menusIdsEdit.indexOf(self.menuEdit[a].id), 1);
                  }
                }
              } else {
                if (self.editForm.menusIdsEdit.indexOf(self.menuEdit[a].id) > -1) {
                  self.menuEdit[a].menuList.map(item => {
                    if (self.editForm.menusIdsEdit.findIndex((n) => n == item.id) < 0) {
                      self.editForm.menusIdsEdit.push(item.id)
                    }
                  })
                } else {
                  self.menuEdit[a].menuList.map(item => {
                    if (self.editForm.menusIdsEdit.findIndex((n) => n == item.id) > -1) {
                      self.editForm.menusIdsEdit.splice(self.editForm.menusIdsEdit.findIndex((n) => n == item.id), 1);
                    }
                  })
                }
              }
                console.log(self.editForm.menusIdsEdit)
            },
       //编辑某个菜单
            handleEdit(obj) {
              let self = this;
              self.obj = obj;
              let array = obj.menuIds ? obj.menuIds.split(',') : []
              let arr = [];
              array.map(item => {
                arr.push(parseInt(item));
              })
              this.menusIds = arr;
            },
      	Menudata(){
        let _this=this
         this.$http({
         		method: 'get',
         		url: '/api/selectSecondMenu',
         		params: {}
         	}).then((response) => { //这里使用了ES6的语法
         		console.log(response)
            _this.menu=response.data.data.menuList;
           _this.menuEdit=response.data.data.menuList;

           console.log(_this.menu)
         	}).catch((error) => {
         		console.log(error) //请求失败返回的数据
         	})

      },
      //增加角色
     		submitForm(formName) {
				let _this = this;
				let jsonP = {};
				jsonP.name = _this.addForm.name;
         jsonP.menusId = _this.addForm.menusIds;
         console.log(jsonP.menusId);
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$http({
							method: 'post',
							contentType: 'application/json; charset=UTF-8',
							url: '/api/addRole',
							//data:fd
							data: jsonP
						}).then((response) => {
							//这里使用了ES6的语法
							console.log(response);
							if(response.data.code == 1) {
								alert(response.data.message);
							}

							if(response.data.code == 0) {
								alert(response.data.message);
								this.addFormVisible = false;
								this.getData();
								 _this.$refs[formName].resetFields();//清除表单数据
							}
							console.log(response.data.code)

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
    	let _this = this;
    	_this.editFormVisible = true;
      _this.roleId=row.id;
    	console.log(row.id);
    	this.$http({
    		method: 'get',
    		contentType: 'application/json; charset=UTF-8',
    		url: '/api/selectByIdRole',
    		params: {
    			roleId: row.id
    		}
    	}).then((response) => { //这里使用了ES6的语法
            console.log(response);
            _this.editForm.name=response.data.data.role.name;
            _this.editForm.menusIdsEdit=response.data.data.role.menusId;
       })
    },

        //点击取消
		handleCancel(formName) {
		 this.editFormVisible = false;
		},
		//点击增加弹窗取消
		handleCancels(formName){
			this.addFormVisible = false;
		},
		handleUpdate(formName) {//编辑提交
				  let _this = this;
					let jsonP = {};
					jsonP.name = _this.editForm.name;
				  jsonP.menusId = _this.editForm.menusIdsEdit;
          jsonP.roleId = _this.roleId;
				   console.log(jsonP.menusId);
					this.$refs[formName].validate((valid) => {
						if(valid) {
							this.$http({
								method: 'post',
								contentType: 'application/json; charset=UTF-8',
								url: '/api/addRole',
								//data:fd
								data: jsonP
							}).then((response) => {
								//这里使用了ES6的语法
								console.log(response);
								if(response.data.code == 1) {
									alert(response.data.message);
								}

								if(response.data.code == 0 ) {
								alert(response.data.message);
								  _this.editFormVisible = false;
									_this.getData();
                  location.reload();
									 _this.$refs[formName].resetFields();//清除表单数据
									//_this.$router.replace({ path: '/CustomerList'})
								}
								console.log(response.data.code)

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
    	getData(){
    		console.log(this.value);
    		let _this =this;
    		 this.$http({
                method:'get',
                url:'/api/selectAllRole',
                params:
                {pageindex:_this.currentPage,
                 pagesize:20
                }
            }).then((response) =>{          //这里使用了ES6的语法
                console.log(response)
               _this.tableData = response.data.data.roleList;
               _this.total = response.data.data.pageCount;
               console.log(_this.total);
               _this.currentPage = response.data.data.pageIndex;
               _this.pagesize = response.data.data.pageSize;
                //请求成功返回的数据
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
            })
        },
     //表格删除
		 handleDelete(row) {
		 let _this =this;
     console.log(row);

             this.$confirm('是否删除此角色?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(() => {
               		 this.$http({
                    method:'get',
                    url:'/api/deleteByIdRole',
               		params:
               		{roleId:row.id
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
     handleSizeChange: function (size) {
         this.pagesize = size;
        console.log(this.pagesize)  //每页下拉显示数据
     },
     handleCurrentChange: function(currentPage){
              this.currentPage = currentPage;
             this.getData();
             console.log(this.currentPage)  //点击第几页
     }
    }
  }
</script>

<style>
	.el-table thead{background-color: #d2d6de!important;}
	.el-table th{background-color: #d2d6de!important; color:#000000}
  .el-checkbox__label{padding-left:1px!important ;}
  .el-checkbox{margin-right:16px!important ;}
  input[type="checkbox"]{width:2px!important ; height:2px!important ;}
  .line-check{width:138px;}
  .el-dialog__body {
      padding:10px 10px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
  }
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
