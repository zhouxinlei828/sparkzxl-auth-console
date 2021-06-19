<template>
  <el-dialog
    title="设计流程图"
    :visible.sync="dialogFormVisible"
    :width="getWindowInfo.width"
    fullscreen
    @close="closeDialog"
  >
    <iframe
      :src="flowChartSrc"
      width="100%"
      :height="getWindowInfo.height"
      allowfullscreen
      frameborder="0"
    />
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
        getWindowInfo: {
          height: '',
          width: '',
        },
      }
    },
    created() {
      window.addEventListener('resize', this.getWindowInfo)
      this.resizeWindowInfo()
    },
    destroyed() {
      window.removeEventListener('resize', this.getWindowInfo)
    },
    methods: {
      showDialog(data) {
        this.dialogFormVisible = true
        this.flowChartSrc = data.flowChartSrc
      },
      resizeWindowInfo() {
        // 获取浏览器高度，减去顶部导航栏的值70（可动态获取）,再减去head-DIV高度值80
        this.getWindowInfo.height = window.innerHeight * 0.78 + 'px'
        this.getWindowInfo.width = window.innerWidth * 0.8 + 'px'
      },
      closeDialog() {
        this.dialogFormVisible = false
        this.flowChartSrc = ''
      },
    },
  }
</script>
