<template>
  
  <div id="app">
    <!-- <router-view /> -->
    <div class="top">
      <p>生产管理 > 车间数据录入</p>
      <div>
        <el-button size="small" class="top_btn" @click="submitForm" >提交</el-button>
        <el-button size="small" class="top_btn" @click="cancel1">取消</el-button>
      </div>
    </div>
    <div class="content" style="padding-bottom:15px;box-sizing:border-box"  >
      <div > 
          <span class="tipNameSp"><span style="color:red">* </span>工单号：</span> <span style="position:relative"> <input type="text" @blur="searchData" disabled v-model="formData.wk_no" placeholder="" class="inp1 fofo must1">
          <p class="musttrue" v-if="musttrue.gondanhao" >工单号不能为空</p>
          <p class="musttrue" v-if="musttrue.cuowu" >您输入的工单号有误</p>
          </span>
          <span class="tipNameSp othTipNameSp">料号：</span><input v-model="formData.wo_part"  placeholder="0" disabled class="inp1  " />
          <span class="tipNameSp othTipNameSp_r">标准人工工时：</span><input v-model="formData.wr_time_worker" placeholder="0" disabled class="inp1 " />
          <span class="tipNameSp othTipNameSp_o">标准设备工时：</span><input v-model="formData.wr_time_machine"  placeholder="0" disabled class="inp1 " />
          
      </div>
      <div>
        <span class="tipNameSp"><span style="color:red">* </span>
        日期：</span> <input id="meeting"  @blur="must2" v-model="formData.wk_date" disabled class="inp1 must2" /> 
        <p class="musttrue" v-if="musttrue.riqi">日期不能为空</p>
      
        <span class="tipNameSp othTipNameSp">车间：</span><select class="inp1  fofo chooseVal1" v-model="formData.wk_workshop_id" @input="chooseVal2"  >
          <option selected disabled style="display:none">请选择</option>
          <option v-for="(item,index) in options2" :key="index" :label="item.wk_workshop_desc" :value="item.wk_workshop_id">{{item.label}}</option>
        </select>
        
          <span class="tipNameSp othTipNameSp_r"><span style="color:red">* </span>线别：</span><span style="position:relative"><input type="text"  @blur="must3" maxlength="10" v-model="formData.wk_line" placeholder="单行输入"  class="inp1 fofo must3">
          <p class="musttrue" v-if="musttrue.xianbie"  >线别不能为空</p>
        </span>
        
        <span class="tipNameSp othTipNameSp_o">班别：</span><select class="inp1  fofo must" v-model="formData.wk_classes_id" @input="chooseVal" >
                <option selected disabled style="display:none">请选择</option>
                <option v-for="(item,index) in options" :key="index" :label="item.wk_classes_desc" :value="item.wk_classes_id">{{item.label}}</option>            
              </select>
              
      
      </div>
          <div>
            <span class="tipNameSp"><span style="color:red">* </span> 机台号：</span> <span style="position:relative"><input type="text" @blur="must4" maxlength="10" v-model="formData.wk_machine"  placeholder="单行输入" class="inp1 fofo must4" />
            <p class="musttrue" v-if="musttrue.jitaihao">机台号不能为空</p>
            </span>
            <span class="tipNameSp othTipNameSp"><span style="color:red">* </span>生产方式：</span><select class="inp1 fofo chooseVal1" v-model="formData.wk_mode_id"  @input="chooseVal1">
                      <option selected disabled style="display:none">请选择</option>
                      <option v-for="(item,index) in options1" :key="index" :label="item.wk_mode_desc" :value="item.wk_mode_id">{{item.label}}</option>
                  </select>
            
          </div>

      </div>
        
    <div class="content" style="padding-bottom:30px;padding-top:0px;box-sizing:border-box">
      <span class="tipNameSp">计划量：</span> <span style="position:relative"><input v-model="formData.wk_plan_qty" @input="plan" @blur="cantFalse('wk_plan_qty')" type="number" placeholder="0.0" min="0" class="inp1 fofo plan_num" />
      <div class="musttrue" v-if="musttrue.plantrue || musttrue.hoursetrue">
        <p  v-if="musttrue.plantrue" style="width:300px;" >您的计划量小于实际产出良品量加不良量了</p>
        <p  v-if="musttrue.hoursetrue"  style="width:300px;" >您的实际产出良品量小于入库量了</p>
      </div>
      </span>
      <span class="tipNameSp othTipNameSp">实际产出良品量：</span><input v-model="formData.wk_real_qty" @input="output" @blur="cantFalse('wk_real_qty')" type="number" min="0" placeholder="0.0" class="inp1 fofo output_num" />
      <span class="tipNameSp othTipNameSp_r">入库数量：</span><input  v-model="formData.wk_in_qty" @input="hourse" @blur="cantFalse('wk_in_qty')" placeholder="0.0" min="0" type="number" class="inp1 fofo hourse_num" />
      <span class="tipNameSp othTipNameSp_o">设备报工工时(小时)：</span><input v-model="formData.wk_timesheet_time" @blur="cantFalse('wk_timesheet_time')" min="0" type="number" placeholder="0.0" class="inp1 fofo" />
      <span class="tipNameSp othTipNameSp_o">损失工时汇总(小时)：</span><input v-model="formData.wk_loss_time" @blur="cantFalse('wk_loss_time')" min="0" type="number" placeholder="0.0" class="inp1 fofo" />
       
    </div>
    <div class="content other_content" style="padding-top:10px;padding-bottom:10px;box-sizing:border-box;" >
      <table class="table_cont" >
        <tr class="first_tr">
          <td></td>
          <td>员工</td>
          <td>技术员</td>
          <td>班长/班助</td>
          <td>物料员</td>
          <td>外观员</td>
          <td>包装</td>
          <td>打签员</td>
          <td>修理</td>
          <td>QC</td>
          <td>其他后勤人员</td>
        </tr>
        <tr>
          <td>正常出勤：</td>
          <td class="bor">
              <input min="0" placeholder="0.0" type="number"  @input="clearNoNum" @blur="cantFalse('wk_normal_worker')" v-model="formData.wk_normal_worker" class="inppp tab_ii tab_inp totalNum fofo"  />
          </td>
          <td class="bor">
            <input min="0" type="number" placeholder="0.0" @input="clearNoNum" @blur="cantFalse('wk_normal_technician')" v-model="formData.wk_normal_technician"  class="inppp tab_inp totalNum fofo" />
          </td>
          <td class="bor"><input type="number" @input="clearNoNum" @blur="cantFalse('wk_normal_assistant')" min="0"  placeholder="0.0" v-model="formData.wk_normal_assistant" class="inppp tab_inp totalNum fofo " /></td>
          <td class="bor"><input type="number" @input="clearNoNum" @blur="cantFalse('wk_normal_material')" min="0" placeholder="0.0" v-model="formData.wk_normal_material"  class="inppp tab_inp totalNum fofo" /></td>
          <td class="bor"><input type="number" @input="clearNoNum" @blur="cantFalse('wk_normal_appearance')" min="0" placeholder="0.0" v-model="formData.wk_normal_appearance"  class="inppp tab_inp totalNum fofo"></td>
          <td class="bor"><input type="number" @input="clearNoNum" @blur="cantFalse('wk_normal_package')" min="0" placeholder="0.0" v-model="formData.wk_normal_package"  class="inppp tab_inp totalNum fofo" /></td>
          <td class="bor"><input type="number" @input="clearNoNum" @blur="cantFalse('wk_normal_label')" min="0" placeholder="0.0" v-model="formData.wk_normal_label"  class="inppp tab_inp totalNum fofo" /></td>
          <td class="bor"><input type="number" @input="clearNoNum" @blur="cantFalse('wk_normal_repairman')" min="0" placeholder="0.0" v-model="formData.wk_normal_repairman"  class="inppp tab_inp totalNum fofo" /></td>
          <td class="bor"><input type="number" @input="clearNoNum" @blur="cantFalse('wk_normal_qc')" min="0" placeholder="0.0" v-model="formData.wk_normal_qc"  class="inppp tab_inp totalNum fofo" /></td>
          <td class="bor"><input type="number" @input="clearNoNum" @blur="cantFalse('wk_normal_others')" min="0" placeholder="0.0" v-model="formData.wk_normal_others"  class="inppp tab_inp totalNum fofo" /></td>
        </tr>
        <tr>
          <td>加班出勤：</td>
          <td class="bor"><input type="number" @input="clearNoNum" @blur="cantFalse('wk_ot_worker')" min="0" placeholder="0.0" v-model="formData.wk_ot_worker"  class="inppp tab_inp totalNum fofo" /></td>
          <td class="bor"><input type="number" @input="clearNoNum" @blur="cantFalse('wk_ot_technician')" min="0" placeholder="0.0" v-model="formData.wk_ot_technician"   class="inppp tab_inp totalNum fofo"></td>
          <td class="bor"><input type="number" @input="clearNoNum" @blur="cantFalse('wk_ot_assistant')" min="0" placeholder="0.0" v-model="formData.wk_ot_assistant" class="inppp tab_inp totalNum fofo" /></td>
          <td class="bor"><input type="number" @input="clearNoNum" @blur="cantFalse('wk_ot_material')" min="0" placeholder="0.0" v-model="formData.wk_ot_material"   class="inppp tab_inp totalNum fofo" /></td>
          <td class="bor"><input type="number" @input="clearNoNum" @blur="cantFalse('wk_ot_appearance')" min="0"  placeholder="0.0" v-model="formData.wk_ot_appearance"   class="inppp tab_inp totalNum fofo" /></td>
          <td class="bor"><input type="number" @input="clearNoNum" @blur="cantFalse('wk_ot_package')" min="0" placeholder="0.0" v-model="formData.wk_ot_package"   class="inppp tab_inp totalNum fofo" /></td>
          <td class="bor"><input type="number" @input="clearNoNum" @blur="cantFalse('wk_ot_label')" min="0" placeholder="0.0" v-model="formData.wk_ot_label"   class="inppp tab_inp totalNum fofo" /></td>
          <td class="bor"><input type="number" @input="clearNoNum" @blur="cantFalse('wk_ot_repairman')" min="0" placeholder="0.0" v-model="formData.wk_ot_repairman"   class="inppp tab_inp totalNum fofo" /></td>
          <td class="bor"><input type="number" @input="clearNoNum" @blur="cantFalse('wk_ot_qc')" min="0" placeholder="0.0" v-model="formData.wk_ot_qc"  class="inppp tab_inp totalNum fofo" /></td>
          <td class="bor"><input type="number" @input="clearNoNum" @blur="cantFalse('wk_ot_others')" min="0" placeholder="0.0" v-model="formData.wk_ot_others"   class="inppp tab_inp totalNum fofo" /></td>
        </tr>
      </table>
    </div>
    <div class="content other_content desc" style="padding-top:0;padding-bottom:10px;box-sizing:border-box;" >
      <span class="tipNameSp">项目名：</span><input v-model="formData.wo_project" placeholder="" disabled class="inp1  fofo" />
      <span class="tipNameSp othTipNameSp">制令数量：</span><span style="position:relative"><input  v-model="formData.wk_order_qty" @input="zhilin"  placeholder="0" disabled class="inp1 fofo zhilin_num" />
        <p class="musttrue" v-if="musttrue.zhilinsure" style="width:300px;" >制令量小于计划量加累计产出良品量了</p>      
      </span>
      <div class="line">
          <p><span class="tipNameSp">描述：</span></p>
          <textarea disabled v-model="formData.pt_desc1" placeholder=""  cols="30" rows="1" class="area_inp"></textarea>
      </div>
    </div>
    <div class="content other_content" >
      <span class="tipNameSp">不良品数合计：</span><input v-model="formData.wk_reject_qty" placeholder="0"  disabled class="inp1  fofo fofo fail_num" />
      <span class="tipNameSp othTipNameSp">累计产出良品量：</span><input v-model="formData.wk_allreal_qty" placeholder="0" disabled class="inp1  fofo all_well" />
      <span class="tipNameSp othTipNameSp_r">累计入库量：</span><input  v-model="formData.wk_allin_qty" placeholder="0" disabled class="inp1  fofo" />
      <span class="tipNameSp othTipNameSp_o">总人工工时：</span><input  v-model="formData.wk__chr01" placeholder="0" disabled class="inp1  fofo" />
      <span class="tipNameSp othTipNameSp_o">损失工时合计：</span><input  v-model="formData.wk__chr02" placeholder="0" disabled class="inp1  fofo" />
    </div>
    <div class="content other_content">
      <span class="tipNameSp">不良品：</span>
      <span style="margin-left:10px">责任部门：</span><el-select size="mini" v-model="wkd_wk_dept_id" @change="selectDeptName"  filterable placeholder="请选择">
                  <el-option v-for="(item,index) in deptarmentList" :key="index" :label="item.wk_dept_desc" :value="item.wk_dept_id"></el-option>
                </el-select>
      <span class="mar_span">原因：</span><el-select size="mini"   v-model="wkd_wk_reason_id" @change="selectReasonName" filterable placeholder="请选择">
                  <el-option  v-for="(item,index) in reasonList" :key="index" :value="item.wk_reason_id" :label="item.wk_reason_desc" ></el-option>
                </el-select>
      <span class="mar_span">数量：</span><input type="text"  v-model="wkd_qty" placeholder="数量"   style="width:100px;height:30px;border-radius:5px;border-color:#DCDFE6;" class="inp1 fofo otherInp">
      <el-button @click="saveTabList" size="mini" style="margin-left:20px;">保存</el-button>
      <table class="table_cont list_table" >
        <tr  style="text-align:center">
            <td>责任部门</td>
            <td>数量</td>
            <td>原因</td>
            <td>操作</td>
        </tr>
        <tr v-for="(item,index) in tableData" :key="index">
          <!-- <td ><input class="td_input" disabled type="text" :value="item.wkd_wk_dept_desc" ></td> -->
          <td><el-select class="td_input" size="mini" v-model="item.wkd_wk_dept_id"  :disabled="disa"  filterable placeholder="请选择">
                  <el-option v-for="(item1,inde) in deptarmentList1" :key="inde" :label="item1.wk_dept_desc" :value="item1.wk_dept_id"></el-option>
                </el-select></td>
          <td><input class="td_input" :disabled="disa" type="text" v-model="item.wkd_qty"  ></td>
          <td>
            <el-select size="mini" class="td_input"  v-model="item.wkd_wk_reason_id"  :disabled="disa" filterable placeholder="请选择">
                  <el-option  v-for="(item2,ind) in reasonList1" :key="ind" :value="item2.wk_reason_id" :label="item2.wk_reason_desc" ></el-option>
                </el-select>
          </td>
          <!-- <td> <input class="td_input" disabled type="text" :value="item.wkd_wk_reason_desc"></td> -->
          <td><el-button type="text" @click="getIndex(index)" >{{bianji}}</el-button>
            <el-button type="text" @click="cancel(index)">删除</el-button></td>
        </tr>
        <tr>
          <td colspan="4" v-if="tableData.length == 0">暂无数据</td>
        </tr>
      </table>
    </div>
    <el-dialog title="提示" :visible.sync="isShowSuccess" style="text-align:center" width="20%" :before-close="handleClose">
        <p style="margin-bottom:50px;">提交成功</p>
        <el-button type="primary" @click="checkRight">确 定</el-button>
    </el-dialog>
  </div>
  
  
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      formData:{
        wk_id:'',   
        wk_no:'',                // 工单号
        wk_date:'0',       // 日期
        wk_workshop_id:'', // 车间ID
        wk_line:'',        // 线别
        // wk_classes_desc:'',   // 班别
        wk_classes_id:'',      //班别id
        wk_machine:'',      // 机台号
        // wk_mode_desc:'',      //  生产方式
        wk_mode_id:"" ,       //生产方式id
        wk_plan_qty:0,     // 计划量
        wk_real_qty:0,     // 实际产出良品量
        wk_in_qty:0,       // 入库数量        
        wk_timesheet_time:0,  // 设备包工工时(小时)
        wk_loss_time:0,      // 损失工时汇总(小时)
        wk_normal_worker:0,      //员工
        wk_normal_technician:0,  // 技术员
        wk_normal_assistant :0,  // 班长
        wk_normal_material :0,     // 物料员
        wk_normal_appearance :0,     // 外观员
        wk_normal_package:0,       // 包装
        wk_normal_label:0,           // 打签员
        wk_normal_repairman:0,       // 修理
        wk_normal_qc:0,              // QC
        wk_normal_others:0,          // 其他后勤人员
        wk_reject_qty:0,
        wk_ot_worker:0,
        // wk_workshop_desc:'',      //车间号
        wk_ot_technician:0,
        wk_ot_assistant :0,
        wk_ot_material :0,
        wk_ot_appearance :0,
        wk_ot_package:0,
        wk_ot_label:0,
        wk_ot_repairman:0,
        wk_ot_qc:0,    
        wk_ot_others:0,
        wk_reject_qty:"0",
        wk_allreal_qty:'',
        wk_allin_qty:'',
        wo_project:'',     //  项目名:  
        wo_part:'0',        // 料号: 
        wk_order_qty:0,      // 制令数量: 
        wr_time_machine:'0',   // 标准设备工时: 
        wr_time_worker:'0',    // 标准人员工时:
        pt_desc1:'',        // 描述: 
        wk__chr01:'0',    // 总人工工时
        wk__chr02:'0',    // 损失工时
        // wkd_det_List:''   // 表格数据
      },
      options:[],
      options1:[],
      options2:[],
      musttrue:{
        gondanhao:false,
        riqi:false,
        jitaihao:false,
        xianbie:false,
        plantrue:false,
        hoursetrue:false,
        zhilinsure:false,
        cuowu:false,
      },
      tableData:[],
      deptarmentList:[],
      deptarmentList1:[],
      reasonList:[],      
      reasonList1:[],      
      wkd_wk_dept_id:'',
      wkd_wk_dept_id1:'',
      wkd_wk_reason_id:'',
      wkd_wk_reason_id1:'',
      wkd_wk_reason_id2:'',
      wkd_qty:'',
      wkdWkDeptName:'',
      wkdWkReasonName:'',
      wkdWkDeptName1:"",
      wkdWkDeptName2:"",
      morenzhi:'',
      morenzhi1:'',
      isShowSuccess:false,
      disa:true,
      bianji:"编辑"
    }
  },
  created(){
    let timestamp3 = new Date().getTime()
    this.formData.wk_date = this.changeTime(timestamp3);
  },
  mounted(){
    let timestamp3 = new Date().getTime()
    let that = this;
    console.log(this.$route.query)
    let rows=this.$route.query.id
    if(rows!=="abbbbbb"){
      let formData=this.formData
      console.log(rows)
      formData.wk_classes_id=rows.wk_classes_id || ''
      formData.wk_id=rows.wk_id || ''
      formData.wk_mode_id=rows.wk_mode_id ||''
      formData.wk_workshop_id=rows.wk_workshop_id || ''
      formData.wk_reject_qty=rows["不良品数合计"]  || 0
      formData.wk_in_qty=rows["入库数量"] || 0
      formData.wk_order_qty=rows["制令数量"] || 0
      formData.wk_ot_qc=rows["加班qc"] || 0
      formData.wk_ot_repairman=rows["加班修理"] || 0
      formData.wk_ot_others=rows["加班其他后勤人员"] || 0
      formData.wk_ot_package=rows["加班包装"] || 0
      formData.wk_ot_worker=rows["加班员工"] || 0
      formData.wk_ot_appearance=rows["加班外观员"] || 0
      formData.wk_ot_label=rows["加班打签员"] || 0
      formData.wk_ot_technician=rows["加班技术员"] || 0
      formData.wk_ot_material=rows["加班物料员"] || 0
      formData.wk_ot_assistant=rows["加班班长"] || 0
      formData.wk_real_qty=rows["实际产出良品量"] || 0
      formData.wk_no=rows["工单号"] || ''
      formData.wk_loss_time=rows["损失工时汇总(小时)"] || 0
      formData.pt_desc1=rows["描述"] || ''
      formData.wo_part=rows["料号"] || ''
      formData.wk_date=rows["日期"] ||this.changeTime(timestamp3)
      formData.wk_machine=rows["机台号"] || ''
      formData.wk_normal_worker=rows["正班员工"] || 0
      formData.wk_normal_technician=rows["正班技术员"] || 0
      formData.wk_normal_assistant=rows["正班班长"] || 0
      formData.wk_normal_material=rows["正班物料员"] || 0
      formData.wk_normal_appearance=rows["正班外观员"] || 0
      formData.wk_normal_package=rows["正班包装"] || 0
      formData.wk_normal_label=rows["正班打签员"] || 0
      formData.wk_normal_repairman=rows["正班修理"] || 0
      formData.wk_normal_qc=rows["正班qc"] || 0
      formData.wk_normal_others=rows["正班其他后勤人员"] || 0
      formData.wk_allreal_qty=rows["累计产出量"] || 0
      formData.wk_allin_qty=rows["累计入库量"] || 0
      formData.wk_line=rows["线别"] || 0
      formData.wk_plan_qty=rows["计划量"] || 0
      formData.wk_timesheet_time=rows["设备包工工时(小时)"] || 0
      formData.wk_workshop_desc=rows["车间"] || ''
      formData.wo_project=rows["项目名"] || ''   

      // let baseUrl = 'http://39.104.64.133:8080'
      let projUrl = '/Home/Index';
      let url = window.location.href;
      console.log(url);
      let baseUrl = url.substring(0,url.lastIndexOf(projUrl));
      $.ajax({
        url: baseUrl +'/Qzd_CodeDemo/wkd_det/getList',
        type: 'GET', // GET
        data:{queryJson:formData.wk_id},
        async: true,
        dataType: 'json',
        success: function(res) {
          if(res.code == 200){
            that.tableData = res.data;
          }
        }
      });    
    }else{
        $('.must1').removeAttr('disabled')
    }

    //  let baseUrl = 'http://39.104.64.133:8080'
      let projUrl = '/Home/Index';
      let url = window.location.href;
      // console.log(url);
      let baseUrl = url.substring(0,url.lastIndexOf(projUrl));
      $.ajax({
        url: baseUrl +'/Qzd_CodeDemo/wk_classes_setup/getList',
        type: 'GET', // GET
        async: true,
        dataType: 'json',
        success: function(res) {
          that.options = res.data;
          if(that.formData.wk_classes_id===""){
            that.formData.wk_classes_id = res.data[0].wk_classes_id;
          }
        }
      });
        $.ajax({
        url: baseUrl +'/Qzd_CodeDemo/wk_workshop_setup/getList',
        type: 'GET', // GET
        async: true,
        dataType: 'json',
        success: function(res) {
          that.options2 = res.data;
          if(that.formData.wk_workshop_id===''){
             that.formData.wk_workshop_id = res.data[0].wk_workshop_id;
          }
        }
      });
       $.ajax({
        url: baseUrl +'/Qzd_CodeDemo/wk_mode_setup/getList',
        type: 'GET', // GET
        async: true,
        dataType: 'json',
        success: function(res) {
            that.options1 = res.data;
            if(that.formData.wk_mode_id ===''){
              that.formData.wk_mode_id = res.data[0].wk_mode_id;
            }
        }
      });

    $(function() {  
      $(".fofo").keypress(function(e) {  
      if (e.which == 13) {// 判断所按是否回车键  
          var inputs = $(".fofo"); // 获取表单中的所有输入框  
          var idx = inputs.index(this); // 获取当前焦点输入框所处的位置  
          if (idx == inputs.length - 1) {// 判断是否是最后一个输入框  
              // if (confirm("最后一个输入框已经输入,是否提交?")) // 用户确认  
              // $(".fofo").submit(); // 提交表单  
          } else {  
              inputs[idx + 1].focus(); // 设置焦点  
              inputs[idx + 1].select(); // 设置焦点  
          }  
          return false;// 取消默认的提交行为  
        }  
        });  
    }); 
    // // 获取部门信息
    this.$http.get('/Qzd_CodeDemo/wk_dept/GetList').then((res)=>{
      // console.log(res);
      if(res.data.code == 200){
        this.deptarmentList = res.data.data;
        this.deptarmentList1 = res.data.data;
      }else{
        this.$message.error(res.data.info)
      }
      // console.log(this.deptarmentList);
    }).catch((res)=>{
      this.$message.error(res.data.info)
    })        
    let img_url =[];
    let num = 0;
    $(".totalNum").each(function(){
        if($(this).val()!==""){
            img_url.push($(this).val());
        }
    })
    for(let i=0;i<img_url.length;i++){
      num += parseFloat(img_url[1]);
    }
    if(Number(num)){
      this.formData.wk__chr01 = num.toFixed(1) || 0;
    }else{
      this.formData.wk__chr01 = 0;
    }
  },
  methods:{ 
    cantFalse(eve){
      for (var item in this.formData){
        if(this.formData[item]*1<0 ){
          this.$message.error('填写数字不能为负数')
          return
        }
      }
      for(let i in this.formData){
        if(i==eve && this.formData[i]==""){
          this.formData[i]=0
        }
      }
    },
    getIndex(index){
      this.disa=!this.disa
      if(this.disa==true){
        this.bianji="编辑"
      }else{this.bianji="保存"}
      // console.log($(".td_input").val())
      console.log(this.tableData)
      let num = 0;
      for(let i=0;i<this.tableData.length;i++){
          num +=  parseFloat(this.tableData[i].wkd_qty);
      }
      this.formData.wk_reject_qty = num;
      if($('.plan_num').val()*1 < ($('.output_num').val()*1+this.formData.wk_reject_qty*1)){
        this.musttrue.plantrue=true
      }else{this.musttrue.plantrue=false}
    },
    //判断必填项不能为空
    must2:function(){
      if($(".must2").val()==''){
        this.musttrue.riqi=true
      }else{this.musttrue.riqi=false}
    },
    must3:function(){
      if($(".must3").val()==''){
        this.musttrue.xianbie=true
      }else{this.musttrue.xianbie=false}
    },
    must4:function(){
      if($(".must4").val()==''){
        this.musttrue.jitaihao=true
      }else{this.musttrue.jitaihao=false}
    },
    searchData(){
        //获取制令行项目名数量
      
      
      console.log($('.must1').val())
      if($.trim($('.must1').val())=="" ){
        this.musttrue.gondanhao=true
        this.musttrue.cuowu=false
        console.log(this.musttrue.cuowu);

      }else{this.musttrue.gondanhao=false
            this.$http.get(`/Qzd_CodeDemo/wr_route/GetStandarStatistics?queryjson={"wr_domain":"SZWS","wr_lot":"${this.formData.wk_no}"}`).then((res)=>{
        // console.log(res.data.data)
        if(res.data.code == 200){
          let obj = res.data.data[0];
          this.formData.wr_time_machine = obj.total_wr_setup || '';
          this.formData.wr_time_worker = obj.total_wr_run || '';
        }else{
          // this.$message.error('您输入的工单号有误,请确认后再填写！')
        }
      }).catch((res)=>{
        // this.$message.error('您输入的工单号有误,请确认后再填写！')
        this.formData.wr_time_machine = '';
        this.formData.wr_time_worker = '';
      })
      this.$http.get(`/Qzd_CodeDemo/pt_mstr/getList?queryjson={"wk_no":"${this.formData.wk_no}","pt_domain":"SWSX"}`).then((res)=>{
        // console.log(res.data.data)
        if(res.data.code == 200){
          let obj = res.data.data[0];
          this.formData.pt_desc1 = obj.pt_desc1 || '';
        }
      }).catch((res)=>{
        this.formData.pt_desc1 = '';
      })
      // 获取统计数
      this.$http.get(`/Qzd_CodeDemo/wk_mstr/GetDataStatistics?queryJson={"wk_no":"${this.formData.wk_no}","wr_route":"SWSX"}`).then((res)=>{
        // console.log(res.data.data)
        if(res.data.code == 200){
          let obj = res.data.data[0];
          this.formData.wk_allreal_qty = obj.total_wk_real_qty;
          this.formData.wk_allin_qty = obj.total_wk_in_qty;
          this.formData.wk__chr02 = obj.total_wk_loss_time;
        }
      }).catch((res)=>{
        this.formData.wk_allreal_qty = '';
        this.formData.wk_allin_qty = '';
        this.formData.wk__chr02 = '';
      })

          this.$http.get(`/Qzd_CodeDemo/wo_mstr/getlist?queryjson={"wo_lot":"${this.formData.wk_no}","wo_domain":"SWSX"}`).then((res)=>{
        // console.log(res.data.data)
        if(res.data.code == 200){
          let length = res.data.data.length;
          let obj = res.data.data[length-1];
          this.formData.wo_project = obj.wo_project || '';
          this.formData.wo_part = obj.wo_part || '';
          this.formData.wk_order_qty = obj.wo_qty_ord || '';
          this.musttrue.cuowu=false;
          if(this.formData.wk_order_qty*1<=($('.plan_num').val()*1)+$('.all_well').val()*1){
            this.musttrue.zhilinsure=true
          }else{this.musttrue.zhilinsure=false}
        }else{
          this.musttrue.cuowu=true
          this.$message.error('您输入的工单号有误,请确认后再填写！')
          this.formData.wo_project = '';
          this.formData.wo_part = '';
          this.formData.wr_time_machine = 0;
          this.formData.wr_time_worker = 0;
          this.formData.wk_allreal_qty = 0;
          this.formData.wk_allin_qty = 0;
          this.formData.wk__chr02 = 0;
          this.formData.pt_desc1 = '';  
          this.formData.wk_order_qty=0        
        }
      }).catch((res)=>{
        this.musttrue.cuowu=true
        this.$message.error('您输入的工单号有误,请确认后再填写！');
        this.formData.wo_project = '';
        this.formData.wo_part = '';
        this.formData.wr_time_machine = 0;
        this.formData.wr_time_worker = 0;
        this.formData.wk_allreal_qty = 0;
        this.formData.wk_allin_qty = 0;
        this.formData.wk__chr02 = 0;
        this.formData.pt_desc1 = '';
         this.formData.wk_order_qty=0  
        // this.formData.wk_order_qty =  '';
      })

      }
    },
    changeTime(val){
      let date = new Date(val);
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = date.getDate() + ' ';
      let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      let lastTime = Y + M + D + h + m + s;
      return lastTime;
    },
    saveTabList(){     
      if(this.wkd_wk_dept_id == ''|| this.wkd_wk_reason_id == '' || this.wkd_qty == ''){
        this.$message('请填完信息')
        return;
      }
      if(!(/^-?[0-9]\d*$/.test(parseFloat(this.wkd_qty)))){
        this.$message('数量必须是整数')
        return;
      }
      this.tableData.push({wkd_wk_dept_id:this.wkd_wk_dept_id,wkd_qty:this.wkd_qty+'.00',wkd_wk_reason_id:this.wkd_wk_reason_id});
      this.wkd_wk_dept_id = '';
      this.wkd_wk_reason_id = '';
      this.wkd_qty = '';
      console.log(this.tableData)
      this.morenzhi=""
      this.morenzhi1=""
      let num = 0;
      for(let i=0;i<this.tableData.length;i++){
          num +=  parseFloat(this.tableData[i].wkd_qty);
      }
      this.formData.wk_reject_qty = num;
      this.wkd_wk_dept_id =""
      this.wkd_wk_reason_id == ''
      this.wkd_qty == ''
      if($('.plan_num').val()*1 < ($('.output_num').val()*1+this.formData.wk_reject_qty*1)){
        this.musttrue.plantrue=true
      }else{this.musttrue.plantrue=false}
    },
    cancel(index){
      this.tableData.splice(index,1);
      let num = 0;
      for(let i=0;i<this.tableData.length;i++){
          num +=  parseFloat(this.tableData[i].wkd_qty);
      }
      this.formData.wk_reject_qty = num;
      if($('.plan_num').val()*1 < ($('.output_num').val()*1+this.formData.wk_reject_qty*1)){
        this.musttrue.plantrue=true
      }else{this.musttrue.plantrue=false}
    },
    clearNoNum(e){
      let img_url =[];
      let num = 0;
      $(".totalNum").each(function(){
        if($(this).val()!==""){
            img_url.push($(this).val());
        }
          
      })
      // console.log(img_url)
      for(let i=0;i<img_url.length;i++){        
        num += parseFloat(img_url[i]);
      }
      // img_url.forEach(el=>{
      //   el +=parseFloat(el)
      // })
      if(Number(num)){
        this.formData.wk__chr01 = num.toFixed(1) || 0;
      }else{
        this.formData.wk__chr01 = 0;
      }
      console.log(this.formData.wk__chr01)
    },
    submitForm(){ 
            if($('.must1').val()==''){
        this.musttrue.gondanhao=true
      }else{this.musttrue.gondanhao=false}
         if($(".must3").val()==''){
        this.musttrue.xianbie=true
      }else{this.musttrue.xianbie=false}
       if($(".must4").val()==''){
        this.musttrue.jitaihao=true
      }else{this.musttrue.jitaihao=false}
     let musttrue=this.musttrue 
      console.log(this.formData);
      for (var item in this.formData){
        if(this.formData[item] === '' && item !== 'wk_allin_qty' && item !== 'wk_allreal_qty' &&  item !== 'wk_reject_qty' && item !== 'wk__chr01' && item !== 'wo_part' && item !== 'wr_time_worker'
           && item !== 'wr_time_machine' && item !== 'wk_order_qty' && item !== 'wk__chr02'  && item !== 'pt_desc1' && item !=='wr_time_machine' && item!=='wk_date' && item !== 'wo_project'
           && item !=='wk_workshop_id' && item !== 'wk_classes_id' && item !=='wk_mode_id' &&item !=='wk_id' && item!=='wkd_det_List' ){
             this.$message('请填完所有信息')
          return
        }
      }
      for(let item in musttrue){
        if(musttrue[item]){
          this.$message("填写信息有误请检查后再提交")
            return
        }
      }
      this.formData.wkd_det_List = this.tableData;
      let that = this;
      //  let baseUrl = 'http://39.104.64.133:8080' 
      let projUrl = '/Home/Index';
      let url = window.location.href;
      let baseUrl = url.substring(0,url.lastIndexOf(projUrl));
        console.log(this.formData);
      this.$confirm('你确定提交吗?', '提示', {
        }).then(() => {
          $.ajax({
            url: baseUrl + '/Qzd_CodeDemo/wk_mstr/SaveForm',    
            type: 'POST', // GET
            async: true,
            data: that.formData,
            success: function(res) {
              console.log(res)
              let resp= JSON.parse(res);
              if(resp.code==200){
                that.isShowSuccess = true;
                that.$router.push({path:'/'});
              }else{that.$message.error('提交错误请与后台管理者联系')}
              //判断返回值CODE为200的时候才保存成功 跳转原页面
            }
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        });
      });      

    },
    selectDeptName(e){
      let obj = {};
      obj = this.deptarmentList.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.wk_dept_id === e;//筛选出匹配数据
      });
      this.wkdWkDeptName = obj.wk_dept_desc;
      this.wkd_wk_dept_id = obj.wk_dept_id;
      // // 获取原因信息
      this.$http.get(`/Qzd_CodeDemo/wk_dep_res/GetResListByDeptId?deptId=${e}`).then((res)=>{
        // console.log(res)
        if(res.data.code == 200){
          this.reasonList = res.data.data;
          this.reasonList1 = res.data.data;
          console.log(this.reasonList)
        }else{
          this.$message.error(res.data.info);
        }
      }).catch((res)=>{
        this.$message.error(res.data.info)
      })
    },
    selectDeptName1(e){
       let obj = {};
      obj = this.deptarmentList1.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.wk_dept_id === e;//筛选出匹配数据
      });
      this.wkdWkDeptName1=obj.wk_dept_desc
      this.wkd_wk_dept_id1=obj.wk_dept_id;
    },
    selectReasonName(e){
      let obj = {};
      obj = this.reasonList.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.wk_reason_id === e;//筛选出匹配数据
      });
      this.wkdWkReasonName = obj.wk_reason_desc;
      this.wkd_wk_reason_id = obj.wk_reason_id;
    },
    selectReasonName1(e){
      let obj = {};
      obj = this.reasonList1.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.wk_reason_id === e;//筛选出匹配数据
      });
      this.wkdWkReasonName2= obj.wk_reason_desc;
      this.wkd_wk_reason_id2 = obj.wk_reason_id;
    },
    handleClose(){
      this.isShowSuccess = false;
      this.$router.go(0);
    },
    checkRight(){
      this.isShowSuccess = false;
      this.$router.go(0);
    },
    plan(){
    if($('.plan_num').val()*1 < ($('.output_num').val()*1+$(".fail_num").val()*1)){
       this.musttrue.plantrue=true
    }else{this.musttrue.plantrue=false}
    if($('.zhilin_num').val()<=($('.plan_num').val()*1)+$('.all_well').val()*1){
          this.musttrue.zhilinsure=true
        }else{this.musttrue.zhilinsure=false}
        },
        
    output(){
        if(($('.output_num').val()*1+$(".fail_num").val()*1) > $('.plan_num').val()*1){
          //  $('.output_num').val(($('.plan_num').val()-$(".fail_num").val()))
          this.musttrue.plantrue=true         
        }else{
          this.musttrue.plantrue=false
          }
        if($('.hourse_num').val()*1 > $('.output_num').val()*1){
          this.musttrue.hoursetrue=true
        }else{ this.musttrue.hoursetrue=false}
      },
    hourse(){
           if($('.hourse_num').val()*1 > $('.output_num').val()*1){
          this.musttrue.hoursetrue=true
        }else{ this.musttrue.hoursetrue=false}
      },
      zhilin(){
        if($('.zhilin_num').val()<=($('.plan_num').val()*1)+$('.all_well').val()*1){
          this.musttrue.zhilinsure=true
        }else{his.musttrue.zhilinsure=false}
      },
    cancel1(){
      this.$router.push({path:'/',query:{id:'1'}}); 
    },
    chooseVal(){
      // this.formData.wk_classes_id=$('.must').val()
    },
    chooseVal1(){
      //  this.formData.wk_mode_id=$('.chooseVal1').val()
    },
    chooseVal2(){
      // this.formData.wk_workshop_id=$('.chooseVal2').val()
    }
    }
  }
</script>

<style scoped>
   #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 1250px;
  font-size: 13px;
  background: #ffffff;
  min-height: 100vh;
  padding-bottom: 5px;
  box-sizing: border-box;
}
.top{
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  padding: 0 30px;
  box-sizing: border-box;
}
.top p{
  line-height: 40px;
}
.top_btn{
  width:100px;
}
.content{
  width: 95%;
  min-height: 50px;
  margin: 8px auto;
  background: #FFFFFF;
  border: 1px solid #eeeeee;
  padding: 0px 0 10px;
  box-sizing: border-box;
  /* display: flex; */
}
.inp1{
  margin-top: 14px;
  width: 9%;
  height: 28px;
  border: 1px solid #DCDFE6;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #545454; 
  padding-left: 10px;
  box-sizing: border-box;
  border-radius: 5px;
}
.select_inp{
  width: 8%;
  margin-right:10%;
  border-radius: 5px;
}
.inp2{
  margin-right: 2%;
  width: 8%;
  height: 30px;
  border: 1px solid #ccc;
  padding-left: 10px;
  box-sizing: border-box;
}
.area_inp{
  padding-left: 10px;
  box-sizing: border-box;
  width: 70%;
  max-width: 1000px;
  min-width: 1010px;
  border-radius: 5px;
}
.line{
  display: flex;
  margin-top: 15px;
}
.line p{
  height: 30px;
  line-height: 20px;
}
.line textarea{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #545454; 
}
.l_inp{
  width: 100px;
}
.ll_inp{
  width: 80px;
}
.table_cont{
  margin-top: 0px;
  margin-left: 35px;
  border-collapse:collapse;
}
tr{
  height: 40px;
}
.first_tr{
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.bor{
  width: 100px;
  border: 1px solid #cccccc;
}
.inppp{
  padding-left: 10px;
  box-sizing: border-box;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #545454; 
}
.tab_inp {
  width:100px;
  height:40px;
  border:none;
}
.tab_inp /deep/ .el-input__inner{
  width:100px;
  height:40px;
  border:none;
}
.elform{
  width: 100px;
  display: flex;
  flex-direction: column;
}
.elform div p{
  display: inline-block;
}
.el-form-item{
  display: inline-block;
}
.set{
  width:200px;
}
.trrr{
  height: 50px;
  border-bottom: 1px solid #EBEEF5;
}
.trrr td{
  width: 100px;
  text-align: center;
}
.list_table{
  width: 94%;
  text-align: center;
}
.list_table tr{
  border-bottom: 1px solid #ccc;
}
.list_table td{
  width: 10%;
  line-height: 40px
}
.mar_span{
  margin-left: 20px; 
}
.otherInp::-webkit-input-placeholder {    
  color: #C0C4CC;     
}
.musttrue{
  font-size:12px;
  height:20px;
  color:red;  
  position:absolute;
  top: 23px;
  left: 0px;
}
.td_input{
  border:none;
  background:white;
  outline:none;
  text-align: center;
}
.tipNameSp{
  display: inline-block;
  width: 100px;
  text-align: right;
}
.othTipNameSp{
  width: 110px;
  margin-left: 10px;
}
.othTipNameSp_o{
  width: 130px;
  margin-left: 10px;
}
.othTipNameSp_r{
  width: 95px;
  margin-left: 10px;
}

</style>


