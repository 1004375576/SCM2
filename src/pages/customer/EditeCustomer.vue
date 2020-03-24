<template>
	<div class="content-wrapper">
		<section class="content-header">
			<ol class="breadcrumb" style="display: block; float: none;">
				<a href="/"><i class="fa fa-dashboard"></i></a>
				<li>
					<a href="javascript:;">客户</a>
				</li>
				<li class="active">编辑客户</li>
			</ol>
			<h1 class="pull-right">
                <router-link to="/CustomerList"  class="btn btn-primary btn-sm" icon="el-icon-back">返回客户列表</router-link>
            </h1>
		</section>
		<div class="content">
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title">编辑客户</h3>
				</div>
				<div class="box-body">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" size="small" class="demo-ruleForm demo-dynamic">
						<h4 id="dui-qi-fang-shi" style="color:#03B8CC ; font-size:15px ;border-bottom:1px solid #03B8CC; padding-bottom:10px ; margin-bottom:8px ;">公司信息</h4>
						<el-row :gutter="10">
						  <el-col :xs="22" :sm="16" :md="8">
								<el-form-item label="法人" prop="legalperson">
									<el-input v-model="ruleForm.legalperson"></el-input>
								</el-form-item>
							</el-col>
							  <el-col :xs="22" :sm="16" :md="8">
								<el-form-item label="身份证" prop="idcard">
									<el-input v-model="ruleForm.idcard"></el-input>
								</el-form-item>
							</el-col>
						  <el-col :xs="22" :sm="16" :md="8">
								<el-form-item label="公司名称" prop="companyname">
									<el-input v-model="ruleForm.companyname"></el-input>
								</el-form-item>
							</el-col>

						</el-row>
						<el-row :gutter="10">
						  <el-col :xs="22" :sm="16" :md="8" style="position: relative;">
								<el-form-item label="选择分组" required>
									<el-input v-model="ruleForm.grupname" class="app-download" readonly="readonly" placeholder="请选择分组" @focus="handlerPageNo" autocomplete="off"></el-input>
									<div style="position: absolute; top:42px; background:#fff ;z-index:999;width:100%;">
										<el-tree ref="SlotMenuList" class="expand-tree" style="border:1px solid #005983;" v-if="treefalse" empty-text="暂无数据" @node-click="handleNodeClicks" node-key="id" highlight-current :data="setTree" :props="defaultProps" :expand-on-click-node="false">
										</el-tree>
									</div>
								</el-form-item>
							</el-col>
							 <el-col :xs="22" :sm="16" :md="8">
								<el-form-item label="详细地址" prop="companyaddress">
									<el-input v-model="ruleForm.companyaddress"></el-input>
								</el-form-item>
							</el-col>
							 <el-col :xs="22" :sm="16" :md="8">
								<el-form-item prop="userid">
									<el-input v-model="ruleForm.userid" type="hidden"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="10">
						  <el-col :xs="22" :sm="16" :md="8">
			          	    	<el-form-item label="上传营业执照" >
						      <el-upload
								  class="avatar-uploader"
								  ref="upload"
								  action="/api/FileUpload/FileUp/"
								  :show-file-list="false"
								  :on-success="handleAvatarSuccess"
								  :before-upload="beforeAvatarUpload">
								 <img v-if="bizlicneseurl" :src="bizlicneseurl" class="avatar">
								  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								</el-form-item>
								</el-col>
						</el-row>
						<h4 id="dui-qi-fang-shi" style="color:#03B8CC ; font-size:15px ;border-bottom:1px solid #03B8CC; padding-bottom:10px ; margin-bottom:8px ;">个人信息</h4>
					<el-row :gutter="10">
					  <el-col :xs="22" :sm="16" :md="8">
								<el-form-item label="联系人" prop="name">
									<el-input v-model="ruleForm.name"></el-input>
								</el-form-item>
							</el-col>
							<!--<el-col :span="8"><el-form-item label="手机" prop="mobiletel">
					    <el-input v-model="ruleForm.mobiletel"></el-input>
					 </el-form-item></el-col>-->

						</el-row>

						<h4 id="dui-qi-fang-shi" style="color:#03B8CC ; font-size:15px ;border-bottom:1px solid #03B8CC; padding-bottom:10px ; margin-bottom:8px ;">
					账号信息  </h4>
						<el-row :gutter="10">
						  <el-col :xs="22" :sm="16" :md="8">
								<el-form-item label="账号" prop="mobiletel">
									<el-input v-model="ruleForm.mobiletel"></el-input>
								</el-form-item>
							</el-col>
						</el-row>


						<el-form-item>
							<el-button type="primary" @click="submitForm('ruleForm')">保存客户信息</el-button>

						</el-form-item>
					</el-form>
				</div>
			</div>

		</div>
	</div>
</template>
<script>
	let maxexpandId = 95;
	export default {
		name: 'slot-tree',
		data() {
			return {
				param:"",//表单要提交的参数
				treefalse: false,
				maxexpandId: maxexpandId, //新增节点开始id
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
				}, //以上是分组需要的数据
				provinceValue: '',
				cityValue: '',
				areaValue: '',
				provinceData: [],
				cityData: [],
				areaData: [],
				id: this.$route.query.userid,
				salesid:"",//分组id
				bizlicneseurl:'',
				ruleForm: {
					name: '',
					legalperson: '',
					companyname: '',
					mobiletel: '',

					companyaddress: '',
					userid: '',
					idcard: '',
					grupname: '',
					grupid: '',



				},
				rules: {
					name: [{
						required: true,
						message: '请输入客户名称',
						trigger: 'blur'
					}],
					legalperson: [{
						required: true,
						message: '请输入客户联系人',
						trigger: 'blur'
					}],
					mobiletel: [{
							required: true,
							message: '请输入手机号',
							trigger: 'change'
						},
						{
							min: 11,
							max: 11,
							message: '手机号码是11位数字',
							trigger: 'blur'
						}
					],
					CompanyName: [{
						required: true,
						message: '请输入公司名称',
						trigger: 'blur'
					}],
					password: [{
							required: true,
							required: true,
							message: '请输入密码',
							trigger: 'change'
						},
						{
							min: 6,
							max: 15,
							message: '请输入6位到15位的字符',
							trigger: 'blur'
						}
					]

				}
			};
		},
    mounted() {//点击空白处分组弹窗关闭
      var btn = document.querySelector(".app-download");
      const that = this
      if (btn) {
        document.addEventListener('click', function(e) {
          if (!btn.contains(e.target)) {
            that.treefalse = false;
          }

        })
      }
    },
		created() {
			this.showData();
			this.getTree();
		},
		methods: {
			handlerPageNo() { //分组显示隐藏
				this.treefalse = true;

			},
			handleNodeClicks(data) {
				console.log(data);
				this.ruleForm.grupname = data.name;
                this.ruleForm.grupid = data.id;
				this.treefalse = false;
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
						if(response.data.data.companyGroupList.parentid == 0) {

							_this.flagss = false;

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

			showData() {
				let _this = this
				this.$http({
					method: 'get',
					url: '/api/Customer/GetCustomerInfo',
					dataType: "json",
					params: {
					   id: _this.id
					}
				}).then((response) => { //这里使用了ES6的语法
					// console.log(response)
					console.log(response.data.data.CustomerInfo);
//					_this.ruleForm = response.data.data.CustomerInfo;
					_this.bizlicneseurl=response.data.data.CustomerInfo.bizlicneseurlshow;
					_this.ruleForm.name=response.data.data.CustomerInfo.name;
					_this.ruleForm.legalperson=response.data.data.CustomerInfo.legalperson;
					_this.ruleForm.mobiletel=response.data.data.CustomerInfo.mobiletel;
					_this.ruleForm.password=response.data.data.CustomerInfo.password;
					_this.ruleForm.companyname=response.data.data.CustomerInfo.companyname;
					_this.ruleForm.companyaddress=response.data.data.CustomerInfo.companyaddress;
					_this.ruleForm.idcard=response.data.data.CustomerInfo.idcard;
					_this.ruleForm.grupid=response.data.data.CustomerInfo.salesid;
					console.log(_this.salesid);
					let jsonPs = {};

				jsonPs.companyGroupId = _this.ruleForm.grupid;
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
						_this.ruleForm.grupname = response.data.data.companyGroup.name;



					}

				}).catch((error) => {
					console.log(error) //请求失败返回的数据
				})


				}).catch((error) => {
					console.log(error) //请求失败返回的数据
				})

			},
			handleAvatarSuccess(res, file) {
				console.log(res.Data)
			   this.param=res.Data;
         this.bizlicneseurl = URL.createObjectURL(file.raw);
            },
             beforeAvatarUpload(file) {
             	 console.log(file);

            /* 	  //重新写一个表单上传的方法
                this.param = new FormData();
                this.param.append('file', file);*/

                //return false;
	        // const isJPG = file.type === 'image/jpeg';
	         const isLt2M = file.size / 1024 / 1024 < 2;

//	        if (!isJPG) {
//	          this.$message.error('上传头像图片只能是 JPG 格式!');
//	        }
	        if (!isLt2M) {
	          this.$message.error('上传头像图片大小不能超过 2MB!');
	        }
	        return isLt2M;
          },
			submitForm(formName) {
				let _this = this
				let name = _this.ruleForm.name
				let legalperson = _this.ruleForm.legalperson
				let mobiletel = _this.ruleForm.mobiletel
				let companyaddress = _this.ruleForm.companyaddress
				let companyname = _this.ruleForm.companyname;
				let userid = _this.id
				let idcard = _this.ruleForm.idcard
				let salesid = _this.ruleForm.grupid
        let bizlicneseurl=_this.param;
				var params = {
					"bizlicneseurl":bizlicneseurl,
					"salesid": salesid,
					"name": name,
					"idcard": idcard,
					"userid": userid,
					"companyname": companyname,
					"legalperson": legalperson,
					"mobiletel": mobiletel,
					"companyaddress": companyaddress
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$http({
							method: 'post',
							url: '/api/Customer/UpdateCustomer',
							data: params
						}).then((response) => {
							//这里使用了ES6的语法
							if(response.data.code == 1) {
								alert(response.data.message);
							}
							if(response.data.code == 0) {
								alert(response.data.message);
								_this.$router.replace({ path: '/CustomerList'})
							}

						}).catch((error) => {
							// console.log(error) //请求失败返回的数据
             // console.log(error.response) //请求失败返回的数据
              if(error.response.data.message == '403'){//没有权限
                alert("没有权限");
              }
              // if (error.response.status == 401) {
              //     alert("没有权限");
              //  }
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
<style>
	body {
		font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	}

	.el-form-item--small .el-form-item__content,
	.el-form-item--small .el-form-item__label {
		line-height: 28px;
	}

	.el-input__inner {
		border-radius: 0;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		width: 100px;
		height: 100px;
		line-height: 100px;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
	}

	.avatar {
		width: 100px;
		height: 100px;
		display: block;
	}
</style>
