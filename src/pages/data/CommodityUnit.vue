<template>
  <div class="content-wrapper">
    <section class="content-header">
      <ol class="breadcrumb">
        <a href="/"><i class="fa fa-dashboard"></i></a>
        <li><a href="javascript:void(0);">单位</a></li>
        <li class="active">单位列表</li>
      </ol>
      <h1 class="pull-right">
        <router-link to="/AddUnit" class="btn btn-primary btn-sm" icon="el-icon-plus">添加单位</router-link>
      </h1>
    </section>
   <div style="clear: both;"></div>
    <div style="width:99% ; margin:10px auto 5px;"></div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="180">
      </el-table-column>
      <el-table-column prop="unitname" label="单位名称">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)">
            删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <div class="block" align="center" style="margin-top:20px ; background:#fff ; padding-bottom:20px ;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-size="pagesize" v-if="paginationShow" layout=" prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pagesize: 20,
        total: 0,
        currentPage: 1,
        paginationShow: true,
        tableData: [{}]
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        let _this = this;
        this.$http({
          method: 'get',
          url: '/api/GoodsUnit/GetGoodsUnitList',
          params: {
            pageindex: _this.currentPage,
            pagesize: 20
          }
        }).then((response) => { //这里使用了ES6的语法
          console.log(response)
          if(response.data.data.pagecount==0){
              _this.paginationShow=false;
          }else{
         _this.tableData = response.data.data.goodsUnit;
         _this.total = response.data.data.pagecount;
          console.log(this.total);
         _this.pagesize = response.data.data.pagesize;
         }
          //请求成功返回的数据
        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })
      },
      //表格删除
      handleDelete(row) {
        let _this = this;
        console.log(row);
         this.$confirm('确认删除?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$http({
                    method: 'get',
                    url: '/api/GoodsUnit/Delete',
                    params: {
                      id: row.id
                    }
                  }).then((response) => { //这里使用了ES6的语法
                    console.log(response)
                    if (response.data.code == 1) {
                     this.$message({
                       type: 'info',
                       message: response.data.message
                     });
                    }
                    if (response.data.code == 0) {
                      this.$message({
                        type: 'info',
                        message: response.data.message
                      });
                      this.getData();
                      this.tableData.splice(row, 1);
                    }

                  }).catch((error) => {
                    console.log(error) //请求失败返回的数据
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

<style scoped>
  .el-table thead {
    background-color: #d2d6de !important;
  }

  .el-table th {
    background-color: #d2d6de !important;
    color: #000000
  }
</style>
