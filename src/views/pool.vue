<template>
  <el-container>
    <el-header style="height: 60px">
      <vab-logo />
    </el-header>
    <el-main>Main</el-main>
  </el-container>
</template>
<style lang="scss" scoped>
  .el-header {
    display: flex;
    align-items: center;
    justify-items: flex-end;
    background: $base-menu-background;
  }
  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
</style>
