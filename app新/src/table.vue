<template>
  
  <div id="app">
    <!-- <router-view /> -->
    <div class="top">
      <p>生产管理 > 车间数据录入</p>
      <div>
        <el-button size="small" class="top_btn" @click="submitForm" >提交</el-button>
        <el-button size="small" class="top_btn" @click="cancelEdit">取消</el-button>
      </div>
    </div>
    <div class="content" style="padding-bottom:15px;box-sizing:border-box"  >
      <div > 
          <span class="tipNameSp col1"><span style="color:red">* </span>工单号：</span> <span style="position:relative"> <input type="text" @blur="searchData"   v-model="formData.wk_no" placeholder="" class="inp1 fofo must1">
          <p class="musttrue" v-if="musttrue.gondanhao" >工单号不能为空</p>
          <p class="musttrue" v-if="musttrue.cuowu" >您输入的工单号有误</p>
          </span>
          <span class="tipNameSp othTipNameSp col2">料号：</span><input v-model="formData.wo_part"  placeholder="0" disabled class="inp1  " />
          <span class="tipNameSp othTipNameSp_r col3">标准人工工时：</span><input v-model="formData.wr_time_worker" placeholder="0" disabled class="inp1 " />
          <span class="tipNameSp othTipNameSp_o col4">标准设备工时：</span><input v-model="formData.wr_time_machine"  placeholder="0" disabled class="inp1 " />
          <span class="tipNameSp othTipNameSp col5" :disabled="isDisabled" id='workShop'>车间：</span>
          <select class="inp1  fofo chooseVal1" v-model="formData.wk_workshop_id" @input="chooseVal2" :disabled="isDisabled" >
            <option selected disabled style="display:none">请选择</option>
            <option v-for="(item,index) in options2" :key="index" :value="item.wk_workshop_id">{{item.wk_workshop_desc}}</option>
          </select>
      </div>
      <div>
        <span class="tipNameSp col1"><span style="color:red">* </span>
        <!-- :disabled="isDisabled"  下面的日期字段的时间的disabled仅仅在测试的时候屏蔽-->
        日期：</span> 
        <!-- <input id="meeting"  @blur="must2" v-model="formData.wk_date"  class="inp1 must2" @click="toChooseTime"/>  -->
        <!--日期控件-->
          <el-date-picker
            class="inp1 must2"
            v-model="formData.wk_date"
            @change="formDataTime"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
            style="border:none !important;" 
            :disabled="isDisabled"
          >
          </el-date-picker>
        <p class="musttrue" v-if="musttrue.riqi">日期不能为空</p>
      
        
          <span class="tipNameSp othTipNameSp_r col2"><span style="color:red">* </span>线别：</span><span style="position:relative"><input type="text"  @blur="must3" maxlength="10" v-model="formData.wk_line" placeholder="单行输入"  class="inp1 fofo must3">
          <p class="musttrue" v-if="musttrue.xianbie"  >线别不能为空</p>
        </span>
        
        <span class="tipNameSp othTipNameSp_o col3" style="margin-left:-14px;" id="classEs">班别：</span>
        <select class="inp1  fofo must" v-model="formData.wk_classes_id" @input="chooseVal" >
          <option selected disabled style="display:none">请选择</option>
          <option v-for="(item,index) in options" :key="index" :value="item.wk_classes_id">{{item.wk_classes_desc}}</option>            
        </select>

        <span class="tipNameSp machineNo col4"><span style="color:red">* </span> 机台号：</span> <span style="position:relative"><input type="text" @blur="must4" maxlength="10" v-model="formData.wk_machine"  placeholder="单行输入" class="inp1 fofo must4" />
        <p class="musttrue" v-if="musttrue.jitaihao">机台号不能为空</p>
        </span>
        <span class="tipNameSp othTipNameSp col5"><span style="color:red" id="productWay">* </span>生产方式：</span>
        <select class="inp1 fofo chooseVal1" v-model="formData.wk_mode_id"  @input="chooseVal1">
            <option selected disabled style="display:none">请选择</option>
            <option v-for="(item,index) in options1" :key="index" :value="item.wk_mode_id">{{item.wk_mode_desc}}</option>
        </select>
        <br />
        <span class="tipNameSp col1">计划量：</span> <span style="position:relative"><input v-model="formData.wk_plan_qty" @input="plan" @blur="cantFalse('wk_plan_qty')" type="number" placeholder="0.0" min="0" class="inp1 fofo plan_num" />
        <div class="musttrue" v-if="musttrue.plantrue || musttrue.hoursetrue">
          <p  v-if="musttrue.plantrue" style="width:300px;" >您的计划量小于实际产出良品量加不良量了</p>
          <p  v-if="musttrue.hoursetrue"  style="width:300px;" >您的实际产出良品量小于入库量了</p>
        </div>
        </span>
        <span class="tipNameSp othTipNameSp col2">实际产出良品量：</span><input v-model="formData.wk_real_qty" @input="output" @blur="cantFalse('wk_real_qty')" type="number" min="0" placeholder="0.0" class="inp1 fofo output_num" />
        <span class="tipNameSp othTipNameSp_r col3">入库数量：</span><input  v-model="formData.wk_in_qty" @input="hourse" @blur="cantFalse('wk_in_qty')" placeholder="0.0" min="0" type="number" class="inp1 fofo hourse_num" />
        <span class="tipNameSp othTipNameSp_o col4">设备报工工时(小时)：</span><input v-model="formData.wk_timesheet_time" @blur="cantFalse('wk_timesheet_time')" min="0" type="number" placeholder="0.0" class="inp1 fofo" />
        <span class="tipNameSp othTipNameSp_o col5">损失工时汇总(小时)：</span><input v-model="formData.wk_loss_time" @blur="cantFalse('wk_loss_time')" min="0" type="number" placeholder="0.0" class="inp1 fofo sunshi" disabled/> <!--这一项更改为下面的汇总-->   
      </div>

    </div>
    <div class="content other_content col1" style="padding-top:10px;padding-bottom:10px;box-sizing:border-box;" >
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
    <!--在下面这个表的右边再放一张不良品录入的表-->
    <div class="content other_content setParent">
      <!-- 不良品换损失工时 -->
      <div class="wk_loss_timeSet">
        <span class="tipNameSp">损失工时：</span>
        <span style="margin-left:10px">责任部门：</span>
        <!--v-model:wkd_wk_dept_id绑定的值  -->
          <el-select size="mini" v-model="wkd_wk_dept_id" @change="selectDeptName(wkd_wk_dept_id,wkd_wk_reason_id)"  filterable placeholder="请选择">
            <el-option class="dep_select" v-for="(item,index) in deptarmentList" :key="index" :label="item.wk_dept_desc" :value="item.wk_dept_id"></el-option>
          </el-select>
        <span class="mar_span">原因：</span>
          <el-select size="mini"   v-model="wkd_wk_reason_id"  @change="selectReasonName" filterable placeholder="请选择">
            <el-option class="reason_select" v-for="(item,index) in reasonList" :key="index" :value="item.wk_reason_id" :label="item.wk_reason_desc" ></el-option>
          </el-select>
          <!-- 数量换工时 -->
        <span class="mar_span">工时：</span><input type="text"  v-model="wkd_qty" placeholder="工时"   style="width:100px;height:30px;border-radius:5px;border-color:#DCDFE6;" class="inp1 fofo otherInp">
        <el-button @click="saveTabList(wkd_wk_dept_id,wkd_wk_reason_id)" size="mini" style="margin-left:20px;">保存</el-button>
        <table class="table_cont list_table" >
          <tr  style="text-align:center">
              <td>责任部门</td>
              <!-- 数量>>工时 -->
              <td>工时</td>
              <td>原因</td>
              <td>操作</td>
          </tr>
          <tr v-for="(item,index) in tableData" :key="index">
            <!-- <td ><input class="td_input" disabled type="text" :value="item.wkd_wk_dept_desc" ></td> -->
            <!-- 责任部门 -->
            <td>
              <!--作为编辑的数据 不加disable-->
              <!-- :disabled="evTarget == index ? (isChoose ? false : true) :true " -->
              <el-select v-if="evTarget == index ? (!isChoose ? false : true) :false"  class="td_input newClassWiden" size="mini"  v-model="item.wkd_wk_dept_id"   filterable placeholder="请选择"
                  @change="selectLossSonName(item.wkd_wk_dept_id,item.wkd_wk_reason_id)" 
              >
                <!--尝试与deptarmentList 挂钩,但是要加上自己那条的数据-->
                <el-option v-for="(item1,inde) in deptarmentList1" :key="inde" :label="item1.wk_dept_desc" :value="item1.wk_dept_id"></el-option>
              </el-select>
              <!--作为显示的数据 加disable-->
              <el-select  v-else class="td_input newClassWiden" size="mini" :disabled="evTarget == index ? (isChoose ? false : true) :true " v-model="item.wkd_wk_dept_id"   filterable placeholder="请选择">
                <el-option v-for="(item1,inde) in deptarmentList1" :key="inde" :label="item1.wk_dept_desc" :value="item1.wk_dept_id"></el-option>
              </el-select>

            </td>
            <td><input class="td_input"  type="text" v-model="item.wkd_qty" :disabled="evTarget == index ? (isChoose ? false : true) :true " /></td><!--输入的工时-->
            <td>
              <!--做为编辑的数据，不加disable-->
              <!-- :disabled="evTarget == index ? (isChoose ? false : true) :true " -->
              <el-select @change="selectReasonItem(item.wkd_wk_dept_id,item.wkd_wk_reason_id)" v-if="evTarget == index ? (!isChoose ? false : true) :false"  size="mini" class="td_input newClassWiden"  v-model="item.wkd_wk_reason_id"   filterable placeholder="请选择">
                <el-option  v-for="(item2,ind) in reasonListAddSelf" :key="ind" :value="item2.wk_reason_id" :label="item2.wk_reason_desc" ></el-option>
              </el-select>
              <!--作为显示加disable-->
              <!--仅显示的时候,显示全部的reason-->
              <el-select v-else size="mini" class="td_input newClassWiden" :disabled="evTarget == index ? (isChoose ? false : true) :true "  v-model="item.wkd_wk_reason_id"   filterable placeholder="请选择">
                <el-option  v-for="(item2,ind) in allReasonList" :key="ind" :value="item2.wk_reason_id" :label="item2.wk_reason_desc" ></el-option>
              </el-select>
            </td>
            <!-- <td> <input class="td_input" disabled type="text" :value="item.wkd_wk_reason_desc"></td> -->
            <td>
              <el-button type="text" @click="getIndex(index,item.wkd_wk_reason_id,item.wkd_wk_dept_id)" ><!--index,resId,depId-->
                <span v-if="evTarget == index ? (!isChoose ? false : true) :false">保存</span>
                <!-- <span v-if="evTarget != index">编辑</span> -->
                <span v-else @click="searchReasonListOnce(item.wkd_wk_dept_id,item.wkd_wk_dept_id)">编辑</span>
              </el-button>
              <!--增加了每条数据的id字段-->
              <el-button type="text" @click="cancel(index,item.wkd_wk_reason_id,item.wkd_wk_dept_id)">删除</el-button>
            </td>
          </tr>
          <tr>
            <td colspan="4" v-if="tableData.length == 0">暂无数据</td>
          </tr>
        </table>
      </div>
      <!--追加的不良品录入-->
      <!-- WK_UNHEALTHY_ID WK_NUM -->
      <div class="wx_rejectSet">
        <span class="tipNameSp">不良品录入：</span>
        <span style="margin-left:10px">不良品类型：</span>
          <el-select size="mini" v-model="wk_unhealthy_id" @change="selectRejName"  filterable placeholder="请选择">
            <el-option class="dep_select" v-for="(item,index) in rejectList" :key="index" :label="item.wk_unhealthy_name" :value="item.wk_unhealthy_id"></el-option>
          </el-select>
        <span class="mar_span">数量：</span><input type="text"  v-model="wk_num" placeholder="数量"  style="width:100px;height:30px;border-radius:5px;border-color:#DCDFE6;" class="inp1 fofo otherInp">
        <el-button @click="saveTabList2" size="mini" style="margin-left:20px;">保存</el-button>
        <table class="table_cont list_table">
          <tr  style="text-align:center">
              <td>不良品类型</td>
              <td>数量</td>
              <td>操作</td>
          </tr>
          <tr v-for="(item,index) in tableData2" :key="index">
            <!-- 需要添加的字段 wk_unhealthy_id  WK_UNHEALTHY_ID:-->
            <td>
              <!-- disabled -->
              <!--作为编辑不加disable-->
              <!--尝试让下面的下拉和上面已经减过的同步-->
              <el-select  v-if="evTarget1 == index ? (!isChoose1 ? false : true) :false" class="td_input newClassWiden" size="mini" v-model="item.wk_unhealthy_id"  filterable placeholder="请选择"><!--:disabled="isEditDisable1"-->
                <el-option v-for="(item1,inde) in rejectListAddSelf" :key="inde" :label="item1.wk_unhealthy_name" :value="item1.wk_unhealthy_id"></el-option>
              </el-select>
              <!--作为显示，加disable-->
              <el-select v-else class="td_input newClassWiden" size="mini" v-model="item.wk_unhealthy_id"  :disabled="evTarget1 == index ? (isChoose1 ? false : true) :true "  filterable placeholder="请选择"><!--:disabled="isEditDisable1"-->
                <el-option v-for="(item1,inde) in rejectList1" :key="inde" :label="item1.wk_unhealthy_name" :value="item1.wk_unhealthy_id"></el-option>
              </el-select>
            </td>
            <!-- disabled -->
            <td><input class="td_input"  type="text" v-model="item.wk_num" :disabled="evTarget1 == index ? (isChoose1 ? false : true) :true " ></td><!--输入的不良品数量--> <!--:disabled="isEditDisable1"-->
            <td>
              <!-- 操作加入的不良品记录 -->
              <el-button type="text" @click="getIndex1(index,item.wk_unhealthy_id)" ><!--把getIndex函数里面的逻辑放入这个-->
                <span v-if="evTarget1 == index ? (!isChoose1 ? false : true) :false">保存</span>
                <!-- <span v-if="evTarget != index">编辑</span> -->
                <span v-else @click="setOnceUnhealthyType(item.wk_unhealthy_id)">编辑</span>
              </el-button>
              <!--删除动作加入了每条数据的id--->
              <el-button type="text" @click="cancel1(index,item.wk_unhealthy_id)">删除</el-button>
            </td>
          </tr>
          <tr>
            <td colspan="4" v-if="tableData2.length == 0">暂无数据</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="content other_content desc" style="padding-top:0;padding-bottom:10px;box-sizing:border-box;" >
      <span class="tipNameSp projName col1"  >项目名：</span><input v-model="formData.wo_project" placeholder=""  disabled class="inp1  fofo" />
      <span class="tipNameSp othTipNameSp col2">制令数量：</span><span style="position:relative"><input  v-model="formData.wk_order_qty" @input="zhilin"  placeholder="0" disabled class="inp1 fofo zhilin_num" />
        <p class="musttrue" v-if="musttrue.zhilinsure" style="width:300px;" >制令量小于计划量加累计产出良品量了</p>      
      </span>
      <span class="tipNameSp badGoodSum col3">不良品数合计：</span><input v-model="formData.wk_reject_qty" placeholder="0"  disabled class="inp1  fofo  fail_num" />
      <span class="tipNameSp othTipNameSp col4">累计产出良品量：</span><input v-model="formData.wk_allreal_qty" placeholder="0" disabled class="inp1  fofo all_well" />
      <span class="tipNameSp othTipNameSp_r sumInPty col5">累计入库量：</span><input  v-model="formData.wk_allin_qty" placeholder="0" disabled  class="inp1  fofo" />
      <br />
      <span class="tipNameSp othTipNameSp_o sumWorkerTime col1">总人工工时：</span><input  v-model="formData.wk__chr01" placeholder="0" disabled class="inp1  fofo" />
      <span class="tipNameSp othTipNameSp_o loseWorkTime col2">损失工时合计：</span><input  v-model="formData.wk__chr02" placeholder="0" disabled class="inp1  fofo" />
      <div class="line col1">
          <p><span class="tipNameSp col1">描述：</span></p>
          <textarea disabled v-model="formData.pt_desc1" placeholder=""  cols="30" rows="1" class="area_inp"></textarea>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="isShowSuccess" style="text-align:center" width="20%" :before-close="handleClose">
        <p style="margin-bottom:50px;">提交成功</p>
        <el-button type="primary" @click="checkRight">确 定</el-button>
    </el-dialog>
  </div>
  
  
</template>

<script>
import './utils/getTime';//格式化时间的函数
export default {
  name: 'App',
  data(){
    return{
      //////
      //用于控制子表的编辑和不可编辑
      //用于控制工时子表
      isChoose:false,
      evTarget:0,
      isEditAllow:true,
      //用于控制不良品zi表
      isChoose1:false,
      evTarget1:0,
      isEditAllow1:true,
      //时间选择控件的数据
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      isEditDisable:true,//是否可编辑
      isEditDisable2:true,//是否可编辑2
      clickIndex:'',
      clickIndex1:'',
      value1: '',
      value2: '',
      value3: '',
      /////
      wk_userid:'',//需要携带的创建人id
      formData:{
        wk_userid:'',//新增的创建人id
        wk_id:'', //回写时候用到的  
        wk_no:'',                // 工单号
        wk_date:'0',       // 日期
        wk_workshop_id:'', // 车间ID
        wk_line:'',        // 线别
        wk_classes_desc:'',   // 班别
        wk_classes_id:'',      //班别id
        wk_machine:'',      // 机台号
        wk_mode_desc:'',      //  生产方式
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
        wk_reject_qty:0, //不良品数合计
        wk_ot_worker:0,
        wk_workshop_desc:'',      //车间号
        wk_ot_technician:0,
        wk_ot_assistant :0,
        wk_ot_material :0,
        wk_ot_appearance :0,
        wk_ot_package:0,
        wk_ot_label:0,
        wk_ot_repairman:0,
        wk_ot_qc:0,    
        wk_ot_others:0,
        wk_reject_qty:"0",  //不良品
        wk_allreal_qty:'',  //累计产出良品
        wk_allin_qty:'',   //累计入库
        wo_project:'',     //  项目名:  
        wo_part:'0',        // 料号: 
        wk_order_qty:0,      // 制令数量: 
        wr_time_machine:'0',   // 标准设备工时: 
        wr_time_worker:'0',    // 标准人员工时:
        pt_desc1:'',        // 描述: 
        wk__chr01:'0',    // 总人工工时
        wk__chr02:'0',    // 损失工时合计
        wkd_det_List:''  , // 表格数据
        //录入不良品表格的数据list
        wkd_unh_List:'',
        wk_cr_date:'',//创建时间,
        wk_up_date:'',//更改时间
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
      tableData:[],//工时
      tableData2:[],//不良品
      deptarmentList:[],
      deptarmentList1:[],
      deptarmentListAddSelf:[],//删选过后的，加上自身
      rejectList:[],//不良品类型列表
      rejectList1:[],
      rejectListAddSelf:[],//删除重复过后的，加上自身
      reasonList:[],      
      reasonList1:[],      
      wkd_wk_dept_id:'',
      wkd_wk_dept_id1:'',
      wkd_wk_reason_id:'',
      wkd_wk_reason_id1:'',
      wkd_wk_reason_id2:'',
      wkd_qty:'',
      //不良品表录入
      old_reject_sum:'',//用来保存不良品总量的（一次赋值）
      wk_unhealthy_id:'',//要提交的字段
      wk_num:'',//要提交的字段
      wk_unhealthy_id:'', //不良品类型的id
      unhealthyName:'',//不良品类型的名称
      unhealthyName1:'',
      wkdWkDeptName:'',
      wkdWkReasonName:'',
      wkdWkDeptName1:"",
      morenzhi:'',
      morenzhi1:'',
      isShowSuccess:false,
      disa:true,
      // bianji:"编辑",
      //判断是否给输入框加disabled,当获取到的用户是Sysytem的时候，不加disable
      isDisabled:true,
      user:'',
      wkid:'',
      num:0,//是否赋值操作,
      old_allreal_qty:'',
      old__allin_qty:'',
      old_chr02:'',
      //将损失工时合计存到data里面 
      old_loss_time_sum:0,
      //有关于下拉框点选减少，删除增多所需要的数据
      //-----损失工时子表
      oldSelectList:[],//用以存储没有删除之前的数据（损失工时）
      // selectList:[],//departmentlist （损失工时） 
      // selectDepId:'',//select V-model的值,已经有相应的data （损失工时） 
      //----wkd_wk_dept_id （select的责任部门id）--子表一 （损失工时） 
      beDeleteOptionArrId:[], //被选中过的数据id集中到一个数组  （损失工时）
      shouldBeDeleteIndex:'', //下拉框里被选中的数据下标 , （损失工时）
      //------不良品子表
      oldSelectList1:[],//用以存储没有删除之前的数据 (不良品)
      // selectList:[],//departmentlist (不良品) 
      // selectDepId:'',//不良品类型select V-model的值,已经有相应的data (不良品) 
       //----wk_unhealthy_id （select的不良品类型） --子表二 (不良品) 
      beDeleteOptionArrId1:[], //被选中过的数据id集中到一个数组 (不良品) 
      shouldBeDeleteIndex1:'', //下拉框里被选中的数据下标 , (不良品)
      //所有的原因
      allReasonList:[],
      //////////////////,
      // 全新逻辑的变量
      firstSelect:'',//第一次存数据的时候存入的该条数据不良品id
      secondSelect:'',//编辑的时候更改的值 
      reasonListAddSelf:[],//reasonList加上自己当条数据的
      ////////////
      resFirstSelct:'',//第一次存数据的时候存入的该条数据原因id,
      depFirstSelct:'',//第一次存数据的时候存入的该条数据部门id,
      resSecondSelect:'',//更改数据时候存入的该条数据原因id, 
      depSecondSelect:'',//更改数据时候存入的该条数据部门id,
      ////////
      reasonList1:[],//reasonListAddSelf 依赖的数据
    }
  },
  created(){
    let timestamp3 = new Date().getTime();
    this.formData.wk_date = this.changeTime(timestamp3);
    this.formData.wk_cr_date = this.changeTime(timestamp3);//创建时间
    //更改时间在没有经过编辑情况的时候，默认和创建时间一致
    this.formData.wk_up_date = this.changeTime(timestamp3);//更新时间
    //测试用
    this.wk_userid=JSON.parse(localStorage.getItem("target")).userId;
    //测试用
  },
  mounted(){
    console.log("祭天le“”“”")
    //设置isDisabled的值
    var user=JSON.parse(localStorage.getItem("target")).userId;
    var wkid=JSON.parse(localStorage.getItem("target")).telephone;
    this.user=user;
    this.wkid=wkid;
    console.log(user);
    if(user == 'System'){
      //如果是System用户，则不禁用
      this.isDisabled=false;
    }
    let timestamp3 = new Date().getTime()
    let that = this;
    console.log(this.$route.query)
    let rows=this.$route.query.id;
    console.log("打印row");
    console.log(rows) 
    //为新增时，rows就等于 'abbbbbb'
    if(rows!=="abbbbbb"){
      this.formData.wk_up_date = this.changeTime(timestamp3);//编辑时候更新编辑时间
      let formData=this.formData
      formData.wk_userid=rows.wk_userid || this.wk_userid 
      //损失工时合计
      formData.wk__chr02=rows.wk__chr02 || 0
      formData.wk__chr01=rows.wk__chr01 || 0 
      formData.wk_classes_id=rows.wk_classes_id  || ''
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
      formData.wk_cr_date=rows["创建时间"] ||this.changeTime(timestamp3)
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
            //回写
            that.tableData = res.data;
            //在回写数据的时候
            console.log(that.tableData)
            for(let initial=0;initial<that.tableData.length;initial++){
              that.beDeleteOptionArrId.push(that.tableData[initial].wkd_wk_reason_id);
            }
            for(let dele=0;dele<that.beDeleteOptionArrId.length;dele++){
              //通过轮询删除
              //找到每一个元素在类型列表里界面的对应下表
              //that.beDeleteOptionArrId[dele] 就是一个个id
              console.log(that.beDeleteOptionArrId[dele]);
            }
          }
        }
      }); 
      //不良品的数据回写接口请求
      $.ajax({
        url: baseUrl +'/Qzd_CodeDemo/wkd_unhz/getList',
        type: 'GET', // GET
        data:{queryJson:formData.wk_id},
        async: true,
        dataType: 'json',
        success: function(res) {
          if(res.code == 200){
            //回写
            that.tableData2 = res.data;
            //在回写数据的时候把不良品类型按照当前的数据清除掉已经选择的部门
            console.log(that.tableData2)
            for(let initial=0;initial<that.tableData2.length;initial++){
              //被清除的元素的id集合
              that.beDeleteOptionArrId1.push(that.tableData2[initial].wk_unhealthy_id);
            }
            //轮询完毕，形成被清除的元素的id集合之后
            for(let dele=0;dele<that.beDeleteOptionArrId1.length;dele++){
              //通过轮询删除
              //找到每一个元素在类型列表里界面的对应下表
              //that.beDeleteOptionArrId[dele] 就是一个个id
              console.log(that.beDeleteOptionArrId1[dele]);//为什么是undefined
              //在不良类型里面轮询
              for(let depp=0;depp<that.rejectList.length;depp++){
                if(that.beDeleteOptionArrId1[dele] == that.rejectList[depp].wk_unhealthy_id){
                  console.log("找到buliang");
                  that.rejectList.splice(dele,1);
                  console.log("删除一个")
                }
              }
              console.log("此时的rejectList")
              console.log(that.rejectList)
            }
            //wk_unhealthy_id

          }
        }
      }); 

    }else{
      //为新增的时候，单号可编辑
        $('.must1').removeAttr('disabled')
    }
    console.log("打印tableData")
    console.log(this.formData)
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

      //获取车间的列表
      $.ajax({
        url: baseUrl +'/Qzd_CodeDemo/wk_workshop_setup/getList',
        type: 'GET', // GET
        async: true,
        dataType: 'json',
        success: function(res) {
          that.options2 = res.data;
          if(that.formData.wk_workshop_id === ''){
            that.formData.wk_workshop_id = res.data[0].wk_workshop_id;
            that.formData.wk_workshop_id = that.wkid;//显示System所在的车间
            console.log("that.wkid:"+that.wkid)
            console.log("that.formData.wk_workshop_id:"+that.formData.wk_workshop_id)
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
        // this.deptarmentList = res.data.data;
        this.deptarmentList = JSON.parse(JSON.stringify(res.data.data));//在上面的写法上转类型
        this.oldSelectList = JSON.parse(JSON.stringify(res.data.data));//将这个数组赋值给一个变量存储起来，做元数组使用
        console.log("拿到的部门数组");
        // this.deptarmentList1 = res.data.data;
         this.deptarmentList1 = JSON.parse(JSON.stringify(res.data.data));//暂时不与上述数组挂钩
      }else{
        this.$message.error(res.data.info)
      }
      // console.log(this.deptarmentList);
    }).catch((res)=>{
      this.$message.error(res.data.info)
    }) 
    //获取全部的原因信息
    ///Qzd_CodeDemo/wk_dep_res/GetResListByDeptId
    //加载所有的二级原因列表
    this.$http.get(`/Qzd_CodeDemo/wk_dep_res/GetResListByDeptId`).then((res)=>{
      if(res.data.code == 200){
        console.log("我是所有的原因列表")
        console.log(res);
        this.allReasonList = res.data.data;
        //根据责任部门的wk_dept_id 来筛选那些放入原因list中进行显示
      }else{
        this.$message.error(res.data.info)
      }
    }).catch((res)=>{
      this.$message.error(res.data.info)
    }) 
    //获取不良品类型列表
    console.log("???/")
    this.$http.get('/Qzd_CodeDemo/wk_unhealthy_setup/getList').then((res)=>{
      if(res.data.code == 200){
        console.log("我是不良品类型");
        console.log("res")
        this.rejectList = JSON.parse(JSON.stringify(res.data.data));//供操作的数组
        this.oldSelectList1 = JSON.parse(JSON.stringify(res.data.data));//供存储的数组
        this.rejectList1 = JSON.parse(JSON.stringify(res.data.data));//子表下拉
      }else{
        this.$message.error(res.data.info);
      }
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
    formDataTime(e){
      //在选择日期控件的时间的时候，要更新这个时间的格式
      console.log("日期控件选择的时间")
      console.log(e);
      this.formData.wk_date = this.changeTime(new Date(e).getTime());
      ///调用查询总量的接口
      this.getDataStatic();
    },
    //标记
    setOnceUnhealthyType(e){
      console.log('原始id为')
      console.log(e)
      //设置不良品列表
      console.log(this.beDeleteOptionArrId1);
      console.log(this.rejectList)
      for(let seach =0;seach<this.oldSelectList1.length;seach++){
        //通过id，从老的数据里面找
        if(this.oldSelectList1[seach].wk_unhealthy_id == e){
          console.log("找到")
          console.log(this.oldSelectList1[seach])
          this.rejectListAddSelf = JSON.parse(JSON.stringify(this.rejectList));
          this.rejectListAddSelf.push(this.oldSelectList1[seach])
        }
      }
      console.log(this.rejectListAddSelf) //怎么打印的是数字
    },
    /////标记
    //点击编辑按钮的时候就要按照当前选中的责任部门id发起一次轮询
    searchReasonListOnce(dpId,reId){
      console.log(dpId);//打印了
      this.reasonList1 = [];
      //此时应该给deptarmentListAddSelf赋值不然就为空
      console.log(this.beDeleteOptionArrId);
      this.reasonList1 = JSON.parse(JSON.stringify(this.reasonList));
      
      for(let seach =0;seach<this.allReasonList.length;seach++){
        //通过id，从老的数据里面找
        if(this.allReasonList[seach].wk_reason_id == reId){
          console.log("找到")
          console.log(this.allReasonList[seach])
          this.reasonListAddSelf = JSON.parse(JSON.stringify(this.reasonList));
          this.reasonListAddSelf.push(this.allReasonList[seach])
        }
      }
      console.log("this.reasonListAddSelf");
      console.log(this.reasonListAddSelf)
    },
    //
    selectLossSonName(e,reasonId){
      //改变子表的下拉框的值时候触发
      console.log("改变子表的下拉框的值时候触发的select项的值id");
      console.log(e);//部门id
      this.secondSelect = e;
      //损失工时的子表
      // this.reasonList1
      //轮询reasonList
      this.reasonList1 = [];
      this.reasonListAddSelf = [];//改变的时候置空
      let oldData = JSON.parse(JSON.stringify(this.tableData));
      for(let setBlank=0;setBlank<oldData.length;setBlank++){
        if(oldData[setBlank].wkd_wk_dept_id == e){//找到与这个部门对应id的数据
        console.log("xihua");
        console.log(oldData[setBlank]);
        console.log(oldData[setBlank].wkd_wk_reason_id);
          oldData[setBlank].wkd_wk_reason_id = '';//如果责任部门下面没有原因就置空这项原因id
          this.tableData = oldData;
          console.log("还不变？？？？")
        // console.log(this.tableData[setBlank].wkd_wk_reason_id);
        }
        //item.wkd_wk_reason_id
      }
      console.log("this.beDeleteOptionArrId")
      console.log(this.beDeleteOptionArrId)
      for(let lossId=0;lossId<this.allReasonList.length;lossId++){
        if(this.allReasonList[lossId].wk_dept_id == e && this.beDeleteOptionArrId.indexOf(this.allReasonList[lossId].wk_reason_id) == -1){
          /////标记
          console.log("推入数据")
          this.reasonListAddSelf.push(this.allReasonList[lossId]);//找到数据，推入
        }
        if(this.allReasonList[lossId].wk_dept_id == e){
          //与当条数据相同的，也push进去
          this.reasonListAddSelf.push(this.allReasonList[lossId])
        }
      }
      for(let ssr=0;ssr<this.reasonListAddSelf.length;ssr++){
        if(this.beDeleteOptionArrId.indexOf(this.reasonListAddSelf[ssr].wk_reason_id)!== -1 && this.reasonListAddSelf[ssr].wk_reason_id !== reasonId){
          console.log("删除掉多余的")
          this.reasonListAddSelf.splice(ssr,1);
        }
      }
    },
    //标记
    selectReasonItem(dpId,reId){
      //在子表
      ///@change="selectReasonItem(item.wkd_wk_dept_id,item.wkd_wk_reason_id)"
      console.log(reId);
      var list = this.reasonListAddSelf;
      console.log("此时的this.reasonListAddSelf")
      console.log(this.reasonListAddSelf)
      for(let i=0;i<list.length;i++){
        if(list[i].wk_reason_id == reId){ //此处是因为没有写对字段，没有进入条件
          this.shouldBeDeleteIndex = i;//存储损失工时原因的这个下标
          console.log("这个损失原因的下标")
          console.log(this.shouldBeDeleteIndex);//下标是对的
        }
      }
      ///特殊标记
      console.log(list);
      console.log(this.beDeleteOptionArrId)
    },
    //控制字表各条数据是否可编辑
    //控制损失工时子表数据
    changeState(index){
      console.log("我在更改编辑状态值")
      this.isEditAllow = !this.isEditAllow
      this.isChoose = !this.isChoose
      let oldEvTarget = this.evTarget //旧的目标下标
      this.evTarget = index //新的目标下标
      if(oldEvTarget != this.evTarget){
        this.isChoose = true
      }
      console.log("isEditAllow:"+isEditAllow);
      console.log("isChoose:"+isChoose);
    },
    //控制不良品字表数据
    changeState1(index){
      console.log("我在更改编辑状态值")
      this.isEditAllow1 = !this.isEditAllow1
      this.isChoose1 = !this.isChoose1
      let oldEvTarget1 = this.evTarget1 //旧的目标下标
      this.evTarget1 = index //新的目标下标
      if(oldEvTarget1 != this.evTarget1){
        this.isChoose1 = true
      }
      console.log("isEditAllow:"+isEditAllow1);
      console.log("isChoose:"+isChoose1);
    },
    //选择时间的日期控件
    toChooseTime(){
      console.log("选择时间")
    },
    //checkNum 判断制令与实际良品的合计的比较
    cantFalse(eve){
      //放在blur触发的函数里面执行
      //wk_real_qty//良品
      //wk_in_qty //入库
      //wk_loss_time //损失工时
      //良品数量
      var l=0;
      var r=0;
      var lt=0;
      if( this.num == 0){
        this.old_allreal_qty=this.formData.wk_allreal_qty;
        this.old__allin_qty=this.formData.wk_allin_qty;
        this.old_chr02=this.formData.wk__chr02;
        //不良品合计
        this.old_reject_sum=this.formData.wk_reject_qty;
        this.num++;
      }else{
        console.log("不约")
      }
      if(eve == "wk_real_qty"){
        console.log(this.old_allreal_qty)
        if(this.formData.wk_real_qty !=0 ){
          console.log("良品1")
          if(this.old_allreal_qty != this.formData.wk_allreal_qty){
            this.formData.wk_allreal_qty = Number(this.old_allreal_qty);
            this.formData.wk_allreal_qty = Number(this.old_allreal_qty)+Number(this.formData.wk_real_qty);
          }else{
            this.formData.wk_allreal_qty = Number(this.old_allreal_qty)+Number(this.formData.wk_real_qty);
          }
        }
      }
      if(eve == "wk_in_qty"){
        console.log(this.old__allin_qty)
        if(this.formData.wk_in_qty != 0){
          console.log("入库1")
          if(this.old__allin_qty !=this.formData.wk_allin_qty){
            this.formData.wk_allin_qty  = Number(this.old__allin_qty);
            this.formData.wk_allin_qty  = Number(this.old__allin_qty)+Number(this.formData.wk_in_qty );
          }else{
            this.formData.wk_allin_qty  = Number(this.old__allin_qty)+Number(this.formData.wk_in_qty );
          }
        }
      }
      
      if(eve == "wk_loss_time"){
        console.log(this.old_chr02)
        if(this.formData.wk_loss_time != 0){
          console.log("损失工时1")
          if(this.old_chr02 !=this.formData.wk__chr02 ){
            this.formData.wk__chr02   = Number(this.old_chr02);
            this.formData.wk__chr02   = Number(this.old_chr02)+Number(this.formData.wk_loss_time);
          }else{
            this.formData.wk__chr02   = Number(this.old_chr02)+Number(this.formData.wk_loss_time);
          }
        }
      }
      // formData.wk_allreal_qty 良品合计
      // formData.wk_order_qty  制令
      if(this.formData.wk_allreal_qty == this.formData.wk_order_qty){
        this.$message("任务完成啦")
      }else if(this.formData.wk_allreal_qty > this.formData.wk_order_qty){
        this.$message({
          message:"累计产出良品已经超过制令了哦",
          type:"warning"
        })    
      }
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
    //改动
    getIndex(index,resId,depId){
      //@click="getIndex(index,item.wkd_wk_reason_id,item.wkd_wk_dept_id)"
      // getIndex1(index,unhId){
      ///////////
      ////resFirstSelct depFirstSelct resSecondSelect depSecondSelect
      console.log("我是当条数据的类型id")
      console.log(resId);//第一条存入的id
      if(this.resFirstSelct === ''){
        console.log("this.resFirstSelct的赋值操作")
        this.resFirstSelct =resId; //只赋值一次
      }else{
        this.resSecondSelect =resId ;
      }
      if(this.depFirstSelct === ''){
        console.log("this.depFirstSelct的赋值操作")
        this.depFirstSelct =depId; //只赋值一次
      }else{
        this.depFirstSelct =depId ;
      }
      console.log("this.resFirstSelct");
      console.log(this.resFirstSelct);
      console.log("this.resSecondSelect");
      console.log(this.resSecondSelect);
      if(this.isChoose1){//true的时候是保存
        if(this.resFirstSelct !== this.resSecondSelect){
          ///////
          console.log("前后的resSelct的值不一样")
          // console.log("两次的值不一样")
          let ins = this.beDeleteOptionArrId.indexOf(this.resFirstSelct);
          this.beDeleteOptionArrId.splice(ins,1);
          this.beDeleteOptionArrId.push(this.resSecondSelect);
          // /////reason只需要推入和删除id集合就可以了，其他的操作在获取reasonList的时候进行删选
          // /////此时清理一遍逻辑，把从reason里面删除的推入
          this.reasonList = [];//赋值之前先置空
          for(let resAll=0;resAll<this.allReasonList.length;resAll++){
            if(this.allReasonList[resAll].wk_dept_id === this.depFirstSelct){
              //根据部门查找
              this.reasonList.push(this.allReasonList[resAll]);
            }
          }
          //把列表再筛选一遍
          for(let search=0;search<this.reasonList.length;search++){
            if(this.beDeleteOptionArrId.indexOf(this.reasonList[search].wk_reason_id)!== -1){
              console.log("删除出多余的")
              this.reasonList.splice(search,1);
            }
          }
          console.log("处理之后的this.reasonList");
          console.log(this.reasonList)
          //在最后把firstSlect置空
          this.resFirstSelct = '';
          this.depFirstSelct = '';
        }else{
          console.log("还是原来的选项")
        }
      }else{
        console.log(this.isChoose)
        console.log("还在编辑中")
      }
      ///////
      // if(this.resFirstSelct === this.resSecondSelect && this.depFirstSelct === this.depSecondSelect 
      //     && this.resSecondSelect !== '' && this.depSecondSelect
      //   ){
      //     console.log("两次的值没有发生变化，不做处理")
      //   }else 
      ////////
      /////////////////////
      console.log("我在更改编辑状态值")
      this.isEditAllow = !this.isEditAllow
      this.isChoose = !this.isChoose
      let oldEvTarget = this.evTarget //旧的目标下标
      this.evTarget = index //新的目标下标
      if(oldEvTarget != this.evTarget){
        this.isChoose = true
      }
      console.log("isEditAllow:"+this.isEditAllow);
      // this.changeState();//运行这个函数
      console.log(this.isChoose)
      console.log(index)
      // console.log($(".td_input").val())
      let num = 0;
      for(let i=0;i<this.tableData.length;i++){
          num +=  parseFloat(this.tableData[i].wkd_qty);
      }
      //是否在此处改变损失工时汇总的值
      this.formData.wk_loss_time = num;          
      ////
      console.log("损失工时汇总:"+this.formData.wk_loss_time);
      console.log("数据返回的损失工时合计："+this.old_chr02);
      console.log("this.formData.wk__chr02的值："+this.formData.wk__chr02)
      if(this.old_chr02 !=this.formData.wk__chr02 ){
        this.formData.wk__chr02   = Number(this.old_chr02)+Number(this.formData.wk_loss_time);
      }else{
        this.formData.wk__chr02   = Number(this.old_chr02)+Number(this.formData.wk_loss_time);
      }
      console.log("损失工时汇总:"+this.formData.wk_loss_time);
      console.log("数据返回的损失工时合计："+this.old_chr02)
      console.log("this.formData.wk__chr02的值："+this.formData.wk__chr02)
      // this.formData.wk_reject_qty = num; 原来录入的不良品数量字段位置，现在为工时，故而不进行赋值
      // +this.formData.wk_reject_qty*1 原来录入的不良品数量字段位置，现在为工时，故而不进入判断
      //WK_NUM是新的不良品数量
      if($('.plan_num').val()*1 < ($('.output_num').val()*1)){
        this.musttrue.plantrue=true
      }else{this.musttrue.plantrue=false}
    },
    //不良品的录入
    getIndex1(index,unhId){
       ///////////
      console.log("我是当条数据的类型id")
      console.log(unhId);//第一条存入的id
      if(this.firstSelect === ''){
        console.log("this.firstSelect的赋值操作")
        this.firstSelect =unhId; //只赋值一次
      }else{
        this.secondSelect =unhId 
      }
      console.log("this.secondSelect");
      console.log(this.secondSelect)

      if(this.isChoose1){//true的时候是保存
        if(this.firstSelect === this.secondSelect && this.secondSelect!==''){
          console.log("两次的值没有发生变化，不做处理")
        }else{
          console.log("两次的值不一样")
          //标记
          console.log("处理之前的this.rejectList");
          console.log(this.rejectList)
          console.log("first:"+this.firstSelect)
          console.log("second:"+this.secondSelect)
          let ind = this.beDeleteOptionArrId1.indexOf(this.firstSelect);
          this.beDeleteOptionArrId1.splice(ind,1);//删除第一次的选项
          for(let findInd=0;findInd<this.oldSelectList1.length;findInd++){
            //在原始数据里面,寻找
            if(this.firstSelect === this.oldSelectList1[findInd].wk_unhealthy_id){
              //找到目标数据，推入
              console.log(this.oldSelectList1[findInd])
              this.rejectList.push(this.oldSelectList1[findInd]);
            }
          }
          //删除数据(在使用的数据里面删掉当前添加的数据)
          for(let deleInd=0;deleInd<this.rejectList.length;deleInd++){
            if(this.secondSelect === this.rejectList[deleInd].wk_unhealthy_id){
              this.rejectList.splice(deleInd,1);
            }
          }
          this.beDeleteOptionArrId1.push(this.secondSelect);//把改的id推入删除数组
          console.log("处理之后的this.rejectList");
          console.log(this.rejectList)
          //在最后把firstSlect置空
          this.firstSelect = '';
        }
      }else{
        console.log("还在编辑中")
      }
      ////////////
      //@click="getIndex1(index,item.wk_unhealthy_id)"
      console.log("我在更改编辑状态值")
      this.isEditAllow1 = !this.isEditAllow1
      this.isChoose1 = !this.isChoose1
      let oldEvTarget1 = this.evTarget1 //旧的目标下标
      this.evTarget1 = index //新的目标下标
      if(oldEvTarget1 != this.evTarget1){
        this.isChoose1 = true
      }
      console.log("isEditAllow:"+this.isEditAllow1);
      // this.changeState1();//运行这个函数
      console.log(this.isChoose)
      console.log(index)
      let num = 0; //不良品的数量
      for(let i=0;i<this.tableData2.length;i++){
          num +=  parseFloat(this.tableData2[i].wk_num);
      }
      // 此时应该把num赋值给this.formData.wk_reject_qty
      // this.old_reject_sum = num;  //  
      let thisTableTempRejectNum = num ;//将该张表的不良品赋值给一个临时变量
      //this.formData.wk_reject_qty 
      if(this.old_reject_sum !=this.formData.wk_reject_qty ){
        console.log("此时的this.old_reject_sum："+this.old_reject_sum)
        this.formData.wk_reject_qty   = Number(this.old_reject_sum) + thisTableTempRejectNum ;//将初始值与这张表的损失临时量相加
        // this.formData.wk_reject_qty  = Number(this.old_reject_sum)+Number(this.wk_num);
        console.log("此时的this.formData.wk_reject_qty："+this.formData.wk_reject_qty)
      }else{
        this.formData.wk_reject_qty   = Number(this.old_reject_sum) + thisTableTempRejectNum ;
        console.log("此时的this.formData.wk_reject_qty："+this.formData.wk_reject_qty)
      }
      //+ Number(this.WK_NUM)
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
    getDataStatic(){
      console.log(typeof wk_date)
      this.$http.get(`/Qzd_CodeDemo/wk_mstr/GetDataStatistics?queryJson={"wk_no":"${this.formData.wk_no}","wr_route":"SWSX","wk_date":"${this.formData.wk_date}" }`).then((res)=>{
        if(res.data.code == 200){
          let obj = res.data.data[0];
          console.log("这个拿到的obj是：");
          console.log(obj)
          //将损失工时合计存到data里面 old_loss_time_sum
          this.old_loss_time_sum = obj.total_wk_real_qty;//这是从请求中拿到的数量
          //良品数量
          if(this.formData.wk_real_qty!=0){
            this.formData.wk_allreal_qty = Number(obj.total_wk_real_qty)+Number(this.formData.wk_real_qty);
          }else{
            this.formData.wk_allreal_qty = Number(obj.total_wk_real_qty);
          }
          //(入库数量)
          if(this.formData.wk_in_qty!=0){
            this.formData.wk_allin_qty = Number(obj.total_wk_in_qty)+Number(this.formData.wk_in_qty);
          }else{
            this.formData.wk_allin_qty = Number(obj.total_wk_in_qty);
          }
          //////////                                      
          //试着改动的代码（损失工时）
          //total_wk_loss_time
          this.old_chr02 = obj.total_wk_loss_time;//从数据里面返回的
          if(this.formData.wk_loss_time!=0){
            this.formData.wk__chr02 = Number(this.old_chr02)+Number(this.formData.wk_loss_time);
          }else{
            this.formData.wk__chr02 = Number(this.old_chr02);
          }
        }
      }).catch((res)=>{
        this.formData.wk_allreal_qty = '';
        this.formData.wk_allin_qty = '';
        this.formData.wk__chr02 = '';
      })
    },
    searchData(){
      //获取制令行项目名数量      
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
        if(res.data.code == 200){
          let obj = res.data.data[0];
          this.formData.pt_desc1 = obj.pt_desc1 || '';
        }
      }).catch((res)=>{
        this.formData.pt_desc1 = '';
      })
      // 获取统计数
      this.getDataStatic();
      // this.$http.get(`/Qzd_CodeDemo/wk_mstr/GetDataStatistics?queryJson={"wk_no":"${this.formData.wk_no}","wr_route":"SWSX","wk_date":''}`).then((res)=>{
      //   if(res.data.code == 200){
      //     let obj = res.data.data[0];
      //     console.log("这个拿到的obj是：");
      //     console.log(obj)
      //     //将损失工时合计存到data里面 old_loss_time_sum
      //     this.old_loss_time_sum = obj.total_wk_real_qty;//这是从请求中拿到的数量
      //     //良品数量
      //     if(this.formData.wk_real_qty!=0){
      //       this.formData.wk_allreal_qty = Number(obj.total_wk_real_qty)+Number(this.formData.wk_real_qty);
      //     }else{
      //       this.formData.wk_allreal_qty = Number(obj.total_wk_real_qty);
      //     }
      //     //(入库数量)
      //     if(this.formData.wk_in_qty!=0){
      //       this.formData.wk_allin_qty = Number(obj.total_wk_in_qty)+Number(this.formData.wk_in_qty);
      //     }else{
      //       this.formData.wk_allin_qty = Number(obj.total_wk_in_qty);
      //     }
      //     //////////                                      
      //     //试着改动的代码（损失工时）
      //     //total_wk_loss_time
      //     this.old_chr02 = obj.total_wk_loss_time;//从数据里面返回的
      //     if(this.formData.wk_loss_time!=0){
      //       this.formData.wk__chr02 = Number(this.old_chr02)+Number(this.formData.wk_loss_time);
      //     }else{
      //       this.formData.wk__chr02 = Number(this.old_chr02);
      //     }
      //   }
      // }).catch((res)=>{
      //   this.formData.wk_allreal_qty = '';
      //   this.formData.wk_allin_qty = '';
      //   this.formData.wk__chr02 = '';
      // })

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
    ////标记
    saveTabList(depId,resId){
      //////
      //e即是id
      //deptarmentList (被操作数组)  oldSelectList (存储数组) 
      //select 绑定的值 wkd_wk_dept_id ，子项的id  wk_dept_id
      // 标记位置
      console.log('上次选中的下标')
      var list = this.reasonList;//当前操作的list为reasonList
      console.log("this.wkd_wk_reason_id:"+this.wkd_wk_reason_id);
      console.log("this.shouldBeDeleteIndex:"+this.shouldBeDeleteIndex)
      console.log(list.length);//类型列表 (是空的)
      ///标记
      if(this.wkd_wk_reason_id !== '' && this.shouldBeDeleteIndex !==''){
        console.log("执行");
        this.beDeleteOptionArrId.push(list[this.shouldBeDeleteIndex].wk_reason_id);
        console.log("此时的待删除数组");
        console.log(this.beDeleteOptionArrId);
        var self = list.splice(this.shouldBeDeleteIndex,1);//被删除的元素本身
        console.log(self[0])//他本身
        console.log(this.reasonList)
        this.reasonListAddSelf = JSON.parse(JSON.stringify(this.reasonList))
        this.reasonListAddSelf.push(self[0]);
        console.log("reasonListAddSelf:")
        console.log(this.reasonListAddSelf)
      }
      console.log("执行后的数组");
      console.log(list)
      console.log("执行后的被删除数组集合");
      console.log(this.beDeleteOptionArrId)
      //保存后即是把选中过的数据删除了，要改动绑定的value
      // this.wkd_wk_dept_id = list[0].wk_dept_id; //不变动v-model的值
      //保存一次就置空一次保存的下标,不然会一直按照这个保留下标进行减去
      this.shouldBeDeleteIndex = ''
      ///保存按钮的时候，把原因列表置空
      this.reasonList = [];//置空
      // 标记位置
      ///
      //在保存的时候处理，已经选择的数据提示让其更改数量
      //不良品的总量出现偏差 
      console.log("depId")
      console.log(depId)
      //保存表格的时候    
      if(this.wkd_wk_dept_id == ''|| this.wkd_wk_reason_id == '' || this.wkd_qty == ''){
        this.$message('请填完信息')
        return;
      }
      if(!(/^-?[0-9]\d*$/.test(parseFloat(this.wkd_qty)))){
        this.$message('工时必须是整数');//数量 >> 工时
        return;
      }
      this.tableData.push({wkd_wk_dept_id:this.wkd_wk_dept_id,wkd_qty:this.wkd_qty+'.00',wkd_wk_reason_id:this.wkd_wk_reason_id});
      console.log(this.tableData)
      this.wkd_wk_dept_id = '';
      this.wkd_wk_reason_id = '';
      this.wkd_qty = '';
      this.morenzhi="" //no
      this.morenzhi1="" //no
      console.log(this.tableData)
      let num = 0;
      for(let i=0;i<this.tableData.length;i++){
          num +=  parseFloat(this.tableData[i].wkd_qty);
      }
      //是否在此处改变损失工时汇总的值
      this.formData.wk_loss_time = num;          
      ////
      if(this.old_chr02 !=this.formData.wk__chr02 ){
        this.formData.wk__chr02   = Number(this.old_chr02) + Number(this.formData.wk_loss_time);;
      }else{
        this.formData.wk__chr02   = Number(this.old_chr02) + Number(this.formData.wk_loss_time);
      }
      ////
      // this.formData.wk__chr02 = Number(this.formData.wk__chr02)+Number(this.formData.wk_loss_time);
      // this.formData.wk_reject_qty = num;//不良品数量合计 字段内容被工时替代，不必再进行赋值
      this.wkd_wk_dept_id ="" //责任部门
      this.wkd_wk_reason_id == '' //原因
      this.wkd_qty == ''  //工时

      //+this.formData.wk_reject_qty*1 ---字段内容被工时替代
      //WK_NUM是不良品数量
      if($('.plan_num').val()*1 < ($('.output_num').val()*1 + Number(this.wk_num) )){
        this.musttrue.plantrue=true
      }else{this.musttrue.plantrue=false}
    },
    saveTabList2(e){
      ////////
      //////
      //e即是id
      // <!--绑定的数组 rejectList 不良品 v-model : wk_unhealthy_id 
      // 子项的id ：item.wk_unhealthy_id-->
      console.log('上次选中的下标')
      console.log(this.shouldBeDeleteIndex1);
      var list = this.rejectList;//当前操作的list
      console.log("this.wk_unhealthy_id:"+this.wk_unhealthy_id);
      console.log("this.shouldBeDeleteIndex1:"+this.shouldBeDeleteIndex1)
      console.log(list.length)
      if(list.length>1 && this.wk_unhealthy_id != '' && this.shouldBeDeleteIndex1 !==''){
        console.log("执行")
        this.beDeleteOptionArrId1.push(list[this.shouldBeDeleteIndex1].wk_unhealthy_id)
        var self = list.splice(this.shouldBeDeleteIndex1,1);//被删除的元素本身
        console.log(self[0])
        var hasBeenDeleArr = JSON.parse(JSON.stringify(this.rejectList))
        this.rejectListAddSelf = hasBeenDeleArr.push(self[0]);
      }
      console.log("执行后的数组");
      console.log(list)
      console.log("执行后的被删除数组集合");
      console.log(this.beDeleteOptionArrId1)

      //保存后即是把选中过的数据删除了，要改动绑定的value
      // this.wk_unhealthy_id = list[0].wk_unhealthy_id; //不变动v-model的值

      console.log(this.rejectList)
      //保存一次就置空一次保存的下标,不然会一直按照这个保留下标进行减去
      this.shouldBeDeleteIndex1 = ''
      /////
      ////////

      //在保存的时候处理，已经选择的数据提示让其更改数量
      console.log("e")
      console.log(e)
      //保存不良品录入的数量
      //WK_UNHEALTHY_ID WK_NUM
      if(this.wk_unhealthy_id === ''|| this.wk_num === ""){
        this.$message('请填完信息')
        return;
      }
      if(!(/^-?[0-9]\d*$/.test(parseFloat(this.wk_num)))){
        this.$message('数量必须是整数');//不良品数量
        return;
      }
      for(let i=0;i<this.tableData2.length;i++){
        //下拉选项的id
        num +=  parseFloat(this.tableData2[i].wk_num);
      }
      ///判断数量
      // //formData.wk_plan_qty计划量  formData.wk_real_qty实际产出 
      // if(this.formData.wk_plan_qty < (this.formData.wk_real_qty + num)){
      //   this.$message('不良品加良品不能超过计划量');//不良品数量
      //   return;
      // } //有问题

      
      //不良品录入数组
      this.tableData2.push({wk_unhealthy_id:this.wk_unhealthy_id,wk_num:this.wk_num+'.00'});
      console.log(this.tableData2)
      this.wk_unhealthy_id = '';
      this.wk_num = '';
      let num = 0; //不良品的数量
      for(let i=0;i<this.tableData2.length;i++){
          num +=  parseFloat(this.tableData2[i].wk_num);
      }
      // this.old_reject_sum = num;  // 
       let thisTableRejectSum = num; //将num赋值给临时变量
      //this.formData.wk_reject_qty 
      if(this.old_reject_sum !=this.formData.wk_reject_qty ){
        this.formData.wk_reject_qty   = Number(this.old_reject_sum) + thisTableRejectSum;//总量加上临时量
      }else{
        this.formData.wk_reject_qty   = Number(this.old_reject_sum) + thisTableRejectSum;//总量加上临时量
      }
      ////
      // this.formData.wk_reject_qty = num;//不良品数量 字段内容被工时替代，不必再进行赋值
      //+this.formData.wk_reject_qty*1 ---字段内容被工时替代
      //WK_NUM是不良品数量
      if($('.plan_num').val()*1 < ($('.output_num').val()*1 + Number(this.wk_num) )){
        this.musttrue.plantrue=true
      }else{this.musttrue.plantrue=false}      
      // WK_UNHEALTHY_ID WK_NUM
    },
    cancel(index,reId,depId){
      console.log("从数组中被移除的id")
      console.log(reId);
      console.log("删除之前的this.beDeleteOptionArrId")
      console.log(this.beDeleteOptionArrId)
      let list = this.beDeleteOptionArrId;
      for(let i=0;i<list.length;i++){
        //从被删除id数组里面去掉
        console.log(list[i])
        if(list[i] == reId){
          console.log("???")
          this.beDeleteOptionArrId.splice(i,1);
          console.log("删除后的beDeleteOptionArrId")
          console.log(this.beDeleteOptionArrId)
          //去oldSelectList 里面轮询，找到这条id的数据，加到selectList里面去
          //此时的轮询应该是在allReasonList里面;
          //  @click="cancel(index,item.wkd_wk_reason_id,item.wkd_wk_dept_id)"
          console.log("轮询请求原因列表");
          this.reasonList = [];//赋值之前先置空
          for(let resFind=0;resFind<this.allReasonList.length;resFind++){
            if(this.allReasonList[resFind].wk_dept_id === depId){
              //对应的id来找相应的原因列表
              this.reasonList.push(this.allReasonList[resFind]);
            }
          }
          console.log(this.beDeleteOptionArrId);
          //此时的this.reasonList 是没有被删除的，通过存放在id集合里面的id对这个列表进行再次筛选
          for(let resF=0;resF<this.reasonList.length;resF++){
            console.log(this.reasonList[resF].wk_reason_id)
            if(this.beDeleteOptionArrId.indexOf(this.reasonList[resF].wk_reason_id)!==-1){
              //找到在id集合里面存在的数据，删除掉
              this.reasonList.splice(resF,1);
            }
          }
          /////reasonList1
          for(let resFind=0;resFind<this.allReasonList.length;resFind++){
            if(this.allReasonList[resFind].wk_dept_id === depId){
              //对应的id来找相应的原因列表
              this.reasonList1.push(this.allReasonList[resFind]);
            }
          }
          console.log("this.reasonList1");
          console.log(this.reasonList1)
          console.log(this.beDeleteOptionArrId);
          //此时的this.reasonList 是没有被删除的，通过存放在id集合里面的id对这个列表进行再次筛选
          for(let resF=0;resF<this.reasonList.length;resF++){
            console.log(this.reasonList1[resF].wk_reason_id)
            if(this.beDeleteOptionArrId.indexOf(this.reasonList[resF].wk_reason_id)!==-1){
              //找到在id集合里面存在的数据，删除掉
              this.reasonList.splice(resF,1);
            }
          }
          console.log("this.reasonList1");
          console.log(this.reasonList1)
        }  
      }
      //////
      this.tableData.splice(index,1);//子表数据表
      let num = 0;
      for(let i=0;i<this.tableData.length;i++){
          num +=  parseFloat(this.tableData[i].wkd_qty);
      }
      this.formData.wk_loss_time = num ;
      //// 如果最后一条数据被删除，formData.wk_loss_time则会为零
        if(this.old_chr02 != this.formData.wk__chr02 ){
          this.formData.wk__chr02   = Number(this.old_chr02) + Number(this.formData.wk_loss_time);
          this.formData.wk__chr02   = Number(this.old_chr02)+Number(this.formData.wk_loss_time);
        }else{
          this.formData.wk__chr02   = Number(this.old_chr02)+Number(this.formData.wk_loss_time);
        }
      ////
      // this.formData.wk__chr02   = Number(this.formData.wk__chr02)+Number(this.formData.wk_loss_time);
      // this.WK_NUM = num; 字段内容变为工时
      // +this.formData.wk_reject_qty*1 字段内容变为工时
      //WK_NUM是不良品数量
      if($('.plan_num').val()*1 < ($('.output_num').val()*1 + Number(this.wk_num) )){
        this.musttrue.plantrue=true
      }else{this.musttrue.plantrue=false}
    },
    cancel1(index,id){
      // <!--绑定的数组 rejectList 不良品 v-model : wk_unhealthy_id 
      // 子项的id ：item.wk_unhealthy_id-->
      //////
      console.log("从数组中被移除的id")//再添加回下拉列表
      console.log(id);
      let list = this.beDeleteOptionArrId1;
      for(let i=0;i<list.length;i++){
        //从被删除id数组里面去掉
        console.log(list[i])
        if(list[i] == id){
          console.log("???")
          this.beDeleteOptionArrId1.splice(i,1);
          console.log("删除后的beDeleteOptionArrId1")
          console.log(this.beDeleteOptionArrId1)
          //去oldSelectList 里面轮询，找到这条id的数据，加到selectList里面去
          console.log("查询此时的this.oldSelectList1")
          console.log(this.oldSelectList1)
          for(let j=0;j<this.oldSelectList1.length;j++){
            console.log(this.oldSelectList1[j].wk_unhealthy_id)
            console.log(id)
            if(this.oldSelectList1[j].wk_unhealthy_id == id){
              console.log(this.oldSelectList1[j]) //找到需要push进下拉框的数据
              this.rejectList.push(this.oldSelectList1[j])
            }
          }
        }  
      }
      //////
      //////
      //操作不良品的记录
      this.tableData2.splice(index,1);
      let num = 0;
      for(let i=0;i<this.tableData2.length;i++){
          num +=  parseFloat(this.tableData2[i].wk_num);
      }
      let thisTableRejectSum = num; //将不良品变动值赋值给一个临时量
      //// 如果最后一条数据被删除，thisTableRejectSum则会为零
        if(this.old_reject_sum !=this.formData.wk_reject_qty ){
          this.formData.wk_reject_qty   = Number(this.old_reject_sum) + thisTableRejectSum;//加上临时量
        }else{
          this.formData.wk_reject_qty   = Number(this.old_reject_sum) + thisTableRejectSum;//加上临时量
        }
      ////
      // this.WK_NUM = num; 字段内容变为工时
      // +this.formData.wk_reject_qty*1 字段内容变为工时
      //WK_NUM是不良品数量
      if($('.plan_num').val()*1 < ($('.output_num').val()*1 + Number(this.wk_num) )){
        this.musttrue.plantrue=true
      }else{this.musttrue.plantrue=false}
    },
    cancelEdit(){
      //取消按钮
      this.$router.push({path:'/'})
    },
    clearNoNum(e){
      let img_url =[];
      let num = 0;
      $(".totalNum").each(function(){
        if($(this).val()!==""){
            img_url.push($(this).val());
        } 
      })
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
      for (var item in this.formData){
        if(this.formData[item] === '' && item !== 'wk_allin_qty' && item !== 'wk_allreal_qty' &&  item !== 'wk_reject_qty' && item !== 'wk__chr01' && item !== 'wo_part' && item !== 'wr_time_worker'
           && item !== 'wr_time_machine' && item !== 'wk_order_qty' && item !== 'wk__chr02'  && item !== 'pt_desc1' && item !=='wr_time_machine' && item!=='wk_date' && item !== 'wo_project'
           && item !=='wk_workshop_id' && item !== 'wk_classes_id' && item !=='wk_mode_id' &&item !=='wk_id' && item!=='wkd_det_List' && item!=='wk_classes_desc' && item!=='wk_mode_desc' && item!="wk_workshop_desc"
           && item !=='wo_project' && item !=='wk_userid' && item !== 'wkd_unh_List' && item !== 'wk_cr_date' && item !== 'wk_up_date' ){
             //wk_classes_desc // wk_mode_desc  //
             console.log(item)
             this.$message('请填完所有信息')
             
          return
          //总是在这里面
        }
      }
      for(let item in musttrue){
        if(musttrue[item]){
          this.$message("填写信息有误请检查后再提交")
            return
        }
      }
      this.formData.wkd_det_List = this.tableData;//工时的录入
      this.formData.wkd_unh_List = this.tableData2; //不良品的录入
      if(!this.formData.wk_userid){
        this.formData.wk_userid = this.wk_userid
      }else{
        this.formData.wk_userid = this.formData.wk_userid
      }
      console.log(this.formData);
      // wk_userid
      let that = this;
      //  let baseUrl = 'http://39.104.64.133:8080' 
      let projUrl = '/Home/Index';
      let url = window.location.href;
      let baseUrl = url.substring(0,url.lastIndexOf(projUrl));
      this.$confirm('你确定提交吗?', '提示', {
        }).then(() => {
          debugger
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
    selectDeptName(e,resId){
      ////////.
      console.log("e:+"+e)
      console.log("resId："+resId)
      console.log("此时的待删除id集合");
      console.log(this.beDeleteOptionArrId);
      ////标记位置
      //新的写法
      //筛选条件 e
      var opeList = this.allReasonList;//全部的原因
      console.log("此时的this.reasonList：")
      console.log(this.reasonList)
      // if(this.reasonList.length == 0){
        //也就是当这个数组为空时候才轮询查数据
        this.reasonList1 = [];
        this.reasonList = [];
        for(let chooseId = 0;chooseId < opeList.length;chooseId++){
          if(opeList[chooseId].wk_dept_id == e && this.beDeleteOptionArrId.indexOf(opeList[chooseId].wk_reason_id) === -1){
            this.reasonList.push(opeList[chooseId]);
          }//会有一个问题，第二次回来点击，会再推入一遍数据 
        }
        console.log("轮询完毕之后的 this.reasonList")
        console.log(this.reasonList)      
        for(let ser=0;ser<opeList.length;ser++){
        //该是-1才是不需要被删除的
          if(opeList[ser].wk_reason_id === resId){
            //根据这个找到列表
            this.reasonList1.push(opeList[ser]);
          }
        }
        console.log("轮询完毕之后的 this.reasonList1")
        console.log(this.reasonList1)      
      // }
      
      /////
      //选择下拉的时候
      let obj = {};
      obj = this.deptarmentList.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.wk_dept_id === e;//筛选出匹配数据
      });
      this.wkdWkDeptName = obj.wk_dept_desc;
      this.wkd_wk_dept_id = obj.wk_dept_id;
      var targetId = this.wkd_wk_dept_id;//责任部门
      //删除这条id
      // obj.wk_dept_id 
      // for()
      // // 获取原因信息
      //根据下拉的内容进行请求原因的列表
      //原来的写法

      // this.$http.get(`/Qzd_CodeDemo/wk_dep_res/GetResListByDeptId?deptId=${e}`).then((res)=>{
      //   // console.log(res)
      //   if(res.data.code == 200){
      //     this.reasonList = res.data.data;
      //     this.reasonList1 = res.data.data;
      //     console.log(this.reasonList)
      //   }else{
      //     this.$message.error(res.data.info);
      //   }
      // }).catch((res)=>{
      //   this.$message.error(res.data.info)
      // })
    },
    selectRejName(e){
       // <!--绑定的数组 rejectList 不良品 v-model : wk_unhealthy_id 
      // 子项的id ：item.wk_unhealthy_id-->
      /////--找到这个数组需要剔除的数据的下标
      //e为id
      console.log(e);
      // var beDeleteOptionArrId1=[]
      var list = this.rejectList;
      for(let i=0;i<list.length;i++){
          if(list[i].wk_unhealthy_id == e){
            // this.beDeleteOptionArrId1.push(list[i].wk_unhealthy_id);
            // console.log(e);
            // console.log(i)//下标
            // list.splice(i, 1); 
            this.shouldBeDeleteIndex1 = i;//存储这个下标
          }
      }
      // this.rejectList
      console.log(list);
      console.log(this.beDeleteOptionArrId1)
      ///
      //选择的不良品的字段
      this.wk_unhealthy_id = e;
    },
    // selectDeptName1(e){
    //    let obj = {};
    //   obj = this.deptarmentList1.find((item)=>{//这里的userList就是上面遍历的数据源
    //       return item.wk_dept_id === e;//筛选出匹配数据
    //   });
    //   this.wkdWkDeptName1=obj.wk_dept_desc
    //   this.wkd_wk_dept_id1=obj.wk_dept_id;
    // },
    ////已改
    selectReasonName(e){
      /////
      console.log(e);
      this.resSecondSelect = e;
      var list = this.reasonList;
      console.log("此时的操作数组list")
      console.log(list)
      for(let i=0;i<list.length;i++){
          if(list[i].wk_reason_id == e){ //此处是因为没有写对字段，没有进入条件
            // this.beDeleteOptionArrId.push(list[i].e);
            // console.log(e);
            // console.log(i)//下标
            // list.splice(i, 1); 
            this.shouldBeDeleteIndex = i;//存储损失工时原因的这个下标
            console.log(this.shouldBeDeleteIndex)
          }
      }
      // this.deptarmentList
      console.log(list);
      /////
      let obj = {};
      obj = this.reasonList.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.wk_reason_id === e;//筛选出匹配数据
      });
      this.wkdWkReasonName = obj.wk_reason_desc;
      this.wkd_wk_reason_id = obj.wk_reason_id;
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
    //与不良品数合计
    if($('.plan_num').val()*1 < ($('.output_num').val()*1+$(".fail_num").val()*1)){
       this.musttrue.plantrue=true
    }else{this.musttrue.plantrue=false}
    if($('.zhilin_num').val()<=($('.plan_num').val()*1)+$('.all_well').val()*1){
      this.musttrue.zhilinsure=true
    }else{this.musttrue.zhilinsure=false}
    },
        
    output(){
        //与不良品数目合计
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
  /*此处不能这样做*/
  margin-top: 14px;
  width: 9%;
  height: 28px;
  border: 1px solid #DCDFE6;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #545454; 
  padding-left: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  /* background:none !important; */
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
  width: 125px;
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
  margin-left: -10px;
}
.othTipNameSp_r{
  width: 95px;
  margin-left: 25px;
}
.machineNo{
  margin-left:17px;
}
.sunshi{
  margin-left:5px;
}
.projName{
  margin-left:5px;
}
.badGoodSum{
  margin-left:20px;
}
.sumInPty{
  margin-left:30px;
}
.sumWorkerTime{
  margin-left:-25px;
}
.must2{
  font-size:12px;
  text-align:center;
  padding:0;
}
.col1{

}
.col2{
  padding-left:5px;
}
.col3{
  padding-left:5px;
}
.col4{
  /** */
  padding-left:10px;
}
.col5{
  padding-left:10px;
}
.setParent{
  /* 包裹工时录入与不良品录入的父集 */
  display:flex;
  justify-content: space-between;
  align-items: stretch;
  padding:5px 5px;
  box-sizing:border-box;
}
.wk_loss_timeSet{
  /*损失工时*/
  flex:1;
  margin-right:5px;
  border:1px solid rgb(240,240,240);
}
/* .dep_select{
  width:100px !important;
} */
/* .reason_select{
  width:100px !important;
} */
.wx_rejectSet{
  /* 追加不良品录入 */
  flex:1;
  padding:0 10px;
  border:1px solid rgb(240,240,240);
  box-sizing:border-box;
}
.newClassWiden{
  width:120px !important;
}
/*单独处理车间，生产方式，班别的样式*/
#workShop,#productWay,#classEs{
  background:none !important;
}
</style>


