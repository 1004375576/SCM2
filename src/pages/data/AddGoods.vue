<template>
  <div class="content-wrapper">
    <section class="content-header">
      <ol class="breadcrumb" style="display: block; float: none;">
        <a href="/"><i class="fa fa-dashboard"></i></a>
        <li><a href="javascript:void(0);">数据</a></li>
        <li><a href="javascript:void(0);">商品</a></li>
        <li class="active">添加商品</li>
      </ol>
      <h1 class="pull-right">
        <router-link to="/GoodsList" class="btn btn-primary btn-sm" icon="el-icon-back">返回商品列表</router-link>
      </h1>
    </section>
    <div class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">添加商品</h3>
        </div>
        <div class="box-body">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" size="small" class="demo-ruleForm demo-dynamic">
            <el-row :gutter="10">
              <el-col :xs="18" :sm="12" :md="8">
                <el-form-item label="商品名称" prop="goods_name">
                  <el-input v-model="ruleForm.goods_name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">保存商品</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          goods_name: ''
        },
        rules: {
          goods_name: [{
              required: true,
              message: '请输入商品名称',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 50,
              message: '长度在 2 到 50个字符',
              trigger: 'blur'
            }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        let _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http({
              method: 'post',
              url: '/api/Goods/Insert',
              data: {
                goods_name: _this.ruleForm.goods_name
              }
            }).then((response) => {
              //这里使用了ES6的语法
              if (response.data.code == 1) {
                alert(response.data.message);
              }
              if (response.data.code == 0) {
                alert(response.data.message);
                _this.$router.replace({
                  path: '/GoodsList'
                })
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
      }

    }
  }
</script>
<style scoped>
  .el-form-item--small .el-form-item__content,
  .el-form-item--small .el-form-item__label {
    line-height: 28px;
  }

  .el-input__inner {
    border-radius: 0;
  }
</style>
