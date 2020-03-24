<template>
  <div class="content-wrapper">
    <section class="content-header">
      <ol class="breadcrumb" style="display: block; float: none;">
        <a href="/"><i class="fa fa-dashboard"></i></a>
        <li><a href="">客户</a></li>
        <li class="active">增加客户</li>
      </ol>
      <h1 class="pull-right">
        <router-link to="/CustomerList" class="btn btn-primary btn-sm" icon="el-icon-back">返回客户列表</router-link>
      </h1>
    </section>
    <div class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">增加客户</h3>
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
                <el-form-item label="公司名称" prop="CompanyName">
                  <el-input v-model="ruleForm.CompanyName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="22" :sm="16" :md="8" style="position: relative;">
                <el-form-item label="选择分组" required>
                  <el-input v-model="ruleForm.grupname" class="app-download" readonly="readonly" placeholder="请选择分组" @focus="handlerPageNo"
                    autocomplete="off"></el-input>
                  <div style="position: absolute; top:42px; background:#fff ;z-index:999;width:100%;">
                    <el-tree ref="SlotMenuList" class="expand-tree" style="border:1px solid #005983;" v-if="treefalse"
                      empty-text="暂无数据" @node-click="handleNodeClicks" node-key="id" highlight-current :data="setTree"
                      :props="defaultProps" :expand-on-click-node="false">
                    </el-tree>
                  </div>
                </el-form-item>
              </el-col>
             <el-col :xs="22" :sm="16" :md="8">
                <el-form-item label="详细地址" prop="companyaddress">
                  <el-input v-model="ruleForm.companyaddress"></el-input>
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
            </el-row>

            <el-row :gutter="10">
              <el-col :xs="22" :sm="16" :md="8">
                <el-form-item label="上传营业执照" prop="bizlicneseurl">
                  <el-upload accept="image/jpeg,image/jpg,image/png/pdf" v-model="bizlicneseurl" class="avatar-uploader"
                    ref="upload" action="/api/FileUpload/FileUp/" :show-file-list="false" :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="bizlicneseurl" :src="bizlicneseurl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>

            <h4 id="dui-qi-fang-shi" style="color:#03B8CC ; font-size:15px ;border-bottom:1px solid #03B8CC; padding-bottom:10px ; margin-bottom:8px ;">
              账号信息 </h4>
            <el-row :gutter="10">
             <el-col :xs="22" :sm="16" :md="8">
                <el-form-item label="账号" prop="mobiletel">
                  <el-input v-model="ruleForm.mobiletel" placeholder="请输入手机号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" id="btnc"  @click="submitForm('ruleForm')">保存客户信息</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import api from '@/assets/api'
  export default {
    name: 'slot-tree',
    data() {
      return {
        param: "", //表单要提交的参数
        bizlicneseurl: '',
        provinceValue: '',
        cityValue: '',
        areaValue: '',
        provinceData: [],
        cityData: [],
        areaData: [],

        ruleForm: {
          name: '',
          legalperson: '',
          CompanyName: '',
          mobiletel: '',
          password: '',
          companyaddress: '',
          idcard: '',
          grupname: '',
          grupid: ''

        },
        treefalse: false,
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
          ],
          file: [{
            required: true,
            message: '请上传图片'
          }]


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
          if (response.data.code == 1) {
             alert(response.data.message);
          }
          if (response.data.code != 1) {
            _this.setTree = response.data.data.companyGroupList;
            if (response.data.data.companyGroupList.parentid == 0) {
              _this.flagss = false;

            };
            _this.setTree.forEach((item, index) => {
              if (!item.isEdit) {
                _this.$set(item, 'isEdit', false);
              }
            })
            console.log(_this.setTree);
          }

        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })
      },
      handleAvatarSuccess(res, file) {
        console.log(res)
        console.log(res.Data)
        this.param = res.Data;
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
        let _this = this;
        let jsonP = {};
        jsonP.name = this.ruleForm.name;
        jsonP.idcard = this.ruleForm.idcard;
        jsonP.companyname = this.ruleForm.CompanyName;
        jsonP.legalperson = this.ruleForm.legalperson;
        jsonP.mobiletel = this.ruleForm.mobiletel;
        jsonP.companyaddress = this.ruleForm.companyaddress;
        jsonP.salesid = this.ruleForm.grupid.toString();
        jsonP.bizlicneseurl = this.param;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http({
              method: 'post',
              contentType: 'application/json; charset=UTF-8',
              url: '/api/Customer/InsertCustomer',
              data: jsonP
            }).then((response) => {
              //这里使用了ES6的语法
              if (response.data.code == 1) {
                alert(response.data.message);
              }
              if (response.data.code == 0) {
                alert(response.data.message);
                _this.$router.replace({
                  path: '/CustomerList'
                })
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
