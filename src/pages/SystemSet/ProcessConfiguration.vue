<template>
  <div class="content-wrapper">
    <section class="content-header">
      <ol class="breadcrumb">
        <a href="/"><i class="fa fa-dashboard"></i></a>
        <li>
          <a href="javascript:;">系统设置</a>
        </li>
        <li class="active">流程节点管理</li>
      </ol>
      <!-- <h1 class="pull-right">
            	<el-button type="primary" size="small" @click="addFormVisible = true">添加用户</el-button>
            </h1> -->
    </section>
    <div style="clear: both;"></div>
    <!-- 	<el-form :inline="true" :model="formInline" style="width:300px; margin:0 auto;"  class="demo-form-inline" size="small">
			<el-form-item label="" >
				<el-input v-model="formInline.userName" placeholder="请输入输入用户名" ></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" size="small" style="vertical-align: middle;" @click="Search()">查询</el-button>
			</el-form-item>
		</el-form> -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号">
      </el-table-column>

      <el-table-column prop="flowNodename" label="步骤名称">
      </el-table-column>
     <!-- <el-table-column prop="flowNodename" label="步骤名称">
      </el-table-column> -->
      <el-table-column prop="flowNodeindex" label="流程序列">
      </el-table-column>
     <!-- <el-table-column prop="flowNodename" label="审核角色">
      </el-table-column> -->
      <el-table-column prop="remarks" label="步骤备注">
      </el-table-column>
      <el-table-column prop="updatetime" label="更新时间">
      </el-table-column>

      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click.native="handleEdit($index, row)">
            编辑</el-button>

        </template>
      </el-table-column>
    </el-table>
    <div>
      <div class="block" align="center" style="margin-top:20px ; background:#fff ; padding-bottom:20px ;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          v-if="paginationShow" :page-size="pagesize" layout=" prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        paginationShow: true,
        pagesize: 20,
        total: 0,
        currentPage: 1,
        FlowSetList: "", //流程列表数
        tableData: [{
          isvalid:''
        }]

      }
    },
    created() {
      this.getdataLc()
    },
    methods: {

      getdataLc() { //获取流程设置表格数据
        let _this = this
        this.$http({
          method: 'get',
          url: '/api/GetFlowNodesList',
          params: {}
        }).then((response) => { //这里使用了ES6的语法
          console.log(response)
          if (response.data.code == 1) {

          }
          if (response.data.code != 1) {

            _this.tableData = response.data.data.FlowSetList;


            console.log(_this.tableData);
          }

        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })
      }

    }
  }
</script>

<style>
  .el-table thead {
    background-color: #d2d6de !important;
  }

  .el-table th {
    background-color: #d2d6de !important;
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
  .el-switch__label--left{
    position: relative;
    left: 46px;
    color: #fff;
    z-index: -1111;
  }
  .el-switch__label--right{
    position: relative;
    right: 46px;
    color: #fff;
    z-index: -1111;
  }
  .el-switch__label.is-active{
    z-index: 1111;
    color: #fff;
  }
.el-switch__label--left{
  position: relative;
  left: 58px;
  color: #fff;
  z-index: -1111;
}
.el-switch__label--right{
  position: relative;
  right: 58px;
  color: #fff;
  z-index: -1111;
}
.el-switch__label--right.is-active{
  z-index: 1111;
  color: #fff !important;
}
.el-switch__label--left.is-active{
  z-index: 1111;
  color: #000 !important;
}

</style>
