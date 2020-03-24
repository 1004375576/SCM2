<template>
  <div class="content-wrapper">
    <section class="content-header">
      <ol class="breadcrumb">
        <a href="/"><i class="fa fa-dashboard"></i></a>
        <li>
          <a href="javascript:;">系统设置</a>
        </li>
        <li><a href="javascript:;">审批流程设置</a></li>
        <li class="active">流程修改</li>
      </ol>

    </section>
    <div style="clear: both;"></div>
    <div class="content">
      <div class="box box-primary">

      	<div class="box-body" >
       <el-row :gutter="10"  >
      <el-col :xs="24" :sm="18" :md="12" :lg="12" >
        <el-col :xs="24" :sm="12" :offset="2">
          <div  class="follow-set main-timeline" v-if="FlowSetNodesList ==''" >
            <div>
            <p  style="width:60px;margin:0px auto ; padding-bottom:25px ;z-index:0 ; ">开始流程</p>
             <div style="width:40px; margin:0 auto ; padding:0px 0  25px;z-index:1; position: relative; "><el-button type="primary" icon="el-icon-plus" @click="centerfpDialog1Visible = true" circle></el-button></div>

            <p  style="width:60px;margin:0 auto ;">结束流程</p>
          </div>
          </div>
          <div  class="follow-set main-timeline" v-else>

            <div style="width:40px; margin:0 auto ; padding:0px 0  25px;z-index:1; position: relative; "><el-button type="primary" icon="el-icon-plus" @click="hcenterfpDialog1Visible = true" circle></el-button></div>

              <div  style="width:200px;margin:0 auto ; position: relative;"  v-for="(item, index) in FlowSetNodesList"
                >
               <el-card class="box-card"  >
                 <div slot="header" class="clearfix">
                 <!--  <span>{{index}}</span> -->
                   <span>{{ item.flowNodename }}</span>
                  <span style="position: absolute;top:5px;right:50px;cursor:pointer;"@click="showbjDialog1Visible(item);">编辑</span>
                   <span style="position: absolute;top:5px;right:10px;cursor:pointer;"@click="handdelete(item);">删除</span>
                 </div>
                <div>
                  {{ item.rolename }}
                </div>
               </el-card>
                 <div style="width:40px; margin:0 auto ;padding:25px 0  0;"  v-if="index==FlowSetNodesList.length-1"><el-button type="primary" icon="el-icon-plus"   @click='getIndex(index)' circle></el-button></div>
                 <div style="width:40px; margin:0 auto ;padding:25px 0 ;"  v-else><el-button type="primary" icon="el-icon-plus" @click='getIndex(index)' circle></el-button></div>
             </div>

           <!-- <el-steps direction="vertical" :active="3" >
              <el-step title="" icon="el-icon-circle-plus-outline"></el-step>
              <el-step title="审批人" ></el-step>
             <el-step title="" icon="el-icon-circle-plus-outline"></el-step>
            </el-steps> -->
          </div>
          </el-col>
            </el-col>

            </el-row>
            <!--固定死的弹窗-->
            <el-dialog title="步骤增加" :visible.sync="hcenterfpDialog1Visible"   class="fpwidth dialog-width" customClass="customWidth">
                 <div>
                   <el-row :gutter="10">
                     <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                       <el-form :model="ruleFormfps" :rules="rules" ref="ruleFormfps" label-width="80px" size="small">
                          <el-row :gutter="10">
                           <el-col :xs="24" :sm='12'>
                             <el-form-item label="流程名称" prop="flowsetName">
                                  <el-input v-model="ruleFormfps.flowsetName" readonly=""></el-input>
                                  <!--  <el-select v-model="ruleFormfp.flowsetid" placeholder="请选择">
                                       <el-option
                                         v-for="item in FlowSetList"
                                         :key="item.flowsetId"
                                         :label="item.flowName"
                                         :value="item.flowsetId">
                                       </el-option>
                                     </el-select> -->
                             </el-form-item>
                           </el-col>
                           <el-col :xs="24" :sm='12'>
                                  <el-form-item label="审核角色" prop="flowNoderoleid">
                                  <el-select v-model="ruleFormfps.flowNoderoleid" placeholder="请选择">
                                     <el-option
                                       v-for="item in allRole"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                                     </el-option>
                                   </el-select>
                           </el-form-item>
                           </el-col>
                         </el-row>
                         <el-form-item label="步骤名称" prop="flowNodename">
                           <el-input v-model="ruleFormfps.flowNodename" ></el-input>
                         </el-form-item>

                         <el-form-item label="步骤备注" prop="remarks">
                           <el-input v-model="ruleFormfps.remarks" ></el-input>
                         </el-form-item>


                       </el-form>
                     </el-col>
                    </el-row>
                 </div>
                 <span slot="footer" class="dialog-footer">
                   <el-button @click="hcenterfpDialog1Visible = false">取 消</el-button>
                  <el-button type="primary" @click="submitfpForms('ruleFormfps')">确 定</el-button>
                 </span>
               </el-dialog>

          <!--新增弹窗-->
      <el-dialog title="步骤增加" :visible.sync="centerfpDialog1Visible"  customClass="customWidth"  class="fpwidth dialog-width">
           <div>
             <el-row :gutter="10">
               <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                 <el-form :model="ruleFormfp" :rules="rules" ref="ruleFormfp" label-width="80px" size="small">
                    <el-row :gutter="10">
                     <el-col :xs="24" :sm='12'>
                       <el-form-item label="流程名称" prop="flowsetName">
                            <el-input v-model="ruleFormfp.flowsetName" readonly=""></el-input>
                            <!--  <el-select v-model="ruleFormfp.flowsetid" placeholder="请选择">
                                 <el-option
                                   v-for="item in FlowSetList"
                                   :key="item.flowsetId"
                                   :label="item.flowName"
                                   :value="item.flowsetId">
                                 </el-option>
                               </el-select> -->
                       </el-form-item>
                     </el-col>
                     <el-col :xs="24" :sm='12'>
                            <el-form-item label="审核角色" prop="flowNoderoleid">
                            <el-select v-model="ruleFormfp.flowNoderoleid" placeholder="请选择">
                               <el-option
                                 v-for="item in allRole"
                                 :key="item.id"
                                 :label="item.name"
                                 :value="item.id">
                               </el-option>
                             </el-select>
                     </el-form-item>
                     </el-col>
                   </el-row>
                   <el-form-item label="步骤名称" prop="flowNodename">
                     <el-input v-model="ruleFormfp.flowNodename" ></el-input>
                   </el-form-item>
                   <!-- <el-form-item label="步骤顺序" prop="flowNodeindex">
                     <el-input v-model="ruleFormfp.flowNodeindex" ></el-input>
                   </el-form-item> -->
                   <el-form-item label="步骤备注" prop="remarks">
                     <el-input v-model="ruleFormfp.remarks" ></el-input>
                   </el-form-item>


                 </el-form>
               </el-col>
              </el-row>
           </div>
           <span slot="footer" class="dialog-footer">
             <el-button @click="centerfpDialog1Visible = false">取 消</el-button>
            <el-button type="primary" @click="submitfpForm('ruleFormfp')">确 定</el-button>
           </span>
         </el-dialog>


         <!--编辑弹窗-->
        <el-dialog title="步骤编辑" :visible.sync="centerbjDialog1Visible"  customClass="customWidth" class="fpwidth dialog-width">
           <div>
             <el-row :gutter="10">
               <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                 <el-form :model="ruleFormbj" :rules="rules" ref="ruleFormbj" label-width="80px" size="small">
                    <el-row :gutter="10">
                     <el-col :xs="24" :sm='12'>
                       <el-form-item label="流程名称" prop="flowsetName">
                          <el-input v-model="ruleFormbj.flowsetName" readonly="" ></el-input>
                           <!--   <el-select v-model="ruleFormbj.flowsetid" placeholder="请选择">
                                 <el-option
                                   v-for="item in FlowSetList"
                                   :key="item.flowsetId"
                                   :label="item.flowName"
                                   :value="item.flowsetId">
                                 </el-option>
                               </el-select> -->
                       </el-form-item>
                     </el-col>
                     <el-col :xs="24" :sm='12'>
                            <el-form-item label="审核角色" prop="flowNoderoleid">
                            <el-select v-model="ruleFormbj.flowNoderoleid" placeholder="请选择">
                               <el-option
                                 v-for="item in allRole"
                                 :key="item.id"
                                 :label="item.name"
                                 :value="item.id">
                               </el-option>
                             </el-select>
                     </el-form-item>
                     </el-col>
                   </el-row>
                   <el-form-item label="步骤名称" prop="flowNodename">
                     <el-input v-model="ruleFormbj.flowNodename" ></el-input>
                   </el-form-item>

                   <el-form-item label="步骤备注" prop="remarks">
                     <el-input v-model="ruleFormbj.remarks" ></el-input>
                   </el-form-item>
                   <el-form-item  prop="flowNodeindex">
                      <el-input v-model="ruleFormbj.flowNodeindex" type="hidden" ></el-input>
                    </el-form-item>

                 </el-form>
               </el-col>
             </el-row>
           </div>
           <span slot="footer" class="dialog-footer">
             <el-button @click="centerbjDialog1Visible = false">取 消</el-button>
            <el-button type="primary" @click="EditefpForm('ruleFormbj')">确 定</el-button>
           </span>
         </el-dialog>


        </el-col>
  </el-row>

     </div>
    </div>
   </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        flowSetId: this.$route.query.flowsetId,//获取流程步骤id
        FlowSetNodesList:'',
        centerfpDialog1Visible:false,
        centerbjDialog1Visible:false,
        hcenterfpDialog1Visible:false,
        allRole:'',//所有角色
        Findex:'',
        FlowSetList:'',
        ruleFormfp: {
        	flowsetid: this.$route.query.flowsetId,
          flowsetName:this.$route.query.flowName,
          flowNoderoleid:'',
          flowNodename:'',
          flowNodeindex:this.Findex,
           remarks:''
        },
        ruleFormfps: {
        	flowsetid: this.$route.query.flowsetId,
          flowsetName:this.$route.query.flowName,
          flowNoderoleid:'',
          flowNodename:'',
          flowNodeindex:0,
           remarks:''
        },
        ruleFormbj:{
          flowsetid: '',
          flowNoderoleid:'',
          flowsetName:this.$route.query.flowName,
          flowNodename:'',
          flowNodeindex:'',
           remarks:'',
           rolename:'',
           flowNodeid:''
        },
        rules: {
              flowsetid: [
                { required: true, message: '请选择流程名称', trigger: 'blur' }
              ],
              flowNoderoleid: [
                { required: true, message: '请选择审核角色', trigger: 'blur' }
              ],
              flowNodename: [
                { required: true, message: '请输入步骤名称', trigger: 'blur' }
              ],
              // flowNodeindex: [
              //   { required: true, message: '请输入步骤序号', trigger: 'blur' }
              // ],
            },
        // optionProps: {
        // value: 'id',
        // label: 'name'
        // },
      }
    },
    created() {
      this.getdataLc();
      this.getRoledata();
      this.getLiuData()
    },
    methods: {
      //显示编辑弹窗
      showbjDialog1Visible(item){
        console.log(item);

        let _this = this
        _this.centerbjDialog1Visible=true;
         this.$http({
           method: 'get',
           url: '/api/selectByPrimaryKey',
           params: {nodeID:item.flowNodeid}
         }).then((response) => { //这里使用了ES6的语法
           if (response.data.code == 1) {

           }
           if (response.data.code != 1) {

               _this.ruleFormbj.flowNodename=response.data.data.FlowNodeInfo.flowNodename,
               _this.ruleFormbj.remarks=response.data.data.FlowNodeInfo.remarks,
               _this.ruleFormbj.rolename=response.data.data.FlowNodeInfo.rolename,
               _this.ruleFormbj.flowNodeindex = response.data.data.FlowNodeInfo.flowNodeindex,
               _this.ruleFormbj.flowsetid=response.data.data.FlowNodeInfo.flowsetid,
              _this.ruleFormbj.flowNodeid=response.data.data.FlowNodeInfo.flowNodeid,
               _this.ruleFormbj.flowNoderoleid=response.data.data.FlowNodeInfo.flowNoderoleid,
              // newsAary.remarks = _this.ruleFormbj.remarks,
              // newsAary.flowNodeindex = _this.ruleFormbj.flowNodeindex,
              // newsAary.flowNoderoleid = _this.ruleFormbj.flowNoderoleid,
              // newsAary.flowsetid = _this.ruleFormbj.flowsetid,

               console.log(response)

           }

         }).catch((error) => {
           console.log(error) //请求失败返回的数据
         })

      },
      submitfpForm(formName){
              this.$refs[formName].validate((valid) => {
                       if (valid) {
                         let _this = this
                         let newsAary={};
                         if(_this.FlowSetNodesList==''){
                            newsAary.flowNodeindex = 0;
                           }else{
                              newsAary.flowNodeindex = _this.Findex+1;
                           }
                          newsAary.flowNodename = _this.ruleFormfp.flowNodename,
                          newsAary.remarks = _this.ruleFormfp.remarks,
                          newsAary.flowNoderoleid = _this.ruleFormfp.flowNoderoleid,
                          newsAary.flowsetid = _this.ruleFormfp.flowsetid,
                          console.log(newsAary);
                            this.$http({
                                    method:'post',
                                    url:'/api/FlowNodeAdd',
                                    dataType: "json",
                         	          data:newsAary
                               }).then((response) =>{          //这里使用了ES6的语法
                                   console.log(response)
                                   alert(response.data.message);
                                  _this.centerfpDialog1Visible=false;
                                  _this.getdataLc();
                                    _this.$refs[formName].resetFields()
                                  //_this.$router.replace({ path: '/CommodityAttributes'})
                                   //请求成功返回的数据
                               }).catch((error) =>{
                                   console.log(error)       //请求失败返回的数据
                               })
                       } else {
                         console.log('error submit!!');
                         return false;
                       }
                     });


      },
      submitfpForms(formName){
              this.$refs[formName].validate((valid) => {
                       if (valid) {
                         let _this = this
                         let newsAary={};
                          newsAary.flowNodeindex =0,
                          newsAary.flowNodename = _this.ruleFormfps.flowNodename,
                          newsAary.remarks = _this.ruleFormfps.remarks,
                          newsAary.flowNoderoleid = _this.ruleFormfps.flowNoderoleid,
                          newsAary.flowsetid = _this.ruleFormfps.flowsetid,
                          console.log(newsAary);
                            this.$http({
                                    method:'post',
                                    url:'/api/FlowNodeAdd',
                                    dataType: "json",
                         	          data:newsAary
                               }).then((response) =>{          //这里使用了ES6的语法
                                   console.log(response)
                                   alert(response.data.message);
                                  _this.hcenterfpDialog1Visible=false;
                                  _this.getdataLc();
                                  _this.$refs[formName].resetFields()
                                  //_this.$router.replace({ path: '/CommodityAttributes'})
                                   //请求成功返回的数据
                               }).catch((error) =>{
                                   console.log(error)       //请求失败返回的数据
                               })
                       } else {
                         console.log('error submit!!');
                         return false;
                       }
                     });


      },
      EditefpForm(formName){
              this.$refs[formName].validate((valid) => {
                       if (valid) {
                         let _this = this
                         let newsAary={};
                          newsAary.flowNodename = _this.ruleFormbj.flowNodename,
                          newsAary.remarks = _this.ruleFormbj.remarks,
                          newsAary.flowNodeindex = _this.ruleFormbj.flowNodeindex,
                          newsAary.flowNoderoleid = _this.ruleFormbj.flowNoderoleid,
                          newsAary.flowsetid = _this.ruleFormbj.flowsetid,
                          newsAary.flowNodeid = _this.ruleFormbj.flowNodeid,
                          console.log(newsAary);
                            this.$http({
                                    method:'post',
                                    url:'/api/FlowNodeSave',
                                    dataType: "json",
                         	          data:newsAary
                               }).then((response) =>{          //这里使用了ES6的语法
                                   console.log(response)
                                   alert(response.data.message);
                                  _this.centerbjDialog1Visible=false;
                                 _this.getdataLc();
                                  //_this.$router.replace({ path: '/CommodityAttributes'})
                                   //请求成功返回的数据
                               }).catch((error) =>{
                                   console.log(error)       //请求失败返回的数据
                               })
                       } else {
                         console.log('error submit!!');
                         return false;
                       }
                     });


      },
      getIndex(index){
          console.log(index);
           this.centerfpDialog1Visible=true;
           //alert(index);
           this.Findex=index;

      },
      getLiuData(){
       let _this = this
        this.$http({
          method: 'get',
          url: '/api/GetFlowSetList',
          params: {}
        }).then((response) => { //这里使用了ES6的语法
          if (response.data.code == 1) {

          }
          if (response.data.code != 1) {

              _this.FlowSetList=response.data.data.FlowSetList;
              console.log(_this.FlowSetList)
               // _this.Findex=response.data.data.FlowSetList.

          }

        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })
      },
      getRoledata() { //获得角色数据
        let _this = this
        this.$http({
          method: 'get',
          url: '/api/selectIsAllRole',
          params: {}
        }).then((response) => { //这里使用了ES6的语法
          if (response.data.code == 1) {
          }
          if (response.data.code != 1) {
              _this.allRole=response.data.data.roleList;
              console.log(_this.allRole)
          }

        }).catch((error) => {
          console.log(error) //请求失败返回的数据
        })
      },

      handdelete(item){
         let _this = this;
        this.$confirm('是否确认删除?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$http({
                    method: 'get',
                    url: '/api/FlowNodeDelete',
                    params: {nodeID:item.flowNodeid}
                  }).then((response) => { //这里使用了ES6的语法
                    if (response.data.code == 1) {
                        alert(response.data.message);
                    }

                    if (response.data.code == 0 ) {
                      this.$message({
                        type: 'success',
                        message: response.data.message
                      });

                        _this.getdataLc();
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
      getdataLc() { //根据id获得流程数据
        let _this = this
        this.$http({
          method: 'get',
          url: '/api/GetNodesByFlowID',
          params: {flowSetId:_this.flowSetId}
        }).then((response) => { //这里使用了ES6的语法
          console.log(response)
          if (response.data.code == 1) {

          }
          if (response.data.code != 1) {
             _this.FlowSetNodesList=response.data.data.FlowSetNodesList;
             console.log(_this.FlowSetNodesList)
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
.main-timeline:before {
    content: "";
    width: 2px;
    height: 100%;
    background: #cacaca;
    position: absolute;
    top: 0;
    left:16.8%;
    z-index:0;
}
  .el-form-item__content .el-checkbox.el-checkbox__label {
    padding-left: 0px;
  }
  .el-card__header{background:#ff943e ;padding:5px 10px!important ;color:#fff;}


  .el-dialog .el-dialog__body {
    padding: 10px 10px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }
.el-card__body{ padding:5px 10px!important ;}
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
 @media (min-width: 768px) and (max-width: 991.98px) {
     .customWidth {
       width:90%!important;
     }
   }

   @media (min-width: 576px)and (max-width: 768px) {
     .customWidth {
       width: 96%!important;
     }
   }

   @media (min-width: 320px)and (max-width: 575px) {
     .customWidth {
       width: 98%!important;
     }
   }
</style>
