<template>
  <div
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <iframe
      :id="id"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      frameborder="no"
      width="100%"
      style="overflow-y: auto"
      height="800"
      :src="src"
      @load="onLoad"
    />
  </div>
</template>
<script>
  export default {
    components: {},
    props: {
      src: String,
      id: String,
    },
    data() {
      return {
        loading: true,
      }
    },
    methods: {
      onLoad() {
        console.log(this.loading)
        this.loading = false
      },
    },
  }
</script>
