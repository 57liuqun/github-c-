<template>
  <div id="add">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Add',
  data(){
    return {

    }
  }  
  
}
</script>

<style>
  /* .el-input{
    width:100% !important;
  } */
  .el-select--mini{
    width:15% !important;
  }
  /* .el-input--mini{
    width:100% !important;
  } */
  /* .el-input--suffix{
    width:100% !important;
  } */
  /* 时间选择器的样式设置 */
  .el-input__inner{
    height:28px !important;
    line-height:28px !important;
    padding:0 20px !important;
    text-align:center;
  }
  /*去掉时钟小图标*/
  .el-icon-time:before {
    content: "" !important;
  }
  /* .el-icon-time:after{
    content: "" !important;
  }
  .el-input__suffix-inner:before{
    content:"" !important;
  }
  .el-input__suffix-inner:after{
    content:"" !important;
  } */
  /*叉*/
  .el-icon-circle-close{
    line-height:28px !important;
  }
</style>


