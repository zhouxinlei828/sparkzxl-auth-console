<template>
  <div>
    <Iframe
      id="iframe"
      frameborder="no"
      width="100%"
      style="overflow-y: auto"
      :src="url"
    ></Iframe>
  </div>
</template>
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
