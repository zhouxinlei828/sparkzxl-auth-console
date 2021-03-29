<template>
  <div>
    <Iframe
      id="iframe"
      frameborder="no"
      width="100%"
      style="overflow-y: auto"
      height="500"
      :src="urlNormal"
    ></Iframe>
  </div>
</template>
<script>
  import { getAccessToken } from '@/utils/storageUtils'
  export default {
    components: {},
    props: {
      // eslint-disable-next-line vue/require-default-prop
      url: String,
    },
    data() {
      return {}
    },
    computed: {
      urlNormal(state) {
        return `${state.url}?token=Bearer `.concat(getAccessToken())
      },
    },
    mounted() {},
    methods: {},
  }
</script>
