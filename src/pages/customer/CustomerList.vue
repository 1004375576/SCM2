<template>
  <div class="content-wrapper">
    <section class="content-header">
      <ol class="breadcrumb">
        <a href="/home"><i class="fa fa-dashboard"></i></a>
        <li><a href="">客户</a></li>
        <li class="active">客户列表</li>
      </ol>
      <h1 class="pull-right">
        <router-link to="/AddCustomer" class="btn btn-primary btn-sm" icon="el-icon-plus">添加客户</router-link>
      </h1>
    </section>
    <div style="clear: both;"></div>
    <div style="width:99% ; margin:10px auto 5px;"></div>
    <div style="width:100% ;">
      <el-form :inline="true" :model="formInline" style="margin-left:10px ;" ref="formInline" class="demo-form-inline pa-form"
        size="small">
        <!-- <el-form-item  >
			     <el-input v-model="formInline.saleid" placeholder="请输入分组"></el-input>
			   </el-form-item> -->
        <el-form-item>
          <el-input v-model="formInline.name" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.MobileTel" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.CompanyName" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="选择分组">
          <el-input v-model="formInline.groupName" class="app-download" readonly="readonly" placeholder="请选择分组" @focus="handlerPageNo"
            autocomplete="off"></el-input>
          <div style="position: absolute; top:40px; background:#fff ;z-index:999;width:100%;" @click="closeMsg(this)">
            <el-tree ref="SlotMenuList" class="expand-tree" v-if="treefalse" style="border:1px solid #005983;"
              empty-text="暂无数据" @node-click="handleNodeClicks" node-key="id" highlight-current :data="setTree" :props="defaultProps"
              :expand-on-click-node="false">
            </el-tree>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="Search()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" style="width: 100%" empty-text="暂无数据">
      <el-table-column prop="userid" label="客户ID" width="120">
      </el-table-column>
      <el-table-column prop="companyname" label="公司名称" width="180">
      </el-table-column>
      <el-table-column prop="name" label="联系人" width="130">
      </el-table-column>
      <el-table-column prop="mobiletel" label="电话" width="180">
      </el-table-column>
      <el-table-column prop="salename" label="所属分组" width="120">
      </el-table-column>
      <el-table-column prop="createtime" label="创建时间" width="180">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <router-link :to="`/EditeCustomer?userid=${scope.row.userid}&mobiletel=${scope.row.mobiletel}`" class="btn btn-primary btn-sm"
            icon="el-icon-edit">编辑</router-link>
          <router-link :to="`/CustomerDetail?userid=${scope.row.userid}`" class="btn btn-primary btn-sm" icon="el-icon-edit">查看</router-link>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
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
  import api from '@/assets/api'
  export default {
    name: 'slot-tree',
    data() {
      return {
        treefalse: false,
        maxexpandId: api.maxexpandId, //新增节点开始id
        non_maxexpandId: 95, //新增节点开始id(不更改)
        isLoadingTree: true, //是否加载节点树
        setTree: "", //节点树数据
        iconSize: 'mini',
        defaultProps: {
          children: 'companyGroupList',
          label: 'name',
          parent: 'parentid', // 父级唯一标识
          value: 'id', // 唯一标识
        },
        paginationShow: true,
        pagesize: 20,
        total: 0,
        currentPage: 1,
        formInline: {
          saleid: '',
          name: '',
          CompanyName: '',
          AuditStatus: 0,
          MobileTel: '',
          groupName: '',

        },
        tableData: [{}],
        options: [{
          value: '0',
          label: '0'
        }],
        value: 0

      }
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
      this.getData();
    },
    methods: {
      handlerPageNo() { //分组显示隐藏
        this.treefalse = true
      },
      handleNodeClicks(data) {
        console.log(data);
        this.treefalse = false;
        this.formInline.groupName = data.name;
        this.formInline.saleid = data.id
      },
      getTree() { //获取树的数据
        let _this = this
        this.$http({
          method: 'get',
          url: '/api/selectByIdAllCompanyGroup',
          params: {}
        }).then((response) => { //这里使用了ES6的语法
          console.log(response)
          if (response.data.code == 1) {

          }
          if (response.data.code != 1) {
            _this.setTree = response.data.data.companyGroupList;
            _this.formInline.saleid =response.data.data.companyGroupList[0].id;
            _this.formInline.groupName =response.data.data.companyGroupList[0].name;
            console.log( _this.formInline.saleid);
          }

        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })
      },

      getData() {
         let _this = this;
        this.$http({
          method: 'get',
          url: '/api/Customer/GetCustomerList',
          params: {
            pageindex: _this.currentPage,
            pagesize: 20,
            saleid: _this.formInline.saleid,
            name: _this.formInline.name,
            CompanyName: _this.formInline.CompanyName,
            AuditStatus: '',
            MobileTel: _this.formInline.MobileTel

          }
        }).then((response) => { //这里使用了ES6的语法
          console.log(response)
          if (response.data.data.pagecount == 0) {
             _this.tableData=="";
             
          }
          if (response.data.data.pagecount !=0) {
            _this.tableData = response.data.data.CustomerList;
            _this.total = response.data.data.pagecount;
            console.log(_this.total);
            _this.pagesize = response.data.data.pagesize;
          }


          //请求成功返回的数据
        }).catch((error) => {
          console.log(error) //请求失败返回的数据
          console.log(error.response);

        })
      },
      //查询
      Search() {
        //将查询的value传回
        let _this = this;
        _this.currentPage = 1;
        this.$http({
          method: 'get',
          url: '/api/Customer/GetCustomerList',
          params: {
            pageindex: _this.currentPage,
            pagesize: 20,
            saleid: _this.formInline.saleid,
            name: _this.formInline.name,
            CompanyName: _this.formInline.CompanyName,
            AuditStatus: '',
            MobileTel: _this.formInline.MobileTel
          }
        }).then((response) => {
          if (response.data.data.pagecount == 0) {
            console.log(response.data.data.pagecount == 0);
            this.tableData = "";
            this.paginationShow = false;

          } else {
            this.paginationShow = true;
            console.log(response)
            this.tableData = response.data.data.CustomerList;

            this.total = response.data.data.pagecount;
            console.log(this.total);
            this.currentPage = response.data.data.pageindex;

          }

          //this.page-size = response.data.data.pagesize;
          //请求成功返回的数据
        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })
        //      this.$emit("Search",this.tableData.search);
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
                    url: '/api/Customer/DeleteCustomer',
                    params: {
                      userid: row.userid
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
                    if(error.response.data.message == '403'){//没有权限
                      alert("没有权限");
                    }
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

<style scoped>
  .el-table thead {
    background-color: #d2d6de !important;
  }

  .el-table th {
    background-color: #d2d6de !important;
    color: #000000
  }
</style>
