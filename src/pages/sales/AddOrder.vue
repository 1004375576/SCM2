<template>
  <div class="content-wrapper">
    <section class="content-header">
      <ol class="breadcrumb" style="display: block; float: none;">
        <a href="/"><i class="fa fa-dashboard"></i></a>
        <li>
          <a href="javascript:void(0);">销售</a>
        </li>
        <li>
          <a href="javascript:void(0);">销售订单</a>
        </li>
        <li class="active">新增订单</li>
      </ol>
      <h1 class="pull-right">
        <router-link to="/SalesOrders" class="btn btn-primary btn-sm" icon="el-icon-back">返回商品列表</router-link>
      </h1>
    </section>
    <div class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
           <h3 class="box-title">新增订单</h3>
        </div>
        <div class="box-body">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" size="small" class="demo-ruleForm demo-dynamic">
            <el-row :gutter="10">
              <el-col :xs="22" :sm="16" :md="8"  style="position: relative;">
                <el-form-item label="客户" required>
                  <el-input v-model="ruleForm.name" readonly="readonly" placeholder="请选择客户"></el-input>
                </el-form-item>
                <el-button type="text" style="position:absolute ;top: -5px;right: 20px;" @click="centerDialogVisible = true"><i
                    class="el-icon-more"></i></el-button>
              </el-col>
              <el-col :span="5" style="position: relative;">
                <el-form-item>
                  <el-input v-model="ruleForm.userid" type="hidden"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-dialog title="选择客户" :visible.sync="centerDialogVisible" customClass="customWidth">
              <el-form :inline="true" :model="formInline" ref="formInline" style="margin-left:20% ;" size="small" class="demo-form-inline">
                <el-form-item>
                  <el-input v-model="formInline.MobileTel" placeholder="请输入收货人手机号"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="serchCustomer()">查询</el-button>
                </el-form-item>
              </el-form>
              <!--选择客户弹窗-->
              <el-table :data="Customertable" size="mini" height="300" width="80%" customClass="customWidth">
                @row-click="showRow" @current-change="handleCurrentChange" highlight-current-row>
                <el-table-column label="选择" width="50">
                  <template slot-scope="scope">
                    <el-radio v-model="radio1" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
                  </template>
                </el-table-column>
                <el-table-column prop="userid" label="用户ID" width="60"></el-table-column>
                <el-table-column prop="name" label="联系人" width="80">
                </el-table-column>
                <el-table-column prop="mobiletel" label="联系电话" width="100">
                </el-table-column>
                <el-table-column prop="companyname" label="公司名称">
                </el-table-column>
                <el-table-column prop="companyaddress" label="详细地址">
                </el-table-column>
              </el-table>
              <div class="block" align="center" style="margin-top:20px ; background:#fff ; padding-bottom:20px ;">
                <!--选择客户分页-->
                <el-pagination v-if="paginationShow1" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                  :current-page="currentPage" :page-size="pagesize" layout=" prev, pager, next, jumper" :total="total">
                </el-pagination>
              </div>
              <div style="margin-top:10px ;"> <span slot="footer" class="dialog-footer">
                  <el-button @click="centerDialogVisible = false" size="small">取 消</el-button>
                  <el-button type="primary" size="small" @click="centerDialogVisible = false">确 定</el-button>
                </span></div>

            </el-dialog>

            </el-form-item>
           <el-row :gutter="10" style="margin-left:10px;">
              <div>
                <el-form ref="form"  label-width="120px" size="mini">
                     <el-form-item label="商品选择" required="">
                       <el-button type="text" @click="openCommodityList()">选择商品信息</el-button>
                      </el-form-item>
                 </el-form>
              </div>
            </el-row>
     <div><h4 style="color:#0099FF;font-size:16px ; line-height:26px ; padding-left:6px ;">已选择商品信息<span style="color:red;font-size:12px ;">(商品信息至少有一条)</span></h4></div>
           <el-row :gutter="10">
              <el-table :data="tableNddata" border  style="width: 100%">
                <el-table-column label="ID" type="index">
                </el-table-column>
                <el-table-column width="140">
                 <template slot-scope="scope">
                  <!--  <el-button class="el-icon-plus" size="mini" @click="addRow">

                    </el-button> -->
                    <el-button class="el-icon-minus" size="mini" v-show="!(tableNddata.length == 1)" @click="deletRow(scope.$index)">

                    </el-button>
                  </template>

                </el-table-column>
                <!--<el-table-column label="规格id">
								<el-button type="text" @click="openCommodityList()"><i class="el-icon-more"></i></el-button>
								</el-table-column>
								-->
                <el-table-column width="200" prop="goods_name" label="商品名称">
                  <template slot-scope="scope">
                    <div>{{ scope.row.goods_name}}</div>
                  </template>


                 <!-- <template slot-scope="scope">
                    <el-row :gutter="20">
                      <el-col :span="18">
                        <el-input type="text" style="border:0;" @focus="openCommodityList()" class="choosen" v-model="scope.row.goods_name"
                          size="small" placeholder="请选择商品"></el-input>
                      </el-col>
                      <el-col :span="5">
                        <el-button type="button" @click="openCommodityList()" size="small"><i class="el-icon-more"></i></el-button>
                      </el-col>
                    </el-row>
                  </template> -->
                </el-table-column>
                <el-table-column label="商品规格">
                  <template slot-scope="scope">
                    <div>{{scope.row.sku_value}}</div>
                  </template>
                </el-table-column>

                <el-table-column prop="unit" label="单位">

                </el-table-column>
                <el-table-column prop="number" label="数量" sortable width="160">
                <!--  <template slot-scope="scope">
                    <div>{{scope.row.number}}</div>
                  </template> -->
                 <template slot-scope="scope">

                    <div class="div_number">
                      <el-input-number :min="0.000001" size="mini" @change="handleDataChange($event,scope.row)" v-model="scope.row.number"></el-input-number>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="price" label="单价">

                </el-table-column>

               <!-- <el-table-column prop="totalordermoney" sortable label="小计">
                  <template slot-scope="scope">
                    <div>{{scope.row.price*scope.row.number}}</div>

                  </template>
                </el-table-column> -->

              </el-table>

            </el-row>
            <el-row :gutter="20" style="margin-top:15px ;">
              <el-col :span="24" small>
                <span class="pull-right">应付金额：<em style="color:#0060BF;font-style: normal;">{{totalPrice}}</em>元</span>
              </el-col>
            </el-row>
            </el-form-item>

            <el-row :gutter="10">
              <el-col :xs="22" :sm="16" :md="8" small>
                <el-form-item label="交货时间" size="samll">

                  <el-date-picker style="width: 100%;" v-model="ruleForm.readytime" type="datetime" size="samll"
                    placeholder="选择交货时间" value-format="yyyy-MM-dd HH:mm:ss">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="22" :sm="22" :md="14">
                <el-form-item label="收货信息" required="required">
                  <el-button type="text" @click=openAddressData();>选择收货信息 <i class="el-icon-edit"></i></el-button>
                  收货人：{{recipientname}} &nbsp; &nbsp;联系电话：{{recipientmobile}} &nbsp; &nbsp; 收货地址：{{provinceName}}{{cityName}}{{catonName}}{{daddress}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
            <el-col :xs="22" :sm="16" :md="16">
                <el-form-item label="上传合同">
              <el-upload
                class="upload-demo"
                action="/api/FileUpload/FilePdf/"
                 :on-change="handleChange" ref="upload"
                 :multiple="false"
                :limit="1"
                  :on-exceed="handleExceed"
                 accept=".pdf,.PDF"
                 :file="file">
                <el-button size="small" type="primary" @click="clearUploadedImage">点击上传</el-button>
               <span slot="tip" class="el-upload__tip">只能上传pdf文件</span>
              </el-upload>
                  </el-form-item>
               </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="22" :sm="16" :md="16">
                <el-form-item label="备注说明">
                  <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item>
              <el-button type="success" @click="onSubmit()">保存</el-button>
              <el-button>取消</el-button>
            </el-form-item>

          </el-form>
        </div>
      </div>

    </div>
    <!--常用收货地址信息-->
    <el-dialog title="常用收货地址信息" :visible.sync="dialogForm23Visible" customClass="customWidth">
      <el-button type="text" @click=openAddAddress();>增加收货地址</el-button>
      <el-form :model="form23" :rules="rules"  :inline="true" ref="form23"  size="small" class="demo-ruleForm">
        <el-form-item  prop="name">
          <el-input v-model="form23.name" placeholder="请输入收货人姓名"></el-input>
        </el-form-item>
        <el-form-item prop="mobiletel">
          <el-input v-model="form23.mobiletel" placeholder="请输入收货人手机号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addressSearch();">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="AddressTable" size="mini" height="300" @row-click="showRowc" @current-change="handleCurrentChangec"
        highlight-current-row>
        <el-table-column label="选择" width="50">
          <template slot-scope="scope" >
            <el-radio v-model="radio2" :label="scope.$index" >&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="联系人" width="80">
        </el-table-column>
        <el-table-column prop="mobiletel" label="联系电话" width="100">
        </el-table-column>
        <el-table-column prop="province" label="地址">
          <template slot-scope="scope">
            <span>{{scope.row.province}}</span>
            <span>{{scope.row.city}}</span>
            <span>{{scope.row.caton}}</span>
            <span>{{scope.row.address}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="EditeAddress(scope.row.id)">修改</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handlesDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:10px ;"> <span slot="footer" class="dialog-footer">
          <el-button @click="dialogForm23Visible = false" size="small">取 消</el-button>
          <el-button type="primary" size="small" @click="dialogForm23Visible = false">确 定</el-button>
        </span>
      </div>
    </el-dialog>

    <!--增加收货地址-->
    <el-dialog title="增加收货货地址" :visible.sync="dialogAdressVisible" customClass="customWidth">

      <div>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form :model="form_address" :rules="rules" ref="form_address" label-width="70" width="50%" size="small">
              <el-form-item label="联系人" prop="name" required>
                <el-input v-model="form_address.name"></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="mobiletel" required>
                <el-input v-model="form_address.mobiletel"></el-input>
              </el-form-item>

              <el-form-item label="省市区" prop="value" required>
                <el-cascader v-model="form_address.value" ref="myCascader" :props="optionProps" :options="shengdata">
                </el-cascader>
              </el-form-item>
              <el-form-item label="详细地址" prop="address" required>
                <el-input v-model="form_address.address"></el-input>
              </el-form-item>

            </el-form>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAdressVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form_address')">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改收货地址-->
    <el-dialog title="修改收货地址" :visible.sync="dialogEditeAdress" customClass="customWidth">

      <div>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form :model="form_Eaddress" :rules="rules" ref="form_Eaddress" width="50%" size="small">
              <el-form-item label="联系人" prop="name">
                <el-input v-model="form_Eaddress.name"></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="mobiletel">
                <el-input v-model="form_Eaddress.mobiletel"></el-input>
              </el-form-item>

              <el-form-item label="省市区" prop="value">
                <el-cascader v-model="form_Eaddress.value" ref="myCascader" :props="optionProps" :options="shengdata">
                </el-cascader>
              </el-form-item>
              <el-form-item label="详细地址" prop="address">
                <el-input v-model="form_Eaddress.address"></el-input>
              </el-form-item>

            </el-form>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditeAdress = false">取 消</el-button>
        <el-button type="primary" @click="submitForms('form_Eaddress')">确 定</el-button>
      </span>
    </el-dialog>

    <!--选择商品-->
    <el-dialog title="选择商品" :visible.sync="dialogTablesVisible" customClass="customWidth">
      <el-form :inline="true" :model="formInlines" ref="formInlines" size="small" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formInlines.goods_name" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInlines.skuvalue" placeholder="请输入商品规格"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchGoodList()">查询</el-button>
        </el-form-item>

        <el-table ref="multipleTable" :data="guigeNddata" empty-text="暂无数据" tooltip-effect="dark" style="width: 100%">
        <!--  <el-table-column type="selection" width="55" :selectable="checkSelectTable">
          </el-table-column> -->
           <el-table-column label="" width="65">
                <!--  <template scope="scope">
                      <el-radio :label="scope.row.goods_id" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
                  </template> -->
                  <template slot-scope="scope" >
                    <el-radio v-model="templateRadio" :label="scope.$index" @change.native="getCurrentRowsp(scope.$index,scope.row)" >&nbsp;</el-radio>
                  </template>
              </el-table-column>


          <el-table-column property="sku_id" label="Id" width="50"></el-table-column>
          <el-table-column property="goods_name" label="商品名称"></el-table-column>
          <el-table-column property="unit" label="单位" width="60"></el-table-column>
          <el-table-column property="stock" label="库存" width="80"></el-table-column>
          <el-table-column property="number" label="数量" width="60">
            <!--<template slot-scope="scope">
							<div class="div_number">
								<el-input v-model="scope.row.number"></el-input>
							</div>
						</template>-->

          </el-table-column>
          <el-table-column property="price" label="单价" width="60"></el-table-column>
          <el-table-column label="商品规格" width="160">
            <template slot-scope="scope">
              {{scope.row.sku_value}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChangec" v-if="paginationShow" @current-change="handleCurrentChangec"
          :current-page="currentPage1" :page-size="pagesize1" layout=" prev, pager, next, jumper" :total="total1"
          :current-page.sync="currentPage1">
        </el-pagination>


        <el-form-item style="margin-top:15px ;">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="dialogTablesVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        dialogTableVisiblespxx:false,
        file: "",
        filecc: "",
        fileccf:'',
        unitsdx:'',//保存首选的单位
        paginationShow: true,
        paginationShow2: true,
        paginationShow1: true,
        templateRadio:'',//单选商品
        id: "", //常用地址id
        currentRowc: '',
        CustomerList: '',
        //商品表格变量
        totalordermoney: 0,
        goods_name: '',
        price: '',
        sku_id: 1,
        number: 1,
        stock: '',
        unit: '',
        //常用地址
        provinceName: '',
        cityName: '',
        catonName: '',
        dprovince: '',
        dcity: '',
        dcaton: '',
        daddress: '',
        recipientmobile: '',
        recipientname: '',
        //总金额
        totalPrice: 0,
        pagesize: 20,
        total: 0,
        currentPage: 1,
        //商品分页
        pagesize1: 20,
        currentPage1: 1,
        total1: 0,

        value1: '',
        templateSelection: [],
        //单选
        radio2: '',
        AddressTable: [{}],
        tableNddata: [],
        shengdata: [], // 省数据
        newTableData: [], // 记录选择是的数据
        form_address: { //收货地址
          name: '',
          mobiletel: '',
          address: '',
          value: '',
        },
        form_Eaddress: { //修改收货地址
          name: '',
          mobiletel: '',
          address: '',
          value: [],
        },
        form2: {
          beizhu: ''
        },
        form23: {
          name: '',
          mobiletel: '',
        },
        formInline: {
          MobileTel: '',
        },
        formInlines: {
          goods_name: '',
          skuvalue: ''
        },
        guigeNddata: [{

        }],

        gridDatas: [{}],
        Customertable: [{}],
        radio1: '',
        selected: {},
        tableData: [],
        centerDialogVisible: false,
        dialogTablesVisible: false,
        dialogFormVisible: false,
        dialogForm23Visible: false,
        dialogAdressVisible: false,
        dialogEditeAdress: false,
        ruleForm: {
          name: '',
          userid: '',
        },
        optionProps: {
          value: 'code',
          label: 'name',
          children: 'List'
        },
        rules: {
          name: [{
            required: true,
            message: '请输入联系人',
            trigger: 'blur'
          }],
          mobiletel: [{
              required: true,
              message: '请输入联系人手机号',
              trigger: 'blur'
            },
            {
              pattern: /^1[345789]\d{9}$/,
              message: '输入11位数字的手机号码'
            }
          ],
          value: [{
            required: true,
            message: '请选择省市区',
            trigger: 'change'
          }],
          address: [{
            required: true,
            message: '请输入详细地址',
            trigger: 'blur'
          }]


        }
      };
    },
    created() {
      this.customerData();
      this.ssqData();
      //this.shaddressData();
      this.chooseGoodList();
    },

    methods: {
       handleChange(res,file) {
              console.log(res);
              console.log(file);
              this.filecc=res.response;
              console.log(this.filecc);
              // this.fileccf=this.filecc.Data;
              // console.log(this.fileccf);
            },
            // handleExceed(files, fileList) {
            //   this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            // },
            // beforeRemove(file, fileList) {
            //   return this.$confirm(`确定移除 ${ file.name }？`);
            // }
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1个文件,如需修改请删除已选择文件,再进行选择`);
      },
      clearUploadedImage () {
           this.$refs.upload.clearFiles();
      },
      addressSearch() {
        let _this = this;
        this.$http({
          method: 'get',
          url: '/api/CustomerAddress/GetCustomerAddressList',
          dataType: "json",
          params: {
            name: _this.form23.name,
            mobiletel: _this.form23.mobiletel,
            pageindex: 1,
            pagesize: 20,
            AddressType: 1,
            customerid: _this.ruleForm.userid
          }
        }).then((response) => { //这里使用了ES6的语法
          // console.log(response)
          if (response.data.data.pagecount == 0) {
            _this.AddressTable = "暂无数据";
          }

          _this.AddressTable = response.data.data.CustomerAddressList;
          console.log(_this.AddressTable);

        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })

      },
      //省市区数据
      ssqData() {
        let _this = this
        this.$http({
          method: 'get',
          url: '/api/AreaSelection/GetAreaList',
          dataType: "json",
          data: {}
        }).then((response) => { //这里使用了ES6的语法
          //console.log(response);
          console.log(response.data.data.list)

          _this.shengdata = response.data.data.list;

          _this.provinceId = response.data.data.list.provinceId;
          _this.cityId = response.data.data.list.cityId;
          _this.catonId = response.data.data.list.catonId;
          //			                      console.log(_this.shengdata);

        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })

      },
      submitForm(formName) {
        let _this = this;
        let jsonP = {};
        jsonP.name = _this.form_address.name;
        jsonP.province = _this.form_address.value[0];
        jsonP.city = _this.form_address.value[1];
        jsonP.caton = _this.form_address.value[2];
        jsonP.mobiletel = _this.form_address.mobiletel
        jsonP.address = _this.form_address.address;
        jsonP.addresstype = 1;
        jsonP.customerid = _this.ruleForm.userid;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http({
              method: 'post',
              contentType: 'application/json; charset=UTF-8',
              url: '/api/CustomerAddress/InsertCustomerAddress',
              //data:fd
              data: jsonP
            }).then((response) => {
              //这里使用了ES6的语法
              console.log(response);
              if (response.data.code == 1) {
                alert(response.data.message);
              }

              if (response.data.code == 0) {
                alert(response.data.message);
                _this.dialogAdressVisible = false;
                _this.addressData();
                _this.dialogForm23Visible = true;
                //_this.$router.replace({ path: '/CustomerList'})
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

      //修改收货地址
      submitForms(formName) {
        let _this = this;
        let jsonP = {};
        jsonP.name = _this.form_Eaddress.name;
        console.log(_this.form_Eaddress.value);
        jsonP.province = _this.form_Eaddress.value[0];
        console.log(jsonP.province);
        jsonP.city = _this.form_Eaddress.value[1];
        jsonP.caton = _this.form_Eaddress.value[2];
        jsonP.mobiletel = _this.form_Eaddress.mobiletel
        jsonP.address = _this.form_Eaddress.address;
        jsonP.addresstype = 1;
        jsonP.customerid = _this.ruleForm.userid;
        jsonP.id = _this.form_Eaddress.id;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http({
              method: 'post',
              contentType: 'application/json; charset=UTF-8',
              url: '/api/CustomerAddress/UpdateCustomerAddress',
              //data:fd
              data: jsonP
            }).then((response) => {
              //这里使用了ES6的语法
              console.log(response);
              if (response.data.code == 1) {
                alert(response.data.message);
              }
              if (response.data.code == 403) {
                alert(response.data.message);
              }
              if (response.data.code == 0) {
                alert(response.data.message);
                _this.dialogEditeAdress = false;
                _this.addressData();
                _this.dialogForm23Visible = true;
                //_this.$router.replace({ path: '/CustomerList'})
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
      handlesDelete(row) { //删除常用地址
        let _this = this;
        console.log(row);
        this.$http({
          method: 'get',
          url: '/api/CustomerAddress/DeleteCustomerAddress',
          params: {
            id: row.id
          }
        }).then((response) => { //这里使用了ES6的语法
          console.log(response)
          if (response.data.code == 1) {
            alert(response.data.message);
          }

          if (response.data.code == 0) {
            alert(response.data.message);
            _this.AddressTable.splice(row, 1)
          }

        }).catch((error) => {
          console.log(error) //请求失败返回的数据
          if(error.response.data.message == '403'){//没有权限
            alert("没有权限");
          }
        })
      },
      openAddAddress() {
        this.dialogAdressVisible = true;
        this.dialogForm23Visible = false;

      },
      EditeAddress(id) {
        console.log(id)
        this.dialogEditeAdress = true
        let _this = this
        this.$http({
          method: 'get',
          url: '/api/CustomerAddress/GetCustomerAddressInfo',
          dataType: "json",
          params: {
            id: id
          }
        }).then((response) => { //这里使用了ES6的语法
          let returnArr = [];
          console.log("aaaa")
          console.log(response.data.data.CustomerInfo)
          _this.form_Eaddress = response.data.data.CustomerInfo;
          returnArr.push(response.data.data.CustomerInfo.provinceId);
          returnArr.push(response.data.data.CustomerInfo.cityId);
          returnArr.push(response.data.data.CustomerInfo.catonId);
          //console.log(returnArr);
          _this.form_Eaddress.value = returnArr;
          console.log(_this.form_Eaddress.value);
        }).catch((error) => {
          console.log(error) //请求失败返回的数据
          if(error.response.data.message == '403'){//没有权限
            alert("没有权限");
          }
        })


      },
      handleDataChange($event, row) {
        this.sumMoney();

      },
      //			handleCurrentChangeM(val, index) {            
      //				this.currentTabData[index].currentPage = val;            
      //				this.answerCommentIndex = index;            
      //				this.refreshCommentReply();         
      //			},
      sumMoney() {
        let totalPrice = 0;
        this.tableNddata.forEach((item, index) => {
          totalPrice += item.price * item.number
        })
        this.totalPrice = totalPrice;
      },
      //计算
      getsum(param) {
        const {
          columns,
          data
        } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计'
          } else if (index === 5) {
            const values = data.map(item => Number(item[column.property]))
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr)
                if (!isNaN(value)) {
                  return prev + curr
                } else {
                  return prev
                }
              }, 0)
            } else {
              sums[index] = 'N/A'
            }
          } else {
            sums[index] = ' '
          }
        })
        return sums
      },
      //获取客户列表
      customerData() {
        let _this = this;
        this.$http({
          method: 'get',
          url: '/api/Customer/GetCustomerList',
          params: {
            pageindex: _this.currentPage,
            pagesize: 20,
            saleid: 0,
            name: "",
            CompanyName: "",
            AuditStatus: "",
            MobileTel: ""

          }
        }).then((response) => { //这里使用了ES6的语法
          console.log(response)
          _this.Customertable = response.data.data.CustomerList;
          _this.CustomerList = response.data.data.CustomerList;
          //console.log(_this.Customertable);

          _this.total = response.data.data.pagecount;
          //console.log(_this.total);
          _this.currentPage = response.data.data.pageindex;
          //this.page-size = response.data.data.pagesize;
          //请求成功返回的数据
        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })

      },
      //客户弹窗查询
      serchCustomer() {
        let _this = this;
        _this.currentPage = 1;
        this.$http({
          method: 'get',
          url: '/api/Customer/GetCustomerList',
          params: {
            pageindex: _this.currentPage,
            pagesize: 20,
            saleid: 0,
            name: "",
            CompanyName: "",
            AuditStatus: "",
            MobileTel: this.formInline.MobileTel,

          }
        }).then((response) => { //这里使用了ES6的语法
          if (response.data.data.pagecount == 0) {
            this.Customertable = "";
            this.paginationShow1 = false;
          } else {
            console.log(response)
            this.paginationShow1 = true;
            _this.Customertable = response.data.data.CustomerList;
            //_this.CustomerList = response.data.data.CustomerList;

            _this.total = response.data.data.pagecount;
            _this.currentPage = response.data.data.pageindex;

          }


          //请求成功返回的数据
        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })

      },

      openAddressData() {
        if (this.ruleForm.userid == "") {
          alert("请选择客户");
          return false;
        }
        this.dialogForm23Visible = true;
        this.addressData();
        this.ssqData();
      },
      openCommodityList() {
        if (this.ruleForm.userid == "") {
          alert("请选择客户");
          return false;
        }
        this.dialogTablesVisible = true;
        this.chooseGoodList();
      },
      //规格列表
      chooseGoodList() {
        let _this = this;
        this.$http({
          method: 'get',
          url: '/api/GoodsSku/GetGoodsSkuSelectList',
          params: {
            goods_name: this.formInlines.goods_name,
            skuvalue: this.formInlines.skuvalue,
            pageindex: _this.currentPage1,
            pagesize: 10
          }
        }).then((response) => { //这里使用了ES6的语法
          console.log(response)
          if (response.data.data.pagecount == 0) {

          } else {
            _this.guigeNddata = response.data.data.goodsList;
            _this.guigeNddata.forEach((item, index) => {
              if (!item.number) {
                _this.$set(item, 'number', 1);
              }
            })
            _this.total1 = response.data.data.pagecount;
            console.log(_this.total1);
            _this.currentPage1 = response.data.data.pageindex;

          }

          //					this.page-size = response.data.data.pagesize;
          //请求成功返回的数据
        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })

      },
      //规格查询
      searchGoodList() {
        this.currentPage1 = 1;
        let _this = this;
        this.$http({
          method: 'get',
          url: '/api/GoodsSku/GetGoodsSkuSelectList',
          params: {
            goods_name: this.formInlines.goods_name,
            skuvalue: this.formInlines.skuvalue,
            pageindex: _this.currentPage1,
            pagesize: 20
          }
        }).then((response) => { //这里使用了ES6的语法
          console.log(response)
          if (response.data.data.pagecount == 0) {
            this.guigeNddata = "";
            this.paginationShow = false;
          } else {
            this.paginationShow = true;
            this.guigeNddata = response.data.data.goodsList;
            this.guigeNddata.forEach((item, index) => {
              if (!item.number) {
                this.$set(item, 'number', 1);
              }
            })
            // this.currentPage1=1;
            this.total1 = response.data.data.pagecount;
            console.log(this.total1);
            this.currentPage1 = response.data.data.pageindex;

          }

          //this.page-size = response.data.data.pagesize;
          //请求成功返回的数据
        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })

      },
      //获取地址列表
      addressData() {
        let _this = this;
        this.$http({
          method: 'get',
          url: '/api/CustomerAddress/GetCustomerAddressList',
          dataType: "json",
          params: {
            name: _this.form23.name,
            mobiletel: _this.form23.mobiletel,
            pageindex: 1,
            pagesize: 20,
            AddressType: 1,
            customerid: _this.ruleForm.userid
          }
        }).then((response) => { //这里使用了ES6的语法
          // console.log(response)
          if (response.data.data.pagecount == 0) {
             _this.AddressTable = "";
          }
          else{
            _this.AddressTable = response.data.data.CustomerAddressList;
            console.log(_this.AddressTable);
          }



        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })

      },
      //表单提交
      onSubmit() {
        let _this = this
        let newsAary = {};
        if(_this.tableNddata==""){
          alert("商品信息不能为空，请选择商品信息");
          return false;
          }
        newsAary.customerOrderGoods = _this.tableNddata;
        //newsAary.orderid = "";
        newsAary.customerOrderGoods.forEach(element => {
          console.log(element);
          _this.$set(element, 'skuid', element.sku_id)
          _this.$set(element, 'unitcost', element.price)
          //					_this.$set(element, 'number', element.stock)
        })
        if (this.ruleForm.name == "") {
          alert("客户不能为空，请选择客户");
          return false
        }
        if (this.recipientname == "") {
          alert("联系人不能为空，请选择收货信息");
          return false
        }
        if (this.recipientmobile == "") {
          alert("联系人电话不能为空，请选择收货信息");
          return false
        }
        if (this.dprovince == "") {
          alert("省不能为空")
          return false
        }
        if (this.dcity == "") {
          alert("市不能为空")
          return false
        }
        if (this.dcaton == "") {
          alert("区不能为空")
          return false
        }
        if (this.daddress == "") {
          alert("详细地址不能为空")
          return false
        }
        console.log(newsAary.customerOrderGoods);
        newsAary.daddress = _this.daddress;
        newsAary.dlat = "";
        newsAary.dlng = "";
        newsAary.dprovince = _this.dprovince;
        newsAary.dcity = _this.dcity;
        newsAary.dcaton = _this.dcaton;
        newsAary.recipientmobile = _this.recipientmobile;
        newsAary.recipientname = _this.recipientname;
        newsAary.remark = _this.ruleForm.remark;
        newsAary.customerid = _this.ruleForm.userid;
        newsAary.orderstatus = "Created";
        newsAary.totalordermoney = _this.totalPrice;
        newsAary.paystatus = "WaitCheck";
        newsAary.readytime = _this.ruleForm.readytime;
        newsAary.orderpdf = _this.filecc.Data;
        console.log(newsAary);
        this.$http({
          method: 'post',
          url: '/api/CustomerOrder/InsertCustomerOrder',
          //			                  contentType: "application/json",
          dataType: "json",
          data: newsAary
        }).then((response) => { //这里使用了ES6的语法

        if(response.data.code == 1){
        	 alert(response.data.message);
        }
        if(response.data.code == 0){
        	 console.log(response)
        	 alert(response.data.message);
        	 _this.$router.replace({
        	   path: '/SalesOrders'
        	 })
        }

          //请求成功返回的数据
        }).catch((error) => {
          console.log(error) //请求失败返回的数据
          if(error.response.data.message == '403'){//没有权限
            alert("没有权限");
          }
        })
      },
      //单选客户选择
      showRow(row) {
        //赋值给radio
        this.radio1 = this.Customertable.indexOf(row);
        console.log(this.radio1);
      },
      //单选客户选择
      getCurrentRow(val) {
        console.log(val);
        this.ruleForm.name = this.Customertable[val].companyname;
        this.ruleForm.userid = this.Customertable[val].userid
      },
      //单选客户选择
      handleCurrentChange(currentRow, oldCurrentRow) {
        console.log(currentRow);
        this.currentRow = currentRow;
        this.getCurrentRow(this.Customertable.indexOf(currentRow));
      },
      showRowc(row) { //单选常用地址选择
        //赋值给radio
        this.radio2 = this.AddressTable.indexOf(row);
        console.log(this.radio2);
        console.log(row);
        this.recipientname = row.name,
          //$(".name").text(this.AddressTable[val].name);
          this.recipientmobile = row.mobiletel,
          this.dprovince = row.provinceId,
          console.log(this.dprovince);
          this.dcity = row.cityId,
          this.dcaton = row.catonId,
          this.daddress = row.address
          this.provinceName = row.province,
          this.cityName = row.city,
          this.catonName = row.caton
      },

      //单选常用地址选择
      handleCurrentChangec(currentRow, oldCurrentRow) {
        console.log(currentRow);
        this.currentRowc = currentRow;
        this.getCurrentRowc(this.AddressTable.indexOf(currentRow));
      },
       //商品选择单选

       getCurrentRowsp(index,row){
         this.templateSelection = row;
         console.log(this.templateSelection);
         },
      SaveCustomers() {

        //this.ruleForm.name=this.Customertable[val].companyname

      },

      deletRow(row, index) {
        this.tableNddata.splice(row, 1);
        // if (row.sku_id != '') {
        //   this.newTableData.splice(row, 1);
        // }
      },
      //客户列表分页
      handleSizeChange: function(size) {
        this.pagesize = size;
        console.log(this.pagesize) //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage;
        this.customerData();
        console.log(111);
        console.log(this.currentPage) //点击第几页
      },
      //商品选择分页
      handleSizeChangec: function(size) {
        this.pagesize1 = size;
        console.log(this.pagesize1) //每页下拉显示数据
      },
      handleCurrentChangec: function(currentPage) {
        this.currentPage1 = currentPage;
        this.chooseGoodList();
        console.log(this.currentPage1) //点击第几页
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleSelectionChange(val) {

        this.templateSelection = val;
        //this.tableNddata.push(val);
      },
      save() {
          let _this = this,
          temp = {},
          result = [];

          if(_this.templateSelection==""){
            alert("必须选择商品才能保存商品信息");
            return false;
          }

        if(_this.tableNddata.length >=1){
            this.unitsdx=this.tableNddata[0].unit;
            console.log(this.unitsdx);
           if(this.templateSelection.unit==this.unitsdx){
               _this.tableNddata.push(_this.templateSelection);
             }
             else{
                   alert("单位不相同不能保存");
                   return false;
             }
        }else{
          _this.tableNddata.push(_this.templateSelection);
        }





        // this.tableNddata = result;
        // console.log(this.tableNddata)

        this.dialogTablesVisible = false;
      },
      checkSelectTable(row, index) {
        let arr = this.tableNddata,
          status = true;
        if (arr.length > 1) {
          status = arr.every((item, index, arry) => {
            return item.sku_id != row.sku_id;
          })
        }

        return status;

      }

    },
    watch: {
      tableNddata() {
        this.$nextTick(() => {
          this.sumMoney();

        })
      }
    }
  }
</script>
<style>
  .el-form-item--small .el-form-item__content,
  .el-form-item--small .el-form-item__label {
    line-height: 28px;
  }

  .el-input__inner {
    border-radius: 0;
  }

  input[type=file] {
    display: none !important;
  }

  .el-radio {
    color: #606266;
    cursor: pointer;
    margin-right: 30px;
    color: white;
  }

  .el-upload__tip {
    font-size: 12px;
    color: #606266;
    margin-top: 7px;
    display: inline-block;
    margin-left: 15px;
  }

  .el-dialog__body {
    padding: 5px 10px !important;
  }

  .el-dialog__header {
    padding: 10px;
  }

  .el-radio {
    color: #fff;
    cursor: pointer;
    margin-right: 10px;
  }

  .customWidth {
    width: 60%;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    .customWidth {
      width: 80%;
    }
  }

  @media (min-width: 576px)and (max-width: 768px) {
    .customWidth {
      width: 100%;
    }
  }

  @media (min-width: 320px)and (max-width: 575px) {
    .customWidth {
      width: 100%;
    }
  }
</style>
