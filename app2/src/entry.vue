<template>
  <div id="app">
    <router-view />
    <div id="content_box">
      <div class="search_line">
        <div class="shuru_top">
          <div class="shurubox">
            <span class="twice_search">工单号：</span>从<el-input placeholder="请输入工单号" clearable v-model='requestData.wk_no' size="small" class="search_inp minibox"></el-input>至<el-input placeholder="请输入工单号" clearable v-model='requestData.wk_no1' size="small" class="search_inp minibox"></el-input>
            <span  class="twice_search">日期：</span>从<el-date-picker v-model="requestData.time"  type="date" size="small" placeholder="请选择日期" value-format="yyyy-MM-dd" class="search_inp minibox" style="width:130px"></el-date-picker>
            至<el-date-picker v-model="requestData.time1"   type="date" size="small" placeholder="请选择日期" value-format="yyyy-MM-dd" class="search_inp minibox" style="width:130px" ></el-date-picker>         
          </div>      
         <div class="shurubox" >
            <span  class="twice_search">车间：</span>从<el-select style="width:130px;margin:0 10px;" clearable @change="chooseLab" v-model="requestData.value"  placeholder="请选择" size="small" class="minibox">
                  <el-option  v-for="(item,index) in options1" :key="index" :label="item.wk_workshop_desc" :value="item.wk_workshop_id" class="minbox1"></el-option>
                  </el-select>至<el-select style="width:130px;margin:0 10px;" clearable @change="chooseLab1" v-model="requestData.value2"  placeholder="请选择" size="small" class="minibox">
                  <el-option  v-for="(item,index) in options2" :key="index" :label="item.wk_workshop_desc" :value="item.wk_workshop_id" class="minbox1"></el-option>
                  </el-select>
              <span  class="twice_search">班别：</span><el-select style="width:130px;margin:0 23px;" clearable v-model="requestData.value1" placeholder="请选择" size="small" class="minibox" @change="chooseVal">
                <el-option v-for="(item,index) in options" :key="index" :label="item.wk_classes_desc" :value="item.wk_classes_id" class="minbox1"></el-option>
              </el-select>
        </div>
        </div>
        <div class="chaozuo">
          <el-button size='small' class="search_btn" style="width:45px" icon="el-icon-refresh"  @click='searchData' ></el-button>
          <el-button size='small' class="search_btn" icon="el-icon-search"  @click='searchData' >查询</el-button>
          <el-button size='small' class="search_btn" icon="el-icon-edit"  @click='resetSearchData'>重置</el-button>
          <el-button size='small' class="search_btn"  icon="el-icon-plus" @click="gohome"> 新增</el-button>
          <el-button size='small' class="search_btn" icon="el-icon-edit-outline" @click="edit" > 编辑</el-button>
          <el-button size='small' class="search_btn"  icon="el-icon-delete"  @click="tableDelet"> 删除</el-button>
          <el-button size='small' class="search_btn" icon="el-icon-upload2"  @click='exportTableData'>导出</el-button>
        </div>
        
      </div>
      <div class="table_box"  >
          <el-table id="table_data" stripe @row-click="dianji" highlight-current-row :max-height="maxHeight"  :data="tableData" border  >
            <el-table-column v-for="(item,index) in tableHeader" :min-width="item.prop.length > 8 ? '100px' : item.prop === '日期'? '170px' : '0'" align="center" :key="index" :label="item.prop" >
              <template slot-scope="scoped">
              <p class="table_tag">{{scoped.row[item.prop]}}</p>
              </template>
          </el-table-column>
          </el-table>
        </div>
        <div class="pagination_line">
          <el-pagination @size-change="handleSizeChange"  @current-change="handleCurrentChange" :current-page="pageNum"
          :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="Number(total)">
          </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      radio: '1',
      requestData:{
        wk_no:'',
        wk_no1:'',
        time:'',
        time1:'',
        value:'',
        value1:'',
        value2:'',
        banbie:'',
        newLable:'',
        newLable1:''
       
      },
      // 表头
      tableHeader:[
        {'prop':"日期"},
        {'prop':"车间"},
        {'prop':"线别"},
        {'prop':"班别"},
        {'prop':"机台号"},
        {'prop':"工单号"},
        {'prop':"项目名"},
        {'prop':"料号"},
        {'prop':"描述"},
        {'prop':"生产方式"},
        {'prop':"制令数量"},
        {'prop':"计划量"},
        {'prop':"实际产出良品量"},
        {'prop':"入库数量"},
        {'prop':"不良品数合计"},
        {'prop':"累计产出量"},
        {'prop':"累计入库量"},
        {'prop':"设备包工工时(小时)"},
        {'prop':"损失工时汇总(小时)"},
        {'prop':"正班员工"},
        {'prop':"正班技术员"},
        {'prop':"正班班长"},
        {'prop':"正班物料员"},
        {'prop':"正班外观员"},
        {'prop':"正班包装"},
        {'prop':"正班打签员"},
        {'prop':"正班修理"},
        {'prop':"正班qc"},
        {'prop':"正班其他后勤人员"},
        {'prop':"加班员工"},
        {'prop':"加班技术员"},
        {'prop':"加班班长"},
        {'prop':"加班物料员"},
        {'prop':"加班外观员"},
        {'prop':"加班包装"},
        {'prop':"加班打签员"},
        {'prop':"加班修理"},
        {'prop':"加班qc"},
        {'prop':"加班其他后勤人员"},
      ],
      tableHeader1:[
        {'prop':"日期"},
        {'prop':"车间"},
        {'prop':"线别"},
        {'prop':"班别"},
        {'prop':"机台号"},
        {'prop':"工单号"},
        {'prop':"项目名"},
        {'prop':"料号"},
        {'prop':"描述"},
        {'prop':"生产方式"},
        {'prop':"制令数量"},
        {'prop':"计划量"},
        {'prop':"实际产出良品量"},
        {'prop':"入库数量"},
        {'prop':"不良品数合计"},
        {'prop':"累计产出量"},
        {'prop':"累计入库量"},
        {'prop':"设备包工工时(小时)"},
        {'prop':"损失工时汇总(小时)"},
        {'prop':"正班员工"},
        {'prop':"正班技术员"},
        {'prop':"正班班长"},
        {'prop':"正班物料员"},
        {'prop':"正班外观员"},
        {'prop':"正班包装"},
        {'prop':"正班打签员"},
        {'prop':"正班修理"},
        {'prop':"正班qc"},
        {'prop':"正班其他后勤人员"},
        {'prop':"加班员工"},
        {'prop':"加班技术员"},
        {'prop':"加班班长"},
        {'prop':"加班物料员"},
        {'prop':"加班外观员"},
        {'prop':"加班包装"},
        {'prop':"加班打签员"},
        {'prop':"加班修理"},
        {'prop':"加班qc"},
        {'prop':"加班其他后勤人员"},
      ],
      // data
      tableData: [],
      total:0,
      options:[],
      options1:[],
      options2:[],
      pageNum: 1,
      pageSize: 10,
      maxHeight:0,
      msgId:"",
  
    }
  }, 
   created(){
        this.setSize1();
  },
  mounted(){
    let that = this;
    // this.maxHeight = window.screen.height - 305;
    //  let baseUrl = 'http://39.104.64.133:8080'
      let projUrl = '/Home/Index';
      let url = window.location.href;
      // console.log(url);
      let baseUrl = url.substring(0,url.lastIndexOf(projUrl));
      $.ajax({
        url: baseUrl +'/Qzd_CodeDemo/wk_workshop_setup/getList',
        type: 'GET', // GET
        async: true,
        dataType: 'json',
        success: function(res) {
          that.options1 = res.data;
          that.options2 = res.data;
        }
      });
       $.ajax({
        url: baseUrl +'/Qzd_CodeDemo/wk_classes_setup/getList',
        type: 'GET', // GET
        async: true,
        dataType: 'json',
        success: function(res) {
          console.log(res)
          that.options = res.data;
        }
      });
      
      //监听浏览器窗口大小改变
      window.addEventListener('resize', function() {
      let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      that.maxHeight = height;
      that.setSize();
      }, false);
  },
  methods:{
        setSize1: function() {
      let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      this.maxHeight = height;
      document.getElementsByClassName('el-table__body-wrapper')[0].style.height = (this.maxHeight-220) + 'px';
      },
      setSize: function() {
      document.getElementsByClassName('el-table__body-wrapper')[0].style.height = (this.maxHeight-220) + 'px';
      },
    dianji(row){
      this.msgId=row
    },
    edit(){
       if(this.msgId.wk_id){
         this.$router.push({path:'/table',query:{id:this.msgId}})
       }else(this.$message("请选中数据"))                                              //编辑按钮   
    },
    tableDelet(){
      console.log(this.msgId)
       if(this.msgId.wk_id){
        // let baseUrl = 'http://39.104.64.133:8080'
      let projUrl = '/Home/Index';
      let url = window.location.href;
      console.log(url);
      let baseUrl = url.substring(0,url.lastIndexOf(projUrl));
      let that=this
    
       $.ajax({
        url: baseUrl +'/Qzd_CodeDemo/wk_mstr/DeleteForm',
        type: 'POST', // GET
        async: true,
        data:{"keyValue":this.msgId.wk_id},
        dataType: 'json',
        success: function(res) {
             that.searchData()
          that.$message("删除成功")
          that.msgId.wk_id=''
        }
        });        
       }else(this.$message("请选中数据"))                                                                               //删除按钮
    },
    gohome:function(){
      this.$router.push({path:'/table',query:{id:"abbbbbb"}});
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.searchData()
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.searchData()
    },
    chooseLab1(val){
      this.requestData.newLable1=val
      // console.log(this.requestData.newLable1)
    },
    chooseLab(val){
      this.requestData.newLable=val
      // console.log(this.requestData.newLable)
    },
    chooseVal(val){
      this.requestData.banbie=val//班别
      // console.log(this.requestData.banbie)
    },
    // 查询数据
    searchData(){
      // let baseUrl = 'http://39.104.64.133:8080' 
      // console.log(window.location.href);
      let that = this;
      let wk_no=JSON.stringify(this.requestData.wk_no) //从工单号
      let wk_no1=JSON.stringify(this.requestData.wk_no1) //至工单号
      let time=JSON.stringify(this.requestData.time)//从日期
      let time1=JSON.stringify(this.requestData.time1) //至日期
      let wk_workshop_id =JSON.stringify(this.requestData.newLable) //从车间
      let wk_workshop_id1 =JSON.stringify(this.requestData.newLable1)//至车间
      let val=JSON.stringify(this.requestData.banbie)
      let pageNum=JSON.stringify(this.pageNum)
      let pageSize=JSON.stringify(this.pageSize)

      let projUrl = '/Home/Index';
      let url = window.location.href;
      // console.log(url);
      let baseUrl = url.substring(0,url.lastIndexOf(projUrl));
      $.ajax({
        url: baseUrl +'/Qzd_CodeDemo/wk_mstr/QueryProduction_Daily_Report',
        type: 'POST', // GET
        async: true,
        data:{
          queryJson:"{'p_wk_no_b':"+wk_no+",'p_wk_no_e':"+wk_no1+",'wk_date_b':"+time+",'wk_date_e':"+ time1+",'wk_workshop_b':"+wk_workshop_id +",'wk_workshop_ed':"+wk_workshop_id1+",'wk_classes':"+val+"}",
            pagination :"{'rows':"+pageSize+",'page':"+pageNum+",'sidx':'','sord':'ASC','records':0,'total':0}"
        },
        dataType: 'json',
        success: function(res) {
          console.log(res)
          if(res.code === 200 && res.data.rows.length > 0){
            // 处理表头列
            let row  = res.data.rows[0];
            let headerArr = [];
            for(let tem  in row ){
             if(tem !== 'wk_id' && tem !== 'wk_workshop_id' && tem !== 'wk_classes_id'&& tem !== 'wkd_wk_id' && tem.trim() !== 'recordtotal' && tem !== '行号' && tem.trim() !== 'wk_mode_id'   ){
                        headerArr.push({"prop":tem});
                    }
            }
            // 数据
            that.total=res.data.total
            that.tableHeader = headerArr;
            that.tableData = res.data.rows;
          }else{
            that.tableHeader = that.tableHeader1;
            that.tableData = [];
          } 
        }
      });
          

    },
    // 重置表单
    resetSearchData(){
      this.requestData.wk_no = '';
      this.requestData.wk_no1 = '';
      this.requestData.time = '';
      this.requestData.time1 = '';
      this.requestData.value = "";
      this.requestData.value1 = '';
      this.requestData.value2 = '';
      this.requestData.banbie = '';
      this.requestData.newLable = '';
      this.requestData.newLable1 = '';
    },
    // 导出表格
    exportTableData(){
      if(this.tableData.length > 0){
        require.ensure([], () => {
          const {export_json_to_excel} = require('./utils/exportExcel/Export2Excel.js');
          let headArr = [];
          let valArr = [];
          let dataList = this.tableData;
          let length = dataList.length;
          for(let j=0;j<this.tableHeader.length;j++){
            
              headArr.push(this.tableHeader[j].prop);
          }
          const tHeader = headArr;
          const filterVal = headArr;
          const list = this.tableData;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '清单数据');
        });
      }else{
        this.$message('暂无数据导出');
      }
    },
    formatJson(filterVal, jsonData) {
      console.log(jsonData);
      return jsonData.map(v => filterVal.map(j => v[j]));
    }

  }   
  
}
</script>

<style>
 #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 1360px;
  font-size: 13px;
  overflow-y: auto; 
}
/* .el-table--fit{
  width: 98vw;
  margin: 0 auto;
} */
.search_line{
  width: 100%;
  height: auto;
  line-height: 50px;
  margin: 10px 0;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.search_inp{
  width: 200px;
  margin:0 10px;
}
.search_btn{
  width: 70px;
  background: #FFFFFF;
  color: #333333;
}
.search_btn:hover{
  width: 70px;
  background: #3286ED;
  color: #fff;
}
.table_box{
  width: 98%;
  margin: 0 auto;  
}
.el-table--scrollable-x .el-table__body-wrapper{
  height: 76vh;
}
.table_tag{
  width: 100%;
  height: 15px;
  line-height: 15px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}
.pagination_line{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  text-align: right;
  padding-right: 30px;
  padding-top: 10px;
  box-sizing: border-box; 
  background: #fff;
  border-top: 1px solid #cccccc;
  z-index: 800;
}
 .table_box /deep/.el-table{
  /* min-height: 80vh!important;
  max-height: 70vh!important; */
}
.el-table__empty-block{
  /* min-height: 74vh;
  max-height: 70vh; */
}
.el-table th{
  background: #F8F8F8;
  color: #333333;
}
.minibox{
  width: 130px;
}
.chaozuo{
  display: flex;
  height: 30px;
  width: 40%;
  align: right;
  display: flex;
  justify-content: flex-end;
  flex-wrap: nowrap;
}
.shuru_top{
  width: 60%;
  /* display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  min-width: 1270px; */
}
.gender{
  margin-left: 10px
}
.shurubox{
  height: 40px;
  /* display: flex;
  flex-wrap: nowrap; */
}
.twice_search{
  display: inline-block;
  width: 65px;
  text-align: right;
}
.el-table .cell {
  line-height: 13px;
}
</style>


