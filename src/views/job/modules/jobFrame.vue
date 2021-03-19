<template>
  <div>
    <iframe
      id="iframe"
      frameborder="no"
      width="100%"
      style="overflow-y: auto"
      height="500"
      :src="url"
    ></iframe>
  </div>
</template>
<style></style>
<script>
  export default {
    components: {},
    props: {
      url: String,
    },
    data() {
      return {}
    },
    mounted() {},
    methods: {},
  }
</script>
