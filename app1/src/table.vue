<template>
  <div>
    <div class="top">
      <p style="color:gray">部门管理 > 原因数据录入</p>
      <div></div>
    </div>
    <div class="add">
      <div class="department_table table">
        <div class="table_text">部门列表</div>
        <el-table :data="departmentTableData" highlight-current-row border style="width: 100%" default-sort >
        <el-table-column prop="wk_dept_id" label="主键" width="120"></el-table-column>
        <el-table-column prop="wk_dept_code" label="编号" width="80"   ></el-table-column>
        <el-table-column prop="wk_dept_desc" label="名称"    ></el-table-column>
        <el-table-column fixed="right" label="操作" width="50"  >
          <template slot-scope="scope">
            <el-button @click="department(scope.row)" type="text" size="small">选择</el-button>
          </template> 
        </el-table-column>
      </el-table>
      </div>
       
      <div class="relationship_table table">
        <div class="table_text" style="padding-bottom:5px">关系列表</div>
        <div class="relation_text">部门:</div>
        <el-table :data="relationshipTableData" highlight-current-row border style="width: 100%">
        <el-table-column prop="wk_dept_id" label="主键" width="120" height='10'></el-table-column>
        <el-table-column prop="wk_dept_code" label="编号" width="80"></el-table-column>
        <el-table-column prop="wk_dept_desc" label="名称" ></el-table-column>
        <el-table-column fixed="right" label="操作" width="50">
          <template slot-scope="scope">
            <el-button @click="relationtop(scope.row)" type="text" size="small">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
        <div>
          <div class="relation_text">原因:</div>
          <el-table :data="tableData" highlight-current-row border style="width: 100%">
        <el-table-column prop="wk_reason_code" label="编号" width="80"></el-table-column>
        <el-table-column prop="wk_reason_desc" label="名称" ></el-table-column>
        <el-table-column fixed="right" label="操作" width="50">
          <template slot-scope="scope">
            <el-button @click="relation(scope.row)" type="text" size="small">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
        </div>
      </div>
      <div class="reason_table table">
        <div class="table_text">原因列表</div>
            <el-table :data="reasonTableData" highlight-current-row border style="width: 100%" >
        <el-table-column prop="wk_reason_code" label="编号" width="80"></el-table-column>
        <el-table-column prop="wk_reason_desc" label="名称" ></el-table-column>
        <el-table-column fixed="right" label="操作" width="50">
          <template slot-scope="scope">
            <el-button @click="reason(scope.row)" type="text" size="small">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
        <div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <el-button type="info" @click="save">保存</el-button>
      <el-button type="info" @click="comeBack">返回</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      departmentTableData: [
        // {"wk_dept_id":"21BZ","wk_dept_desc":"ABU-SZ事业部-组装O型弹片","wk_dept_code":"21BZ"},{"wk_dept_id":"30db0221-09ff-4f03-82ce-8a76f6c2c5c4","wk_dept_desc":"1","wk_dept_code":"1"},{"wk_dept_id":"9259bd72-983c-4e8b-bf15-34ecd9c14ef4","wk_dept_desc":"55","wk_dept_code":"223"}
      ],
      reasonTableData: [
      //  {"wk_reason_id":"117a75b9-999b-4ce9-9c44-859b7128433f","wk_reason_desc":"测试转机","wk_reason_code":"JH04"},{"wk_reason_id":"433ef9a6-c61d-46e1-b034-f4c7b8c00873","wk_reason_desc":"特斯","wk_reason_code":"JH05"},{"wk_reason_id":"JH01","wk_reason_desc":"换线转机","wk_reason_code":"JH01"},{"wk_reason_id":"JH02","wk_reason_desc":"计划保养","wk_reason_code":"JH02"},{"wk_reason_id":"JH03","wk_reason_desc":"盘点","wk_reason_code":"JH03"}
      ],
      relationshipTableData: []
    };
  },
  mounted() {
    let that=this
       // // 获取部门信息
    that.$http.get('/Qzd_CodeDemo/wk_dept/GetList').then((res)=>{
      console.log(res);
      if(res.data.code == 200){
        that.departmentTableData = res.data.data;
      }else{
        that.$message.error(res.data.info)
      }
      // console.log(this.deptarmentList);
    }).catch((res)=>{
      // this.$message.error(res.data.info)
    })
  },
  methods: {
    // 返回
    comeBack(){
      this.$router.push({path:'/'});
    },    
    department(e) {
      this.onearr() 
     let baseUrl = 'http://39.104.64.133:8080'
     let  that=this
      let obj = {};
      obj.wk_dept_id = e.wk_dept_id;
      obj.wk_dept_code = e.wk_dept_code;
      obj.wk_dept_desc = e.wk_dept_desc;
      
      if (this.relationshipTableData.length === 0) {
        this.relationshipTableData.push(obj);
      } else {
        this.relationshipTableData=[]
        this.relationshipTableData.push(obj);
      }
        console.log(e.wk_dept_id)
     $.ajax({
        url: baseUrl +'/Qzd_CodeDemo/wk_dep_res/GetResListByDeptId',
        type: 'GET', // GET
        async: true,
        data:{"deptId":e.wk_dept_id},
        dataType: 'json',
        success: function(res) {
          if(that.tableData.length==0){
            res.data.forEach(el=>{that.tableData.push(el)})
          }else{
            that.tableData=[]
            res.data.forEach(el=>{that.tableData.push(el)})
          }
        }
      });
        // // 获取原因信息
    this.$http.get('/Qzd_CodeDemo/wk_reason/GetList').then((res)=>{
      if(res.data.code == 200){
      console.log(res.data.data)
        that.reasonTableData = res.data.data;
        this.onearr() 
      }else{
        that.$message.error(res.data.info);
      }
    }).catch((res)=>{
      that.$message.error(res.data.info)
    })  
    this.onearr() 
    },
    reason(e) {
      this.reasonTableData.forEach((el, index) => {
        if (e.wk_reason_id == el.wk_reason_id) {
          // this.reasonTableData.splice(index, 1);
          this.tableData.push(el);
        }
      });
    this.onearr()
    },
    relation(e) {
      this.onearr()
      this.tableData.forEach((el, index) => {
        if (e.wk_reason_id == el.wk_reason_id) {
          this.tableData.splice(index, 1);
          this.reasonTableData.push(el);
        }
      });
     this.onearr() 
    },
    relationtop(e){
      this.relationshipTableData=[]
    },
    onearr(){
      this.tableData.forEach((el,index)=>{
        for(let i in this.reasonTableData){
          if(this.reasonTableData[i].wk_reason_id==el.wk_reason_id){
            this.reasonTableData.splice(i,1)
          }
        }
      })
      this.reasonTableData.forEach((el,index)=>{
        for(let i in this.tableData){
          if(this.tableData[i].wk_reason_id==el.wk_reason_id){
            this.tableData.splice(i,1)
          }
        }
      })
    },
    save(){
      let entity1=[]
      let that=this
      console.log(this.departmentTableData)
      if(this.tableData.length==0 && this.relationshipTableData.length==0){
        that.$message.error('保存失败,无数据')
        return
      }
      if(this.tableData.length==0 && this.relationshipTableData.length!==0){
        let obj={}
        // obj.wk_dept_id=this.relationshipTableData[0].wk_dept_id
        //  obj.wk_reason_id=""
        //  obj.wk_dept_reason_id=""
        //  entity1.push(obj)
        entity1;
       
      }else{
        this.tableData.forEach(el=>{
        let obj={}
        obj.wk_dept_id=this.relationshipTableData[0].wk_dept_id
        obj.wk_dept_reason_id=""
        obj.wk_reason_id=el.wk_reason_id
        entity1.push(obj)
      })
      console.log(entity1)
      }
      // let entity=JSON.stringify(entity1)
      // let keyValue=JSON.stringify(this.relationshipTableData[0].wk_dept_id)
      // console.log(entity)
      let baseUrl='http://39.104.64.133:8080'
       $.ajax({
        url: baseUrl +'/Qzd_CodeDemo/wk_dep_res/SaveDepRes',
        type: 'POST', // GET
        async: true,
        data:{"entity":JSON.stringify(entity1),keyValue:this.relationshipTableData[0].wk_dept_id},
        dataType: 'json',
        success: function(res) {
          that.$message('保存成功')
        }
      });
    }
  }
};
</script>
<style>
*{
  text-overflow:ellipsis
}
.table_text {
  padding: 40px 0;
  color:gray;
  min-width: 350px;
  
}
.add {
  display: flex;
  justify-content: space-around;
}
.top {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  padding: 0 30px;
  box-sizing: border-box;
   background: #FFFFFF;
  color: #333333;
}
.table {
  width: 25%;
  text-align: center;
}
.bottom {
  margin-left: calc(50% - 15px);
  margin-top: 20px;
}
.relation_text{
    margin: 10px 0 10px 0px;
    text-align: left;
    color: gray
}
.qusi{
  height: 10px
}
.cell{
  white-space: nowrap;
  text-overflow:ellipsis
}
.el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
  white-space: nowrap;
}
.el-table__header-wrapper{
  min-width: 350px;
}
</style>


