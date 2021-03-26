<template>
  <el-dialog
    title="查看流程图"
    :visible.sync="dialogFormVisible"
    width="950px"
    @close="closeDialog"
  >
    <img style="display: table-cell; margin: 0 auto" :src="flowChartSrc" />
    <div slot="footer" class="dialog-footer">
      <el-button
        size="small"
        class="button-item"
        type="primary"
        @click="closeDialog"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    data() {
      return {
        dialogFormVisible: false,
        flowChartSrc: '',
      }
    },
    methods: {
      showDialog(data) {
        this.dialogFormVisible = true
        this.flowChartSrc = data
      },
      closeDialog() {
        this.flowChartSrc = ''
        this.dialogFormVisible = false
      },
    },
  }
</script>
