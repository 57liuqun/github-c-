<template>
  <div id="app">
    <router-view />
    <div id="content_box">
      <div class="search_line">
        <div class="shuru_top">      
         <div class="shurubox" >
            <span  class="twice_search">责任部门：</span><el-select class="td_input" size="mini" v-model="requestData.wk_dept_id"   filterable placeholder="请选择">
                  <el-option v-for="(item1,inde) in deptarmentList1" :key="inde" :label="item1.wk_dept_desc" :value="item1.wk_dept_id"></el-option>
                </el-select>
              <span  class="twice_search">原因：</span><el-select size="mini" class="td_input" v-model="requestData.wk_reason_id"  filterable placeholder="请选择">
                  <el-option  v-for="(item2,ind) in reasonList1" :key="ind" :value="item2.wk_reason_id" :label="item2.wk_reason_desc" ></el-option>
                </el-select>
        </div>
        </div>
        <div class="chaozuo">
          <el-button size='small' class="search_btn" style="width:45px" icon="el-icon-refresh"  @click='searchData' ></el-button>
          <el-button size='small' class="search_btn" icon="el-icon-search"  @click='searchData' >查询</el-button>
          <el-button size='small' class="search_btn" icon="el-icon-edit"  @click='resetSearchData'>重置</el-button>
          <el-button size='small' class="search_btn" icon="el-icon-edit-outline" @click="edit" > 编辑</el-button>
          <el-button size='small' class="search_btn"  icon="el-icon-delete"  @click="tableDelet"> 删除</el-button>
          <el-button size='small' class="search_btn" icon="el-icon-upload2"  @click='exportTableData'>导出</el-button>
        </div>
        
      </div>
      <div class="table_box"  >
          <el-table id="table_data" stripe @row-click="dianji" highlight-current-row :max-height="maxHeight"  :data="tableData" border  >
            <el-table-column  align="center" label="部门编号" >
              <template slot-scope="scoped">
              <p class="table_tag">{{scoped.row.wk_dept_code}}</p>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="部门名称" >
              <template slot-scope="scoped">
              <p class="table_tag">{{scoped.row.wk_dept_desc}}</p>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="不良品编号" >
              <template slot-scope="scoped">
              <p class="table_tag">{{scoped.row.wk_reason_code}}</p>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="不良品名称" >
              <template slot-scope="scoped">
              <p class="table_tag">{{scoped.row.wk_reason_desc}}</p>
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
        wk_dept_id:"",
        wk_reason_id:""
      },
      // data
      tableData: [],
      total:0,
      pageNum: 1,
      pageSize: 10,
      maxHeight:0,
      msgId:"",
      deptarmentList:[],
      deptarmentList1:[],
      reasonList:[],
      reasonList1:[]
      
  
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
      //部门信息
      // // 获取部门信息
    this.$http.get('/Qzd_CodeDemo/wk_dept/GetList').then((res)=>{
      console.log(res);
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
    // // 获取原因信息
    this.$http.get('/Qzd_CodeDemo/wk_reason/GetList').then((res)=>{
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
      //  if(this.msgId.wk_id){
         this.$router.push({path:'/table',query:{id:this.msgId}})
      //  }else(this.$message("请选中数据"))                                              //编辑按钮   
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.searchData()
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.searchData()
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
      let pageNum=JSON.stringify(this.pageNum)
      let pageSize=JSON.stringify(this.pageSize)
      let wk_dept_id = JSON.stringify(this.requestData.wk_dept_id);
      let wk_reason_id = JSON.stringify(this.requestData.wk_reason_id);

      let projUrl = '/Home/Index';
      let url = window.location.href;
      // console.log(url);
      let baseUrl = url.substring(0,url.lastIndexOf(projUrl));
      $.ajax({
        url: baseUrl +'/Qzd_CodeDemo/wk_dep_res/GetPageList',
        type: 'GET', // GET
        async: true,
        data:{
          queryJson:`{'wk_dept_id':${wk_dept_id},'wk_reason_id':${wk_reason_id}}`,
          pagination:"{'rows':"+pageSize+",'page':"+pageNum+",'sidx':'','sord':'ASC','records':0,'total':0}"
        },
        dataType: 'json',
        success: function(res) {
          console.log(res)
          if(res.code === 200){
            that.tableData = res.data.rows;
            that.total = parseInt(res.data.records);
          }
        }
      });
          

    },
    // 重置表单
    resetSearchData(){
      this.requestData.wk_dept_id = '';
      this.requestData.wk_reason_id = '';
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


